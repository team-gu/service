import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';
import { Button, ReactTable } from '@molecules';
import { getTeamTableData } from '@repository/adminRepository';
import { REGIONS, TEAM_TABLE_COLUMNS } from '@utils/constants';

const Wrapper = styled.div`
  .manage-header {
    margin: 20px 0;
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

interface TeamData {
  completeYn: string;
  leaderId: number;
  memberCnt: number;
  members: { userId: number; name: string; role: string }[];
  region: string;
  teamId: number;
  teamName: string;
  track: string;
}

interface TeamDataRow extends TeamData {
  member1: string | undefined | null;
  member2: string | undefined | null;
  member3: string | undefined | null;
  member4: string | undefined | null;
  member5: string | undefined | null;
  member6: string | undefined | null;
  member7: string | undefined | null;
}

interface AdminTeamManageProps {
  projectId: number;
}

export default function AdminTeamManage({ projectId }: AdminTeamManageProps) {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [teamData, setTeamData] = useState<TeamDataRow[]>([]);

  useEffect(() => {
    getTeamTableData({
      projectId,
      regoinCode: selectedRegion,
    }).then(({ data: { data } }: { data: { data: TeamData[] } }) => {
      console.log(data);

      setTeamData(
        data.map((row) => {
          const leaderIdx = row.members
            .map((m) => m.userId)
            .indexOf(row.leaderId);
          const leaderName =
            leaderIdx > -1 ? row.members[leaderIdx].name : 'No leader';

          leaderIdx > -1 && row.members.splice(leaderIdx, 1);

          return {
            ...row,
            member1: leaderName,
            member2: row.members[0]?.name,
            member3: row.members[1]?.name,
            member4: row.members[2]?.name,
            member5: row.members[3]?.name,
            member6: row.members[4]?.name,
            member7: row.members[5]?.name,
          };
        }),
      );
    });
  }, [projectId, selectedRegion]);

  return (
    <Wrapper>
      <div className="manage-header">
        <Text text="팀 목록" fontSetting="n26b" />
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
        data={teamData}
        columns={TEAM_TABLE_COLUMNS}
        grouping
        pagination={false}
        fullWidth={false}
      />
    </Wrapper>
  );
}
