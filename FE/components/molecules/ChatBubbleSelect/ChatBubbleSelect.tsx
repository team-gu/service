import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';

import { Button } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleSelectProps {
  userName: string;
  funcAccept: MouseEventHandler<HTMLSpanElement>;
  funcDecline: MouseEventHandler<HTMLSpanElement>;
}

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol('space-around', 'center')}
  width: 140px;
  height: 100px;

  border-radius: 0px 16px 16px 16px;
  background-color: ${({
    theme: {
      colors: { microBlue },
    },
  }) => microBlue};

  > div > button {
    height: 30px;

    box-shadow: none;
    margin: 5px;
  }
`;

export default function ChatBubbleSelect({
  userName,
  funcAccept,
  funcDecline,
}: ChatBubbleSelectProps): ReactElement {
  return (
    <Wrapper>
      <Text text={`${userName} 팀에게 가입 권유를 받았습니다 [수락/거절]`} fontSetting="n16b" />
      <div>
        <Button func={funcAccept} title="수락" width="50px" />
        <Button func={funcDecline} title="거절" width="50px" />
      </div>
    </Wrapper>
  );
}
