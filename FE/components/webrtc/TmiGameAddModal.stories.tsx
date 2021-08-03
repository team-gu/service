import TmiGameAddModal from './TmiGameAddModal';
import { Story } from '@storybook/react';

export default {
  title: 'webrtc/Tmi Game Add Modal',
  component: TmiGameAddModal,
};

const Template: Story = () => (
  <TmiGameAddModal />
);

export const tmiGameAddModal = Template.bind({});
