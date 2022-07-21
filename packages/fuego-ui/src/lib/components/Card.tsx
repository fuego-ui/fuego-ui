import React from 'react';

const Card = ({ children, className = '' }: any) => {
  return (
    <div className={`min-h-fit shadow-1 p-5 rounded ${className}`}>
      {children}
    </div>
  );
};

export default Card;
