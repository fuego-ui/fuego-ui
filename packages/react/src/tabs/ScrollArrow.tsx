import React from 'react';

export interface IScrollArrow {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: Fn;
}

const ScrollArrow = ({ direction, disabled, onClick }) => {
  return <div>ScrollArrow</div>;
};

export default ScrollArrow;
