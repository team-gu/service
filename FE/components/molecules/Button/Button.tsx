import { ReactElement, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

interface EachButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  func?: MouseEventHandler;
  width?: string;
}

const WrapEachButton = styled.button<{ width: string }>`
  width: ${({ width }) => width};
  height: 40px;

  bottom: 16px;
  margin: 0 auto;

  background-color: ${({
    theme: {
      colors: { black },
    },
  }) => black};

  border: none;
  border-radius: 8px;

  box-shadow: 0px 0px 4px 2px rgba(55, 53, 47, 0.4);

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
  func = () => {},
  width = '200px',
  type = 'button',
}: EachButtonProps): ReactElement {
  return (
    <WrapEachButton type={type} onClick={func} width={width}>
      <Text text={title} fontSetting="n14b" color="white" />
    </WrapEachButton>
  );
}
