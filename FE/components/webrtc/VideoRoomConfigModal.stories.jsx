/* eslint-disable react/jsx-props-no-spreading */
import VideoRoomConfigModal from './VideoRoomConfigModal';

export default {
  title: 'WebRTC/VideoRoomConfigModal',
  component: VideoRoomConfigModal,
};

export const videoRoomConfigModal = () => (
  <VideoRoomConfigModal sessionTitle="MeetInSsafy 님의 세션" />
);
