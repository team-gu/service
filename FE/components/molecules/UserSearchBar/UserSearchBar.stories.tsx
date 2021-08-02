import { Story } from '@storybook/react';
import { UserSearchBar } from '@molecules';

export default {
  title: 'Molecules/User Search Bar',
  component: UserSearchBar,
};

const Template: Story = () => {
  return <UserSearchBar />;
};

export const userSearchBar = Template.bind({});
