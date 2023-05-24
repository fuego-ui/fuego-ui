const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    // ...(rootMain.core || {}),
    builder: 'webpack5',
  },
  stories: [
    // ...(rootMain.stories || []),
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    // ...(rootMain.addons || {}),
    '@nx/react/plugins/storybook',
  ],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }
    if (process.env.NODE_ENV === 'development') {
      process.env.TAILWIND_MODE = 'watch';
    }

    // add your own webpack tweaks if needed

    return config;
  },
};
