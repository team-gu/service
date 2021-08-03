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
  position: relative;

  video {
    min-width: 100%;
  }

  .alt-image {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: -1px;
    right: 0;
    background-color: white;
    box-shadow: 0px 0px 10px 1px rgb(0 0 255 / 20%);

    > div {
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
`;

export default function OpenViduVideoComponent({
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
      <video autoPlay={true} ref={videoRef} />
      {!streamManager.stream.videoActive && (
        <div className="alt-image">
          <ProfileImage src={'/profile.png'} size={230} />
        </div>
      )}
    </Wrapper>
  );
}
