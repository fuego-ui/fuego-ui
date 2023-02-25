import React, { useEffect, useState } from 'react';

export function useOnWindowResize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    updateWidthAndHeight();
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  }, []);

  return {
    width,
    height,
  };
}
