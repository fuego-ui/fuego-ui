import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccordionItemCmp } from './Accordion-item';

export default {
  component: AccordionItemCmp,
  title: 'AccordionItemCmp',
} as ComponentMeta<typeof AccordionItemCmp>;

const Template: ComponentStory<typeof AccordionItemCmp> = (args) => (
  <AccordionItemCmp {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
