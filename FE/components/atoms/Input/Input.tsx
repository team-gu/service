/* eslint-disable react/display-name */
import { ReactElement, ChangeEvent, forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps {
  type?: string;
  placeHolder?: string;
  // TODO: any 처리
  func?: (() => ChangeEvent<HTMLInputElement>) | any;
  funcBlur?: (() => void) | any;
  onKeyPress?: any;
  width?: string;
  height?: string;
  name?: string;
  maxLength?: number;
  error?: string;
  readOnly?: boolean;
  value?: string;
}

const Wrapper = styled.div<{
  width: string;
  height: string;
  isSuccess: string | undefined;
}>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  > div {
    ${({
      theme: {
        font: { n12b },
      },
    }) => n12b}
    color: ${({ isSuccess }) => (isSuccess === '1' ? 'green' : 'red')};
  }

  input {
    width: 100%;
    height: 100%;
    border: 1px solid
      ${({
        theme: {
          colors: { gray },
        },
      }) => gray};
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
      onKeyPress = () => {},
      width = '200px',
      height = '20px',
      name,
      maxLength,
      error,
      readOnly = false,
      value,
    }: InputProps,
    ref,
  ): ReactElement => {
    // TODO: 추후 any 제거
    return (
      <Wrapper
        className="input"
        width={width}
        height={height}
        isSuccess={error?.split('/')[1]}
      >
        <input
          type={type}
          ref={ref}
          placeholder={placeHolder}
          // TODO: () => {} 이 계속 실행되면 비효율이 발생되는가?
          onChange={func}
          onKeyPress={onKeyPress}
          onBlur={funcBlur}
          name={name}
          maxLength={maxLength}
          readOnly={readOnly}
          value={value}
        />
        {error?.split('/')[0] !== '' && <div>{error?.split('/')[0]}</div>}
      </Wrapper>
    );
  },
);

export default Input;
