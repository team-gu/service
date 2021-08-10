import { ReactElement, useState, useEffect } from 'react';
import Select, { OptionsType } from 'react-select';
import { postAllUserList, getRoomUserList } from '@repository/chatRepository';
import { MemberOption } from '@utils/type';
import { useAuthState } from '@store';

interface UserSelectChatAutoCompleteProps {
  handleChangeUserSelect: (newValue: MemberOption[] | null) => void;
  roomId: number;
}

interface UserList {
  name: string;
  email: string;
  user_id: number;
}

export default function UserSelectChatAutoComplete({
  handleChangeUserSelect,
  roomId,
}: UserSelectChatAutoCompleteProps): ReactElement {
  const {
    user: { id, projectCode, studentNumber },
  } = useAuthState();

  const [userList, setUserList] = useState<UserList[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await postAllUserList({
          myid: id,
          project_code: (projectCode && projectCode[0]) || 101,
          studentNumber,
        });

        await setUserList(
          data.map(({ name, email, user_id }: UserList) => ({
            label: `${name} (${email})`,
            value: name,
            user_id,
          })),
        );

        if (roomId) {
          const {
            data: { data: users },
          } = await getRoomUserList(roomId);
          setUserList((prev) =>
            prev.filter(
              ({ user_id }) => !users.find((each) => each.user_id === user_id),
            ),
          );
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSelectChange = (newValue: OptionsType<MemberOption> | null) => {
    handleChangeUserSelect(newValue);
  };

  return (
    <>
      <Select
        isMulti
        options={userList}
        onChange={handleSelectChange}
        placeholder="선택해 주세요"
      />
    </>
  );
}
