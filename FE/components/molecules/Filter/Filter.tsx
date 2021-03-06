import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import Select, { OptionsType, OptionTypeBase } from 'react-select';

import { Title, Checkbox, RadioButton } from '@molecules';
import { Text } from '@atoms';

export interface Content {
  codeName: string;
  code: number;
}

interface FilterProps {
  title: string;
  contents: Content[];
  func: any;
  isRadioButton?: boolean;
  clear?: boolean;
  value: any;
}

const Wrapper = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: white;
  > div > div {
    width: 100%;
  }
`;

export default function Filter({
  title,
  contents,
  func,
  isRadioButton,
  clear,
  value,
}: FilterProps): ReactElement {
  const [selectedValues, setSelectedValues] =
    useState<OptionsType<OptionTypeBase>>([]);
  const [checkedBox, setCheckedBox] = useState<number[]>([]);

  const onChangeMultiSelect = (arr: OptionsType<OptionTypeBase>) => {
    setSelectedValues(arr);
    func(title, arr);
  };


  useEffect(() => {
    if (contents.length < 5) {
      setCheckedBox(value || []); 
    }

    if (title !== '전공/비전공') {
      setSelectedValues(contents.reduce(
        (acc, cur): any => [
          ...acc,
          { value: cur.code, label: cur.codeName },
        ],
        [],
      ).filter((each) => value?.includes(each.value)) || []);
    }
  }, [contents, value]);

  const onChangeCheckBox = (code: number) => {
    func(title, code);
  };

  useEffect(() => {
    if (clear) {
      setCheckedBox([]);
      setSelectedValues([]);
    }
  }, [clear]);

  return (
    <Wrapper>
      <Title title={title}>
        <>
          {isRadioButton && (
            <RadioButton
              func={() => func(title, '전체')}
              name={title}
              checked={value ? false : true}
              defaultChecked
            >
              <Text text="전체" fontSetting={'n14m'} />
            </RadioButton>
          )}
          {/* TODO: each의 타입 정의  */}
          {contents.length < 5 && title !== '트랙' ? (
            contents?.map(({ codeName, code }, index) =>
              isRadioButton ? (
                <RadioButton
                  func={() => func(title, code)}
                  name={title}
                  key={`radio-${code}`}
                  checked={value === index + 1}
                >
                  <Text text={codeName} fontSetting={'n14m'} />
                </RadioButton>
              ) : (
                <Checkbox
                  func={() => onChangeCheckBox(code)}
                  checked={clear ? false : checkedBox.some((each) => each === code)}
                  key={`checbkox-${code}`}
                >
                  <Text text={codeName} fontSetting={'n14m'} />
                </Checkbox>
              ),
            )
          ) : (
            <Select
              menuPlacement={title === '트랙' ? 'top' : 'auto'}
              isMulti
              options={contents.reduce(
                (acc, cur): any => [
                  ...acc,
                  { value: cur.code, label: cur.codeName },
                ],
                [],
              )}
              onChange={onChangeMultiSelect}
              placeholder={title}
              value={clear ? null : selectedValues}
            />
          )}
        </>
      </Title>
    </Wrapper>
  );
}
