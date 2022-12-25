const { join } = require('path');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested')({
      bubble: ['screen'],
    }),
    require('tailwindcss')('packages/fuego-styles/tailwind.config.js'),
    require('autoprefixer'),
  ],
};
