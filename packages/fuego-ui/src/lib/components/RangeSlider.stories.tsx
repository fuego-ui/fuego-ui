import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RangeSliderCmp } from './RangeSlider';

export default {
  component: RangeSliderCmp,
  title: 'RangeSliderCmp',
} as ComponentMeta<typeof RangeSliderCmp>;

const Template: ComponentStory<typeof RangeSliderCmp> = (args) => (
  <RangeSliderCmp {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
