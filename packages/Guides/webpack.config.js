const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: ["shared"],
    },
    another: {
      import: "./src/another-module.js",
      dependOn: ["shared"],
    },
    shared: ["find-lowest-common-ancestor"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
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
    new WebpackManifestPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = config;
