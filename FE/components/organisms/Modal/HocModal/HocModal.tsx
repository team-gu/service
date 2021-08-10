import { ReactElement } from 'react';
import styled from 'styled-components';

interface HocModalProps {
  modalName: string;
  children: ReactElement;
}

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol('space-around')}

  width: 300px;

  padding: 20px;

  > div {
    padding: 0 20px;

    width: 100%;
    height: 100%;

    .upper {
      .button-container {
        ${({ theme: { flexRow } }) => flexRow()};
        > button {
          margin-top: 20px;
          box-shadow: none;
          background-color: white;

          width: 100px;
          height: 30px;

          > div {
            color: black;
          }
          border: 1px solid lightgray;
        }
      }
    }
  }
`;

export default function HocModal({ children }: HocModalProps): ReactElement {
  return (
    <>
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
    </>
  );
}
