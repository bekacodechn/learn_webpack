const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

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
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),
    new WebpackManifestPlugin({
      basePath: "./aa",
    }),
  ],
};

module.exports = config;
