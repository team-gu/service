import { Meta, Story } from '@storybook/react';
import Layout from './Layout';

export default {
  title: 'Organisms/Layout',
  component: Layout,
} as Meta;

const Template: Story = ({ children }) => <Layout>{children}</Layout>;

export const layout = Template.bind({});
