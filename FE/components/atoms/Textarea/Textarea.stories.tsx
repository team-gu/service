import { Story } from '@storybook/react';
import Textarea from './Textarea';

export default {
  title: 'Atoms/Textarea',
  component: Textarea,
};

const Template: Story = ({ children, ...rest }) => (
  <Textarea {...rest}>{children}</Textarea>
);
export const textarea = Template.bind({});

textarea.args = {
  children: '이거는 테스트입니다1.',
  rest: ['rows: 5', 'cols:4'],
};
