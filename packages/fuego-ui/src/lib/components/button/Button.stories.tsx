import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    level: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
    theme: {
      table: {
        disable: true,
      },
    },
    as: {
      table: {
        disable: true,
      },
    },
    forwardedAs: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  level: 'primary',
  label: 'Primary',
  children: 'Primary',
  rounded: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
  level: 'secondary',
  children: 'Secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  label: 'Tertiary',
  level: 'tertiary',
  children: 'Tertiary',
};
