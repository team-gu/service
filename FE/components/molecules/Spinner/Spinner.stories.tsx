import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useAppDispatch, setLoading } from '@store';

import Spinner from './Spinner';
import { useEffect } from 'react';

export default {
  title: 'Molecules/Spinner',
  component: Spinner,
  argTypes: {
    mode: {
      options: ['on', 'off'],
      control: { type: 'radio' },
      defaultValue: 'on',
    },
  },
} as Meta;

const Template: Story = ({ mode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mode === 'on') {
      dispatch(setLoading({ isLoading: true }));
    }
    if (mode === 'off') {
      dispatch(setLoading({ isLoading: false }));
    }
  }, [mode]);

  return <Spinner />;
};

export const spinner = Template.bind({});
