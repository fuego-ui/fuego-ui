import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '.';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(!show)}>
        Open Modal
      </button>
      <Modal isShowing={show} hide={() => setShow(!show)} {...args} />
    </>
  );
};

export const ModalCmp = Template.bind({});
ModalCmp.args = {
  children: (
    <>
      <h3 className="font-bold text-lg">
        Congratulations random Internet user!
      </h3>
      <p className="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div className="modal-action">
        <button className="btn">Yay!</button>
      </div>
    </>
  ),
};

export const FullscreenModalCmp = Template.bind({});
FullscreenModalCmp.args = {
  fullscreen: true,
  children: (
    <>
      <h3 className="font-bold text-lg">
        Congratulations random Internet user!
      </h3>
      <p className="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div className="modal-action">
        <button className="btn">Yay!</button>
      </div>
    </>
  ),
};

// export const OffsetModal = Template.bind({});
// OffsetModal.args = {
//   isShowing: true,
//   fullscreen: true,
//   offset: '20px',
//   className: 'bottom-0 !top-auto',
//   children: (
//     <>
//       <h1>Fuego UI Modal</h1>
//       <p>Modal Text</p>
//       <button>Modal Button</button>
//     </>
//   ),
// };
