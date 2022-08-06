import React from 'react';
import styled, { css } from 'styled-components';

export const CardCmp = ({ children, className = '' }: any) => {
  return (
    <div className={`min-h-fit p-5 shadow-lg ${className}`}>{children}</div>
  );
};

const primaryCard = css`
  background: ${({ theme }) => theme && theme.primary};
  color: ${({ theme }) => theme && theme.contrastText};
`;

const secondaryCard = css`
  background: ${({ theme }) => theme && theme.background};
  color: ${({ theme }) => theme && theme.contrastBackground};
`;

export const Card = styled(CardCmp)`
  padding: 2.5rem;
  min-height: 3.4rem;
  position: relative;
  border-radius: 4px;

  ${({ level }) => {
    if (level === 'secondary') {
      return secondaryCard;
    }
    return primaryCard;
  }}
`;
