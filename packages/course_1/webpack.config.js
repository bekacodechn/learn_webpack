const path = require("path");

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};

module.exports = config;
