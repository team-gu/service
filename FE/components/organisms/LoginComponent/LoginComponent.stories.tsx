import React from 'react';
import { Story } from '@storybook/react';
import LoginComponent from './LoginComponent';

export default {
  title: 'Organisms/Login Component',
  component: LoginComponent,
};

const Template: Story = () => <LoginComponent />;

export const loginComponent = Template.bind({});
