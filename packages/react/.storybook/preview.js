import { themes } from '@storybook/theming';
import 'tailwindcss/tailwind.css';
// eslint-disable-next-line import/no-webpack-loader-syntax

// linear-gradient(145deg, #5f5f5f, #505050)

// create a component that uses the dark mode hook
// function ThemeWrapper(props) {
//   // render your custom theme provider
//   const darkMode = useDarkMode();
//   return (
//     <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
//       {props.children}
//     </ThemeProvider>
//   );
// }

export const decorators = [
  (Story, context) => (
    // <ThemeWrapper context={context}>
    <Story />
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
