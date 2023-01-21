const { join } = require('path');

console.log('RAWR');
module.exports = {
  plugins: [
    require('tailwindcss')('packages/react/tailwind.config.js'),
    require('autoprefixer'),
  ],
};
