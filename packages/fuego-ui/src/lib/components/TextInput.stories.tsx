import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextInput from './TextInput';

export default {
  component: TextInput,
  title: 'Components/Form Fields/TextInput',
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
