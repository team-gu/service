import React, { useState } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import ChatRoom from './ChatRoom';
import { CHAT_DUMMY_DATA } from '@utils/constants';

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
  data: CHAT_DUMMY_DATA,
};
