const path = require("path");

/**
 * @type { import('webpack').Configuration }
 */
const config = {
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "webpack-numbers.js",
    clean: true,
    library: "webpackNumbers",
  },
};

module.exports = config;
