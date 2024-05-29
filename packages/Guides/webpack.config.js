const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
    },
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
    new StatsWriterPlugin({
      filename: "stats.json",
      stats: {
        entrypoints: true,
      },
    }),
  ],
};

module.exports = config;
