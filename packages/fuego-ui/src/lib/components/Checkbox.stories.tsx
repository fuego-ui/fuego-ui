import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckboxCmp } from './Checkbox';

export default {
  component: CheckboxCmp,
  title: 'CheckboxCmp',
} as ComponentMeta<typeof CheckboxCmp>;

const Template: ComponentStory<typeof CheckboxCmp> = (args) => (
  <CheckboxCmp {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
