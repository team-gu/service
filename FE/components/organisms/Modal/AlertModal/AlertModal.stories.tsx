import { Story } from '@storybook/react';
import { useAppDispatch, displayModal } from '@store';
import { MODALS } from '@utils/constants';
import Modal from '../Modal';

export default {
  title: 'Organisms/Alert Modal',
  component: Modal,
};

const Template: Story = () => {
  const dispatch = useAppDispatch();

  const modalName = MODALS.ALERT_MODAL;
  const content = 'Hello Alert Modal';
  dispatch(displayModal({ modalName, content }));

  return <Modal modalName={MODALS.ALERT_MODAL}></Modal>;
};;

export const alertModal = Template.bind({});
