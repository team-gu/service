import { ReactElement, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { postSearchUserListByName } from '@repository/filterRepository';
import { MemberOption } from '@utils/type';
import { useEffect } from 'react';

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

interface UserSelectAutoCompleteProps {
  handleChangeUserSelect: (newValue: MemberOption | null) => void;
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
  payload,
}: UserSelectAutoCompleteProps): ReactElement {
  const [initValue, setInitValue] = useState([]);
  const handleSelectChange = (newValue: MemberOption | null) => {
    handleChangeUserSelect(newValue);
  };

  useEffect(() => {
    (async () => {
      const { project, studentNumber = 101 } = payload;

      if (project && studentNumber) {
        const {
          data: { data },
        } = await postSearchUserListByName({
          studentNumber,
          project,
        });

        setInitValue(
          data?.reduce(
            (acc, cur) => [
              ...acc,
              { ...cur, label: `${cur?.name}(${cur?.email})` },
            ],
            [],
          ),
        );
      }
    })();
  }, [payload]);

  const promiseOptions = (inputValue: string) =>
    new Promise<MemberOption[]>((resolve) => {
      const {
        region,
        position,
        project,
        track,
        studentNumber,
        skills,
        isMajor,
      } = payload;

      postSearchUserListByName({
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
        loadOptions={promiseOptions}
        defaultOptions={initValue}
        onChange={handleSelectChange}
        isClearable
        styles={customStyles}
      />
    </>
  );
}
