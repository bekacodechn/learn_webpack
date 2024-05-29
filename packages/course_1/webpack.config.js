const path = require("path");

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};

module.exports = config;
