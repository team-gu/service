import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppDispatch, setChatOpen } from '@store';
import { ChatList, ChatRoom } from '@organisms';
import { Text, Icon } from '@atoms';
import { CHAT_DUMMY_DATA } from '@utils/constants';

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
  const [route, setRoute] = useState(CHAT_LIST);
  const [chatData, setChatData] = useState(CHAT_DUMMY_DATA);

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
          [CHAT_LIST]: <ChatList func={() => setRoute(CHAT_ROOM)} />,
          [CHAT_ROOM]: (
            <ChatRoom chatData={chatData} setChatData={setChatData} />
          ),
        }[route]
      }
    </Wrapper>
  );
}
