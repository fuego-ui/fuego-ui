import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useId, useState } from 'react';
import styled from 'styled-components';

export const AccordionItemCmp = ({
  label,
  children,
  className,
  expanded,
  onClick,
}: any) => {
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
    <div className={className}>
      <button
        className="accordion-item-trigger"
        aria-controls={accordionItemContentId}
        id={accordionItemId}
        type="button"
        aria-expanded={_expanded}
        onClick={accordionClick}
      >
        {label}
        <AccordionIcon></AccordionIcon>
      </button>
      <AnimatePresence initial={false}>
        {_expanded && (
          <motion.div
            id={`accordion-item-${accordionItemContentId}`}
            role="region"
            aria-labelledby={accordionItemId}
            className="accordion-panel"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AccordionItem = styled(AccordionItemCmp)`
  .accordion-item-trigger {
    width: 100%;
    text-align: left;
    position: relative;
    border: 1px solid green;
    background-color: lavender;
    padding: 0.4rem 0.5rem;
  }

  .accordion-panel {
    overflow: hidden;

    & > div {
      margin: 0.4rem 0.5rem;
    }
  }
`;

export const AccordionIcon = styled.span`
  border: solid currentcolor;
  border-width: 0 2px 2px 0;
  height: 0.5rem;
  pointer-events: none;
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-60%) rotate(45deg);
  transition: transform 0.4s;
  width: 0.5rem;

  ${AccordionItem} .accordion-item-trigger[aria-expanded='true'] & {
    transform: translateY(-50%) rotate(-135deg);
  }
`;
