export interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  level?: 'primary' | 'secondary' | 'tertiary';
  loading?: boolean;
  loader?: any;
}
