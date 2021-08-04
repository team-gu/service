import { useState, useEffect } from 'react';
import { Story } from '@storybook/react';

import TeamManageModal from './TeamManageModal';
import { Button } from '@molecules';
import { Team } from '@utils/type';
import { getTeams } from '@repository/baseRepository';

export default {
  title: 'Organisms/Team Manage Modal',
  component: TeamManageModal,
};

const Template: Story = () => {
  const [defaultValue, setDefaultValue] = useState<Team>();
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    getTeams().then((data) => {
      setDefaultValue(data[0]);
    });
  }, []);

  return (
    <>
      <Button title="팀 생성 모달" func={() => setShowCreate(!showCreate)} />
      <Button title="팀 관리 모달" func={() => setShowUpdate(!showUpdate)} />
      {showUpdate && (
        <TeamManageModal
          handleClickClose={() => setShowUpdate(false)}
          defaultValue={defaultValue}
        />
      )}
      {showCreate && (
        <TeamManageModal handleClickClose={() => setShowCreate(false)} />
      )}
    </>
  );
};

export const teamManageModal = Template.bind({});
