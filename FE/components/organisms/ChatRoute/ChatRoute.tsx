import { ReactElement, useState, useRef } from 'react';
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
  max-height: 70%;

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

    div {
      cursor: default;
      user-select: none;
    }
  }

  div {
    ::-webkit-scrollbar {
      background-color: white;
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: white;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({
        theme: {
          colors: { gray },
        },
      }) => gray};
    }
  }
`;

const CHAT_LIST = 0;
const CHAT_ROOM = 1;

export default function ChatRoute(): ReactElement {
  const dispatch = useAppDispatch();
  const [room_id, setRoomId] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>('');

  const [route, setRoute] = useState(CHAT_LIST);

  const {
    handleSendMessage,
    handleSendRtcLink,
    messageList,
    setMessageList,
    isConnectStomp,
  } = useSockStomp({
    room_id,
  });

  const wrapperRef: any = useRef<HTMLInputElement>(null);

  // function handleClickOutside({ target }: ChangeEvent<HTMLInputElement>) {
  //   if (!wrapperRef.current?.contains(target)) {
  //     dispatch(setChatOpen({ isChatOpen: false }));
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () =>
  //     document.removeEventListener('click', handleClickOutside, true);
  // }, []);

  const handleToChatRoom = async (id: number, room_name: string) => {
    await setRoomId(id);
    setRoomName(room_name);
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
      ref={wrapperRef}
    >
      <div className="header">
        {route === CHAT_LIST ? (
          <Text text="채팅 목록" fontSetting="n16b" color="white" />
        ) : (
          <>
            <Icon
              iconName="arrow_back"
              color="white"
              func={() => setRoute(CHAT_LIST)}
            />
            <Text text={roomName} fontSetting="n16b" color="white" />
          </>
        )}
        <Icon
          iconName="close"
          color="white"
          func={() => dispatch(setChatOpen({ isChatOpen: false }))}
        />
      </div>
      {
        {
          [CHAT_LIST]: (
            <ChatList
              handleToChatRoom={handleToChatRoom}
              handleSendRtcLink={handleSendRtcLink}
            />
          ),
          [CHAT_ROOM]: (
            <ChatRoom
              isConnectStomp={isConnectStomp}
              messageList={messageList}
              setMessageList={setMessageList}
              handleClickSend={handleClickSend}
              roomId={room_id}
            />
          ),
        }[route]
      }
    </Wrapper>
  );
}
