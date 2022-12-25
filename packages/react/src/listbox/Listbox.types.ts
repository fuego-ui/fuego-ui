export interface IListbox {
  id?: string;
  label?: string;
  children?: any;
  className: string;
  autocomplete?: any;
  options?: Array<any>;
  loading?: boolean;
  loadingTemplate?: any;
  onSelection?: any;
  onChange?: any;
  fieldSize?: 'small' | 'regular';
  ref?: any;
}
