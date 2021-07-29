import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Icon } from '@atoms';

interface FloatChatBtnProps {
  handleClick: MouseEventHandler<HTMLSpanElement>;
}

const ChatBtnBackground = styled.div`
  position: fixed;
  bottom: 50px;
  right: 30px;

  width: 50px;
  height: 50px;
  border-radius: 60px;

  text-align: center;

  background-color: darkgray;
  opacity: 0.4;

  cursor: pointer;
`;

const ChatBtnContainer = styled(motion.div)`
  ${({ theme: { flexRow } }) => flexRow()}

  position: fixed;
  bottom: 50px;
  right: 30px;

  width: 50px;
  height: 50px;
  border-radius: 60px;

  opacity: 1;
  :hover {
    opacity: 0.75;
  }

  i {
    cursor: pointer;
  }
`;

export default function FloatingChatButton({
  handleClick,
}: FloatChatBtnProps): ReactElement {
  return (
    <span onClick={handleClick}>
      <ChatBtnBackground />
      <ChatBtnContainer whileTap={{ rotate: 90, scale: 0.9 }}>
        <Icon iconName="message" />
      </ChatBtnContainer>
    </span>
  );
}
