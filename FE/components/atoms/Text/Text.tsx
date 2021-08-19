import { ReactElement } from 'react';
import styled from 'styled-components';

interface TextProps {
  text: string;
  fontSetting?: string;
  color?: string;
  className?: string;
  isLineBreak?: boolean;
}

const Wrapper = styled.div<{
  fontSetting: string;
  color: string;
  isLineBreak: boolean;
}>`
  max-width: 100%;
  ${({ theme: { font }, fontSetting }) => font[fontSetting]};
  color: ${({ color }) => color};
  ${({
    theme: {
      font: { ellipse },
    },
    isLineBreak,
  }) =>
    isLineBreak ? 'word-break: break-word; white-space: pre-wrap;' : ellipse()};
`;

export default function Text({
  text,
  fontSetting = 'n14m',
  color = 'black',
  className = '',
  isLineBreak = false,
}: TextProps): ReactElement {
  return (
    <Wrapper
      className={className}
      fontSetting={fontSetting}
      color={color}
      isLineBreak={isLineBreak}
    >
      {text}
    </Wrapper>
  );
}
