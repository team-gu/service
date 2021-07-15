import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@hooks';
import { get } from '@utils/snippet';

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: none;
  z-index: 1000;

  .loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #555; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Content = styled.div`
  display: inline-block;
  border-radius: 10px;
  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.04);
  margin: 0 auto;
  outline: none;
`;

export default function Spinner() {
  const { isLoading } = useAppSelector(get('ui'));

  console.log(isLoading);

  return (
    <>
      {isLoading && (
        <>
          <Background />
          <Wrapper tabIndex={-1}>
            <Content tabIndex={0}>
              <div className="loader"></div>
            </Content>
          </Wrapper>
        </>
      )}
    </>
  );
}
