import { ReactElement } from 'react';
import styled from 'styled-components';

interface IconProps {
  iconName: string;
  size?: string;
  color: string;
}

const Wrapper = styled.i<{ size: string; color: string }>`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  cursor: default;
`;

export default function Icon({
  iconName,
  size = '24px',
  color = 'black',
}: IconProps): ReactElement {
  return (
    <Wrapper
      className="material-icons"
      aria-hidden="true"
      size={size}
      color={color}
    >
      {iconName}
    </Wrapper>
  );
}
