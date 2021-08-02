import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useAppDispatch, setChatOpen } from '@store';
import useSockStomp from '@hooks/useSockStomp';

import { ChatList, ChatRoom } from '@organisms';
import { Text, Icon } from '@atoms';


const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;

  width: 400px;
  height: 600px;

  border-radius: 10px;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.15);

  background-color: white;

  z-index: 2;

  .header {
    ${({ theme: { flexRow } }) => flexRow('space-between')}

    padding: 0 20px;

    width: calc(100% - 40px);
    height: 40px;
    background-color: ${({
      theme: {
        colors: { daangn },
      },
    }) => daangn};

    border-radius: 10px 10px 0px 0px;

    i {
      cursor: pointer;
    }
  }
`;

const CHAT_LIST = 0;
const CHAT_ROOM = 1;

export default function ChatRoute(): ReactElement {
  const dispatch = useAppDispatch();
  const [room_id, setRoomId] = useState(0);
  const [route, setRoute] = useState(CHAT_LIST);

  const { handleSendMessage, messageList, setMessageList, isConnectStomp } =
    useSockStomp({
      room_id,
    });

  const handleToChatRoom = async (id: number) => {
    await setRoomId(id);
    setRoute(CHAT_ROOM);
  };

  const handleClickSend = async (msg: string) => {
    await handleSendMessage(msg);
  };

  return (
    <Wrapper
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <div className="header">
        <Text text="채팅 목록" fontSetting="n16b" color="white" />
        <Icon
          iconName="close"
          color="white"
          func={() => dispatch(setChatOpen({ isChatOpen: false }))}
        />
      </div>
      {
        {
          [CHAT_LIST]: <ChatList func={handleToChatRoom} />,
          [CHAT_ROOM]: (
            <ChatRoom
              isConnectStomp={isConnectStomp}
              messageList={messageList}
              setMessageList={setMessageList}
              handleClickSend={handleClickSend}
            />
          ),
        }[route]
      }
    </Wrapper>
  );
}
