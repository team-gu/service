import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';
import { skillColor } from '@utils/constants';

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
  const skillFontColor = skillColor.get(text) ? skillColor.get(text)[0] : color;

  const skillBackgroundColor = skillColor.get(text)
    ? skillColor.get(text)[1]
    : backgroundColor;

  return (
    <Wrapper backgroundColor={skillBackgroundColor}>
      <Text text={text} fontSetting="n12b" color={skillFontColor} />
    </Wrapper>
  );
}
