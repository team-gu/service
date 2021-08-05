import React, { ChangeEvent } from 'react';
import { Story } from '@storybook/react';
import RadioButton from './RadioButton';
import { Text } from '@atoms';

export default {
  title: 'Molecules/Radio Button',
  component: RadioButton,
};

const Template: Story = ({ text, fontSetting }) => (
  <RadioButton
    func={({ target: { checked } }: ChangeEvent<HTMLInputElement>) =>
      console.log(checked)
    }
  >
    <Text text={text} fontSetting={fontSetting} />
  </RadioButton>
);

export const radioButton = Template.bind({});

radioButton.args = {
  text: '아이디',
  placeHolder: 'id',
};
