import { ReactElement, useState, useEffect } from 'react';
import Select, { OptionsType } from 'react-select';
import { postAllUserList } from '@repository/chatRepository';
import { MemberOption } from '@utils/type';
import { useAuthState } from '@store';

interface UserSelectChatAutoCompleteProps {
  handleChangeUserSelect: (newValue: MemberOption[] | null) => void;
}

interface UserList {
  name: string;
  email: string;
  user_id: number;
}

export default function UserSelectChatAutoComplete({
  handleChangeUserSelect,
}: UserSelectChatAutoCompleteProps): ReactElement {
  const {
    user: { id, projectCode, studentNumber },
  } = useAuthState();

  const [userList, setUserList] = useState();

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await postAllUserList({
        myid: id,
        project_code: (projectCode && projectCode[0]) || 101,
        studentNumber,
      });

      setUserList(
        data.map(({ name, email, user_id }: UserList) => {
          return {
            label: `${name} (${email})`,
            value: name,
            user_id,
          };
        }),
      );
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
