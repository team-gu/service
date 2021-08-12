import { ReactElement } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: ReactElement;
}

const Wrapper = styled.div`
  position: absolute;
  top: -30px;
  right: 60px;
  z-index: 200;
  background-color: white;
  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.04);
  padding: 10px;
  border-radius: 5px;
`;

export default function Tooltip({ children }: TooltipProps): ReactElement {
  return <Wrapper>{children}</Wrapper>;
}
