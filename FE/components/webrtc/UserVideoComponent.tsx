import { StreamManager } from 'openvidu-browser';
import { ReactElement } from 'react';
import OpenViduVideoComponent from './OpenViduVideoComponent';
import styled from 'styled-components';

interface UserVideoComponentProps {
  streamManager: StreamManager;
}

const NameTagWrapper = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: center;
`;

export default function UserVideoComponent({
  streamManager,
}: UserVideoComponentProps): ReactElement {
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <>
      {streamManager && (
        <Wrapper>
          <OpenViduVideoComponent streamManager={streamManager} />
          <NameTagWrapper>{getNicknameTag()}</NameTagWrapper>
        </Wrapper>
      )}
    </>
  );
}
