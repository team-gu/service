import VideoRoomConfigModal from './VideoRoomConfigModal';
import { OpenVidu } from 'openvidu-browser';

export default {
  title: 'WebRTC/VideoRoomConfigModal',
  component: VideoRoomConfigModal,
};

const handlerJoinBtn = () => {
  alert('JOIN');
}

const handlerConfigModalCloseBtn = () => {
  alert('EXIT');
}

export const videoRoomConfigModal = () => (
  <VideoRoomConfigModal 
    OV={new OpenVidu()}
    sessionTitle="MeetInSsafy 님의 세션" 
    handlerJoin={handlerJoinBtn}
    handlerClose={handlerConfigModalCloseBtn}
  />
);
