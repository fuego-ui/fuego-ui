import React, { useEffect } from 'react';

export function useOnWindowResize() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

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
