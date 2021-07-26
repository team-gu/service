import { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { Story } from '@storybook/react';
import VideoRoomConfigModal from './VideoRoomConfigModal';

export default {
  title: 'webrtc/Video Room Config Modal',
  component: VideoRoomConfigModal,
};

const Template: Story = ({ sessionTitle }) => {
  const [OV, setOV] = useState<OpenVidu>();

  useEffect(() => {
    (async () => {
      import('openvidu-browser')
        .then((OpenViduModule) => {
          setOV(new OpenViduModule.OpenVidu());
        })
        .catch((error) => {
          console.log('openvidu import error: ', error.code, error.message);
        });
    })();
  }, []);

  return (
    <>{OV && <VideoRoomConfigModal OV={OV} sessionTitle={sessionTitle} />}</>
  );
};

export const videoRoomConfigModal = Template.bind({});

videoRoomConfigModal.args = {
  sessionTitle: 'test',
};
