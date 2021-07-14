import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import type { AppProps } from 'next/app';

import { Modal, Navbar } from '@organisms';
import { Spinner } from '@molecules';
import { MODALS } from '@utils/constants';
import GlobalStyle from '@styles/globalStyles';

import store from '@store';
import theme from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <section style={{ marginTop: '83px' }}>
          <Component {...pageProps} />
        </section>
        <Modal modalName={MODALS.ALERT_MODAL} />
        <Spinner />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
