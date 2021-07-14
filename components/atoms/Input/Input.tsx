/* eslint-disable react/display-name */
import { ReactElement, forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps {
  type?: string;
  placeHolder?: string;
  // TODO: any 처리
  func?: (() => React.ChangeEvent<HTMLInputElement>) | any;
  funcBlur?: (() => void) | any;
  width?: string;
  name?: string;
  maxLength?: number;
  error?: string;
}

const Wrapper = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  > input {
    ${({ theme: { input } }) => input};
  }

  > div {
    ${({
      theme: {
        font: { n12b },
      },
    }) => n12b}
    color: red;
  }
`;

// TODO: Display Name 문제 해결해야 함
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeHolder = '',
      func,
      funcBlur,
      width = '200px',
      name,
      maxLength,
      error,
    }: InputProps,
    ref,
  ): ReactElement => {
    return (
      <Wrapper className="input" width={width}>
        <input
          type={type}
          ref={ref}
          placeholder={placeHolder}
          // TODO: () => {} 이 계속 실행되면 비효율이 발생되는가?
          onChange={func}
          onBlur={funcBlur}
          name={name}
          maxLength={maxLength}
        />
        {error !== '' && <div>{error}</div>}
      </Wrapper>
    );
  },
);

export default Input;
