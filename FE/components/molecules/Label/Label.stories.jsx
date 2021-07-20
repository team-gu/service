/* eslint-disable react/jsx-props-no-spreading */
import Label from './Label';
import { Input } from '@atoms';
export default {
  title: 'Molecules/Label',
  component: Label,
};

export const label = () => (
  <Label text="아이디">
    <Input placeHolder="아이디" name="id" />
  </Label>
);
