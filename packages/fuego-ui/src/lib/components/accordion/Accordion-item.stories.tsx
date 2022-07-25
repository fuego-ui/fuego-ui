import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccordionItem } from './Accordion-item';

export default {
  component: AccordionItem,
  title: 'Components/Accordion/AccordionItem',
} as ComponentMeta<typeof AccordionItem>;

const Template: ComponentStory<typeof AccordionItem> = (args) => (
  <AccordionItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Accordion Item',
  children: <span>Accordion Content</span>,
};

Primary.storyName = 'Accordion Item';
