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
    globalObject: "this", // 指定全局对象的引用为this
    library: {
      name: "webpackNumbers",
      type: "umd",
    },
  },
};

module.exports = config;
