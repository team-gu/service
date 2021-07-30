import { ReactElement, useRef, useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Button } from '@molecules';
import { Input } from '@atoms';

interface ChatInputProps {
  func: (data: string) => Promise<void>;
}

const Wrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow()}
  > div > input {
    position: absolute;
    top: -2px;

    width: calc(100% - 15px);
    height: 37px;

    z-index: 0;

    padding: 0 10px;

    border-right-color: transparent;
    border-radius: 10px;

    ${({
      theme: {
        font: { n16r },
      },
    }) => n16r}
  }
  > button {
    z-index: 1;
    box-shadow: none;
    border-radius: 0 10px 10px 0;
  }
`;

export default function ChatInput({ func }: ChatInputProps): ReactElement {
  const chatInputRef: any = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (chatInputRef.current.value === '') return;
    await func(chatInputRef.current.value);
    chatInputRef.current.value = '';
  };

  useEffect(() => {
    chatInputRef.current.focus();
  }, []);

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
