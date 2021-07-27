import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

interface TagProps {
  text: string;
}

const Wrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow()}
  width: fit-content;
  height: 22px;
  padding: 0 10px;
  border-radius: 11px;
  background-color: ${({
    theme: {
      colors: { microBlue },
    },
  }) => microBlue};
  :hover {
    background-color: ${({
      theme: {
        colors: { lightBlue },
      },
    }) => lightBlue};
  }
  user-select: none;
  cursor: pointer;
`;

export default function Tag({ text }: TagProps): ReactElement {
  return (
    <Wrapper>
      <Text text={text} fontSetting="n12b" color="#3B67D4" />
    </Wrapper>
  );
}
