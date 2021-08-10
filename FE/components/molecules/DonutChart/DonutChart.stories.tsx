import { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import DonutChart from './DonutChart';

import { ADMIN_TEAM_DATA } from '@utils/dummy';

const BLUE = '#0088FE';
const RED = '#FF8042';

export default {
  title: 'Molecules/Donut Chart',
  component: DonutChart,
};

const Template: Story = () => {
  const [regionTeamData, setRegionTeamData] = useState<any[]>();
  // init data
  useEffect(() => {
    const tmp = ADMIN_TEAM_DATA.map((d) => ({
      title: d.title,
      data: d.data.map((item) => ({
        ...item,
        color: item.name === '팀 완성' ? BLUE : RED,
      })),
    }));
    console.log(tmp);
    setRegionTeamData(tmp);
  }, []);

  return (
    <>
      {regionTeamData && regionTeamData.length > 0 && (
        <DonutChart
          data={regionTeamData[1].data}
          title={regionTeamData[1].title}
        />
      )}
    </>
  );
};

export const donutChart = Template.bind({});
