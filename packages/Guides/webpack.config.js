const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    // 告诉 webpack-dev-server 在 dist 启动服务
    static: "./dist",
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Cache",
    }),
    new WebpackManifestPlugin(),
  ],
};

module.exports = config;
