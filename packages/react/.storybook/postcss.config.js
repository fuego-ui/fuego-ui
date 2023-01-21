const { join } = require('path');

console.log('RAWR 32');
module.exports = {
  plugins: [
    require('tailwindcss')('packages/react/tailwind.config.js'),
    require('autoprefixer'),
  ],
};
