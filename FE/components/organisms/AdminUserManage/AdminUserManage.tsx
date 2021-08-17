import { useState, useEffect, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { ReactTable, Button } from '@molecules';
import {
  getUserTableData,
  signupUsersByExcel,
  updateUser,
  createUser,
} from '@repository/adminRepository';
import { MODALS, REGIONS } from '@utils/constants';
import { Project } from '@utils/type';

import AdminUserManageModal from './AdminUserManageModal';
import AdminUserImportModal from './AdminUserImportModal';
import AdminUserDeleteModal from './AdminUserDeleteModal';
import { displayModal, setLoading, useAppDispatch } from '@store';
import { AxiosError } from 'axios';

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
        padding: 0 10px;
        box-shadow: none;
      }
    }
  }

  .region-btns {
    margin-bottom: 20px;
  }
`;

const RegionButtonWrapper = styled.span<{ selected: boolean }>`
  > button {
    background-color: white;
    width: auto;
    padding: 5px 15px;
    margin-right: 20px;
    box-shadow: none;
    border: 1px solid gainsboro;

    > div {
      color: gray;
    }

    ${({ selected }) =>
      selected &&
      `
        background-color: black;
        border: 1px solid black;
        border-radius: none;
        > div {
          color: white;
        }
      `}
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

export default function AdminUserManage({ project }: AdminUserManageProps) {
  const dispatch = useAppDispatch();
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [teamStatusTableData, setTeamStatusTableData] = useState<UserDataRow[]>(
    [],
  );
  const [showManageModal, setShowManageModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editTarget, setEditTarget] = useState<UserDataRow>();

  useEffect(() => {
    fetchUsers();
  }, [project, selectedRegion]);

  const fetchUsers = () => {
    getUserTableData({
      projectId: project.id,
      regionCode: selectedRegion,
    }).then(({ data: { data } }) => {
      setTeamStatusTableData(data);
    });
  };

  const handleSelectedRow = (row: { type: string; data: UserDataRow }) => {
    if (row.type === 'edit') {
      setShowManageModal(true);
      setEditTarget(row.data);
    } else if (row.type === 'delete') {
      setShowDeleteModal(true);
      setEditTarget(row.data);
    }
  };

  const handleCloseEditModal = () => {
    setShowManageModal(false);
    setEditTarget(undefined);
  };

  const handleDeleteConfirmCancel = () => {
    setShowDeleteModal(false);
    setEditTarget(undefined);
  };

  const handleDeleteConfirm = () => {
    // TODO: 사용자 삭제 API 호출
    console.log(editTarget);
    myAlert("현재 사용자 삭제는 불가능합니다.");
    // fetchUsers();
    // handleDeleteConfirmCancel();
  };

  const myAlert = (content: string) => {
    dispatch(
      displayModal({
        modalName: MODALS.ALERT_MODAL,
        content: content,
      }),
    );
  };

  const errorAlert = (err: AxiosError) => {
    myAlert(
      'ERROR' +
        (err.response?.data ? ': ' + JSON.stringify(err.response.data) : ''),
    );
  };

  const handleUploadImport: ChangeEventHandler<HTMLInputElement> = (event: {
    target: HTMLInputElement;
  }) => {
    if (event.target.files && event.target.files.length > 0) {
      dispatch(setLoading({ isLoading: true }));

      const formData = new FormData();
      formData.append('excelFile', event.target.files[0]);

      signupUsersByExcel(formData)
        .then(() => {
          fetchUsers();
        })
        .catch((err) => {
          errorAlert(err);
        })
        .finally(() => {
          setShowImportModal(false);
          dispatch(setLoading({ isLoading: false }));
        });
    }
  };

  const handleUpdateUser = (param: any) => {
    dispatch(setLoading({ isLoading: true }));
    updateUser(param)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        errorAlert(err);
      })
      .finally(() => {
        setShowManageModal(false);
        dispatch(setLoading({ isLoading: false }));
      });
  };

  const handleCreateUser = (param: any) => {
    dispatch(setLoading({ isLoading: true }));
    createUser(param)
      .then(({ data: { data } }) => {
        fetchUsers();
      })
      .catch((err) => {
        errorAlert(err);
      })
      .finally(() => {
        handleCloseEditModal();
        dispatch(setLoading({ isLoading: false }));
      });
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <div>
          <Text
            text={`${project.stage.codeName || ''} 사용자 목록`}
            fontSetting="n26b"
          />
          <Icon iconName="add_box" func={() => setShowManageModal(true)} />
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
        </div>
      </div>
      <div className="region-btns">
        {REGIONS.map((r) => (
          <RegionButtonWrapper
            selected={selectedRegion === r.code}
            key={r.code}
          >
            <Button title={r.name} func={() => setSelectedRegion(r.code)} />
          </RegionButtonWrapper>
        ))}
      </div>
      <ReactTable
        data={teamStatusTableData}
        columns={USER_TABLE_COLUMNS}
        selectable={{
          selectable: editable,
          type: {
            edit: true,
            delete: true,
          },
        }}
        onSelectRow={handleSelectedRow}
        pagination={false}
      />
      {showManageModal &&
        (editTarget ? (
          <AdminUserManageModal
            handleClickClose={handleCloseEditModal}
            defaultValue={editTarget}
            projectId={project.id}
            handleUpdateUser={handleUpdateUser}
          />
        ) : (
          <AdminUserManageModal
            handleClickClose={() => setShowManageModal(false)}
            projectId={project.id}
            handleCreateUser={handleCreateUser}
          />
        ))}

      {showImportModal && (
        <AdminUserImportModal
          handleClickClose={() => setShowImportModal(false)}
          handleImportFile={handleUploadImport}
        />
      )}

      {showDeleteModal && editTarget && (
        <AdminUserDeleteModal
          handleClickClose={handleDeleteConfirmCancel}
          handleClickDelete={handleDeleteConfirm}
          studnetName={editTarget.name}
        />
      )}
    </Wrapper>
  );
}

const USER_TABLE_COLUMNS = [
  {
    Header: '#',
    width: 30,
    disableGroupBy: true,
    disableSortBy: true,
    disableFilters: true,
    Cell: (content: any) => {
      return (
        <div style={{ textAlign: 'center' }}>
          {content.row.id && !isNaN(parseInt(content.row.id))
            ? parseInt(content.row.id) + 1
            : ' '}
        </div>
      );
    },
  },
  {
    Header: '학번',
    accessor: 'studentNumber',
    disableGroupBy: true,
    width: 80,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '이름',
    accessor: 'name',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '이메일',
    accessor: 'email',
    disableGroupBy: true,
  },
  {
    Header: '반',
    accessor: 'studentClass',
    width: 110,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '전공여부',
    accessor: 'major',
    width: 120,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '역할',
    accessor: 'role',
    width: 120,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '프로젝트 활성여부',
    accessor: 'regist',
    width: 250,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
];
