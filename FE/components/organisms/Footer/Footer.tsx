import React from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

const Wrapper = styled.footer`
  margin-top: auto;
  width: 100%;
  height: 50px;
  display: flex;
  ${({ theme: { flexRow } }) => flexRow()};
  background: #262626;
  font-size: 5em;
  text-transform: uppercase;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Text text="copyright 2021 SSAFY 5th" color="#666" />
    </Wrapper>
  );
}
