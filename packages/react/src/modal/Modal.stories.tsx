import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '.';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ModalCmp = Template.bind({});
ModalCmp.args = {
  isShowing: true,
  children: (
    <>
      <h1>WOOW</h1>
      <p>dmksdmlksa</p>
      <button>COol</button>
    </>
  ),
};

export const FullscreenModalCmp = Template.bind({});
FullscreenModalCmp.args = {
  isShowing: true,
  fullscreen: true,
  children: (
    <>
      <h1>Fuego UI Modal</h1>
      <p>Modal Text</p>
      <button>Modal Button</button>
    </>
  ),
};

export const OffsetModal = Template.bind({});
OffsetModal.args = {
  isShowing: true,
  fullscreen: true,
  offset: '20px',
  className: 'bottom-0 !top-auto',
  children: (
    <>
      <h1>Fuego UI Modal</h1>
      <p>Modal Text</p>
      <button>Modal Button</button>
    </>
  ),
};

export const NoBackdropModal = Template.bind({});
NoBackdropModal.args = {
  isShowing: true,
  backdrop: false,
  children: (
    <>
      <h1>Fuego UI Modal</h1>
      <p>Modal Text</p>
      <button>Modal Button</button>
    </>
  ),
};

const ExTemplate: ComponentStory<any> = (args) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>Show Modal</button>
      <Modal isShowing={show} hide={() => setShow(!show)} {...args} />
    </>
  );
};

export const Animation = ExTemplate.bind({});
Animation.args = {
  fullscreen: true,
  children: (
    <>
      <h1>Fuego UI Modal</h1>
      <p>Modal Text</p>
      <button>Modal Button</button>
    </>
  ),
};
