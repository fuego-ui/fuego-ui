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
