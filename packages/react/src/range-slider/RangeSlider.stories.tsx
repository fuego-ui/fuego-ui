import { ComponentStory, ComponentMeta } from '@storybook/react';
import RangeSlider from './RangeSlider';

export default {
  component: RangeSlider,
  title: 'Components/Form Fields/RangeSlider',
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = (args) => (
  <RangeSlider {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

Primary.storyName = 'RangeSlider';
