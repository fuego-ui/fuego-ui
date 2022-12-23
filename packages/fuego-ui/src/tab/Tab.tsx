import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { ITab } from './Tab.types';

/**
 * TODO:
 *
 * Disabled View
 *
 */

export const TabCmp = forwardRef(
  (
    {
      onTabClick,
      label = '',
      disabled = false,
      id = '',
      activeTab,
      children,
      tabId = '',
      tabPanelId = '',
      ...props
    }: ITab,
    ref: any
  ) => {
    const isActiveTab = () => (activeTab === tabId ? true : false);
    const onClickHandler = () => (e: any) => !disabled && onTabClick(tabId);

    return (
      <button
        role="tab"
        id={tabId}
        ref={ref}
        aria-controls={tabPanelId}
        aria-selected={isActiveTab()}
        className={`${props.className}`}
        onClick={onClickHandler()}
      >
        <span>{label}</span>
      </button>
    );
  }
);

const Tab = styled(TabCmp)`
  border: none;
  padding: 0.5rem 1rem;
  min-width: 6rem;
  min-height: 3rem;
  transition: background-color 0.3s, color 0.3s;

  // theme i was here too
  background-color: ${({ theme }) => theme && theme.background};
  color: ${({ theme }) => theme && theme.primary};

  &:hover {
    background-color: ${({ theme }: any) => theme.primary};
    color: ${({ theme }: any) => theme.contrastText};
  }

  &:focus {
    outline: 1px dashed
      ${({ theme }) => theme && theme.tabs && theme.tabs.accent};
    outline-offset: -1px;
  }
`;

export default Tab;
