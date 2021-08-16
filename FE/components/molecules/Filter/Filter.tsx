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
}

const Wrapper = styled.div`
  padding: 10px;
  margin: 10px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
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
}: FilterProps): ReactElement {
  const [selectedValues, setSelectedValues] =
    useState<OptionsType<OptionTypeBase>>();
  const [checkedBox, setCheckedBox] = useState<number[]>([]);

  const onChangeMultiSelect = (arr: OptionsType<OptionTypeBase>) => {
    setSelectedValues(arr);
    func(title, arr);
  };

  const onChangeCheckBox = (code: number) => {
    const idx = checkedBox.indexOf(code);
    let checkedBoxTmp = [...checkedBox];
    if (idx >= 0) {
      checkedBoxTmp.splice(idx, 1);
    } else {
      checkedBoxTmp.push(code);
    }
    setCheckedBox(checkedBoxTmp);
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
              defaultChecked
            >
              <Text text="전체" fontSetting={'n14m'} />
            </RadioButton>
          )}
          {/* TODO: each의 타입 정의  */}
          {contents.length < 5 ? (
            contents?.map(({ codeName, code }) =>
              isRadioButton ? (
                <RadioButton
                  func={() => func(title, code)}
                  name={title}
                  key={`radio-${code}`}
                >
                  <Text text={codeName} fontSetting={'n14m'} />
                </RadioButton>
              ) : (
                <Checkbox
                  func={() => onChangeCheckBox(code)}
                  checked={clear ? false : checkedBox.indexOf(code) > -1}
                  key={`checbkox-${code}`}
                >
                  <Text text={codeName} fontSetting={'n14m'} />
                </Checkbox>
              ),
            )
          ) : (
            <Select
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
