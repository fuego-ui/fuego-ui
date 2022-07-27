import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  level?: 'primary' | 'secondary' | 'tertiary';
  loading?: boolean;
  loader?: any;
}

export const ButtonCmp = forwardRef<ButtonProps, any>(
  (
    {
      level = 'primary',
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
      <a className={`${className}`} ref={ref} {...props}>
        {buttonContent}
      </a>
    ) : (
      <button className={`${className}`} ref={ref} {...props}>
        {buttonContent}
      </button>
    );
  }
);

const primaryBtn = css`
  background-color: ${({ theme }: any) => theme.accent};
  color: ${({ theme }: any) => theme.primary};

  &:hover,
  &:focus {
    background-color: ${({ theme }: any) => theme.primary};
    color: ${({ theme }: any) => theme.accent};
  }

  &:focus-visible {
    outline: 1px dashed ${({ theme }: any) => theme.accent};
    outline-offset: 1px;
  }
`;

const secondaryBtn = css`
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.accent};
  border: 2px solid ${({ theme }: any) => theme.accent};

  &:hover,
  &:focus {
    background-color: ${({ theme }: any) => theme.accent};
    color: ${({ theme }: any) => theme.background};
  }

  &:focus-visible {
    outline: 1px dashed ${({ theme }: any) => theme.accent};
    outline-offset: 1px;
  }
`;

const tertiaryBtn = css`
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.accent};

  &:hover,
  &:focus {
    background-color: ${({ theme }: any) => theme.secondary};
  }

  &:focus-visible {
    outline: 1px dashed ${({ theme }: any) => theme.accent};
    outline-offset: 1px;
  }
`;

export const Button = styled(ButtonCmp)`
  display: inline-block;
  padding: 1.5rem 3rem;
  transition: background-color 0.2s, color 0.2s, border 0.2s;
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.3px;
  line-height: 12px;
  border: none;

  border-radius: ${({ theme }: any) =>
    theme.shape && theme.shape.roundness ? theme.shape.roundness : 0}rem;

  ${({ level }) => (level === 'primary' ? primaryBtn : '')}
  ${({ level }) => (level === 'secondary' ? secondaryBtn : '')}
  ${({ level }) => (level === 'tertiary' ? tertiaryBtn : '')}
`;
