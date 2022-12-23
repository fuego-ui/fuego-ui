export interface IModal {
  isShowing?: boolean;
  hide?: any;
  position?: string;
  className?: string;
  modalHeader?: boolean;
  modalHeaderContent?: any;
  children?: React.ReactElement;
  fullscreen?: boolean;
  selector?: string;
  backdrop?: boolean;
  offset?: number;
}
