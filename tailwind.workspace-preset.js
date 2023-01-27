const { join } = require('path');
const fuegoPath = join(__dirname, 'packages/fuego-styles/src/index.js');
module.exports = {
  theme: {
    extend: {},
  },
  // fuegoui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: '#343232',
  //         secondary: '#343232',
  //         accent: '#343232',
  //         'base-100': '#000000',
  //         'base-200': '#0D0D0D',
  //         'base-300': '#1A1919',
  //         neutral: '#272626',
  //         'neutral-focus': '#343232',
  //         info: '#0000ff',
  //         success: '#008000',
  //         warning: '#ffff00',
  //         error: '#ff0000',
  //         '--rounded-box': '0',
  //         '--rounded-btn': '0',
  //         '--rounded-badge': '0',
  //         '--animation-btn': '0',
  //         '--animation-input': '0',
  //         '--btn-text-case': 'lowercase',
  //         '--btn-focus-scale': '1',
  //         '--tab-radius': '0',
  //       },
  //     },
  //   ],
  // },
  plugins: [
    require('@tailwindcss/typography'),
    // require(fuegoPath)
    require('daisyui'),
  ],
};
