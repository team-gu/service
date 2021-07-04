import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface EachButtonProps {
  title: string;
  func: any;
  isNormal?: boolean;
}

const WrapEachButton = styled.button<{ isNormal: boolean }>`
  ${({ theme: { flexRow } }) => flexRow()}

  width: ${({ isNormal }) => (isNormal ? '200px' : '88%')};
  max-width: 600px;
  height: 48px;

  bottom: 16px;
  margin: 0 auto;

  background-color: ${({
    theme: {
      colors: { black },
    },
  }) => black};

  border: none;
  border-radius: 8px;
  ${({
    theme: {
      font: { n18b },
    },
  }) => n18b};
  box-shadow: 0px 0px 4px 2px rgba(55, 53, 47, 0.4);

  color: ${({
    theme: {
      colors: { white },
    },
  }) => white};
  ${({
    theme: {
      font: { n18b },
    },
  }) => n18b};

  transition: 300ms;
  animation: 800ms ease fadeIn;
  :hover {
    opacity: 0.5;
  }
  :active {
    transform: translate(1px, 1px);
  }

  cursor: pointer;
`;

export default function Button({
  title,
  func,
  isNormal = false,
}: EachButtonProps): ReactElement {
  return (
    <WrapEachButton type="button" onClick={func} isNormal={isNormal}>
      {title}
    </WrapEachButton>
  );
}
