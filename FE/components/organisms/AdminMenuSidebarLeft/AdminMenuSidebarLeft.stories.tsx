import { Story } from '@storybook/react';
import AdminMenuSidebarLeft from './AdminMenuSidebarLeft';

export default {
  title: 'Organisms/Admin Menu Sidebar Left',
  component: AdminMenuSidebarLeft,
};

const Template: Story = ({ projects }) => (
  <AdminMenuSidebarLeft
    changeMenu={(menuIndex) => console.log(menuIndex)}
    changeProject={(projectId) => console.log(projectId)}
    projects={projects}
  />
);

export const adminMenuSidebarLeft = Template.bind({});

adminMenuSidebarLeft.args = {
  projects: [
    {
      id: 0,
      name: '5기 공통 프로젝트',
    },
    {
      id: 1,
      name: '5기 특화 프로젝트',
    },
    {
      id: 2,
      name: '5기 자율 프로젝트',
    },
  ],
};