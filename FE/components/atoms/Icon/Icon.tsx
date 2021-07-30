import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface IconProps {
  iconName: string;
  size?: string;
  color?: string;
  func?: MouseEventHandler<HTMLSpanElement>;
}

const Wrapper = styled.i<{ size: string; color: string }>`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  cursor: default;
  user-select: none;
`;

export default function Icon({
  iconName,
  size = '24px',
  color = 'black',
  func = () => {},
}: IconProps): ReactElement {
  return (
    <Wrapper
      className="material-icons"
      aria-hidden="true"
      size={size}
      color={color}
      onClick={func}
    >
      {iconName}
    </Wrapper>
  );
}
