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

interface UserSelectAutoCompleteProps {
  handleChangeUserSelect: (newValue: MemberOption) => void;
}

export default function UserSelectAutoComplete({
  handleChangeUserSelect,
}: UserSelectAutoCompleteProps): ReactElement {
  const handleSelectChange = (newValue: MemberOption | null) => {
    if (newValue) {
      handleChangeUserSelect(newValue);
    }
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        defaultOptions
        onChange={handleSelectChange}
      />
    </>
  );
}
