import { StreamManager } from 'openvidu-browser';
import { ReactElement, useEffect, useRef } from 'react';
import { ProfileImage } from '@molecules';
import styled from 'styled-components';

interface OpenViduVideoComponentProps {
  streamManager: StreamManager;
}

const Wrapper = styled.div`
  > div {
    margin: 0 auto;
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
        <ProfileImage src={'/profile.png'} size={240} />
      )}
    </Wrapper>
  );
}
