import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Icon } from '@atoms';

interface FloatChatBtnProps {
  handleClick: MouseEventHandler<HTMLSpanElement>;
}

const ChatBtnBackground = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;

  width: 60px;
  height: 60px;
  border-radius: 60px;

  text-align: center;

  background-color: darkgray;
  opacity: 0.4;

  cursor: pointer;
`;

const ChatBtnContainer = styled(motion.div)`
  ${({ theme: { flexRow } }) => flexRow()}

  position: fixed;
  top: 30px;
  right: 30px;

  width: 60px;
  height: 60px;
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
