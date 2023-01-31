export type FieldStyle = 'default' | 'outline' | 'invisible';

export interface FieldProps {
  id?: string;
  labelId?: string;
  name?: any;
  value?: any;
  floatLabel?: boolean;
  floatLabelAlways?: boolean;
  prefix?: any;
  children: any;
  placeholder?: string;
  type?: string;
  suffix?: any;
  className?: string;
  props?: any;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
  onClick?: any;
  errorLabel?: any;
  required?: boolean;
  fieldErrors?: any;
  autoComplete?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  size: 'small' | 'regular';
  inputClassName: string;
  fieldStyle?: 'inFieldFloat' | 'outlineFloat' | 'outsideFloat';
}
