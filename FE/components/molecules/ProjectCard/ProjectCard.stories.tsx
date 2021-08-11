import { Story } from '@storybook/react';
import ProjectCard from './ProjectCard';
import { DateTime } from 'luxon';

export default {
  title: 'Molecules/Project Card',
  component: ProjectCard,
};

const Template: Story = ({ project }) => (
  <ProjectCard
    project={project}
    onClickDelete={() => alert('DELETE')}
    onClickEdit={() => alert('EDIT')}
  />
);

export const projectCard = Template.bind({});

projectCard.args = {
  project: {
    name: '5기 공통 프로젝트',
    id: 0,
    stage: '5기',
    project: '공통',
    track: ['웹 기술', '웹 디자인', '웹 IoT'],
    activeDate: DateTime.fromISO('2021-07-28T17:41:27.699+09:00'),
    startDate: DateTime.fromISO('2021-08-02T00:00:00.000+09:00'),
    endDate: DateTime.fromISO('2021-08-30T00:00:00.000+09:00'),
  },
};
