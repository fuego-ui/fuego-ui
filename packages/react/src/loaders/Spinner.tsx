import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ className }: any) => {
  return (
    <div className={`${styles['spinner']} ${className}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
