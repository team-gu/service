import { Story } from '@storybook/react';
import Icon from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
};

const Template: Story = ({ iconName, size, color }) => (
  <Icon iconName={iconName} size={size} color={color} />
);

export const icon = Template.bind({});

icon.args = {
  iconName: 'search',
  size: '50px',
  color: 'gray',
};
