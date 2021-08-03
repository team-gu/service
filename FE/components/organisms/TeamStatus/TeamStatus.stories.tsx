import { Story } from '@storybook/react';
import TeamStatus from './TeamStatus';

export default {
  title: 'Organisms/Team Status',
  component: TeamStatus,
};

const Template: Story = () => <TeamStatus />;

export const teamStatus = Template.bind({});
