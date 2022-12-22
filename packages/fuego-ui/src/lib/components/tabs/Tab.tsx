import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface ITab {
  children?: any;
  onTabClick?: any;
  label: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  activeTab?: string;
  tabId?: string;
  tabPanelId?: string;
}

/**
 * TODO:
 *
 * Disabled View
 *
 */

const TabComponent = forwardRef(
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

export const Tab = styled(TabComponent)`
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
