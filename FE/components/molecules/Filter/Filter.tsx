import { ReactElement } from 'react';
import styled from 'styled-components';

import { Title, Checkbox } from '@molecules';
import { Text } from '@atoms';

export interface Content {
  title: string;
  checked: boolean;
}

interface FilterProps {
  title: string;
  contents: Content[];
  func: any;
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
}: FilterProps): ReactElement {
  return (
    <Wrapper>
      <Title title={title}>
        <>
          {/* TODO: each의 타입 정의  */}
          {Object.keys(contents).map((each: any) => (
            <Checkbox func={() => func(title, each)}>
              <Text
                text={each}
                fontSetting={contents[each] ? 'n14b' : 'n14m'}
              />
            </Checkbox>
          ))}
        </>
      </Title>
    </Wrapper>
  );
}
