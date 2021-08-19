import { ReactElement, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getUserListByNameContains } from '@repository/teamRepository';
import { MemberOption } from '@utils/type';
import { useAuthState } from '@store';

const customStyles = {
  control: (base: any) => ({
    ...base,
  }),
  singleValue: (base: any) => ({
    ...base,
    lineHeight: '24px',
  }),
  menuList: (base: any) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 101,
    marginTop: 0,
  }),
};

interface UserSelectTeamAutoCompleteProps {
  projectCode: number;
  handleChangeUserSelect: (newValue: MemberOption | null) => void;
  clear?: boolean;
}

export default function UserSelectTeamAutoComplete({
  projectCode,
  handleChangeUserSelect,
  clear,
}: UserSelectTeamAutoCompleteProps): ReactElement {
  const {
    user: { studentNumber },
  } = useAuthState();

  const [selcetedMember, setSelectedMember] = useState<MemberOption | null>();
  const handleSelectChange = (newValue: MemberOption | null) => {
    setSelectedMember(newValue);
    handleChangeUserSelect(newValue);
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<MemberOption[]>((resolve, reject) => {
      // TODO: 너무 잦은 요청!
      getUserListByNameContains({
        projectCode,
        search: inputValue,
        studentNumber,
      })
        .then(({ data: { data } }) => {
          if (data && data.length > 0) {
            resolve(
              data.map(
                (member: { id: number; name: string; email: string }) => ({
                  ...member,
                  label: `${member.name} (${member.email})`,
                  value: member.id,
                }),
              ),
            );
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });

  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        defaultOptions
        onChange={handleSelectChange}
        isClearable
        styles={customStyles}
        value={clear ? null : selcetedMember}
      />
    </>
  );
}
