const config = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "storybook-dark-mode"],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  // previewBody: (body) => {
  //   console.log(body);
  //   return `${body}`;
  // },
};

export default config;
