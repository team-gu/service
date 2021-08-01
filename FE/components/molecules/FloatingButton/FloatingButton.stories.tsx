import React from 'react';
import { Story } from '@storybook/react';
import FloatingButton from './FloatingButton';

export default {
  title: 'Molecules/Floating Button',
  component: FloatingButton,
};

const Template: Story = ({ func }) => (
  <FloatingButton func={func} />
);

export const floatingButton = Template.bind({});

floatingButton.args = {
  func: () => console.log('클릭됨'),
};
