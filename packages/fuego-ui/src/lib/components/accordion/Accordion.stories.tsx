import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Accordion } from './Accordion';

export default {
  component: Accordion,
  title: 'Accordion',
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
