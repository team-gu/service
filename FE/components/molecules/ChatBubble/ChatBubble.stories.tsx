import React from 'react';
import { Story } from '@storybook/react';
import ChatBubble from './ChatBubble';

export default {
  title: 'Molecules/Chat Bubble',
  component: ChatBubble,
};

const Template: Story = ({ profileSrc, userName, time, message, isMe }) => (
  <ChatBubble
    profileSrc={profileSrc}
    userName={userName}
    time={time}
    message={message}
    isMe={isMe}
  />
);

export const chatBubble = Template.bind({});

chatBubble.args = {
  name: '김싸피',
  profileSrc: '/profile.png',
  userName: '김싸피',
  time: '11:20 PM',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  isMe: false,
};
