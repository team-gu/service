import { Story } from '@storybook/react';
import { SearchUserBar } from '@molecules';

export default {
  title: 'Molecules/Search User Bar',
  component: SearchUserBar,
};

const Template: Story = () => {
  return <SearchUserBar />;
};

export const searchUserBar = Template.bind({});
