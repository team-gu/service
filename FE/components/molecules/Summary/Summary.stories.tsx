import React from 'react';
import { Story, Meta } from '@storybook/react';
import Summary from './Summary';

export default {
  title: 'Molecules/Summary',
  component: Summary,
} as Meta;

const Template: Story = ({ title, text }) => (
  <Summary title={title} text={text} />
);

export const summary = Template.bind({});

summary.args = {
  title: '자기소개',
  text: '테스트용 http://naver.com',
};
