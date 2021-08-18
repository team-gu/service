import { ReactElement, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

import { Text } from '@atoms';
import { ReactTable, DashboardBarChart } from '@molecules';
import {
  getChartData,
  getProjectUserTableData,
} from '@repository/adminRepository';
import { Project } from '@utils/type';
import { setLoading, useAppDispatch } from '@store';

const COLOR_MAP = {
  COMPLETE: '#32CD32',
  NONE: '#FF8042',
  ONGOING: '#1E90FF',
};

const Wrapper = styled.div`
  i {
    cursor: pointer;
  }

  .team-status-chart {
    .chart-header {
      display: flex;
      align-items: center;
      margin: 20px 0;
      > div {
        margin-right: 10px;
      }
    }

    .chart-container {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 3fr;

      .entire-chart {
        grid-row: 1 / 3;
        display: flex;
        justify-content: center;
      }

      .region-chart {
        grid-row: 1 / 2;
        grid-column: 2 / 3;

        display: flex;
        align-items: center;
        justify-content: center;

        > div {
          display: inline-block;
        }
      }

      .count-up-container {
        grid-row: 2 / 3;
        grid-column: 2 / 3;

        display: flex;
        gap: 100px;
        align-items: center;
        justify-content: center;
        position: relative;

        .count-up {
          > div {
            text-align: center;
          }

          .countup-ongoing {
            font-size: 52px;
            color: #d4d4d4;
            letter-spacing: -3px;
          }

          .countup-complete {
            font-size: 82px;
          }

          .tooltiptext {
            visibility: hidden;
            width: 60px;
            background-color: ${({
              theme: {
                colors: { samsungBlue },
              },
            }) => samsungBlue};
            color: white;
            text-align: center;
            border-radius: 6px;
            padding: 5px;

            font-size: 12px;

            position: absolute;
            z-index: 1;
            bottom: 70%;
            margin-left: 75px;

            opacity: 0;
            transition: opacity 1s;

            ::after {
              content: '';
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: black transparent transparent transparent;
            }
          }

          :hover .tooltiptext {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }
`;

const TextAlignCenter = styled.div`
  text-align: center;
`;

const TableWrapper = styled.div`
  margin-top: 30px;
`;

interface AdminDashboardProps {
  project: Project;
}

interface DashboardData {
  title: string;
  data: any;
}

interface DataItem {
  name: string;
  value: any;
}

export default function AdminDashboard({
  project,
}: AdminDashboardProps): ReactElement {
  const dispatch = useAppDispatch();
  const [regionTeamData, setRegionTeamData] = useState<any[]>();
  const [trackTeamData, setTrackTeamData] = useState<any[]>([]);
  const [teamStatusTableData, setTeamStatusTableData] = useState<any[]>([]);
  const [loadingRegionTeamData, setLoadingRegionTeamData] = useState(false);

  useEffect(() => {
    if (project) {
      getChartData({ projectId: project.id }).then(({ data: { data } }) => {
        const regionData = data.region
          .sort((a: DashboardData, b: DashboardData) =>
            a.title === '전국' ? -1 : 1,
          )
          .map(({ title, data }: DashboardData) => ({
            name: title,
            미소속: data.before,
            진행중: data.doing,
            완료: data.after,
          }));
        const trackData = data.track.map(({ title, data }: DashboardData) => ({
          title,
          data: [
            { name: '완료', value: data.afterTeam },
            { name: '진행중', value: data.doingTeam },
          ],
        }));

        setRegionTeamData(regionData);
        setTrackTeamData(trackData);
      });

      getProjectUserTableData({ projectId: project.id }).then(
        ({ data: { data } }) => {
          setTeamStatusTableData(data);
        },
      );
    }
  }, [project]);

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    setLoadingRegionTeamData(true);
    setTimeout(() => {
      setLoadingRegionTeamData(false);
      dispatch(setLoading({ isLoading: false }));
    }, 500);
  }, [regionTeamData]);

  return (
    <Wrapper>
      <div className="team-status-chart">
        <div className="chart-header">
          <Text text="팀 구성 현황" fontSetting="n26b" />
        </div>
        <div className="chart-container">
          {!loadingRegionTeamData &&
            regionTeamData &&
            regionTeamData.length > 0 && (
              <>
                <div className="entire-chart">
                  <DashboardBarChart
                    data={regionTeamData.slice(0, 1)}
                    width={300}
                    height={500}
                    color={{
                      미소속: COLOR_MAP.NONE,
                      진행중: COLOR_MAP.ONGOING,
                      완료: COLOR_MAP.COMPLETE,
                    }}
                    legend={false}
                  />
                </div>

                <div className="region-chart">
                  <DashboardBarChart
                    data={regionTeamData.slice(1)}
                    width={800}
                    height={300}
                    color={{
                      미소속: COLOR_MAP.NONE,
                      진행중: COLOR_MAP.ONGOING,
                      완료: COLOR_MAP.COMPLETE,
                    }}
                  />
                </div>
              </>
            )}

          <div className="count-up-container">
            {!loadingRegionTeamData &&
              trackTeamData &&
              trackTeamData.length > 0 && (
                <>
                  {trackTeamData.map((each: any, idx: number) => (
                    <div key={idx} className="count-up">
                      <CountUp
                        end={
                          each.data.find(
                            ({ name }: DataItem) => name === '완료',
                          ).value
                        }
                        duration={4}
                        useEasing
                        className="countup-complete"
                      />
                      <span className="countup-ongoing">
                        {' + '}
                        <CountUp
                          end={
                            each.data.find(
                              ({ name }: DataItem) => name === '진행중',
                            ).value
                          }
                          duration={4}
                          useEasing
                        />
                      </span>

                      <Text text={each.title} fontSetting="n16m" />
                      <span className="tooltiptext">진행중</span>
                    </div>
                  ))}
                </>
              )}
          </div>
        </div>
        <TableWrapper>
          <ReactTable
            data={teamStatusTableData}
            columns={ADMIN_USER_TABLE_COLUMNS}
          />
        </TableWrapper>
      </div>
    </Wrapper>
  );
}

const ADMIN_USER_TABLE_COLUMNS = [
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
    Header: '지역',
    accessor: 'region',
    width: 70,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
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
    Header: '팀 유무',
    accessor: 'teamYn',
    width: 80,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '팀 번호',
    accessor: 'teamId',
    width: 120,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '리더 여부',
    accessor: 'leaderYn',
    width: 120,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '전공 여부',
    accessor: 'major',
    width: 120,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
  {
    Header: '희망 포지션',
    accessor: 'position',
    width: 180,
    Cell: (content: any) => (
      <div style={{ textAlign: 'center' }}>{content.value}</div>
    ),
  },
];
