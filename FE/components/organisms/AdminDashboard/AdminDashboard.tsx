import { ReactElement, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

import { Text } from '@atoms';
import { BigDonutChart, DonutChart, DashboardTable } from '@molecules';
import { getChartData } from '@repository/adminRepository';

import {
  ADMIN_TEAM_DATA,
  ADMIN_TRACK_DATA,
  DUMMY_TABLE_COLUMNS,
  DUMMY_TABLE_DATA,
} from '@utils/dummy';
import { Project } from '@utils/type';

const COLOR_MAP = {
  COMPLETE: '#0088FE',
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
      margin-bottom: 20px;
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

        .count-up {
          > div {
            text-align: center;
          }

          .countup-ongoing {
            font-size: 52px;
            color: gainsboro;
            letter-spacing: -3px;
          }

          .countup-complete {
            font-size: 82px;
          }
        }
      }
    }
  }

  .team-status-table {
    margin-top: 30px;

    .table-header {
      margin-bottom: 20px;
    }
  }
`;

const TableWrapper = styled.div`
  margin-top: 50px;

  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    border-spacing: 0;
    border: 1px solid gainsboro;

    th {
      border-bottom: 1px solid black;
    }

    tr:hover {
      td {
        background-color: #fafafa !important;
      }
    }

    th,
    td {
      margin: 0;
      padding: 10px;
      border-bottom: 1px solid gainsboro;
      border-right: 1px solid gainsboro;
      vertical-align: middle;

      // Each cell should grow equally
      // width: 1%;
      // &.collapse {
      //   width: 0.0000000001%;
      // }
    }
  }
`;

interface AdminDashboardProps {
  projectId: number;
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
  projectId,
}: AdminDashboardProps): ReactElement {
  const [regionTeamData, setRegionTeamData] = useState<any[]>();
  const [trackTeamData, setTrackTeamData] = useState<any[]>([]);

  // init data
  // useEffect(() => {

  //   const tmp = ADMIN_TEAM_DATA.map((d) => ({
  //     title: d.title,
  //     data: d.data.map((item) => ({
  //       ...item,
  //       color: item.name === '완성' ? COLOR_MAP.COMPLETE : COLOR_MAP.NONE,
  //     })),
  //   }));
  //   console.log(tmp);
  //   setRegionTeamData(tmp);
  //   setTrackTeamData(ADMIN_TRACK_DATA);
  // }, []);

  useEffect(() => {
    if (projectId) {
      getChartData({ projectId }).then(({ data: { data } }: any) => {
        const regionData = data.region
          .sort((a: DashboardData, b: DashboardData) =>
            a.title === '전국' ? -1 : 1,
          )
          .map(({ title, data }: DashboardData) => ({
            title,
            data: [
              {
                name: '완성',
                value: data.after,
                color: COLOR_MAP.COMPLETE,
              },
              {
                name: '진행중',
                value: data.doing,
                color: COLOR_MAP.ONGOING,
              },
              {
                name: '미완성',
                value: data.before,
                color: COLOR_MAP.NONE,
              },
            ],
          }));
        const trackData = data.track.map(({ title, data }: DashboardData) => ({
          title,
          data: [
            { name: '완성', value: data.afterTeam },
            { name: '진행중', value: data.doingTeam },
          ],
        }));

        console.log(regionData);
        console.log(trackData);
        setRegionTeamData(regionData);
        setTrackTeamData(trackData);
      });
    }
  }, [projectId]);

  const tableData = useMemo(() => {
    // TODO: 팀 테이블 정보 서버에서 받기
    return DUMMY_TABLE_DATA;
  }, []);

  const tableColumns = useMemo(() => {
    // TODO: 팀 테이블 칼럼 정보 서버에서 받기?
    const data = DUMMY_TABLE_COLUMNS.map((col) => {
      if (col.accessor === 'region') {
        return {
          ...col,
        };
      } else {
        return col;
      }
    });
    return data;
  }, []);

  return (
    <Wrapper>
      <div className="team-status-chart">
        <div className="chart-header">
          <Text text="팀 구성 현황" fontSetting="n22m" />
        </div>
        <div className="chart-container">
          {regionTeamData && regionTeamData.length > 0 && (
            <>
              <div className="entire-chart">
                <BigDonutChart
                  data={regionTeamData[0].data}
                  title={regionTeamData[0].title}
                />
              </div>

              <div className="region-chart">
                {regionTeamData.slice(1).map((each: any, idx: number) => (
                  <DonutChart key={idx} data={each.data} title={each.title} />
                ))}
              </div>
            </>
          )}

          <div className="count-up-container">
            {trackTeamData && trackTeamData.length > 0 && (
              <>
                {trackTeamData.map((each: any, idx: number) => (
                  <div key={idx} className="count-up">
                    <CountUp
                      end={
                        each.data.find(({ name }: DataItem) => name === '완성')
                          .value
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
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="team-status-table">
          <TableWrapper>
            <DashboardTable data={tableData} columns={tableColumns} />
          </TableWrapper>
        </div>
      </div>
    </Wrapper>
  );
}
