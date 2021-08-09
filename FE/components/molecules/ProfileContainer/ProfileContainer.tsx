import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { ProfileImage } from '@molecules';
import { Text } from '@atoms';

interface ProfileContainerProps {
  src?: string;
  name: string;
  content: string;
  isActive: boolean;
  time: string;
  alertNumber?: number | string;
  func?: MouseEventHandler<HTMLSpanElement>;
}

const Wrapper = styled.div<{ isAlertExist: boolean }>`
  width: 90%;
  height: 70px;

  ${({ theme: { flexRow } }) => flexRow('space-between')}

  padding-left: 5%;
  padding-right: 5%;

  border-bottom: 1px solid
    ${({
      theme: {
        colors: { microBlue },
      },
    }) => microBlue};

  .container {
    ${({ theme: { flexRow } }) => flexRow('flex-start')}
    width: 85%;

    .container-content {
      width: 70%;
      ${({ theme: { flexCol } }) => flexCol('center', 'flex-start')}
      padding-left: 5%;
    }
  }

  .time {
    ${({ theme: { flexCol } }) => flexCol('center', 'flex-end')}
    width: 100px;
    text-align: right;
    .notification {
      ${({ isAlertExist }) =>
        isAlertExist && 'background-color: transparent; color: transparent;'}
      ${({ theme: { flexCol } }) => flexCol('center')}
      min-width: 10px;
      height: 20px;
      padding: 0 5px;
      border-radius: 20px;
      background-color: ${({ isAlertExist }) =>
        isAlertExist ? 'red' : 'transparent'};
      font-family: monospace;
      color: ${({ isAlertExist }) => (isAlertExist ? 'white' : 'transparent')};
      margin-top: 5px;
    }
  }

  cursor: pointer;
`;

export default function ProfileContainer({
  src = '/profile.png',
  name,
  content,
  isActive,
  time,
  alertNumber = 0,
  func,
}: ProfileContainerProps): ReactElement {
  return (
    <Wrapper onClick={func} isAlertExist={alertNumber > 0}>
      <div className="container">
        <ProfileImage src={src} isActive={isActive} size={40} />
        <div className="container-content">
          <Text text={name} fontSetting="n14b" />
          <Text text={content} />
        </div>
      </div>
      <div className="time">
        <Text
          text={
            DateTime.now().diff(DateTime.fromISO(time)).toMillis() < 60000
              ? 'just now'
              : DateTime.fromISO(time).toRelative()
          }
          fontSetting="n10m"
        />
        <div className="notification">{alertNumber}</div>
      </div>
    </Wrapper>
  );
}
