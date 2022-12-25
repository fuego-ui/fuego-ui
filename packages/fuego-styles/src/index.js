const postcssJs = require('postcss-js');
const autoprefixer = require('autoprefixer');
const plugin = require('tailwindcss/plugin');
// const postcssPrefix = require('./postcss-prefixer');
const file = require('../../../dist/packages/fuego-ui-styles/components');
const colors = require('./colors');

// // add prefix to class names if specified
// // const prefix = config('daisyui.prefix');
// let postcssJsProcess;
// let file;
// const prefix = true;

// // try {
// //   postcssJsProcess = postcssJs.sync(postcssPrefix({ prefix, ignore: [] }));
// // } catch (error) {
// //   console.error(error);
// // }

// // const shouldApplyPrefix = prefix && postcssJsProcess;
// // if (shouldApplyPrefix) {
// //   file = postcssJsProcess(file);
// // }

const mainFunction = ({
  addBase,
  addComponents,
  addUtilities,
  config,
  postcss,
}) => {
  addComponents(file);
};

module.exports = require('tailwindcss/plugin')(mainFunction, {
  theme: { extend: { colors } },
});
