import React from 'react';
import { Story } from '@storybook/react';
import ProfileContainer from './ProfileContainer';

export default {
  title: 'Molecules/Profile Container',
  component: ProfileContainer,
};

const Template: Story = ({
  src,
  name,
  content,
  time,
  isActive,
  alertNumber,
}) => (
  <ProfileContainer
    src={src}
    name={name}
    content={content}
    time={time}
    isActive={isActive}
    alertNumber={alertNumber}
  />
);

export const profileContainer = Template.bind({});

profileContainer.args = {
  src: '/profile.png',
  name: '싸피',
  content: '안녕하세요',
  time: '11:22 PM',
  isActive: true,
  alertNumber: 100,
};
