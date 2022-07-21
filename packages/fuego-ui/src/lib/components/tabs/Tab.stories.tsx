import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TabComponent } from './Tab';

export default {
  component: TabComponent,
  title: 'TabComponent',
} as ComponentMeta<typeof TabComponent>;

const Template: ComponentStory<typeof TabComponent> = (args) => (
  <TabComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
