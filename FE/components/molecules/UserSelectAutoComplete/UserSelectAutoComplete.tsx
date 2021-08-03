import { ReactElement, useState } from 'react';
import { OptionTypeBase } from 'react-select';
import AsyncSelect from 'react-select/async';
import { getUserListByNameContains } from '@repository/baseRepository';

interface UserOptionType extends OptionTypeBase {
  label: string;
  value: string;
  id: number;
}

const promiseOptions = (inputValue: string) =>
  new Promise<UserOptionType[]>((resolve) => {
    getUserListByNameContains(inputValue).then((data) => {
      resolve(data);
    });
  });

interface UserSelectAutoCompleteProps {
  handleChangeUserSelect: (newValue: object) => void;
}

export default function UserSelectAutoComplete({
  handleChangeUserSelect,
}: UserSelectAutoCompleteProps): ReactElement {
  const handleSelectChange = (newValue: UserOptionType | null) => {
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
        onChange={(item) => handleSelectChange(item)}
      />
    </>
  );
}
