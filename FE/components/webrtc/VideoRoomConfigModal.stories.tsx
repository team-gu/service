import VideoRoomConfigModal from './VideoRoomConfigModal';
import { OpenVidu } from 'openvidu-browser';
import { Story } from '@storybook/react';

export default {
  title: 'webrtc/Video Room Config Modal',
  component: VideoRoomConfigModal,
};

const handlerJoinBtn = () => {
  alert('JOIN');
};

const handlerConfigModalCloseBtn = () => {
  alert('EXIT');
};

const Template: Story = () => (
  <VideoRoomConfigModal
    OV={new OpenVidu()}
    sessionTitle="MeetInSsafy λμ μΈμ"
    handlerJoin={handlerJoinBtn}
    handlerClose={handlerConfigModalCloseBtn}
  />
);

export const videoRoomConfigModal = Template.bind({});
