import React from 'react';
import { Story } from '@storybook/react';
import Notification from './Notification';

export default {
  title: 'Molecules/Notification',
  component: Notification,
};

const Template: Story = ({ alertNumber }) => (
  <Notification alertNumber={alertNumber} />
);

export const notification = Template.bind({});

notification.args = {
  alertNumber: 100,
};
