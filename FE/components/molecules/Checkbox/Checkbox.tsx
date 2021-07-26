import { ReactElement } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  children: ReactElement;
  // TODO: 타입 정의
  func: any;
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
}: CheckboxProps): ReactElement {
  return (
    <Wrapper>
      <input type="checkbox" onClick={func} />
      {children}
    </Wrapper>
  );
}
