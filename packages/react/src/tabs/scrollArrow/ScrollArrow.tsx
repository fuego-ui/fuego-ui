import React from 'react';
import { Direction } from '../Tabs.types';
import styles from './scrollArrow.module.css';

export interface IScrollArrow {
  direction: Direction;
  disabled: boolean;
  onClick: (direction: Direction) => void;
}

const ScrollArrow = ({
  direction,
  disabled = false,
  onClick,
}: IScrollArrow) => {
  const onClickHandler = () => onClick && onClick(direction);
  return (
    <button
      className={`${styles['tabs-arrow']} ${
        direction === 'right' ? styles['right-arrow'] : styles['left-arrow']
      }`}
      onClick={onClickHandler}
      disabled={disabled}
    ></button>
  );
};

export default ScrollArrow;
