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
    const isActiveTab = () => (activeTab === tabId ? true : false);
    const onClickHandler = () => (e: any) => !disabled && onTabClick(tabId);

    return (
      <button
        role="tab"
        id={tabId}
        ref={ref}
        aria-controls={tabPanelId}
        aria-selected={isActiveTab()}
        className={`rounded-none px-t-[ 0.5rem] p-y-[1rem] min-w-[6rem] m-h-[3rem] transition-colors ${props.className}`}
        onClick={onClickHandler()}
      >
        <span>{label}</span>
      </button>
    );
  }
);

export default Tab;
