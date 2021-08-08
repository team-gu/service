import { ReactElement, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, removeModal } from '@store';

interface ModalWrapperProps {
  modalName: string;
  children: ReactElement;
  zIndex?: number;
}

const Background = styled.div<{ zIndex: number }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  background-color: rgba(0, 0, 0, 0.4);

  ${({ zIndex }) => 'z-index: ' + zIndex}
`;

const Wrapper = styled.div<{ zIndex: number }>`
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

  ${({ zIndex }) => 'z-index: ' + (zIndex + 1)}
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
  zIndex = 999,
}: ModalWrapperProps): ReactElement {
  const dispatch = useAppDispatch();
  const handleCloseModal = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(removeModal({ modalName }));
    }
  };

  return (
    <>
      <Background zIndex={zIndex} />
      <Wrapper tabIndex={-1} zIndex={zIndex} onClick={handleCloseModal}>
        <Content tabIndex={0}>{children}</Content>
      </Wrapper>
    </>
  );
}
