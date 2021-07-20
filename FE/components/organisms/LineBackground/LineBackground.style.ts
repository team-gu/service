import styled from 'styled-components';
import { respondTo } from '@styles/respondTo';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translate(-50%);
  top: 350px;
  pointer-events: none;
  z-index: 1;

  svg {
    position: relative;
    left: 95px;
    height: auto;
  }

  ${respondTo.mobile`
    top: 250px;
    svg {
      left: 40px;
    }
    svg path {
      stroke-width: 2.5px;
    }
  `}

  .LinePath,
  .LineStrokePath {
    transform-origin: 23px 23px;
    stroke-dasharray: 0 100000;

    &.LinePathGray {
      stroke: #999;
      opacity: 0.1;
    }
  }

  .AirPlanePath {
    transform-origin: 23px 23px;
    opacity: 0;
    z-index: 2;
  }
`;
