import { ReactElement, useState } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: ReactElement;
}

const Wrapper = styled.div<{ isOpen: boolean }>`
  position: relative;

  .content {
    ${({ theme: { flexRow } }) => flexRow()}
    ${({ isOpen }) => !isOpen && 'display: none !important;'}

    position: absolute;
    top: -40px;
    right: -35px;

    background-color: white;
    box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.04);

    padding: 10px;
    border-radius: 5px;

    input {
      height: 100%;
    }

    button {
      height: 100%;
    }
  }
`;

export default function Tooltip({ children }: TooltipProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper
      isOpen={isOpen}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
    </Wrapper>
  );
}
