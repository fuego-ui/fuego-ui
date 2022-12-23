import { themes } from '@storybook/theming';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from 'storybook-dark-mode';
import './global.css';
import 'tailwindcss/tailwind.css';
const defaultTheme = {
  base: 'light',
  colorPrimary: 'purple',
  colorSecondary: '#121212',
  background: '#fff',
  primary: '#556cd6',
  secondary: '#4456ab',
  tertiary: '#7689de',
  accent: '#000',
  contrastBackground: '#000',
  contrastText: '#fff',

  error: {
    main: '#ff6b6b',
  },
  formField: {
    style: '',
    bg: '#fff',
    fg: '#556cd6',
    hbg: '#fff',
    hfg: '#556cd6',
    labelfg: '#556cd6',
    labelbg: '#fff',
    inputbg: '#fff',
    outline: '#556cd6',
    focusOutline: '',
    errorfg: '',
  },
  listbox: {
    hbg: '#556cd6',
    hfg: '#fff',
  },
};

const darkTheme = {
  base: 'dark',
  colorPrimary: '#333333',
  colorSecondary: '#121212',
  background: '#333333',
  primary: '#424242',
  secondary: '#505050',
  tertiary: '#5f5f5f',
  accent: '#fff',
  error: {
    main: '#ff6b6b',
  },
  formField: {
    style: '',
    bg: '#fff',
    fg: '#556cd6',
    hbg: '#fff',
    hfg: '#556cd6',
    labelfg: '#556cd6',
    labelbg: '#fff',
    inputbg: '#fff',
    outline: '#556cd6',
    focusOutline: '',
    errorfg: '',
  },
  listbox: {
    hbg: '#556cd6',
    hfg: '#fff',
  },
};

// linear-gradient(145deg, #5f5f5f, #505050)

// create a component that uses the dark mode hook
function ThemeWrapper(props) {
  // render your custom theme provider
  const darkMode = useDarkMode();
  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      {props.children}
    </ThemeProvider>
  );
}

export const decorators = [
  (Story, context) => (
    <ThemeWrapper context={context}>
      <Story />
    </ThemeWrapper>
  ),
];

export const parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal },
  },
};
