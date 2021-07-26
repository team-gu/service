import React from 'react';
import { Story } from '@storybook/react';
import RegisterComponent from './RegisterComponent';

export default {
  title: 'Organisms/Register Component',
  component: RegisterComponent,
};

const Template: Story = () => <RegisterComponent />;

export const registerComponent = Template.bind({});
