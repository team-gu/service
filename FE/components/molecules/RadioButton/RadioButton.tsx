import { ReactElement } from 'react';
import styled from 'styled-components';

interface RadioButtonProps {
  children: ReactElement;
  // TODO: 타입 정의
  func: any;
  checked: boolean;
  defaultChecked?: boolean;
  name?: string;
}

const Wrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow('flex-start')}
  input {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
`;

export default function RadioButton({
  children,
  func,
  checked,
  defaultChecked = false,
  name,
}: RadioButtonProps): ReactElement {
  return (
    <Wrapper>
      <input
        type="radio"
        onClick={func}
        onChange={e => {}}
        {...(defaultChecked ? { defaultChecked } : { checked })}
        name={name}
      />
      {children}
    </Wrapper>
  );
}
