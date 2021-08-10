import React from 'react';
import { Story, Meta } from '@storybook/react';
import AdminDashboard from './AdminDashboard';

export default {
  title: 'Organisms/Admin Dashboard',
  component: AdminDashboard,
} as Meta;

const Template: Story = () => <AdminDashboard />;

export const adminDashboard = Template.bind({});
