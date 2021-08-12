import { ReactElement, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

import { Text } from '@atoms';
import { BigDonutChart, DonutChart, DashboardTable } from '@molecules';

import {
  ADMIN_TEAM_DATA,
  ADMIN_TRACK_DATA,
  DUMMY_TABLE_COLUMNS,
  DUMMY_TABLE_DATA,
} from '@utils/dummy';

const BLUE = '#0088FE';
const RED = '#FF8042';

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

        .count-up-with-title {
          font-size: 82px;
          > span {
            display: block;
          }
          > div {
            text-align: center;
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

export default function AdminDashboard(): ReactElement {
  const [regionTeamData, setRegionTeamData] = useState<any[]>();
  const [trackTeamData, setTrackTeamData] = useState<any[]>([]);

  // init data
  useEffect(() => {
    const tmp = ADMIN_TEAM_DATA.map((d) => ({
      title: d.title,
      data: d.data.map((item) => ({
        ...item,
        color: item.name === '완성' ? BLUE : RED,
      })),
    }));
    setRegionTeamData(tmp);

    setTrackTeamData(ADMIN_TRACK_DATA);
  }, []);

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
                  <div key={idx} className="count-up-with-title">
                    <CountUp end={each.data} duration={4} useEasing />
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
