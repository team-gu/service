import React from 'react';
import { Story } from '@storybook/react';
import UserSelectAutoComplete from './UserSelectAutoComplete';

export default {
  title: 'Molecules/User Select Auto Complete',
  component: UserSelectAutoComplete,
};

const Template: Story = () => (
  <UserSelectAutoComplete
    handleChangeUserSelect={(value) => console.log(value)}
  />
);

export const userSelectAutoComplete = Template.bind({});
