const path = require("path");

/**
 * @type { import('webpack').Configuration }
 */
const config = {
  entry: "./index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "webpack-numbers.js",
    globalObject: "this", // 指定全局对象的引用为this
    library: {
      name: "webpackNumbers",
      type: "umd",
    },
  },
  externals: [/^lodash(\/.+)?$/],
};

module.exports = config;
