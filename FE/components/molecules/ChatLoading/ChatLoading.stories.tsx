import React from 'react';
import { Story } from '@storybook/react';
import ChatLoading from './ChatLoading';

export default {
  title: 'Molecules/Chat Loading',
  component: ChatLoading,
};

const Template: Story = () => <ChatLoading />;

export const chatLoading = Template.bind({});

chatLoading.args = {};
