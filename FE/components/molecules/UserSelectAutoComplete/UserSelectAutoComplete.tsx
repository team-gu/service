import { ReactElement } from 'react';
import AsyncSelect from 'react-select/async';
import { getSearchUserListByName } from '@repository/filterRepository';
import { MemberOption } from '@utils/type';

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
  studentNumber: string;
  payload: {
    email?: string;
    isMajor?: number;
    pageNum?: number;
    pageSize?: number;
    position?: number[];
    project?: number;
    region?: number[];
    skills?: number[];
    sort?: string;
    studentNumber?: string;
    target?: string;
    projectCode?: number;
    track?: number[];
  };
}

export default function UserSelectAutoComplete({
  handleChangeUserSelect,
  studentNumber,
  payload,
}: UserSelectAutoCompleteProps): ReactElement {
  const handleSelectChange = (newValue: MemberOption | null) => {
    handleChangeUserSelect(newValue);
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<MemberOption[]>((resolve) => {
      const { region, position, project, track, skills, isMajor } = payload;
      getSearchUserListByName({
        target: inputValue || '',
        studentNumber,
        project,
        region,
        position,
        track,
        skills,
        isMajor,
      }).then(({ data: { data } }) => {
        resolve(
          data?.reduce(
            (acc, cur) => [
              ...acc,
              { ...cur, label: `${cur?.name}(${cur?.email})` },
            ],
            [],
          ),
        );
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
      />
    </>
  );
}
