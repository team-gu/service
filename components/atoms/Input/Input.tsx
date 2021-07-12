import { ReactElement } from 'react';
import styled from 'styled-components';

interface InputProps {
  type?: string;
  inputRef: useRef<HTMLInputElement>;
  placeHolder: string;
  width?: string;
}

const Wrapper = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  > input {
    ${({ theme: { input } }) => input};
  }
`;

export default function Input({
  type = 'text',
  inputRef,
  placeHolder,
  width = '200px',
}: InputProps): ReactElement {
  return (
    <Wrapper width={width}>
      <input type={type} ref={inputRef} placeholder={placeHolder} />
    </Wrapper>
  );
}
