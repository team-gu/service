/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Input from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const input = () => <Input type="password" placeHolder="test" />;
