import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import type { AppProps } from 'next/app';

import store from '@store';
import theme from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
