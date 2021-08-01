import React from 'react';
import { Story, Meta } from '@storybook/react';
import ChatRoute from './ChatRoute';

export default {
  title: 'Molecules/Chat Route',
  component: ChatRoute,
} as Meta;

const Template: Story = () => <ChatRoute />;

export const chatRoute = Template.bind({});

chatRoute.args = {};
