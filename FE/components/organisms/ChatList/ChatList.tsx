import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { ProfileContainer } from '@molecules';
import { Text } from '@atoms';

interface UserList {
  chat_room_id: number;
  room_name: string;
  last_chat_message: string;
  send_date_time: string;
  unread_message_count: number | string;
}
interface ChatListProps {
  handleToChatRoom: (id: number, room_name: string) => Promise<void>;
  handleGetChatLists: () => Promise<void>;
  userList: UserList[];
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .user-list {
    .user-list-text {
      ${({ theme: { flexCol } }) => flexCol()}
      width: 100%;
      height: calc(100% - 40px);
    }

    overflow-y: auto;
    height: calc(100% - 40px);
  }
`;

export default function ChatList({
  handleToChatRoom,
  handleGetChatLists,
  userList,
}: ChatListProps): ReactElement {
  useEffect(() => {
    handleGetChatLists();
    const interval = setInterval(() => {
      handleGetChatLists();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div className="user-list">
        {userList?.length === 0 ? (
          <div className="user-list-text">
            <Text text="채팅방을 새로 생성해주세요!" />
          </div>
        ) : (
          userList?.map(
            ({
              chat_room_id,
              room_name,
              last_chat_message,
              send_date_time,
              unread_message_count,
            }: UserList) => (
              <ProfileContainer
                key={chat_room_id}
                name={room_name}
                content={last_chat_message}
                isActive={false}
                time={send_date_time}
                alertNumber={unread_message_count}
                func={() => handleToChatRoom(chat_room_id, room_name)}
              />
            ),
          )
        )}
      </div>
    </Wrapper>
  );
}
