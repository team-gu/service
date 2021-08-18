import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Session, SignalEvent } from 'openvidu-browser';

import { useAuthState } from '@store';
import { ChatRoom } from '@organisms';
import { Chat } from '@types/chat-type';

interface SidebarChatProps {
  isShow: boolean;
  children: ReactElement;
  session: Session;
}

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  min-height: 80vh;
  align-items: center;

  .right-sidebar-space {
    transition: width 0.3s;
    width: 0;

    &.open {
      width: 420px;
    }

    .sidebar {
      transition: transform 0.3s;
      width: 420px;
    }
  }
`;

const SidebarContent = styled.div`
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 400px;

  border-radius: 10px;
  box-shadow: 0 12px 20px 0 rgb(0 0 0 / 15%);
  background-color: white;
  z-index: 2;

  > div {
    height: calc(100vh - 180px);
    padding-bottom: 10px;
  }
`;

export default function SidebarChat({
  isShow,
  session,
  children,
}: SidebarChatProps): ReactElement {
  const { user: { name } } = useAuthState();
  const [messageList, setMessageList] = useState<Chat[]>([]);

  useEffect(() => {
    if (!session) return;

    let mySession = session;

    mySession.on('signal:chat', (event: SignalEvent) => {
      if (!event.data) return;

      console.log(mySession);
      console.log(event);

      const data = JSON.parse(event.data);
      messageList.push({
        nickname: data.nickname,
        message: data.message,
        profileSrc: '',
        createAt: DateTime.now(),
        connectionId: event.from?.connectionId,
      });

      setMessageList([...messageList]);
    });
  }, [session]);

  // type을 맞추기 위해 억지로 Promise를 만듦
  const handleClickSend = (msg: string) => {
    return new Promise<void>((resolve, reject) => {
      const mySession = session;
      const payload = {
        isMe: true,
        message: msg,
        nickname: name ? name : 'unknown',
      };

      mySession.signal({
        data: JSON.stringify(payload),
        type: 'chat',
      });

      resolve();
    });
  };

  return (
    <>
      <Wrapper>
        {children}

        <div className={'right-sidebar-space' + (isShow ? ' open' : ' closed')}>
          <div className={'sidebar' + (isShow ? ' open' : ' closed')}></div>
        </div>
      </Wrapper>

      {isShow && (
        <SidebarContent>
          <ChatRoom
            isRtc
            messageList={messageList}
            setMessageList={setMessageList}
            session={session}
            handleClickSend={handleClickSend}
          />
        </SidebarContent>
      )}
    </>
  );
}
