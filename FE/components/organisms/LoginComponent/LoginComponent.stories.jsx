/* eslint-disable react/jsx-props-no-spreading */
import LoginComponent from './LoginComponent';

export default {
  title: 'Organisms/LoginComponent',
  component: LoginComponent,
};

export const loginComponent = () => (
  <LoginComponent type="password" placeHolder="test" />
);
