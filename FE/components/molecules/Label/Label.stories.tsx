import React from 'react';
import { Story } from '@storybook/react';
import Label from './Label';
import { Input } from '@atoms';

export default {
  title: 'Molecules/Label',
  component: Label,
};

const Template: Story = ({ text, placeHolder }) => (
  <Label text={text}>
    <Input placeHolder={placeHolder} name="id" />
  </Label>
);

export const label = Template.bind({});

label.args = {
  text: '아이디',
  placeHolder: 'id',
};
