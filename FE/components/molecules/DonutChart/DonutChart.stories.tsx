import React from 'react';
import { Story } from '@storybook/react';
import DonutChart from './DonutChart';

export default {
  title: 'Molecules/Donut Chart',
  component: DonutChart,
};

const Template: Story = () => <DonutChart />;

export const donutChart = Template.bind({});
