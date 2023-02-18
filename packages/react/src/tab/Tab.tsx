import React, { forwardRef } from 'react';
import { ITab } from './Tab.types';

export const Tab = forwardRef(
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
    const onClickHandler = () => (e: any) => !disabled && onTabClick(tabId);
    const isActive = activeTab === tabId ? true : false;

    return (
      <a
        role="tab"
        id={tabId}
        ref={ref}
        aria-controls={tabPanelId}
        aria-selected={isActive}
        className={`tab ${props.className} ${isActive ? 'tab-active' : ''}`}
        onClick={onClickHandler()}
      >
        <span>{label}</span>
      </a>
    );
  }
);

export default Tab;
