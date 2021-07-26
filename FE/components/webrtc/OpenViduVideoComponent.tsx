import { StreamManager } from 'openvidu-browser';
import { ReactElement, useEffect, useRef } from 'react';
import Image from 'next/image';

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
        <Image src={'/profile.svg'} alt="profile" width={'320px'} height={'240px'} objectFit='contain' />
      )}
    </>
  );
}
