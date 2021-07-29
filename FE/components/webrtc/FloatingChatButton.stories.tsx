import { Story } from '@storybook/react';
import FloatingChatButton from './FloatingChatButton';

export default {
  title: 'webrtc/Floating Chat Button',
  component: FloatingChatButton,
};

const Template: Story = () => <FloatingChatButton handleClick={() => alert('클릭')} />;

export const floatingChatButton = Template.bind({});
