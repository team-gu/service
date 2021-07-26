import { Story } from '@storybook/react';
import VideoChatToolbar from './VideoChatToolbar';

export default {
  title: 'webrtc/VideoChatToolbar',
  component: VideoChatToolbar,
};

const Template: Story = () => (
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

export const videoChatToolbar = Template.bind({});
