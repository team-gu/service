import React from 'react';
import { Story, Meta } from '@storybook/react';
import Title from './Title';

export default {
  title: 'Molecules/Title',
  component: Title,
} as Meta;

const Template: Story = ({ title }) => (
  <Title title={title}>
    <>
      <div>첫번째 컨텐츠입니다.</div>
      <div>두번째 컨텐츠입니다.</div>
    </>
  </Title>
);

export const title = Template.bind({});

title.args = {
  title: '제목입니다',
};
