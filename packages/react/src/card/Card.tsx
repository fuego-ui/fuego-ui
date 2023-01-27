import React from 'react';

export const Card = ({ children, className = '' }: any) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
