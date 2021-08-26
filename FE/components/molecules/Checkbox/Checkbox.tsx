import { ReactElement } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  children: ReactElement;
  // TODO: 타입 정의
  func: any;
  checked?: boolean;
}

const Wrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow('flex-start')}
  input {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
`;

export default function Checkbox({
  children,
  func,
  checked = false,
}: CheckboxProps): ReactElement {
  return (
    <Wrapper>
      <input
        type="checkbox"
        onClick={func}
        checked={checked}
        onChange={e => {}}
      />
      {children}
    </Wrapper>
  );
}
