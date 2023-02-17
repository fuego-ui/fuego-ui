export interface ITabs {
  children?: any;
  tabIndex?: number;
  fullWidth?: boolean;
  scrollable?: boolean;
  className?: string;
  alignment?: Alignment;
  tabClassName?: string;
  panelClassName?: string;
  noHighlight?: boolean;
  highlightClassName: string;
}
export interface TabIdProps {
  tabId: string;
  tabPanelId: string;
}

export type Direction = 'left' | 'right';
export type Alignment = 'left' | 'center' | 'right';

export interface HighlightProps {
  leftOffset?: number;
  width?: number;
}

export interface IArrowButton {
  direction: Direction;
  disabled?: boolean;
  onClick?: any;
}
