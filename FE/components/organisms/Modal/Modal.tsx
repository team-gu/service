import { ReactElement } from 'react';
import { useModalState } from '@store';
import { MODALS } from '@utils/constants';
import ModalWrapper from './ModalWrapper';
import AlertModal from './AlertModal';
import HocModal from './HocModal';
import {
  ProjectModal,
  AwardModal,
  ChangePasswordModal,
} from '../UserDetail/MyDetail/Modal';

interface ModalProps {
  modalName: string;
  children?: ReactElement;
}

export default function Modal({
  modalName,
  children,
}: ModalProps): ReactElement {
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
              [MODALS.HOC_MODAL]: <HocModal>{children}</HocModal>,
              [MODALS.CHANGEPASSWORD_MODAL]: <ChangePasswordModal />,
            }[modalName]
          }
        </ModalWrapper>
      )}
    </>
  );
}
