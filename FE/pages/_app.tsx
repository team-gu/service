import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';

import { Modal, Navbar, Footer } from '@organisms';
import { Spinner } from '@molecules';
import { MODALS } from '@utils/constants';
import styled from 'styled-components';
import GlobalStyle from '@styles/globalStyles';
import store from '@store';
import theme from '@styles/theme';

const Wrapper = styled.section`
  min-height: calc(100vh - 150px);
  margin-top: 100px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <Footer />
        <Modal modalName={MODALS.ALERT_MODAL} />
        <Spinner />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
