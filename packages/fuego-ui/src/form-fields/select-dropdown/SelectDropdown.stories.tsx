import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectDropdown from './SelectDropdown';

export default {
  component: SelectDropdown,
  title: 'Components/Form Fields/Select',
} as ComponentMeta<typeof SelectDropdown>;

const Template: ComponentStory<typeof SelectDropdown> = (args) => (
  <SelectDropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
