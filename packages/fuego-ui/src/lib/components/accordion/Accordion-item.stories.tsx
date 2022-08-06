import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccordionItem } from './Accordion-item';

export default {
  component: AccordionItem,
  title: 'Components/Accordion/AccordionItem',
} as ComponentMeta<typeof AccordionItem>;

const Template: ComponentStory<typeof AccordionItem> = (args) => (
  <AccordionItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Accordion Item',
  children: <span>Accordion Content</span>,
};

export const Expanded = Template.bind({});
Expanded.args = {
  label: 'Accordion Item',
  children: <span>Accordion Content</span>,
  expanded: true,
};
