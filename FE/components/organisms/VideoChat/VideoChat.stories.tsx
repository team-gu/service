import { Story } from '@storybook/react';

import VideoChat from './VideoChat';

export default {
  title: 'Organisms/Video Chat',
  component: VideoChat,
};

const Template: Story = () => <VideoChat />;

export const videoChat = Template.bind({});
