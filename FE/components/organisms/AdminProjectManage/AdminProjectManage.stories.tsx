import React from 'react';
import { Story, Meta } from '@storybook/react';
import AdminProjectManage from './AdminProjectManage';
import { DUMMY_PROJECTS } from '@utils/dummy';

export default {
  title: 'Organisms/Admin Project Manage',
  component: AdminProjectManage,
} as Meta;

const Template: Story = () => (
  <AdminProjectManage
    projects={DUMMY_PROJECTS}
    fetchProjects={() => console.log('fetchProjects')}
  />
);

export const adminProjectManage = Template.bind({});
