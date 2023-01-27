import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    href: {
      control: { type: 'text' },
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

export const Default = Template.bind({});
Default.args = {
  label: 'Primary',
  children: 'Primary',
  rounded: true,
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
  className: 'btn-primary',
  children: 'Primary',
  rounded: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
  className: 'btn-secondary',
  children: 'Secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  label: 'Tertiary',
  className: 'btn-accent',
  children: 'Tertiary',
};
