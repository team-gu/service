import { ReactElement, forwardRef, useEffect } from 'react';
import { DateTime } from 'luxon';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import useConfetti from '@hooks/useConfetti';
import { MODALS } from '@utils/constants';
import { useAppDispatch, displayModal } from '@store';
import {
  postTeamInviteAccept,
  postTeamInviteReject,
} from '@repository/chatRepository';
import { ProfileImage, ChatBubbleSelect, ChatLoading } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleProps {
  profileSrc: string;
  userName: string;
  // TODO: 추후 타입 정의
  time: string | any;
  message: string;
  handleGetChatRoomMessages?: any;
  isMe?: boolean;
  // TODO: 추후 타입 정의
  func?: any;
  type?: string;
  roomId?: number;
  opponentId?: number;
  chatId?: number;
  teamId?: number;
  id?: number;
}

const Wrapper = styled.div<{ isMe: boolean }>`
  display: flex;
  ${({ theme: { flexRow }, isMe }) =>
    flexRow(isMe ? 'flex-end' : 'flex-start', isMe ? 'flex-end' : 'flex-start')}

  :not(:last-child) {
    margin-bottom: 25px;
  }

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

const ChatBubble = forwardRef<HTMLInputElement, ChatBubbleProps>(
  (
    {
      profileSrc,
      userName = '',
      time,
      message = '',
      handleGetChatRoomMessages,
      isMe = false,
      // func,
      type = 'NORMAL',
      roomId = 0,
      opponentId = 0,
      chatId = 0,
      teamId = 0,
      id = 0,
    }: ChatBubbleProps,
    ref,
  ): ReactElement => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { popEmoji } = useConfetti();

    useEffect(() => {
      if (
        type === 'TEAM_INVITE_ACCEPTED' &&
        DateTime.now().diff(time).toMillis() < 20000
      ) {
        popEmoji();
      }
    }, [type]);

    return (
      <Wrapper isMe={isMe} ref={ref}>
        {!isMe && <ProfileImage src={profileSrc} />}
        <div className="chat">
          <div className="chat-info">
            {!isMe && <Text text={userName} fontSetting="n14b" />}
            <Text
              text={
                DateTime.now().diff(DateTime.fromISO(time)).toMillis() < 60000
                  ? '지금 막'
                  : DateTime.fromISO(time).setLocale('ko').toRelative()
              }
              fontSetting="n10m"
            />
          </div>
          <div className="chat-message">
            {type !== null && type !== 'NORMAL' ? (
              {
                RTC_INVITE: (
                  <ChatBubbleSelect
                    text="화상전화 요청"
                    funcAccept={() => router.push(`rtc/${roomId}`)}
                  />
                ),
                TEAM_INVITE_WAITING: isMe ? (
                  <Text
                    text={'상대방이 팀원 초대를 기다리고 있습니다.'}
                    fontSetting="n16m"
                    isLineBreak
                  />
                ) : opponentId !== 0 && id !== 0 && chatId !== 0 ? (
                  <ChatBubbleSelect
                    text="팀원초대 요청"
                    funcAccept={async () => {
                      try {
                        await postTeamInviteAccept({
                          invitee_id: id,
                          leader_id: opponentId,
                          message_id: chatId,
                          team_id: teamId,
                        });
                        handleGetChatRoomMessages();
                        popEmoji();
                      } catch ({ response: { status } }) {
                        if (status === 400) {
                          dispatch(
                            displayModal({
                              modalName: MODALS.ALERT_MODAL,
                              content: '거부된 초대메세지 입니다.',
                            }),
                          );
                        }
                      }
                    }}
                    funcDecline={async () => {
                      await postTeamInviteReject({
                        invitee_id: id,
                        leader_id: opponentId,
                        message_id: chatId,
                        team_id: teamId,
                      });
                      handleGetChatRoomMessages();
                    }}
                    isTeamInvite
                  />
                ) : (
                  <ChatLoading />
                ),
                TEAM_INVITE_ACCEPTED: (
                  <Text
                    text={
                      isMe
                        ? '상대방이 팀원 초대를 수락했습니다!'
                        : '팀 초대를 수락했습니다'
                    }
                    fontSetting="n16m"
                    isLineBreak
                  />
                ),
                TEAM_INVITE_REJECTED: (
                  <Text
                    text={
                      isMe
                        ? '상대방이 팀원 초대를 거절했습니다'
                        : '팀 초대를 거절했습니다'
                    }
                    fontSetting="n16m"
                    isLineBreak
                  />
                ),
                TEAM_INVITE_EXPIRED: (
                  <Text
                    text={
                      isMe
                        ? '시간이 만료되었습니다. 다시 초대해주세요.'
                        : '시간이 만료되었습니다.'
                    }
                    fontSetting="n16m"
                    isLineBreak
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
  },
);

export default ChatBubble;
