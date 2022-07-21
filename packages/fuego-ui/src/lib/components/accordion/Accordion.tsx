import React, { useId, useState, Children, cloneElement } from 'react';
import { AccordionItem } from './Accordion-item';

export const Accordion = ({ children }: any) => {
  const accordionId = useId();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const accordionOnClick = (index: number) => setActiveAccordion(index);

  let childrenEls: Array<React.ReactNode> = [];
  if (children) {
    childrenEls = Children.toArray(children);
  }

  return (
    <div id={`accordion-${accordionId}`}>
      {childrenEls.map((child: any, index: number) => {
        return cloneElement(child, {
          key: `${accordionId}-${index}`,
          onClick: () => accordionOnClick(index),
          expanded: index === activeAccordion ? true : false,
        });
      })}
    </div>
  );
};
