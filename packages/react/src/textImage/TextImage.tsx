import React from 'react';
import { ITextImage } from './TextImage.types';

function TextImage({
  children,
  title = '',
  img = '',
  imgAlt = '',
  className = '',
  orderReverse = false,
  imgColClassName = 'flex-auto',
  textColClassName = 'flex-auto',
  ...props
}: ITextImage) {
  const imgEl = props.imgChild ? (
    props.imgChild
  ) : (
    <img src={img} alt={imgAlt} />
  );

  return (
    <section className={`flex flex-col md:flex-row gap-3 ${className}`}>
      <div className={imgColClassName}>{imgEl}</div>
      <div className={textColClassName}>{children}</div>
    </section>
  );
}

export default TextImage;
