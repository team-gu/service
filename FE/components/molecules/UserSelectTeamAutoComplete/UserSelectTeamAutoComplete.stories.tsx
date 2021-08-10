import React from 'react';
import { Story } from '@storybook/react';
import UserSelectTeamAutoComplete from './UserSelectTeamAutoComplete';

export default {
  title: 'Molecules/User Select Team Auto Complete',
  component: UserSelectTeamAutoComplete,
};

const Template: Story = () => (
  <UserSelectTeamAutoComplete
    handleChangeUserSelect={(value) => console.log(value)}
  />
);

export const userSelectTeamAutoComplete = Template.bind({});
