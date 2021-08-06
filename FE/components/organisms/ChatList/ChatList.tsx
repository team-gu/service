import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';

import { getChatLists, postCreateRoom } from '@repository/chatRepository';
import { ProfileContainer, UserSelectChatAutoComplete } from '@molecules';
import { Button } from '@molecules';
import { useAuthState, useAppDispatch, displayModal } from '@store';
import { MemberOption } from '@utils/type';
import { MODALS } from '@utils/constants';

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

  .upper {
    display: grid;
    grid-template-columns: 1.7fr 0.3fr;
    > button {
      box-shadow: none;
      background-color: white;
      height: 100%;
      > div {
        color: black;
      }
      border: 1px solid lightgray;
    }
  }

  .user-list {
    overflow-y: auto;
    height: 500px;
  }
`;

export default function ChatList({ func }: ChatListProps): ReactElement {
  const dispatch = useAppDispatch();
  const {
    user: { id },
  } = useAuthState();

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const handleGetChatLists = async () => {
    try {
      const {
        data: { data },
      } = await getChatLists(id);

      setUserList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetChatLists();
  }, []);

  const handleChangeUserSelect = async (selected: MemberOption | null) => {
    if (selected) {
      setSelectedUser(selected);
    }
  };

  const handleCreateRoom = async () => {
    if (selectedUser) {
      try {
        const { status } = await postCreateRoom({
          user_id1: id,
          user_id2: selectedUser?.user_id,
        });

        if (status !== 204) {
          dispatch(
            displayModal({ modalName: MODALS.ALERT_MODAL, content: '방이 생성되었습니다.' }),
          );
        } else {
          dispatch(
            displayModal({ modalName: MODALS.ALERT_MODAL, content: '이미 만들어진 방 입니다.' }),
          );
        }
        return handleGetChatLists();
      } catch (error) {
        return console.error(error);
      }
    }
    dispatch(
      displayModal({ modalName: MODALS.ALERT_MODAL, content: '유저를 선택해주세요!.' }),
    );
  };

  return (
    <Wrapper>
      <div className="upper">
        <UserSelectChatAutoComplete
          handleChangeUserSelect={handleChangeUserSelect}
        />
        <Button title="생성" width="100%" func={() => handleCreateRoom()} />
      </div>
      <div className="user-list">
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
              func={() => func(chat_room_id, room_name)}
            />
          ),
        )}
      </div>
    </Wrapper>
  );
}
