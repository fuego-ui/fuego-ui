const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

console.log('mini 1');
module.exports = {
  presets: [require('../../tailwind.workspace-preset.js')],
  content: [
    // join(
    //   __dirname,
    //   '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    // ),
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
