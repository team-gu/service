import { StreamManager } from 'openvidu-browser';
import { ReactElement, useEffect, useRef } from 'react';

interface OpenViduVideoComponentProps {
  streamManager: StreamManager;
}

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
    <>
      {streamManager.stream.videoActive && (
        <video autoPlay={true} ref={videoRef} />
      )}
      {!streamManager.stream.videoActive && (
        <div>대체이미지!대체이미지!대체이미지!대체이미지!대체이미지!</div>
      )}
    </>
  );
}
