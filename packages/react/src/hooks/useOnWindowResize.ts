import React, { useEffect, useState } from 'react';

export function useOnWindowResize() {
  const [width, setWidth] = useState(window ? window.innerWidth : 0);
  const [height, setHeight] = useState(window ? window.innerHeight : 0);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window && window.addEventListener('resize', updateWidthAndHeight);
    return () =>
      window && window.removeEventListener('resize', updateWidthAndHeight);
  });

  return {
    width,
    height,
  };
}
