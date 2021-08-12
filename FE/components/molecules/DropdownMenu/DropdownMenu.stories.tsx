import React, { ChangeEvent } from 'react';
import { Story } from '@storybook/react';
import DropdownMenu from './DropdownMenu';
import { Text } from '@atoms';

export default {
  title: 'Molecules/Dropdown Menu',
  component: DropdownMenu,
};

const Template: Story = ({ roomUserList }) => (
  <DropdownMenu roomUserList={roomUserList}>
    <Text text="hello" />
  </DropdownMenu>
);

export const dropdownMenu = Template.bind({});

dropdownMenu.args = {
  roomUserList: [{ user_id: 0, name: '이용재', email: '이용재@ssafy.com' }],
};
