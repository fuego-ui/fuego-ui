const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");

module.exports = {
  presets: [require("../../tailwind.workspace-preset.js")],
  content: [
    join(__dirname, "{src,pages,components}/**/*!(*.spec).{ts,tsx,html}"),
    // join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       foreground: '#FFFFFF',
  //     },
  //   },
  // },
  // daisyui: {
  //   themes: [
  //     {
  //       myTheme: {
  //         primary: '#343232',
  //         secondary: '#343232',
  //         accent: '#343232',
  //         neutral: '#272626',
  //         'base-100': '#000000',
  //         info: '#0000ff',
  //         success: '#008000',
  //         warning: '#ffff00',
  //         error: '#7F1D1D',
  //       },
  //     },
  //   ],
  // },
  plugins: [],
};
