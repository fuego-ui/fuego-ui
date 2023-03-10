import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from '.';
import Tab from '../tab';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    fullWidth: {
      type: 'boolean',
    },
    scrollable: {
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tab label="tab1">
      <div>
        <p>Tab 1</p>
      </div>
    </Tab>
    <Tab label="Tab 2 with a big name">
      <div>
        <p>Tab 2 with a big name</p>
      </div>
    </Tab>
  </Tabs>
);

const ScrollTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tab label="tab1" className="woo">
      <div>
        <p>Tab 1</p>
      </div>
    </Tab>
    <Tab label="tab2">
      <div>
        <p>Tab 2</p>
      </div>
    </Tab>
    <Tab label="tab3">
      <div>
        <p>Tab 3</p>
      </div>
    </Tab>
    <Tab label="tab4">
      <div>
        <p>Tab 4</p>
      </div>
    </Tab>
    <Tab label="tab5">
      <div>
        <p>Tab 5</p>
      </div>
    </Tab>
    <Tab label="tab6">
      <div>
        <p>Tab 6</p>
      </div>
    </Tab>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {};

export const OverrideHighlight = Template.bind({});
OverrideHighlight.args = {
  highlightClassName: 'bg-accent',
};

export const SimpleBordered = Template.bind({});
SimpleBordered.args = {
  tabClassName: 'tab-bordered',
  noHighlight: true,
};

export const LiftedTabs = Template.bind({});
LiftedTabs.args = {
  tabClassName: 'tab-lifted',
  noHighlight: true,
};

export const BoxedTabs = Template.bind({});
BoxedTabs.args = {
  className: 'tabs-boxed',
  noHighlight: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const Scrollable = ScrollTemplate.bind({});
Scrollable.args = {
  scrollable: true,
};
