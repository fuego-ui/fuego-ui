import React from 'react';
import styled from 'styled-components';
import { device } from '../../utils/breakpoints';

export interface ITextImage {
  children: any;
  title?: string;
  titleChild?: any;
  img?: string;
  imgAlt?: string;
  imgChild?: any;
  orderReverse?: boolean;
  className: string;
  imgColClassName?: string;
  textColClassName?: string;
}

export function TextImageCmp({
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
    <section className={`${className} flex flex-col md:flex-row gap-3`}>
      <div className={imgColClassName}>{imgEl}</div>
      <div className={textColClassName}>{children}</div>
    </section>
  );
}

export const TextImage = styled(TextImageCmp)`
  color: ${({ theme }) => theme && theme.accent};
`;
