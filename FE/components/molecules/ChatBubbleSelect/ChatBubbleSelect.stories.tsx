import React from 'react';
import { Story } from '@storybook/react';
import ChatBubbleSelect from './ChatBubbleSelect';

export default {
  title: 'Molecules/Chat Bubble Select',
  component: ChatBubbleSelect,
};

const Template: Story = () => <ChatBubbleSelect />;

export const chatBubbleSelect = Template.bind({});

chatBubbleSelect.args = {};
