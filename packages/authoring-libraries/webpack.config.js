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
  externals: {
    lodash2: {
      // 如果导入lodash2
      commonjs: "lodash", //  Node.js 环境中，require('lodash2') 实际上会解析为 require('lodash')。
      commonjs2: "lodash", //  Node.js 环境中，require('lodash2') 实际上会解析为 require('lodash')。
      amd: "lodash", //  AMD 环境中，define(['lodash2'], ...) 实际上会解析为 define(['lodash'], ...)。
      root: "_", // 在 HTML环境， 通过 CDN 引入了 lodash，那么代码中对 _ 的引用会直接使用全局的 _。
    },
  },
};

module.exports = config;
