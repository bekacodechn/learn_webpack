const path = require("path");

/**
 * @type { import('webpack').Configuration }
 */
const config = {
  entry: "./index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "webpack-numbers-test.js",
    globalObject: "this", // 指定全局对象的引用为this
    library: {
      name: "webpackNumbers",
      type: "umd",
    },
  },
  externals: {
    lodash2: {
      // 如果导入lodash2
      commonjs: "lodash1",
      commonjs2: "lodash2",
      amd: "lodash3",
      root: "_4",
    },
  },
};

module.exports = config;
