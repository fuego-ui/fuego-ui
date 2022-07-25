import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../utils/breakpoints';
export interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  level?: 'primary' | 'secondary' | 'tertiary';
  corners?: 'squared' | 'rounded';
  as?: any;
  linkCmp?: any;
  loading?: boolean;
  loader?: any;
  fullwidth?: boolean;
}

export const ButtonCmp = forwardRef<ButtonProps, any>(
  (
    {
      level = 'primary',
      corners,
      children = '',
      loading = false,
      className = '',
      loader = <div></div>,
      ...props
    },
    ref
  ) => {
    const buttonContent = loading ? loader : children;

    return (
      <button
        className={className}
        as={props.href ? 'a' : 'button'}
        level={level}
        corners={corners}
        $loading={loading}
        loader={loader}
        ref={ref}
        {...props}
      >
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

const fullWidthBtn = css`
  @media ${device.tabletAndbelow} {
    width: 100%;
  }
`;

export const Button = styled(ButtonCmp)`
  padding: 1.5rem 3rem;
  transition: background-color 0.2s, color 0.2s, border 0.2s;
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.3px;
  line-height: 12px;
  border: none;

  // check for explicit setting, else follow theme
  ${({ fullWidth }) => fullWidth && fullWidthBtn}

  ${({ level }) => (level === 'primary' ? primaryBtn : '')}
  ${({ level }) => (level === 'secondary' ? secondaryBtn : '')}
  ${({ level }) => (level === 'tertiary' ? tertiaryBtn : '')}
`;
