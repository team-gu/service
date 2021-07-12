/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Login from './Login';

export default {
  title: 'Molecules/Login',
  component: Login,
};

export const login = () => <Login type="password" placeHolder="test" />;
