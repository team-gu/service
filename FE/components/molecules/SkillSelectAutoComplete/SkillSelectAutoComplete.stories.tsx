import React from 'react';
import { Story } from '@storybook/react';
import SkillSelectAutoComplete from './SkillSelectAutoComplete';

export default {
  title: 'Molecules/Skill Select Auto Complete',
  component: SkillSelectAutoComplete,
};

const Template: Story = () => (
  <SkillSelectAutoComplete
    handleChangeSkillSelect={(value) => console.log(value)}
  />
);

export const skillSelectAutoComplete = Template.bind({});
