import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Video } from './Video';

export default {
  component: Video,
  title: 'Video',
} as ComponentMeta<typeof Video>;

const Template: ComponentStory<typeof Video> = (args) => <Video {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
