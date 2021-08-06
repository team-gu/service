import { ReactElement, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { postAllUserList } from '@repository/chatRepository';
import { MemberOption } from '@utils/type';
import { useAuthState } from '@store';

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 45,
  }),
  singleValue: (provided: any) => {
    const height = '35px';
    const lineHeight = '35px';

    return { ...provided, height, lineHeight };
  },
};

interface UserSelectChatAutoCompletePorps {
  handleChangeUserSelect: (newValue: MemberOption | null) => void;
}

export default function UserSelectChatAutoComplete({
  handleChangeUserSelect,
}: UserSelectChatAutoCompletePorps): ReactElement {
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
        data.map(({ name, email, user_id }) => {
          return {
            label: `${name} (${email})`,
            value: name,
            user_id,
          };
        }),
      );
    })();
  }, []);

  const handleSelectChange = (newValue: MemberOption | null) => {
    handleChangeUserSelect(newValue);
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        // loadOptions={promiseOptions}
        defaultOptions={userList}
        onChange={handleSelectChange}
        isClearable
        styles={customStyles}
        isSearchable={false}
      />
    </>
  );
}
