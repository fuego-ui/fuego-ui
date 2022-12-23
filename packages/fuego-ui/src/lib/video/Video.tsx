import React, { forwardRef, useState } from 'react';

const Video = forwardRef<any, any>(({ children }, ref) => {
  const [hasFocus, setHasFocus] = useState(false);

  // add potential for iframe
  return (
    <video
      ref={ref}
      autoPlay
      controls={hasFocus}
      controlsList="nodownload nofullscreen noremoteplayback"
      muted
      disablePictureInPicture
      disableRemotePlayback
      playsInline
      style={{ minHeight: '262px' }}
      onMouseEnter={() => setHasFocus(true)}
      onMouseLeave={() => setHasFocus(false)}
    >
      {children}
    </video>
  );
});

export default Video;
