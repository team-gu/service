import { ReactElement } from 'react';
import styled from 'styled-components';
import { ProfileImage } from '@molecules';
import { Text } from '@atoms';

interface ProfileContainerProps {
  src: string;
  name: string;
  content: string;
  isActive: boolean;
  time: string;
  alertNumber?: number;
}

const Wrapper = styled.div`
  width: 90%;
  height: 70px;

  ${({ theme: { flexRow } }) => flexRow('space-between')}

  padding-left: 5%;
  padding-right: 5%;

  .container {
    ${({ theme: { flexRow } }) => flexRow('flex-start')}
    width: 85%;

    .container-content {
      width: 80%;
      ${({ theme: { flexCol } }) => flexCol('center', 'flex-start')}
      padding-left: 5%;
    }
  }
  .time {
    ${({ theme: { flexCol } }) => flexCol('center', 'flex-end')}
    width: 100px;
    text-align: right;
    .notification {
      ${({ theme: { flexCol } }) => flexCol('center')}
      min-width: 10px;
      height: 20px;
      padding: 0 5px;
      border-radius: 20px;
      background-color: red;
      font-family: system-ui;
      color: white;
    }
  }
`;

export default function ProfileContainer({
  src,
  name,
  content,
  isActive,
  time,
  alertNumber = 0,
}: ProfileContainerProps): ReactElement {
  return (
    <Wrapper>
      <div className="container">
        <ProfileImage src={src} isActive={isActive} />
        <div className="container-content">
          <Text text={name} fontSetting="n14b" />
          <Text text={content} />
        </div>
      </div>
      <div className="time">
        <Text text={time} />
        {alertNumber > 0 && <div className="notification">{alertNumber}</div>}
      </div>
    </Wrapper>
  );
}
