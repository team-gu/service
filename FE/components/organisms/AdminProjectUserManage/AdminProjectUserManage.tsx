import { useState, useEffect, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { ReactTable, Button } from '@molecules';
import {
  getProjectUserTableData,
  addStudentToProject,
  excludeStudentFromProject,
  exportUserData,
  importUserData,
} from '@repository/adminRepository';
import { Project } from '@utils/type';
import AdminProjectUserDeleteModal from './AdminProjectUserDeleteModal';
import AdminProjectUserAddModal from './AdminProjectUserAddModal';
import AdminUserImportModal from './AdminUserImportModal';
import AdminUserExportModal from './AdminUserExportModal';
import { displayModal, setLoading, useAppDispatch } from '@store';
import { MODALS } from '@utils/constants';

const Wrapper = styled.div`
  i {
    cursor: pointer;
  }

  .manage-header {
    display: flex;
    align-items: center;
    margin: 20px 0;
    justify-content: space-between;

    > div {
      display: inline-flex;
      align-items: center;
      > i {
        font-size: 30px;
      }
      > div {
        margin-right: 10px;
      }
    }

    .manage-header-import {
      > button {
        padding: 0 15px;
        box-shadow: none;
        margin-left: 10px;
      }
    }
  }

  .region-btns {
    margin-bottom: 20px;
  }
`;

interface UserDataRow {
  userId: number;
  completeYn: string | null;
  major: string;
  name: string;
  region: string;
  regist: string;
  role: string;
  studentClass: string;
  studentNumber: string;
  teamId: number | null;
  teamName: string | null;
  email: string;
}

interface AdminUserManageProps {
  project: Project;
}

export default function AdminProjectUserManage({
  project,
}: AdminUserManageProps) {
  const dispatch = useAppDispatch();
  const [userTableData, setUserTableData] = useState<UserDataRow[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editTarget, setEditTarget] = useState<UserDataRow>();

  useEffect(() => {
    fetchProjectUserTableData();
  }, [project]);

  const fetchProjectUserTableData = () => {
    getProjectUserTableData({
      projectId: project.id,
    }).then(({ data: { data } }) => {
      setUserTableData(data);
    });
  };

  const handleSelectedRow = (row: { type: string; data: UserDataRow }) => {
    if (row.type === 'delete') {
      setShowDeleteModal(true);
      setEditTarget(row.data);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setEditTarget(undefined);
  };

  const deleteUser = () => {
    dispatch(setLoading({ isLoading: true }));

    if (editTarget && editTarget.userId) {
      excludeStudentFromProject({
        projectId: project.id,
        userId: editTarget.userId,
      })
        .then(() => {
          fetchProjectUserTableData();
        })
        .catch(err => {
          dispatch(
            displayModal({
              modalName: MODALS.ALERT_MODAL,
              content: 'ERROR' + (err.response ? ': ' + err.response.data : ''),
            }),
          );
        })
        .finally(() => {
          closeDeleteModal();
          dispatch(setLoading({ isLoading: false }));
        });
    } else {
      dispatch(
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: '삭제할 행이 선택되지 않았습니다.',
        }),
      );
    }
  };

  const addUser = (userId: number) => {
    dispatch(setLoading({ isLoading: true }));
    addStudentToProject({
      projectId: project.id,
      userId,
    })
      .then(({ data: { data } }) => {
        setUserTableData(data);
      })
      .finally(() => {
        setShowAddModal(false);
        dispatch(setLoading({ isLoading: false }));
      });
  };

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  const downloadUserExport = () => {
    dispatch(setLoading({ isLoading: true }));
    exportUserData({
      project_code: project.project.code,
      stage_code: project.stage.code,
    })
      .then(({ data: { data } }) => {
        const arrayBuffer = base64ToArrayBuffer(data);
        const a = window.document.createElement('a');

        a.href = window.URL.createObjectURL(
          new Blob([arrayBuffer], { type: 'application/vnd.ms-excel' }),
        );
        a.download = 'export.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((err) => {
        dispatch(
          displayModal({
            modalName: MODALS.ALERT_MODAL,
            content: 'ERROR' + (err.response ? ': ' + err.response.data : ''),
          }),
        );
      })
      .finally(() => {
        setShowExportModal(false);
        dispatch(setLoading({ isLoading: false }));
      });
  };

  const uploadUserImport: ChangeEventHandler<HTMLInputElement> = (event: {
    target: HTMLInputElement;
  }) => {
    if (event.target.files && event.target.files.length > 0 && project.id) {
      dispatch(setLoading({ isLoading: true }));

      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append(
        'project_id',
        new Blob([project.id + ''], { type: 'application/json' }),
      );

      importUserData(formData)
        .then(() => {
          fetchProjectUserTableData();
        })
        .catch((err) => {
          dispatch(
            displayModal({
              modalName: MODALS.ALERT_MODAL,
              content: 'ERROR' + (err.response ? ': ' + err.response.data : ''),
            }),
          );
        })
        .finally(() => {
          setShowImportModal(false);
          dispatch(setLoading({ isLoading: false }));
        });
    }
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <div>
          <Text text="프로젝트 참여 교육생 목록" fontSetting="n26b" />
          <Icon iconName="add_box" func={() => setShowAddModal(true)} />
          <Icon
            iconName="settings_applications"
            func={() => setEditable(!editable)}
          />
        </div>

        <div className="manage-header-import">
          <Button
            title="import"
            func={() => setShowImportModal(true)}
            width="auto"
          />
          <Button
            title="export"
            func={() => setShowExportModal(true)}
            width="auto"
          />
        </div>
      </div>
      <ReactTable
        data={userTableData}
        columns={ADMIN_USER_TABLE_COLUMNS}
        selectable={{
          selectable: editable,
          type: { edit: false, delete: true },
        }}
        onSelectRow={handleSelectedRow}
        pagination={false}
      />

      {showImportModal && (
        <AdminUserImportModal
          handleClickClose={() => setShowImportModal(false)}
          handleImportExcel={uploadUserImport}
        />
      )}

      {showExportModal && (
        <AdminUserExportModal
          projectName={project.name}
          handleClickClose={() => setShowExportModal(false)}
          handleClickDownload={downloadUserExport}
        />
      )}

      {showDeleteModal && editTarget && (
        <AdminProjectUserDeleteModal
          studnetName={editTarget.name}
          handleClickClose={closeDeleteModal}
          handleClickDelete={deleteUser}
        />
      )}

      {showAddModal && (
        <AdminProjectUserAddModal
          handleClickClose={() => setShowAddModal(false)}
          handleClickAdd={addUser}
        />
      )}
    </Wrapper>
  );
}

const ADMIN_USER_TABLE_COLUMNS = [
  {
    Header: '학번',
    accessor: 'studentNumber',
    disableGroupBy: true,
  },
  {
    Header: '이름',
    accessor: 'name',
    disableGroupBy: true,
  },
  {
    Header: '지역',
    accessor: 'region',
  },
  {
    Header: '반',
    accessor: 'studentClass',
  },
  {
    Header: '팀 유무',
    accessor: 'teamYn',
  },
  {
    Header: '팀 식별자',
    accessor: 'teamId',
  },
  {
    Header: '리더 여부',
    accessor: 'leaderYn',
  },
  {
    Header: '전공/비전공',
    accessor: 'major',
  },
  {
    Header: '희망 포지션',
    accessor: 'position',
  },
];
