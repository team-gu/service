import React from 'react';
import { Story } from '@storybook/react';
import BigDonutChart from './BigDonutChart';

export default {
  title: 'Molecules/Big Donut Chart',
  component: BigDonutChart,
};

const Template: Story = () => <BigDonutChart />;

export const bigDonutChart = Template.bind({});
