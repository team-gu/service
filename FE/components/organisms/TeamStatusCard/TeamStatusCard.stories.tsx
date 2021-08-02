import { Story } from '@storybook/react';
import TeamStatusCard from './TeamStatusCard';

export default {
  title: 'Organisms/Team Status Card',
  component: TeamStatusCard,
};

const Template: Story = () => <TeamStatusCard />;

export const teamStatusCard = Template.bind({});
