import React from 'react';
import { Story } from '@storybook/react';
import TeamStatusBarChart from './TeamStatusBarChart';

export default {
  title: 'Molecules/Team Status Bar Chart',
  component: TeamStatusBarChart,
};

const Template: Story = () => (
  <TeamStatusBarChart
    data={data}
    width={700}
    height={300}
    color={{ 미소속: '#aaa', 진행중: '#bbb', 완료: '#ccc' }}
  />
);

export const teamStatusBarChart = Template.bind({});

const data = [
  {
    name: '서울',
    미소속: 3,
    진행중: 14,
    완료: 0,
  },
  {
    name: '대전',
    미소속: 10,
    진행중: 0,
    완료: 1,
  },
  {
    name: '구미',
    미소속: 9,
    진행중: 8,
    완료: 1,
  },
  {
    name: '광주',
    미소속: 5,
    진행중: 1,
    완료: 4,
  },
  {
    name: '부울경',
    미소속: 0,
    진행중: 0,
    완료: 0,
  },
];
