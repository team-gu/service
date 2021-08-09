import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';

import { Modal, Layout } from '@organisms';
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {Object.keys(MODALS).map((each, idx) => (
          <Modal modalName={MODALS[each]} key={idx} />
        ))}
        <Spinner />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
