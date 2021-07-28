import { ReactElement } from 'react';
import styled from 'styled-components';
import { ProfileImage } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleProps {
  profileSrc: string;
  userName: string;
  time: string;
  message: string;
  isMe?: boolean;
}

const Wrapper = styled.div<{ isMe: boolean }>`
  display: flex;
  ${({ theme: { flexRow }, isMe }) =>
    flexRow(isMe ? 'flex-end' : 'flex-start', 'flex-start')}

  margin: 25px 0;

  > div {
    margin-right: 15px;
  }

  .chat {
    ${({ theme: { flexCol } }) => flexCol('center', 'flex-start')};

    .chat-info {
      > div {
        display: inline;

        :nth-child(1) {
          margin-right: 10px;
        }
      }

      padding-bottom: 5px;
    }

    .chat-message {
      min-height: 20px;
      line-height: 1.1;

      padding: 8px 16px 8px 16px;
      border-radius: 0px 16px 16px 16px;

      background-color: ${({
        theme: {
          colors: { microBlue },
        },
      }) => microBlue};
    }
  }
`;

export default function ChatBubble({
  profileSrc,
  userName,
  time,
  message,
  isMe = false,
}: ChatBubbleProps): ReactElement {
  return (
    <Wrapper isMe={isMe}>
      {!isMe && <ProfileImage src={profileSrc} />}
      <div className="chat">
        <div className="chat-info">
          <Text text={userName} fontSetting="n14b" />
          <Text text={time} fontSetting="n12m" />
        </div>
        <div className="chat-message">
          <Text text={message} fontSetting="n16m" isLineBreak />
        </div>
      </div>
    </Wrapper>
  );
}
