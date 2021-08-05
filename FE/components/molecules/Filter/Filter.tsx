import { ReactElement } from 'react';
import styled from 'styled-components';

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
          {/* TODO: each의 타입 정의  */}
          {contents?.map(({ codeName, code }) =>
            isRadioButton ? (
              <RadioButton func={() => func(title, code)} name={title}>
                <Text text={codeName} fontSetting={'n14m'} />
              </RadioButton>
            ) : (
              <Checkbox func={() => func(title, code)}>
                <Text text={codeName} fontSetting={'n14m'} />
              </Checkbox>
            ),
          )}
        </>
      </Title>
    </Wrapper>
  );
}
