import { Meta } from '@storybook/react';
import Navbar from './Navbar';

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
} as Meta;

const Template = () => <Navbar />;

export const navbar = Template.bind({});
