import { ReactElement } from 'react';
import styled from 'styled-components';
import Linkify from 'react-linkify';

import { Title } from '@molecules';

interface SummaryProps {
  title: string;
  text: string;
}

const Wrapper = styled.div`
  width: 100%;
`;

export default function Summary({ title, text }: SummaryProps): ReactElement {
  return (
    <Wrapper>
      <Title title={title}>
        {/* TODO: properties 빨간줄 해결 */}
        <Linkify
          properties={{ target: '_blank', style: { fontWeight: 'bold' } }}
        >
          <p>{text}</p>
        </Linkify>
      </Title>
    </Wrapper>
  );
}
