import { ComponentStory, ComponentMeta } from '@storybook/react';
import { thirdPartyLink } from './Button.test';

export default {
  component: thirdPartyLink,
  title: 'thirdPartyLink',
} as ComponentMeta<typeof thirdPartyLink>;

const Template: ComponentStory<typeof thirdPartyLink> = (args) => (
  <thirdPartyLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
