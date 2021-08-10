import { ReactElement } from 'react';
import styled from 'styled-components';
import { ProfileContainer } from '@molecules';

interface UserList {
  chat_room_id: number;
  room_name: string;
  last_chat_message: string;
  send_date_time: string;
  unread_message_count: number | string;
}
interface ChatListProps {
  handleToChatRoom: (id: number, room_name: string) => Promise<void>;
  userList: UserList[];
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .user-list {
    overflow-y: auto;
    height: calc(100% - 100px);
  }
`;

export default function ChatList({
  handleToChatRoom,
  userList,
}: ChatListProps): ReactElement {
  return (
    <Wrapper>
      <div className="user-list">
        {userList?.map(
          ({
            chat_room_id,
            room_name,
            last_chat_message,
            send_date_time,
            unread_message_count,
          }: UserList) => (
            <ProfileContainer
              name={room_name}
              content={last_chat_message}
              isActive={false}
              time={send_date_time}
              alertNumber={unread_message_count}
              func={() => handleToChatRoom(chat_room_id, room_name)}
            />
          ),
        )}
      </div>
    </Wrapper>
  );
}
