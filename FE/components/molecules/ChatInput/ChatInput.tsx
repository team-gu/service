import { ReactElement, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Button } from '@molecules';
import { Input } from '@atoms';

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
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  > button {
    z-index: 1;
  }
`;

export default function ChatInput({ func }: ChatInputProps): ReactElement {
  const chatInputRef: any = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <Input
        ref={chatInputRef}
        onKeyDown={({ key }: KeyboardEvent<HTMLDivElement>) =>
          key === 'Enter' && func(chatInputRef.current.value)
        }
        width="100%"
        height="35px"
      />
      <Button
        title="전송"
        func={() => {
          func(chatInputRef.current.value);
        }}
        width="50px"
      />
    </Wrapper>
  );
}
