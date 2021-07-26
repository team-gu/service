import React from 'react';
import { Story } from '@storybook/react';
import FloatButton from './FloatButton';

export default {
  title: 'Molecules/Float Button',
  component: FloatButton,
};

const Template: Story = ({ func }) => (
  <FloatButton func={func} />
);

export const floatButton = Template.bind({});

floatButton.args = {
  func: () => console.log('클릭됨'),
};
