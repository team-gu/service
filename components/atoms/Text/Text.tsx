import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface TextProps {
  text: string;
  fontSetting?: string;
  className?: string;
}

const Wrapper = styled.div<{ fontSetting: string }>`
  ${({ theme: { font }, fontSetting }) => font[fontSetting]};
`;
export default function Text({
  text,
  fontSetting = 'n14m',
  className = '',
}: TextProps): ReactElement {
  return (
    <Wrapper className={className} fontSetting={fontSetting}>
      {text}
    </Wrapper>
  );
}
