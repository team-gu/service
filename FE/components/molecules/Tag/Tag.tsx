import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';

interface TagProps {
  text: string;
  backgroundColor?: string;
  color?: string;
}

const Wrapper = styled.div<{ backgroundColor: string }>`
  ${({ theme: { flexRow } }) => flexRow()}
  width: fit-content;
  height: 22px;
  padding: 0 10px;
  border-radius: 11px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  user-select: none;
  cursor: pointer;
`;

export default function Tag({
  text,
  backgroundColor = '#E1EDFF',
  color = '#3B67D4',
}: TagProps): ReactElement {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Text text={text} fontSetting="n12b" color={color} />
    </Wrapper>
  );
}
