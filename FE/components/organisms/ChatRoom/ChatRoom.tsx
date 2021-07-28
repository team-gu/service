import { ReactElement, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { ChatInput, ChatBubble } from '@molecules';

interface ChatRoomProps {
  chatData: Array<{
    id: string;
    userName: string;
    profileSrc: string;
    // TODO: 추후 타입 정의
    time: any;
    message: string;
    isMe: boolean;
  }>;
  // TODO: 추후 타입 정의
  setChatData: any;
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
`;

export default function Chatroom({
  chatData,
  setChatData,
}: ChatRoomProps): ReactElement {
  const chatBoxRef: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatBoxRef.current.scrollTo({
      top: chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [chatData]);

  // TODO: DateTime.fromISO(time).toRelative()를 위해 1초마다 리렌더링이 일어나도록 강제.. 근데 좋은 코드인지는 모르겠음 추후 리펙토링
  useEffect(() => {
    const interval = setInterval(() => {
      setChatData([...chatData]);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <Wrapper>
      <div className="chat-container" ref={chatBoxRef}>
        {chatData?.map(({ id, userName, profileSrc, time, message, isMe }) => (
          <ChatBubble
            key={id}
            userName={userName}
            profileSrc={profileSrc}
            time={DateTime.fromISO(time).toRelative()}
            message={message}
            isMe={isMe}
          />
        ))}
      </div>
      {/* TODO: 채팅 로직 확정되면 반영 */}
      <ChatInput
        func={(data: string) =>
          setChatData([
            ...chatData,
            {
              id: `${chatData.length}`,
              userName: 'me',
              profileSrc: '/profile.png',
              time: DateTime.now().toString(),
              message: data,
              isMe: true,
            },
          ])
        }
      />
    </Wrapper>
  );
}
