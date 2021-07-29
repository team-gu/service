import React, { useState } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import ChatRoom from './ChatRoom';

export default {
  title: 'Molecules/Chat Room',
  component: ChatRoom,
} as Meta;

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
`;

const Template: Story = ({ data }) => {
  const [chatData, setChatData] = useState(data);

  return (
    <Wrapper>
      <ChatRoom chatData={chatData} setChatData={setChatData} />
    </Wrapper>
  );
};

export const chatRoom = Template.bind({});

chatRoom.args = {
  data: [
    {
      id: '0',
      userName: '김싸피',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: false,
    },
    {
      id: '1',
      userName: 'Me',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: true,
    },
    {
      id: '2',
      userName: '김싸피',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: false,
    },
    {
      id: '3',
      userName: '김싸피',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: false,
    },
    {
      id: '4',
      userName: '김싸피',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: false,
    },
    {
      id: '5',
      userName: 'Me',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: true,
    },
    {
      id: '6',
      userName: '김싸피',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message: 'asdfsd',
      isMe: false,
    },
    {
      id: '7',
      userName: '김싸피',
      profileSrc: '/profile.png',
      time: '2021-07-28T17:41:27.699+09:00',
      message:
        'asdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsd',
      isMe: false,
    },
  ],
};
