const file = require('../../../dist/packages/fuego-ui-styles/components');
const themes = require('./colors/themes');
const colorFunctions = require('./colors/colorfunctions');
const colors = require('./colors/index');

const mainFunction = ({
  addBase,
  addComponents,
  addUtilities,
  config,
  postcss,
}) => {
  addComponents(file);
  console.log(colorFunctions);
  const themeInjector = colorFunctions.injectThemes(addBase, config, themes);
  themeInjector;
};

module.exports = require('tailwindcss/plugin')(mainFunction, {
  theme: { extend: { colors } },
});
