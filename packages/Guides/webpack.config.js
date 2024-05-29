const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    // 告诉 webpack-dev-server 在 dist 启动服务
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
    new WebpackManifestPlugin({
      basePath: "./aa",
    }),
  ],
  optimization: {
    // runtimeChunk: "single",
  },
};

module.exports = config;
