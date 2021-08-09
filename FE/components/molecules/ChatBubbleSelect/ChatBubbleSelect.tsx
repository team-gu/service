import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';

import { Button } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleSelectProps {
  text: string;
  funcAccept: MouseEventHandler<HTMLSpanElement>;
  funcDecline: MouseEventHandler<HTMLSpanElement>;
}

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol('space-around', 'center')}
  width: 120px;
  height: 80px;

  background-color: transparent;

  > div > button {
    height: 30px;

    box-shadow: none;
  }
`;

export default function ChatBubbleSelect({
  text,
  funcAccept,
  funcDecline,
}: ChatBubbleSelectProps): ReactElement {
  return (
    <Wrapper>
      <Text text={text} fontSetting="n16b" />
      <div>
        {funcAccept && <Button func={funcAccept} title="참여" width="50px" />}
        {funcDecline && <Button func={funcDecline} title="거절" width="50px" />}
      </div>
    </Wrapper>
  );
}
