import { ReactElement } from 'react';
import { useModalState } from '@store';
import { MODALS } from '@utils/constants';
import ModalWrapper from './ModalWrapper';
import AlertModal from './AlertModal';
import { ProjectModal, AwardModal } from '../UserDetail/MyDetail/Modal';

interface ModalProps {
  modalName: string;
}

export default function Modal({ modalName }: ModalProps): ReactElement {
  const isShow = useModalState();

  return (
    <>
      {isShow[modalName] && (
        <ModalWrapper modalName={modalName}>
          {
            {
              [MODALS.ALERT_MODAL]: <AlertModal modalName={modalName} />,
              [MODALS.PROJECT_MODAL]: <ProjectModal />,
              [MODALS.AWARD_MODAL]: <AwardModal />,
            }[modalName]
          }
        </ModalWrapper>
      )}
    </>
  );
}
