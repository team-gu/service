import styled from 'styled-components';
import { respondTo } from '@styles/respondTo';

export const Wrapper = styled.div`
  min-height: 8400px;
  max-width: ${({
    theme: {
      layout: { pageMaxWidth },
    },
  }) => pageMaxWidth};
  margin: ${({
      theme: {
        layout: { pcHeaderHeight },
      },
    }) => pcHeaderHeight}
    auto 0 auto;

  .sections {
    position: relative;
    overflow: visible;
  }

  ${respondTo.mobile`
    min-height: 10100px;
    margin: ${({
      theme: {
        layout: { mobileHeaderHeight },
      },
    }) => mobileHeaderHeight}
      auto 0 auto;
    max-width: 375px;
    overflow: visible;
    .sections {
      overflow: visible;
    }
  `}
`;
