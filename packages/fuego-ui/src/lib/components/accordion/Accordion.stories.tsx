import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Accordion } from './Accordion';
import { AccordionItem } from './Accordion-item';

export default {
  component: Accordion,
  title: 'Components/Accordion',
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args}>
    <AccordionItem label="Item 1">Content 1</AccordionItem>
    <AccordionItem label="Item 2">Content 2</AccordionItem>
  </Accordion>
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Accordion Group';
