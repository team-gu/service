/* eslint-disable react/jsx-props-no-spreading */
import Input from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const input = () => <Input type="password" placeHolder="test" />;
