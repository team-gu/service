import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
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

  > div {
    padding: 0 20px;

    ${({
      theme: {
        font: { n18b },
      },
    }) => n18b};
  }
`;

export default function AlertModal({ modalName }: AlertModalProps) {
  const dispatch = useDispatch();
  const { content } = useSelector(get('modal'));

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
