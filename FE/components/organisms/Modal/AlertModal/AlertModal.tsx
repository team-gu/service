import { ReactElement } from 'react';
import styled from 'styled-components';
import { useModalState, useAppDispatch } from '@store';
import { get } from '@utils/snippet';

import { removeModal } from '@store';

import { Button } from '@molecules';

interface AlertModalProps {
  modalName: string;
}

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol('space-around')}

  width: 300px;
  height: 200px;

  .alert-content {
    text-align: center;
    padding: 0 20px;

    ${({
      theme: {
        font: { n18b },
      },
    }) => n18b};
  }
`;

export default function AlertModal({
  modalName,
}: AlertModalProps): ReactElement {
  const dispatch = useAppDispatch();
  const { content } = useModalState();

  return (
    <>
      <Wrapper>
        <div className="alert-content">{content}</div>
        <Button
          title="닫기"
          func={() => dispatch(removeModal({ modalName }))}
        />
      </Wrapper>
    </>
  );
}
