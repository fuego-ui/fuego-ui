const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind.workspace-preset.js')],
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.spec).{ts,tsx,html}'),
    // join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
