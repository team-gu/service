import { ReactElement } from 'react';
import styled from 'styled-components';
import Select, { OptionsType } from 'react-select';

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
}

const Wrapper = styled.div`
  padding: 10px;
  margin: 10px;
  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.1);
  > div > div {
    width: 100%;
  }
`;

export default function Filter({
  title,
  contents,
  func,
  isRadioButton,
}: FilterProps): ReactElement {
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
                <RadioButton func={() => func(title, code)} name={title}>
                  <Text text={codeName} fontSetting={'n14m'} />
                </RadioButton>
              ) : (
                <Checkbox func={() => func(title, code)}>
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
              onChange={(arr) => func(title, arr)}
              placeholder={title}
            />
          )}
        </>
      </Title>
    </Wrapper>
  );
}
