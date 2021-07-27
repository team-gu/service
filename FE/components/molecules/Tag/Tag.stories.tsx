import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tag from './Tag';

export default {
  title: 'Molecules/Tag',
  component: Tag,
} as Meta;

const Template: Story = ({ text }) => <Tag text={text} />;

export const tag = Template.bind({});

tag.args = {
  text: '테스트',
};
