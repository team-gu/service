import { Story } from '@storybook/react';
import FloatingCounter from './FloatingCounter';

export default {
  title: 'webrtc/Floating Counter',
  component: FloatingCounter,
};

const Template: Story = () => <FloatingCounter />;

export const floatingCounter = Template.bind({});
