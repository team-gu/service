import { Meta } from '@storybook/react';
import UserDetail from './UserDetail';

export default {
  title: 'Organisms/User Detail',
  component: UserDetail,
} as Meta;

const Template = () => <UserDetail />;

export const userDetail = Template.bind({});
