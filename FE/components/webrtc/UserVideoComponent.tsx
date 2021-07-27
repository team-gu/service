import { StreamManager } from 'openvidu-browser';
import { ReactElement } from 'react';
import OpenViduVideoComponent from './OpenViduVideoComponent';
import styled from 'styled-components';

interface UserVideoComponentProps {
  streamManager: StreamManager;
}

const NameTagWrapper = styled.div`
  position: absolute;
  top: 0;
  background-color: black;
  color: white;
  padding: 3px 5px;
`;

const Wrapper = styled.div`
  position: relative;
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
