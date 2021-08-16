import { ReactElement } from 'react';
import styled from 'styled-components';

import { Text } from '@atoms';

interface TitleProps {
  children?: ReactElement;
  title: string;
  fontSetting?: string;
}

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol('flex-start', 'flex-start')}
  div:first-child {
    margin-bottom: 10px;
  }
`;

export default function Title({
  children,
  title,
  fontSetting = 'n18b',
}: TitleProps): ReactElement {
  return (
    <Wrapper>
      <Text text={title} fontSetting={fontSetting} />
      {children}
    </Wrapper>
  );
}
