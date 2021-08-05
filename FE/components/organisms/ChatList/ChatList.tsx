import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';

import { getChatLists } from '@repository/chatRepository';
import { ProfileContainer } from '@molecules';
import { useAuthState } from '@store';

interface ChatListProps {
  func: (id: number) => Promise<void>;
}

interface UserList {
  chat_room_id: number;
  room_name: string;
  message: string;
  create_date_time: string;
  unread_message_count: number | string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ChatList({ func }: ChatListProps): ReactElement {
  const {
    user: { id },
  } = useAuthState();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getChatLists(id);

        setUserList(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Wrapper>
      {userList?.map(
        ({
          chat_room_id,
          room_name,
          message,
          create_date_time,
          unread_message_count,
        }: UserList) => (
          <ProfileContainer
            name={room_name}
            content={message === null ? '___' : message}
            isActive={false}
            time={create_date_time}
            alertNumber={unread_message_count}
            func={() => func(chat_room_id)}
          />
        ),
      )}
    </Wrapper>
  );
}
