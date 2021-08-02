import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';

import { getChatLists } from '@repository/chatRepository';
import { ProfileContainer } from '@molecules';
import { USER_DUMMY_DATA } from '@utils/constants';

interface ChatListProps {
  func: (id: number) => Promise<void>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ChatList({ func }: ChatListProps): ReactElement {
  const [userList, setUserList] = useState(USER_DUMMY_DATA);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await getChatLists();

  //       setUserList(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  return (
    <Wrapper>
      {userList.map(({ id, name, content, isActive, time, alertNumber }) => (
        <ProfileContainer
          name={name}
          content={content}
          isActive={isActive}
          time={time}
          alertNumber={alertNumber}
          func={() => func(id)}
        />
      ))}
    </Wrapper>
  );
}
