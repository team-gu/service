import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

interface LabelProps {
  text: string;
  children: ReactElement;
  fontSetting?: string;
}

const Wrapper = styled.div`
  > div {
    margin-bottom: 10px;
  }
  .input {
    margin-bottom: 20px;
  }
`;

export default function Label({
  text,
  children,
  fontSetting = 'n14b',
}: LabelProps): ReactElement {
  return (
    <Wrapper>
      <Text text={text} fontSetting={fontSetting} />
      {children}
    </Wrapper>
  );
}
