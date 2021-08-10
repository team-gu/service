import { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import BigDonutChart from './BigDonutChart';

import { ADMIN_TEAM_DATA } from '@utils/dummy';

const BLUE = '#0088FE';
const RED = '#FF8042';

export default {
  title: 'Molecules/Big Donut Chart',
  component: BigDonutChart,
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
    setRegionTeamData(tmp);
  }, []);
  return (
    <>
      {regionTeamData && regionTeamData.length > 0 && (
        <BigDonutChart
          data={regionTeamData[0].data}
          title={regionTeamData[0].title}
        />
      )}
    </>
  );
};

export const bigDonutChart = Template.bind({});
