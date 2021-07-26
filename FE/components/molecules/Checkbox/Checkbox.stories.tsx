import React, { ChangeEvent} from 'react';
import { Story } from '@storybook/react';
import Checkbox from './Checkbox';
import { Text } from '@atoms';

export default {
  title: 'Molecules/Checkbox',
  component: Checkbox,
};

const Template: Story = ({ text, fontSetting }) => (
  <Checkbox
    func={({ target: { checked } }: ChangeEvent<HTMLInputElement>) =>
      console.log(checked)
    }
  >
    <Text text={text} fontSetting={fontSetting} />
  </Checkbox>
);

export const checkbox = Template.bind({});

checkbox.args = {
  text: '아이디',
  placeHolder: 'id',
};
