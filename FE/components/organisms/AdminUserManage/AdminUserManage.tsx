import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { ReactTable, Button } from '@molecules';
import { AdminUserManageModal } from '@organisms';
import { getUserTableData } from '@repository/adminRepository';
import { REGIONS } from '@utils/constants';

const Wrapper = styled.div`
  i {
    cursor: pointer;
  }

  .manage-header {
    display: flex;
    align-items: center;
    margin: 20px 0;
    > div {
      margin-right: 10px;
    }
    > i {
      font-size: 30px;
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
}

interface AdminUserManageProps {
  projectId: number;
}

export default function AdminUserManage({ projectId }: AdminUserManageProps) {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [teamStatusTableData, setTeamStatusTableData] = useState<UserDataRow[]>(
    [],
  );
  const [showManageModal, setShowManageModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editTarget, setEditTarget] = useState<UserDataRow>();

  useEffect(() => {
    getUserTableData({ projectId, regionCode: selectedRegion }).then(
      ({ data: { data } }) => {
        console.log(data);
        setTeamStatusTableData(data);
      },
    );
  }, [projectId, selectedRegion]);

  const handleEditRow = (row: UserDataRow) => {
    setShowManageModal(true);
    setEditTarget(row);
  };

  const handleCloseEditModal = () => {
    setShowManageModal(false);
    setEditTarget(undefined);
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <Text text="교육생 목록" fontSetting="n26b" />
        <Icon iconName="add_box" func={() => setShowManageModal(true)} />
        <Icon
          iconName="settings_applications"
          func={() => setEditable(!editable)}
        />
      </div>
      <div className="region-btns">
        {REGIONS.map((r) => (
          <RegionButtonWrapper selected={selectedRegion === r.code}>
            <Button
              title={r.name}
              key={r.code}
              func={() => setSelectedRegion(r.code)}
            />
          </RegionButtonWrapper>
        ))}
      </div>
      <ReactTable
        data={teamStatusTableData}
        columns={USER_TABLE_COLUMNS}
        selectable={editable}
        onSelectRow={handleEditRow}
      />
      {showManageModal &&
        (editTarget ? (
          <AdminUserManageModal
            handleClickClose={handleCloseEditModal}
            defaultValue={editTarget}
            projectId={projectId}
          />
        ) : (
          <AdminUserManageModal
            handleClickClose={() => setShowManageModal(false)}
            projectId={projectId}
          />
        ))}
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
    Header: '지역',
    accessor: 'region',
  },
  {
    Header: '반',
    accessor: 'studnetClass',
  },
  {
    Header: '전공/비전공',
    accessor: 'major',
  },
  {
    Header: '프로젝트 활성/비활성',
    accessor: 'regist',
    disableGroupBy: true,
  },
  {
    Header: '팀 완료 여부',
    accessor: 'completeYn',
  },
  {
    Header: '팀 식별자',
    accessor: 'teamId',
  },
  {
    Header: '팀 이름',
    accessor: 'teamName',
  },
  {
    Header: '교육생/퇴소생',
    accessor: 'role',
  },
];
