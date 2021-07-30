import { ReactElement } from 'react';
import styled from 'styled-components';

import { ProfileImage, ChatBubbleSelect } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleProps {
  profileSrc: string;
  userName: string;
  // TODO: 추후 타입 정의
  time: string | any;
  message: string;
  isMe?: boolean;
}

const Wrapper = styled.div<{ isMe: boolean }>`
  display: flex;
  ${({ theme: { flexRow }, isMe }) =>
    flexRow(isMe ? 'flex-end' : 'flex-start', isMe ? 'flex-end' : 'flex-start')}

  margin: 25px 0;

  > div {
    ${({ isMe }) => !isMe && 'margin-right: 15px;'}
  }

  .chat {
    ${({ theme: { flexRow, flexCol }, isMe }) =>
      isMe ? flexRow('flex-end', 'flex-end') : flexCol('center', 'flex-start')};

    .chat-info {
      > div {
        display: inline;

        :nth-child(1) {
          margin-right: 10px;
        }
      }
      padding-bottom: 5px;

      ${({ isMe }) => isMe && 'text-align: end;'}
    }

    .chat-message {
      max-width: 200px;
      min-height: 20px;
      line-height: 1.1;

      padding: 8px 16px 8px 16px;
      border-radius: ${({ isMe }) =>
        isMe ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};

      background-color: ${({
        theme: {
          colors: { microBlue, lightBlue },
        },
        isMe,
      }) => (isMe ? lightBlue : microBlue)};
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
          {!isMe && <Text text={userName} fontSetting="n14b" />}
          <Text text={time} fontSetting="n12m" />
        </div>
        <div className="chat-message">
          {/* TODO: funcAccept, funcDecline 정의 */}
          {!isMe && message === 'request' ? (
            <ChatBubbleSelect funcAccept={() => {}} funcDecline={() => {}} />
          ) : (
            <Text text={message} fontSetting="n16m" isLineBreak />
          )}
        </div>
      </div>
    </Wrapper>
  );
}
