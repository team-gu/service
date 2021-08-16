import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { ReactTable, Button } from '@molecules';
import { getUserTableData } from '@repository/adminRepository';
import { REGIONS } from '@utils/constants';
import { ModalWrapper } from '@organisms';
import { Project } from '@utils/type';

import AdminUserManageModal from './AdminUserManageModal';
import AdminUserImportModal from './AdminUserImportModal';

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

const UserDeleteConfirmModal = styled.div`
  padding: 50px;

  .confirm-text {
    margin-bottom: 20px;
    text-align: center;
  } 

  .create-confirm-btns {
    text-align: center;

    button {
      width: 90px;
      margin 0 10px;
    }

    > button:nth-child(1) {
      background-color: forestgreen;
    }
  }

  .confirm-btns {
    text-align: center;

    button {
      width: 90px;
      margin 0 10px;
    }

    > button:nth-child(2) {
      background-color: crimson;
    }
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
    getUserTableData({
      projectId: project.id,
      regionCode: selectedRegion,
    }).then(({ data: { data } }) => {
      setTeamStatusTableData(data);
    });
  }, [project, selectedRegion]);

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
    // TODO: 사용자 삭제 API 호출 후 사용자 목록 리렌더링
    console.log(editTarget);

    setShowDeleteModal(false);
    setEditTarget(undefined);
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <div>
          <Text text="교육생 목록" fontSetting="n26b" />
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
      />
      {showManageModal &&
        (editTarget ? (
          <AdminUserManageModal
            handleClickClose={handleCloseEditModal}
            defaultValue={editTarget}
            projectId={project.id}
          />
        ) : (
          <AdminUserManageModal
            handleClickClose={() => setShowManageModal(false)}
            projectId={project.id}
          />
        ))}

      {showImportModal && (
        <AdminUserImportModal
          handleClickClose={() => setShowImportModal(false)}
        />
      )}

      {showDeleteModal && editTarget && (
        <ModalWrapper modalName="adminUserDeleteConfirmModal">
          <UserDeleteConfirmModal>
            <div className="confirm-text">
              <Text
                text={`[${editTarget.name}] 교육생 정보를 삭제하시겠습니까?`}
                fontSetting="n20m"
              />
            </div>
            <div className="confirm-btns">
              <Button title="취소" func={handleDeleteConfirmCancel} />
              <Button title="예" func={handleDeleteConfirm} />
            </div>
          </UserDeleteConfirmModal>
        </ModalWrapper>
      )}
    </Wrapper>
  );
}

const USER_TABLE_COLUMNS = [
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
    Header: '이메일',
    accessor: 'email',
    disableGroupBy: true,
  },
  {
    Header: '반',
    accessor: 'studentClass',
  },
  {
    Header: '전공/비전공',
    accessor: 'major',
  },
  {
    Header: '교육생/퇴소생',
    accessor: 'role',
  },
  {
    Header: '프로젝트 활성/비활성',
    accessor: 'regist',
    disableGroupBy: true,
  },
];
