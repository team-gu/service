import { Story } from '@storybook/react';
import AdminMenuSidebarLeft from './AdminMenuSidebarLeft';
import styled from 'styled-components';
import { DUMMY_PROJECTS } from '@utils/dummy';

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
  projects: DUMMY_PROJECTS,
};