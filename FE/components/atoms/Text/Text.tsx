import { ReactElement } from 'react';
import styled from 'styled-components';

interface TextProps {
  text: string;
  fontSetting?: string;
  className?: string;
}

const Wrapper = styled.div<{ fontSetting: string }>`
  width: 100%;
  ${({ theme: { font }, fontSetting }) => font[fontSetting]};
  ${({
    theme: {
      font: { ellipse },
    },
  }) => ellipse()};
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
