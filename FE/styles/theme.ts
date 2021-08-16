import { css, DefaultTheme } from 'styled-components';

const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 'bold',
};

const theme: DefaultTheme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    gray: '#EEEEEE',
    daangn: '#E49143',
    microBlue: '#F3F8FF',
    lightBlue: '#E1EDFF',
    backgroundGray: '#F5F5F7',
    samsungBlue: '#053699',
    samsungLightBlue: '#0378F2',
  },
  layout: {
    pageMaxWidth: '1440px',
    pageContentWidth: '940px',
    pcHeaderHeight: '104px',
    mobileHeaderHeight: '72px',
  },
  flexCol: (justifyContent = 'center', alignItems = 'center') => css`
    display: flex;
    flex-direction: column;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `,
  flexRow: (justifyContent = 'center', alignItems = 'center') => css`
    display: flex;
    flex-direction: row;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `,
  font: {
    n36m: css`
      font-weight: ${fontWeight.medium};
      font-size: 36px;
      line-height: 48px;
    `,
    n26b: css`
      font-weight: ${fontWeight.bold};
      font-size: 26px;
      line-height: 38px;
    `,
    n24m: css`
      font-weight: ${fontWeight.medium};
      font-size: 24px;
      line-height: 36px;
    `,
    n22b: css`
      font-weight: ${fontWeight.bold};
      font-size: 22px;
      line-height: 34px;
    `,
    n22m: css`
      font-weight: ${fontWeight.medium};
      font-size: 22px;
      line-height: 34px;
    `,
    n20b: css`
      font-weight: ${fontWeight.bold};
      font-size: 20px;
      line-height: 32px;
    `,
    n20m: css`
      font-weight: ${fontWeight.medium};
      font-size: 20px;
      line-height: 32px;
    `,
    n18b: css`
      font-weight: ${fontWeight.bold};
      font-size: 18px;
      line-height: 26px;
    `,
    n18m: css`
      font-weight: ${fontWeight.medium};
      font-size: 18px;
      line-height: 26px;
    `,
    n16b: css`
      font-weight: ${fontWeight.bold};
      font-size: 16px;
      line-height: 24px;
    `,
    n16m: css`
      font-weight: ${fontWeight.medium};
      font-size: 16px;
      line-height: 24px;
    `,
    n16r: css`
      font-weight: ${fontWeight.regular};
      font-size: 16px;
      line-height: 24px;
    `,
    n14b: css`
      font-weight: ${fontWeight.bold};
      font-size: 14px;
      line-height: 20px;
    `,
    n14m: css`
      font-weight: ${fontWeight.medium};
      font-size: 14px;
      line-height: 20px;
    `,
    n14r: css`
      font-weight: ${fontWeight.regular};
      font-size: 14px;
      line-height: 20px;
    `,
    n12b: css`
      font-weight: ${fontWeight.bold};
      font-size: 12px;
      line-height: 20px;
    `,
    n12m: css`
      font-weight: ${fontWeight.medium};
      font-size: 12px;
      line-height: 20px;
    `,
    n10m: css`
      font-weight: ${fontWeight.medium};
      font-size: 10px;
      line-height: 12px;
    `,
    ellipse: (wrap = 'nowrap') => css`
      text-overflow: ellipsis;
      white-space: ${wrap};
      overflow: hidden;
      display: block;
    `,
  },
};

export default theme;
