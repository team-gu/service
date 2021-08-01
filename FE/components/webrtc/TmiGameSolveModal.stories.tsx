import TmiGameSolveModal from './TmiGameSolveModal';
import { Story } from '@storybook/react';

export default {
  title: 'webrtc/Tmi Game Solve Modal',
  component: TmiGameSolveModal,
};

const Template: Story = () => <TmiGameSolveModal />;

export const tmiGameSolveModal = Template.bind({});
