import { ReactElement } from 'react';
import styled from 'styled-components';

import { Checkbox } from '@molecules';
import { Text } from '@atoms';

export interface Content {
	title: string;
	checked: boolean;
}

interface FilterProps {
  contents: Content[];
  func: any;
}

const Wrapper = styled.div`
  padding: 10px;
	margin: 10px;

  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.1);
`;

export default function Filter({ contents, func }: FilterProps): ReactElement {
  return (
    <Wrapper>
      {contents.map(
        ({ title, checked }: Content) => (
          <Checkbox func={() => func(title)}>
            <Text text={title} fontSetting={checked ? 'n14b' : 'n14m'} />
          </Checkbox>
        ),
      )}
    </Wrapper>
  );
}
