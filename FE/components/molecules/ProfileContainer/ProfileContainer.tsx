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
}

const Wrapper = styled.div`
  width: 90%;
  height: 70px;

  ${({ theme: { flexRow } }) => flexRow('space-between')}

  padding-left: 5%;
  padding-right: 5%;

  .container {
    width: 85%;
    ${({ theme: { flexRow } }) => flexRow('flex-start')}
    .container-content {
      width: 80%;
      ${({ theme: { flexCol } }) => flexCol('center', 'flex-start')}
      padding-left: 5%;
    }
  }
  .time {
    width: 100px;
    text-align: right;
  }
`;

export default function ProfileContainer({
  src,
  name,
  content,
  isActive,
  time,
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
      </div>
    </Wrapper>
  );
}
