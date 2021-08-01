import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';

import { Button } from '@molecules';
import { Text } from '@atoms';

interface ChatBubbleSelectProps {
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
  funcAccept,
  funcDecline,
}: ChatBubbleSelectProps): ReactElement {
  return (
    <Wrapper>
      <Text text="팀원 초대 요청" fontSetting="n16b" />
      <div>
        <Button func={funcAccept} title="승인" width="50px" />
        <Button func={funcDecline} title="거절" width="50px" />
      </div>
    </Wrapper>
  );
}
