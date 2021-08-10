import { ReactElement } from 'react';
import styled from 'styled-components';

interface ProfileContainerProps {
  alertNumber?: number | string;
}

const Wrapper = styled.div<{ isAlertExist: boolean }>`
  ${({ theme: { flexCol } }) => flexCol('center')}

  ${({ isAlertExist }) =>
    isAlertExist && 'background-color: transparent; color: transparent;'}
  min-width: 10px;
  height: 20px;
  background-color: ${({ isAlertExist }) =>
    isAlertExist ? 'red' : 'transparent'};
  font-family: monospace;
  border-radius: 10px;
  color: ${({ isAlertExist }) => (isAlertExist ? 'white' : 'transparent')};
  padding: 0 5px;
`;

export default function Notification({
  alertNumber = 0,
}: ProfileContainerProps): ReactElement {
  return (
    <Wrapper className="notification" isAlertExist={alertNumber > 0}>
      {alertNumber}
    </Wrapper>
  );
}
