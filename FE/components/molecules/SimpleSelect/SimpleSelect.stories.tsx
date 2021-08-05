import { Story } from '@storybook/react';
import SimpleSelect from './SimpleSelect';

export default {
  title: 'Molecules/Simple Select',
  component: SimpleSelect,
};

const Template: Story = ({ options, onChange }) => (
  <SimpleSelect options={options} onChange={onChange} />
);

export const simpleSelect = Template.bind({});

simpleSelect.args = {
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
  onChange: (value: string) => console.log(value),
};
