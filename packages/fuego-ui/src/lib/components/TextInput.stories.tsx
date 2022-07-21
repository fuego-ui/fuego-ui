import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInputCmp } from './TextInput';

export default {
  component: TextInputCmp,
  title: 'TextInputCmp',
} as ComponentMeta<typeof TextInputCmp>;

const Template: ComponentStory<typeof TextInputCmp> = (args) => (
  <TextInputCmp {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
