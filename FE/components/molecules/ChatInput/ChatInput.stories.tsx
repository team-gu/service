import React from 'react';
import { Story } from '@storybook/react';
import ChatInput from './ChatInput';

export default {
  title: 'Molecules/Chat Input',
  component: ChatInput,
};

const Template: Story = ({ func }) => <ChatInput func={func} />;

export const chatInput = Template.bind({});

chatInput.args = { func: (value: string) => console.log(value) };
