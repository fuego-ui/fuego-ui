import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  title: 'Components/Form Fields/Checkbox',
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

const RemoteTemplate: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Checkbox {...args} value={checked} />
      <button
        onClick={() => {
          setChecked(!checked);
        }}
      >
        Click Me
      </button>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Checkbox';

export const Secondary = Template.bind({});
Secondary.args = { children: 'Check Me' };
Secondary.storyName = 'Checkbox with Text';

export const Tertiary = Template.bind({});
Tertiary.args = { children: 'Check Me', value: true };
Tertiary.storyName = 'Checkbox with Initial Value';

export const Remote = RemoteTemplate.bind({});
Remote.args = { children: 'Check Me', value: true };
Remote.storyName = 'Checkbox with Initial Value';
