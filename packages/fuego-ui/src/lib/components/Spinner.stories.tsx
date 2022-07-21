import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SpinnerCmp } from './Spinner';

export default {
  component: SpinnerCmp,
  title: 'SpinnerCmp',
} as ComponentMeta<typeof SpinnerCmp>;

const Template: ComponentStory<typeof SpinnerCmp> = (args) => (
  <SpinnerCmp {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
