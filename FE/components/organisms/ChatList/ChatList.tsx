import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';

import { ProfileContainer } from '@molecules';
import { USER_DUMMY_DATA } from '@utils/constants';

interface ChatListProps {
  func: MouseEventHandler<HTMLSpanElement>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ChatList({ func }: ChatListProps): ReactElement {
  return (
    <Wrapper>
      {USER_DUMMY_DATA.map(({ name, content, isActive, time, alertNumber }) => (
        <ProfileContainer
          name={name}
          content={content}
          isActive={isActive}
          time={time}
          alertNumber={alertNumber}
          func={func}
        />
      ))}
    </Wrapper>
  );
}
