import { useState } from 'react';
import { Story } from '@storybook/react';
import AdminUserManageModal from './AdminUserManageModal';

export default {
  title: 'Organisms/Admin User Manage Modal',
  component: AdminUserManageModal,
};

const defaultValue = {
  email: 'ssafy@ssafy.com',
  name: '김싸피',
  studentNumber: '0540011',
  major: {
    code: 1,
    codeName: '전공',
  },
  studentClass: { value: 1, label: '서울 1반' },
  exitYn: {
    code: 1,
    codeName: '교육생',
  },
  projectActivate: '활성',
};

const Template: Story = () => {
  const [show, setShow] = useState('');
  return (
    <>
      <button onClick={() => setShow('추가')}>추가</button>
      <button onClick={() => setShow('수정')}>수정</button>
      {show === '추가' && (
        <AdminUserManageModal
          handleClickClose={() => setShow('')}
        />
      )}
      {show === '수정' && (
        <AdminUserManageModal
          handleClickClose={() => setShow('')}
          defaultValue={defaultValue}
        />
      )}
    </>
  );
};

export const adminUserManageModal = Template.bind({});
