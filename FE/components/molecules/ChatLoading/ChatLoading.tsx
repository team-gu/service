import { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .typing__dot {
    float: left;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background: #8d8c91;
    border-radius: 50%;
    opacity: 0;
    animation: loadingFade 1s infinite;
  }

  .typing__dot:nth-child(1) {
    animation-delay: 0s;
  }

  .typing__dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing__dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loadingFade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default function ChatLoading(): ReactElement {
  return (
    <Wrapper>
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
    </Wrapper>
  );
}
