import { ReactElement } from 'react';
import AsyncSelect from 'react-select/async';
import { getUserListByNameContains } from '@repository/baseRepository';
import { MemberOption } from '@utils/type';

const promiseOptions = (inputValue: string) =>
  new Promise<MemberOption[]>((resolve) => {
    getUserListByNameContains(inputValue).then((data) => {
      resolve(data);
    });
  });

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: '45px',
  }),
  singleValue: (base: any) => ({
    ...base,
    height: '35px',
    lineHeight: '35px',
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

interface UserSelectAutoCompleteProps {
  handleChangeUserSelect: (newValue: MemberOption | null) => void;
}

export default function UserSelectAutoComplete({
  handleChangeUserSelect,
}: UserSelectAutoCompleteProps): ReactElement {
  const handleSelectChange = (newValue: MemberOption | null) => {
    handleChangeUserSelect(newValue);
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        defaultOptions
        onChange={handleSelectChange}
        isClearable
        styles={customStyles}
      />
    </>
  );
}
