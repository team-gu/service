import {
  ReactElement,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react';
import styled from 'styled-components';
import { Button } from '@molecules';
import { Textarea, Text } from '@atoms';

interface ChatInputProps {
  func: (data: string) => Promise<void>;
}

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol()}

  .container {
    ${({ theme: { flexCol } }) => flexCol()}

    width: 100%;
    height: 100%;

    border-radius: 5px;
    border: 1px solid black;

    > textarea {
      width: calc(100% - 15px);

      z-index: 0;

      padding: 5px 5px;

      resize: none;
      border: none;
      outline: 0px none transparent;

      ${({
        theme: {
          font: { n12m },
        },
      }) => n12m}
    }
  }
  .bottom {
    position: relative;

    height: 20px;
    width: 100%;

    > div:first-child {
      position: absolute;
      right: 50px;
      bottom: 5px;
    }
    > button {
      position: absolute;
      right: 5px;
      bottom: 5px;

      height: 20px;

      > div {
        ${({
          theme: {
            font: { n10m },
          },
        }) => n10m}
      }

      z-index: 1;
      box-shadow: none;
      border-radius: 5px;
    }
  }
`;

export default function ChatInput({ func }: ChatInputProps): ReactElement {
  const chatInputRef: any = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>('');

  const handleSend = async () => {
    if (chatInputRef.current.value === '') return;
    await func(chatInputRef.current.value);
    chatInputRef.current.value = '';
  };

  useEffect(() => {
    chatInputRef.current.focus();
  }, []);

  console.log(message);
  return (
    <Wrapper>
      <div className="container">
        <Textarea
          ref={chatInputRef}
          onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
            if (e.key == 'Enter' && e.shiftKey) {
              // TODO: \n을 넣으면 될거라고 생각했는데 안됨
            }
          }}
          onChange={({ target: { value } }: KeyboardEvent<HTMLDivElement>) =>
            setMessage(value)
          }
          maxLength={119}
          resize="none"
        />
        <div className="bottom">
          <Text
            text={message.length + ' / 120'}
            fontSetting="n12m"
            color="gray"
          />
          <Button title="전송" func={() => handleSend()} width="40px" />
        </div>
      </div>
    </Wrapper>
  );
}
