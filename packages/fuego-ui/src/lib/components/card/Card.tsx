import React from 'react';
import styled from 'styled-components';

export const CardCmp = ({ children, className = '' }: any) => {
  return (
    <div className={`min-h-fit shadow-1 p-5 rounded ${className}`}>
      {children}
    </div>
  );
};

export const Card = styled(CardCmp)`
  padding: 2.5rem;
  min-height: 3.4rem;
  position: relative;
  border-radius: 4px;
  background: ${({ theme }) =>
    theme && theme.colorPrimary ? `${theme.primary}` : ''};
`;
