/* eslint-disable react/jsx-props-no-spreading */
import VideoChatToolbar from './VideoChatToolbar';

export default {
  title: 'WebRTC/VideoChatToolbar',
  component: VideoChatToolbar,
};

export const videoChatToolbar = () => (
  <VideoChatToolbar
    micOn={false}
    camOn={false}
    handleClickVideoOff={() => alert('Video Off')}
    handleClickVideoOn={() => alert('Video On')}
    handleClickAudioOff={() => alert('Audio Off')}
    handleClickAudioOn={() => alert('Audio On')}
    handleClickExit={() => alert('Exit')}
  />
);
