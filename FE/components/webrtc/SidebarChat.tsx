import { CHAT_DUMMY_DATA } from '@utils/constants';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { ChatRoom } from '@organisms';

interface SidebarChatProps {
  isShow: boolean;
  children: ReactElement;
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
    padding-bottom: 20px;
  }
`;

export default function SidebarChat({
  isShow,
  children,
}: SidebarChatProps): ReactElement {
  const [chatData, setChatData] = useState(CHAT_DUMMY_DATA);

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
          <ChatRoom chatData={chatData} setChatData={setChatData} />
        </SidebarContent>
      )}
    </>
  );
}
