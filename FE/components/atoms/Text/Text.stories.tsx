import { Story } from '@storybook/react';
import Text from './Text';

export default {
  title: 'Atoms/Text',
  component: Text,
};

const Template: Story = ({ text, fontSetting }) => (
  <Text text={text} fontSetting={fontSetting} />
);
export const text = Template.bind({});

text.args = {
  text: '텍스트 입력됨',
  fontSetting: 'n18b',
};
