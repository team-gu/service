import {
  ReactElement,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react';
import styled from 'styled-components';
import { Button } from '@molecules';
import { Input, Text } from '@atoms';

interface ChatInputProps {
  func: (data: string) => Promise<void>;
}

const Wrapper = styled.div`
  .container {
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
  }
  > div:last-child {
    float: right;
  }
`;

export default function ChatInput({ func }: ChatInputProps): ReactElement {
  const chatInputRef: any = useRef<HTMLInputElement>(null);
  const [messageLength, setMessageLength] = useState(0);

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
      <div className="container">
        <Input
          ref={chatInputRef}
          onKeyPress={({ key }: KeyboardEvent<HTMLDivElement>) =>
            key === 'Enter' && handleSend()
          }
          func={() => setMessageLength(chatInputRef.current?.value.length)}
          width="100%"
          height="35px"
          maxLength={120}
        />
        <Button title="전송" func={() => handleSend()} width="50px" />
      </div>
      <Text text={messageLength + ' / 120'} fontSetting="n12m" color="gray" />
    </Wrapper>
  );
}
