import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spinner from './Spinner';

export default {
  component: Spinner,
  title: 'Components/Loaders/Spinner',
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
