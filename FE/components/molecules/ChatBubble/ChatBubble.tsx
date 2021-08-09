import { ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { ProfileImage, ChatBubbleSelect } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleProps {
  profileSrc: string;
  userName: string;
  // TODO: 추후 타입 정의
  time: string | any;
  message: string;
  isMe?: boolean;
  // TODO: 추후 타입 정의
  func?: any;
  type?: string;
  roomId?: number;
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

      white-space: pre-wrap;

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
  // func,
  type,
  roomId,
}: ChatBubbleProps): ReactElement {
  const router = useRouter();
  return (
    <Wrapper isMe={isMe}>
      {!isMe && <ProfileImage src={profileSrc} />}
      <div className="chat">
        <div className="chat-info">
          {!isMe && <Text text={userName} fontSetting="n14b" />}
          <Text text={time} fontSetting="n12m" />
        </div>
        <div className="chat-message">
          {/* {message.includes('{%') && message.includes('%}') ? (
            {
              '{% request_none %}': isMe ? (
                <ChatBubbleSelect
                  userName={userName}
                  funcAccept={() => func('{% request_yes %}')}
                  funcDecline={() => func('{% request_no %}')}
                />
              ) : (
                <Text
                  text="상대방에게 초대를 보냈습니다 선택을 기다리고 있습니다"
                  fontSetting="n16m"
                  isLineBreak
                />
              ),
              '{% request_yes %}': isMe ? (
                <Text
                  text={`${userName} 팀의 초대를 수락했습니다`}
                  fontSetting="n16m"
                  isLineBreak
                />
              ) : (
                <Text
                  text="상대방이 팀 초대를 수락하였습니다"
                  fontSetting="n16m"
                  isLineBreak
                />
              ),
              '{% request_no %}': isMe ? (
                <Text
                  text={`${userName} 팀의 초대를 거절했습니다`}
                  fontSetting="n16m"
                  isLineBreak
                />
              ) : (
                <Text
                  text="상대방이 팀 초대를 거절했습니다"
                  fontSetting="n16m"
                  isLineBreak
                />
              ),
            }[message] */}
          {type && type !== 'NORMAL' ? (
            {
              ['RTC_INVITE']: (
                <ChatBubbleSelect
                  text={`화상전화 요청`}
                  funcAccept={() => router.push(`rtc/${roomId}`)}
                />
              ),
            }[type]
          ) : (
            <Text text={message} fontSetting="n16m" isLineBreak />
          )}
        </div>
      </div>
    </Wrapper>
  );
}
