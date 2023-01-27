import React, { useEffect, useId, useState } from 'react';

export interface Accordion {
  label: string;
  children: any;
  className?: string;
  expanded?: boolean;
  onClick?: () => void;
  divider?: boolean;
  titleClassName?: string;
  contentClassName?: string;
}

export const Accordion = ({
  label,
  children,
  className,
  expanded,
  onClick,
  divider = false,
  titleClassName = '',
  contentClassName = '',
}: Accordion) => {
  const [_expanded, setExpanded] = useState(expanded);
  const IdToken = useId();
  const accordionItemId = `accordion-item-${IdToken}`;
  const accordionItemContentId = `accordion-item-content-${IdToken}`;

  const accordionClick = () => {
    setExpanded(!_expanded);
    onClick && onClick();
  };

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  return (
    <div
      className={`collapse collapse-arrow ${
        _expanded ? 'collapse-open' : 'collapse-close'
      } ${className ? className : ''}`}
    >
      <div
        className={`collapse-title ${titleClassName}`}
        aria-controls={accordionItemContentId}
        id={accordionItemId}
        aria-expanded={_expanded}
        tabIndex={0}
        onClick={accordionClick}
      >
        {label}
        <span className="accordion-icon"></span>
      </div>
      <div
        id={`accordion-item-${accordionItemContentId}`}
        role="region"
        aria-labelledby={accordionItemId}
        className={`collapse-content ${contentClassName}`}
        key="content"
        // transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
