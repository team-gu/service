import React from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

const Wrapper = styled.footer`
  margin-top: auto;
  width: 100%;
  height: 30px;
  display: flex;
  ${({ theme: { flexRow } }) => flexRow()};
  background: #262626;
  font-size: 5em;
  text-transform: uppercase;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Text
        text="copyright 2021 강승현, 안석현, 이동길, 장동균, 장민호, 이용재"
        color="#666"
      />
    </Wrapper>
  );
}
