import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileImage from './ProfileImage';

export default {
  title: 'Molecules/Profile Image',
  component: ProfileImage,
} as Meta;

const Template: Story = ({ src, isActive }) => (
  <ProfileImage src={src} isActive={isActive} />
);

export const profileImage = Template.bind({});

profileImage.args = {
  src: '/profile.png',
  isActive: true,
};
