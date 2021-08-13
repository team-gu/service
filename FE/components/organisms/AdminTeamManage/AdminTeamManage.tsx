import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';

const Wrapper = styled.div`
  .manage-header {
    margin: 20px 0;
  }
`;

interface AdminTeamManageProps {
  projectId: number;
}

export default function AdminTeamManage({ projectId }: AdminTeamManageProps) {
  
  return (
    <Wrapper>
      <div className="manage-header">
        <Text text="팀 목록" fontSetting="n26b" />
      </div>
    </Wrapper>
  );
}
