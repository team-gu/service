import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@styles/theme';
import GlobalStyle from '@styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
