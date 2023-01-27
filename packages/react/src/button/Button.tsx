import React, { forwardRef } from 'react';
import { ButtonProps } from './Button.types';

export const Button = forwardRef<ButtonProps, any>(
  (
    {
      children = '',
      loading = false,
      className = '',
      loader = <div></div>,
      href,
      ...props
    },
    ref
  ) => {
    const buttonContent = loading ? loader : children;

    return href ? (
      <a className={`btn ${className}`} ref={ref} href={href} {...props}>
        {buttonContent}
      </a>
    ) : (
      <button className={`btn ${className}`} ref={ref} {...props}>
        {buttonContent}
      </button>
    );
  }
);

export default Button;
