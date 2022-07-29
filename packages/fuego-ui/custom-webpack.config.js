// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    // overwrite values here
	externals: {
		"styled-components": {
			commonjs: "styled-components",
			commonjs2: "styled-components",
			amd: "styled-components",
		}
	}
  });
};