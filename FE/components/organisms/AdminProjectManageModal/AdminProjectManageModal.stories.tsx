import { useState } from 'react';
import { Story } from '@storybook/react';
import AdminProjectManageModal from './AdminProjectManageModal';

export default {
  title: 'Organisms/Admin Project Manage Modal',
  component: AdminProjectManageModal,
};

const Template: Story = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <button onClick={() => setShow(true)}>모달</button>
      {show && (
        <AdminProjectManageModal
          handleClickClose={() => setShow(false)}
          closeModalAndRerender={() => {}}
        />
      )}
    </>
  );
};

export const adminProjectManageModal = Template.bind({});
