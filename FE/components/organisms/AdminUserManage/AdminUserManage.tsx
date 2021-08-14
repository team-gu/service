import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';
import { DashboardTable } from '@molecules';
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
        <Text text="교육생 목록" fontSetting="n26b" />
      </div>
      <DashboardTable
        data={teamStatusTableData}
        columns={ADMIN_DASHBOARD_TABLE_COLUMNS}
        pagination={false}
      />
    </Wrapper>
  );
}
