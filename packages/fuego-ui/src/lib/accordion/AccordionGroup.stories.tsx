import { ComponentStory, ComponentMeta } from '@storybook/react';
import Accordion, { AccordionGroup } from '.';

export default {
  component: Accordion,
  title: 'Components/Accordion',
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <AccordionGroup {...args}>
    <Accordion label="Item 1">Content 1</Accordion>
    <Accordion label="Item 2">Content 2</Accordion>
  </AccordionGroup>
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Accordion Group';
