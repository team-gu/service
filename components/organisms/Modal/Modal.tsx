import React from 'react';
import { useSelector } from 'react-redux';
import { MODALS } from '@utils/constants';
import ModalWrapper from './ModalWrapper';
import AlertModal from './AlertModal';

interface ModalProps {
  modalName: string;
}

export default function Modal({ modalName }: ModalProps) {
  const isShow = useSelector(
    (state: { modal: object }) => state.modal[modalName]
  );

  return (
    <>
      {isShow && (
        <ModalWrapper modalName={modalName}>
          {
            {
              [MODALS.ALERT_MODAL]: <AlertModal modalName={modalName} />,
            }[modalName]
          }
        </ModalWrapper>
      )}
    </>
  );
}
