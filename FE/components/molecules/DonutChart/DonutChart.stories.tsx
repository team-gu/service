import React from 'react';
import { Story } from '@storybook/react';
import DonutChart from './DonutChart';

import { SEOUL_TEAM_DATA } from '@utils/dummy';

export default {
  title: 'Molecules/Donut Chart',
  component: DonutChart,
};

const Template: Story = () => <DonutChart data={SEOUL_TEAM_DATA}, title='제목'/>;

export const donutChart = Template.bind({});
