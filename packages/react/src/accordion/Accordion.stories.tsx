import { ComponentStory, ComponentMeta } from '@storybook/react';
import Accordion from '.';

export default {
  component: Accordion,
  title: 'Components/Accordion/Accordion',
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Accordion Item',
  children: <span className="flex">Accordion Content</span>,
};

export const Expanded = Template.bind({});
Expanded.args = {
  label: 'Accordion Item',
  children: <span className="accordion">Accordion Content</span>,
  expanded: true,
};
