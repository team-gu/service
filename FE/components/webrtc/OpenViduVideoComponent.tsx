import { StreamManager } from 'openvidu-browser';
import { ReactElement, useEffect, useRef } from 'react';
import { ProfileImage } from '@molecules';
import styled from 'styled-components';

interface OpenViduVideoComponentProps {
  streamManager: StreamManager;
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    min-width: 100%;
  }
`;

export default function UserVideoComponent({
  streamManager,
}: OpenViduVideoComponentProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // componentDidUpdate
    if (videoRef && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  });

  return (
    <Wrapper>
      {streamManager.stream.videoActive ? (
        <video autoPlay={true} ref={videoRef} />
      ) : (
        <ProfileImage src={'/profile.png'} size={230} />
      )}
    </Wrapper>
  );
}
