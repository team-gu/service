import { Story } from '@storybook/react';
import AdminLayout from './AdminLayout';

export default {
  title: 'Organisms/Admin Layout',
  component: AdminLayout,
};

const Template: Story = () => <AdminLayout />;

export const adminLayout = Template.bind({});
