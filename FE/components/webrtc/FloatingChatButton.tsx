import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { FloatingButton } from '@molecules';

interface FloatingChatButtonProps {
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

export default function FloatingChatButton({
  handleClick,
}: FloatingChatButtonProps): ReactElement {
  return (
    <span onClick={handleClick}>
      <ChatBtnBackground />
      <FloatingButton isRtc />
    </span>
  );
}
