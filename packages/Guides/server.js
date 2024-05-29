const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

// webpack-dev-middleware 是一个包装器，用于将 webpack 处理过的文件发送到服务器。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.listen(3000, () => {
  console.log("express app listening on port 3000");
});
