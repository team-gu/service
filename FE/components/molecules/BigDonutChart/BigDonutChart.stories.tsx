import React from 'react';
import { Story } from '@storybook/react';
import BigDonutChart from './BigDonutChart';

import { ENTIRE_TEAM_DATA } from '@utils/dummy';

export default {
  title: 'Molecules/Big Donut Chart',
  component: BigDonutChart,
};

const Template: Story = () => (
  <BigDonutChart data={ENTIRE_TEAM_DATA} title="제목" />
);

export const bigDonutChart = Template.bind({});
