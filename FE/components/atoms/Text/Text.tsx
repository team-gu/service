import { ReactElement } from 'react';
import styled from 'styled-components';

interface TextProps {
  text: string;
  fontSetting?: string;
  color?: string;
  className?: string;
}

const Wrapper = styled.div<{ fontSetting: string; color: string }>`
  max-width: 100%;
  ${({ theme: { font }, fontSetting }) => font[fontSetting]};
  color: ${({ color }) => color};
  ${({
    theme: {
      font: { ellipse },
    },
  }) => ellipse()};
`;

export default function Text({
  text,
  fontSetting = 'n14m',
  color = 'black',
  className = '',
}: TextProps): ReactElement {
  return (
    <Wrapper className={className} fontSetting={fontSetting} color={color}>
      {text}
    </Wrapper>
  );
}
