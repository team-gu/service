import styled from 'styled-components';
import { respondTo } from '@styles/respondTo';

export const Wrapper = styled.div`
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
