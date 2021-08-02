import { ReactElement, useRef, useEffect, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Session } from 'openvidu-browser';

import { ChatInput, ChatBubble } from '@molecules';

import { Chat, ChatNormal } from '@types/chat-type';
import { useAuthState } from '@store';

interface ChatRoomProps {
  isRtc?: boolean;
  isConnectStomp?: boolean;
  session?: Session | undefined;
  messageList: Chat[] & ChatNormal[] & any;
  setMessageList: any; // TODO: 추후 타입 정의
  handleClickSend: (msg: string) => Promise<void>;
}

const Wrapper = styled.div<{ disabled: boolean }>`
  padding: 0 20px;
  width: calc(100% - 40px);
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chat-container {
    overflow-y: scroll;
    overflow-x: none;

    ::-webkit-scrollbar {
      background-color: white;
      width: 0;
    }
  }

  ${({ disabled }) => disabled && 'pointer-events: none; opacity: 0.3;'}
`;

export default function ChatRoom({
  isRtc = false,
  isConnectStomp = false,
  session,
  messageList,
  setMessageList,
  handleClickSend,
}: ChatRoomProps): ReactElement {
  const {
    user: { id },
  } = useAuthState();
  const chatBoxRef: any = useRef<HTMLInputElement>(null);

  const handleScrollToEnd = () => {
    chatBoxRef.current.scrollTo({
      top: chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScrollToEnd();
  }, []);

  // TODO: DateTime.fromISO(time).toRelative()를 위해 60초마다 리렌더링이 일어나도록 강제.. 근데 좋은 코드인지는 모르겠음 추후 리펙토링
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageList([...messageList]);
    }, 60000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (isRtc) {
      const mySession = session;
      mySession.on('signal:chat', handleScrollToEnd);
    }
  }, [session]);

  // type 때문에 억지로 Promise 반환
  const sendMessage = (msg: string) => {
    return handleClickSend(msg).then(handleScrollToEnd);
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
                  time={
                    DateTime.now().diff(createAt).toMillis() < 60000
                      ? 'just now'
                      : createAt.toRelative()
                  }
                  message={message}
                  isMe={connectionId === session.connection.connectionId}
                />
              ),
            )
          : messageList?.map(
              ({
                id: curId,
                userName,
                profileSrc,
                time,
                message,
              }: ChatNormal) => (
                <ChatBubble
                  key={id}
                  userName={userName}
                  profileSrc={profileSrc}
                  time={
                    Number(DateTime.now()) - Number(DateTime.fromISO(time)) <
                    60000
                      ? 'just now'
                      : DateTime.fromISO(time).toRelative()
                  }
                  message={message}
                  isMe={curId === id}
                  func={sendMessage}
                />
              ),
            )}
      </div>
      <ChatInput func={sendMessage} />
    </Wrapper>
  );
}
