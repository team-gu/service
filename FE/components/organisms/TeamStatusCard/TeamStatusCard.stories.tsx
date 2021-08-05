import { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import TeamStatusCard from './TeamStatusCard';
import { Team } from '@utils/type';
import { getTeams } from '@repository/baseRepository';

export default {
  title: 'Organisms/Team Status Card',
  component: TeamStatusCard,
};

const Template: Story = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);
    });
  }, []);
  return (
    <>
      {teams.map((team) => (
        <TeamStatusCard
          team={team}
          onClickTeamManage={() => alert('팀 관리')}
        />
      ))}
    </>
  );
};

export const teamStatusCard = Template.bind({});
