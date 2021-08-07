import { Story } from '@storybook/react';
import AdminMenuSidebarLeft from './AdminMenuSidebarLeft';
import styled from 'styled-components';

export default {
  title: 'Organisms/Admin Menu Sidebar Left',
  component: AdminMenuSidebarLeft,
};

const Wrapper = styled.div`
  display: flex;

  > div:nth-child(1) {
    flex: 0 0 200px;
  }
  > div:nth-child(2) {
    flex: auto;
  }
`;

const Template: Story = ({ projects }) => (
  <Wrapper>
    <AdminMenuSidebarLeft
      onChangeMenu={(menuIndex) => console.log(menuIndex)}
      onChangeProject={(projectId) => console.log(projectId)}
      projects={projects}
    />
    <div></div>
  </Wrapper>
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