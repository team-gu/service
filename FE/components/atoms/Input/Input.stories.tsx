import { Story } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
};

const Template: Story = ({ type, placeHolder }) => (
  <Input type={type} placeHolder={placeHolder} />
);

export const input = Template.bind({});

input.args = {
  type: "password",
  placeHolder: "password"
};
