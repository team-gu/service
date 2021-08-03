import { useState } from 'react';
import { Story } from '@storybook/react';

import TeamCreateModal from './TeamCreateModal';
import { Button } from '@molecules';

export default {
  title: 'Organisms/Team Create Modal',
  component: TeamCreateModal,
};

const Template: Story = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <Button title="모달" func={() => setShow(!show)} />
      {show && <TeamCreateModal handleClickClose={() => setShow(false)}></TeamCreateModal>}
    </>
  );
};

export const teamCreateModal = Template.bind({});
