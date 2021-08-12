import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';
import { BigDonutChart, DonutChart } from '@molecules';
import CountUp from 'react-countup';

import { ADMIN_TEAM_DATA, ADMIN_TRACK_DATA } from '@utils/dummy';

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
      grid-template-columns: auto 1fr;

      .entire-chart {
        grid-row: 1 / 3;
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
    display: flex;
    margin-top: 30px;

    .table-container {
      flex: 1;

      .table-header {
        margin-bottom: 20px;
      }

      .table-region-container {
        flex 1;
      }

      .table-track-container {
        flex: 1;
      }
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

  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedTrack, setSelectedTrack] = useState();

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
          <div className="table-container">
            <div className="table-header">
              <Text text="지역에 대한 팀 구성 현황표" fontSetting="n22m" />
            </div>
            <div className="table-region-container">팀 구성 현황 테이블 1</div>
          </div>
          <div className="table-container">
            <div className="table-header">
              <Text text="트랙에 대한 팀 구성 현황표" fontSetting="n22m" />
            </div>
            <div className="table-region-container">팀 구성 현황 테이블 2</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
