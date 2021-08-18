import React from 'react';
import { Story } from '@storybook/react';
import QuillEditor from './QuillEditor';

export default {
  title: 'Molecules/Quill Editor',
  component: QuillEditor,
};

const Template: Story = ({ theme }) => <QuillEditor theme={theme} />;

export const quillEditor = Template.bind({});

quillEditor.args = {
  theme: 'snow',
};
