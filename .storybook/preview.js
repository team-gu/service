export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import React from 'react';
import { addDecorator } from '@storybook/react';
import GlobalStyles from '../styles/globalStyles';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import store from '../store';

addDecorator((Story) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  </Provider>
));
