import { ReactElement, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Button } from '@molecules';
import { Input } from '@atoms';
import { chatInput } from './ChatInput.stories';

interface ChatInputProps {
  // TODO: 타입 추후 정의
  func: any;
}

const Wrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow()}
  > div > input {
    border-right-color: transparent;
    position: absolute;
    top: -2px;
    width: calc(100% - 20px);
    height: 100%;
    z-index: 0;

    padding: 0 10px;

    ${({
      theme: {
        font: { n16r },
      },
    }) => n16r}
  }
  > button {
    z-index: 1;
  }
`;

export default function ChatInput({ func }: ChatInputProps): ReactElement {
  const chatInputRef: any = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (chatInputRef.current.value === '') return;
    await func(chatInputRef.current.value);
    chatInputRef.current.value = '';
  };

  return (
    <Wrapper>
      <Input
        ref={chatInputRef}
        onKeyPress={({ key }: KeyboardEvent<HTMLDivElement>) =>
          key === 'Enter' && handleSend()
        }
        width="100%"
        height="35px"
      />
      <Button title="전송" func={() => handleSend()} width="50px" />
    </Wrapper>
  );
}
