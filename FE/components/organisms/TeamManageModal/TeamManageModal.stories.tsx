import { useState, useEffect } from 'react';
import { Story } from '@storybook/react';

import TeamManageModal from './TeamManageModal';
import { Button } from '@molecules';
import { Team } from '@utils/type';

export default {
  title: 'Organisms/Team Manage Modal',
  component: TeamManageModal,
};

const Template: Story = () => {
  const [defaultValue, setDefaultValue] = useState<Team>();
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    setDefaultValue(DUMMY);
  }, []);

  return (
    <>
      <Button title="팀 생성 모달" func={() => setShowCreate(!showCreate)} />
      <Button title="팀 관리 모달" func={() => setShowUpdate(!showUpdate)} />
      {showUpdate && (
        <TeamManageModal
          handleClickClose={() => setShowUpdate(false)}
          defaultValue={defaultValue}
          fetchTeams={() => {}}
        />
      )}
      {showCreate && (
        <TeamManageModal
          handleClickClose={() => setShowCreate(false)}
          fetchTeams={() => {}}
        />
      )}
    </>
  );
};

export const teamManageModal = Template.bind({});

const DUMMY: Team = {
  id: 45,
  name: '2021년 8월 9일 18시',
  introduce: '2021년 8월 9일 18시',
  completeYn: 0,
  leaderId: 7,
  track: {
    code: 102,
    codeName: '웹 디자인',
  },
  teamMembers: [
    {
      id: 7,
      name: '안석현',
      img: null,
      email: 'naannaan@naver.com',
    },
  ],
  skills: [
    {
      code: 101,
      codeName: 'Java',
    },
    {
      code: 102,
      codeName: 'Python',
    },
    {
      code: 103,
      codeName: 'C',
    },
    {
      code: 104,
      codeName: 'C++',
    },
    {
      code: 105,
      codeName: 'C#',
    },
    {
      code: 106,
      codeName: 'Vue',
    },
    {
      code: 107,
      codeName: 'React',
    },
  ],
};
