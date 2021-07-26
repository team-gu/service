import React from 'react';
import { Story } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Molecules/Button',
  component: Button,
};

const Template: Story = ({ title, func }) => (
  <Button title={title} func={func} />
);

export const button = Template.bind({});

button.args = {
	title: "버튼",
  func: () => console.log('클릭됨'),
};
