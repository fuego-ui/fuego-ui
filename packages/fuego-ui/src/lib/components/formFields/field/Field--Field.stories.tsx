import { ComponentStory, ComponentMeta } from '@storybook/react';
import { field } from './Field';

export default {
  component: field,
  title: 'field',
} as ComponentMeta<typeof field>;

const Template: ComponentStory<typeof field> = (args) => <field {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
