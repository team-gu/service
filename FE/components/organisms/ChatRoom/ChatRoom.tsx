import { ReactElement, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Session } from 'openvidu-browser';

import { ChatInput, ChatBubble } from '@molecules';

import { postExitRoom } from '@repository/chatRepository';
import { Chat, ChatNormal } from '@types/chat-type';
import { useAuthState } from '@store';

interface ChatRoomProps {
  isRtc?: boolean;
  isConnectStomp?: boolean;
  session?: Session | undefined;
  messageList: Chat[] & ChatNormal[] & any;
  setMessageList: any; // TODO: 추후 타입 정의
  handleGetChatRoomMessages: any;
  setRoomId: any;
  handleClickSend: (msg: string) => Promise<void>;
  roomId?: number;
  opponentId?: number;
  unreadMessageCount?: number;
}

const Wrapper = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chat-container {
    padding: 10px;
    width: calc(100% - 20px);
    overflow-y: scroll;
    overflow-x: none;
  }
  .chat-input {
    padding: 0 10px;
    width: calc(100% - 20px);
  }

  ${({ disabled }) => disabled && 'pointer-events: none; opacity: 0.3;'}
`;

export default function ChatRoom({
  isRtc = false,
  isConnectStomp = false,
  session,
  messageList,
  setRoomId,
  setMessageList,
  handleGetChatRoomMessages,
  handleClickSend,
  roomId,
  opponentId,
  unreadMessageCount = 0,
}: ChatRoomProps): ReactElement {
  const {
    user: { id },
  } = useAuthState();

  const chatBoxRef: any = useRef<HTMLInputElement>(null);
  const [unreadPosition, setUnreadPosition]: any = useState<HTMLInputElement>();

  const handleScrollToEnd = () => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight,
    });
  };

  const handleScrollToUnread = () => {
    chatBoxRef.current.scrollTo({
      top: unreadPosition.offsetTop,
    });
  };

  const handleUnmount = async () => {
    if (!isRtc) {
      setMessageList([]);
      setRoomId(0);
    }

    try {
      await postExitRoom({ room_id: roomId, user_id: id });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (unreadPosition) {
      handleScrollToUnread();
    }
  }, [unreadPosition]);

  useEffect(() => {
    return () => handleUnmount();
  }, [roomId]);

  useEffect(() => {
    if (isRtc) {
      handleScrollToEnd();
    }

    const interval = setInterval(() => {
      setMessageList([...messageList]);
    }, 60000);

    return () => clearInterval(interval);
  }, [messageList]);

  useEffect(() => {
    if (isRtc) {
      const mySession = session;
      mySession?.on('signal:chat', handleScrollToEnd);
    }
  }, [session]);

  const sendMessage = async (msg: string) => {
    await handleClickSend(msg);
    handleScrollToEnd();
  };

  return (
    <Wrapper disabled={!isRtc && !isConnectStomp}>
      <div className="chat-container" ref={chatBoxRef}>
        {isRtc
          ? messageList?.map(
              (
                { nickname, profileSrc, createAt, message, connectionId }: Chat,
                index: number,
              ) => (
                <ChatBubble
                  key={index}
                  userName={nickname}
                  profileSrc={profileSrc ? profileSrc : '/profile.png'}
                  time={createAt}
                  message={message}
                  isMe={connectionId === session.connection.connectionId}
                />
              ),
            )
          : messageList?.map(
              (
                {
                  create_date_time,
                  message,
                  sender_id,
                  sender_name,
                  profile_image,
                  type,
                  chat_id,
                  team_id,
                }: ChatNormal,
                index: number,
              ) => (
                <ChatBubble
                  key={index}
                  userName={sender_name}
                  profileSrc={profile_image}
                  time={create_date_time}
                  message={message}
                  handleGetChatRoomMessages={handleGetChatRoomMessages}
                  isMe={sender_id === id}
                  func={sendMessage}
                  type={type}
                  roomId={roomId}
                  opponentId={opponentId}
                  chatId={chat_id}
                  teamId={team_id}
                  id={id}
                  ref={
                    index === messageList.length - unreadMessageCount - 1
                      ? setUnreadPosition
                      : null
                  }
                  handleScrollToUnread={handleScrollToUnread}
                />
              ),
            )}
      </div>
      <div className="chat-input">
        <ChatInput func={sendMessage} />
      </div>
    </Wrapper>
  );
}
