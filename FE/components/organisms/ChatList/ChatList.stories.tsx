import React from 'react';
import { Story, Meta } from '@storybook/react';
import ChatList from './ChatList';

export default {
  title: 'Molecules/Chat List',
  component: ChatList,
} as Meta;

const Template: Story = () => <ChatList func={() => {}} />;

export const chatList = Template.bind({});

chatList.args = {
  func: () => console.log('??'),
};
