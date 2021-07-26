import React from 'react';
import { Story } from '@storybook/react';
import LineBackground from './LineBackground';

export default {
  title: 'Organisms/Line Background',
  component: LineBackground,
};

const Template: Story = () => <LineBackground />;

export const lineBackground = Template.bind({});
