import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';
import { Button, ReactTable } from '@molecules';
import { getTeamTableData, exportTeamData } from '@repository/adminRepository';
import { REGIONS } from '@utils/constants';
import { Project } from '@utils/type';
import { setLoading, useAppDispatch } from '@store';

import AdminTeamExportModal from './AdminTeamExportModal';

const Wrapper = styled.div`
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

    .manage-header-export {
      > button {
        padding: 0 15px;
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

    :hover {
      opacity: 1;
    }

    ${({
      selected,
      theme: {
        colors: { samsungLightBlue },
      },
    }) =>
      selected &&
      `
        background-color: ${samsungLightBlue};
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
  project: Project;
}

export default function AdminTeamManage({ project }: AdminTeamManageProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [teamData, setTeamData] = useState<TeamDataRow[]>([]);

  useEffect(() => {
    getTeamTableData({
      projectId: project.id,
      regionCode: selectedRegion,
    }).then(({ data: { data } }: { data: { data: TeamData[] } }) => {
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
            member8: row.members[6]?.name,
          };
        }),
      );
    });
  }, [project, selectedRegion]);

  const dispatch = useAppDispatch();

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

  const donwloadTeamExport = () => {
    dispatch(setLoading({ isLoading: true }));
    exportTeamData({
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
      .finally(() => {
        setShowExportModal(false);
        dispatch(setLoading({ isLoading: false }));
      });
  };

  return (
    <Wrapper>
      <div className="manage-header">
        <div>
          <Text text="팀 목록" fontSetting="n26b" />
        </div>

        <div className="manage-header-export">
          <Button
            title="Export"
            func={() => setShowExportModal(true)}
            width="auto"
          />
        </div>
      </div>
      <div className="region-btns">
        {REGIONS.map((r) => (
          <RegionButtonWrapper
            key={r.code}
            selected={selectedRegion === r.code}
          >
            <Button title={r.name} func={() => setSelectedRegion(r.code)} />
          </RegionButtonWrapper>
        ))}
      </div>
      <ReactTable
        data={teamData}
        columns={TEAM_TABLE_COLUMNS}
        pagination={false}
      />
      {showExportModal && (
        <AdminTeamExportModal
          projectName={project.name ? project.name : '현재 프로젝트'}
          handleClickClose={() => setShowExportModal(false)}
          handleClickDownload={() => donwloadTeamExport()}
        />
      )}
    </Wrapper>
  );
}

const TEAM_TABLE_COLUMNS = [
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
    Header: '지역',
    accessor: 'region',
    width: 70,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀 이름',
    accessor: 'teamName',
    width: 300,
    disableGroupBy: true,
  },
  {
    Header: '트랙',
    accessor: 'track',
    width: 120,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '인원 수',
    accessor: 'memberCnt',
    width: 80,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '완료 여부',
    accessor: 'completeYn',
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀장',
    accessor: 'member1',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀원1',
    accessor: 'member2',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀원2',
    accessor: 'member3',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀원3',
    accessor: 'member4',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀원4',
    accessor: 'member5',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀원5',
    accessor: 'member6',
    disableGroupBy: true,
    width: 100,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
];
