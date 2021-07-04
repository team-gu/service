import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeModal } from '@store';

interface ModalWrapperProps {
  modalName: string;
  children: ReactElement;
}

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: none;
  z-index: 1000;
`;

const Content = styled.div`
  display: inline-block;
  border-radius: 10px;
  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.04);
  background-color: ${({
    theme: {
      colors: { white },
    },
  }) => white};
  margin: 0 auto;
  outline: none;
`;

export default function ModalWrapper({
  modalName,
  children,
}: ModalWrapperProps) {
  const dispatch = useDispatch();
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(removeModal({ modalName }));
    }
  };

  return (
    <>
      <Background />
      <Wrapper tabIndex={-1} onClick={handleCloseModal}>
        <Content tabIndex={0}>{children}</Content>
      </Wrapper>
    </>
  );
}
