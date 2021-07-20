import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

interface LabelProps {
  text: string;
  children: ReactElement;
}

const Wrapper = styled.div`
  > div {
    margin-bottom: 10px;
  }
  .input {
    margin-bottom: 20px;
  }
`;

export default function Label({ text, children }: LabelProps): ReactElement {
  return (
    <Wrapper>
      <Text text={text} fontSetting="n14b" />
      {children}
    </Wrapper>
  );
}
