const config = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
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
