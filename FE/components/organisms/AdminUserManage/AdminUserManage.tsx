import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';
import { AdminUserTable } from '@organisms';
import { getTableData } from '@repository/adminRepository';
import { ADMIN_DASHBOARD_TABLE_COLUMNS } from '@utils/constants';

const Wrapper = styled.div`
  .manage-header {
    margin: 20px 0;
  }
`;

interface AdminUserManageProps {
  projectId: number;
}

export default function AdminUserManage({ projectId }: AdminUserManageProps) {
  const [teamStatusTableData, setTeamStatusTableData] = useState<any[]>([]);

  useEffect(() => {
    getTableData({ projectId }).then(({ data: { data } }) => {
      setTeamStatusTableData(data);
    });
  }, [projectId]);

  return (
    <Wrapper>
      <div className="manage-header">
        <Text text="회원 목록 (임시)" fontSetting="n26b" />
      </div>
      <AdminUserTable
        data={teamStatusTableData}
        columns={ADMIN_DASHBOARD_TABLE_COLUMNS}
      />
    </Wrapper>
  );
}
