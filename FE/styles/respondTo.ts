// https://tobbelindstrom.com/blog/how-to-create-a-breakpoint-mixin-with-styled-components/
import { css } from 'styled-components';

const breakPoints: {
  mobile: string;
  iphone: string;
} = {
  mobile: '768px',
  iphone: '375px',
};

// TODO: 타입 정의 해야함
export const respondTo = Object.keys(breakPoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only all and (max-width: ${breakPoints[label]}) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
