import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Draggable } from './Draggble';

export default {
  component: Draggable,
  title: 'Draggable',
} as ComponentMeta<typeof Draggable>;

const Template: ComponentStory<typeof Draggable> = (args) => (
  <Draggable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
