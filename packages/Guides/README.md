## Basic Setup

https://webpack.js.org/guides/getting-started/#basic-setup


## NPM Scripts

https://webpack.js.org/guides/getting-started/#npm-scripts

通过 npm run build 在命令和参数之间添加两个破折号，可以将自定义参数传递给 webpack，例如 npm run build -- --color .

## Loading CSS

`style-loader`将`css`添加到`<head>`。

## Loading Images

从 webpack 5 开始，使用内置的 Asset 模块处理 `Image`

```js
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
},
```

1. 当您 `import MyImage from './my-image.png'` 时，该图像将被处理并添加到您的 `output` 目录中 `MyImage`，并且该变量将包含处理后该图像的最终 `URL`。
2. 使用 `css-loader` 时， `url('./my-image.png')` 在 `CSS` 中也会发生类似的过程。加载程序将识别出这是一个本地文件，并将该 `'./my-image.png'` 路径替换为 `output` 目录中映像的最终路径。
3. 使用`html-loader`时，`<img src="./my-image.png" />` 以相同的方式处理。

## Loading Data

`xml-loader`，`csv-loader`

`import data from 'xx.json'` 可以直接使用，`webpack`默认支持。

 命名导入，如`import { name } from 'xx.json'` 会提示: `warning: Should not import the named export 'name' (imported as 'name') from default-exporting module (only default export is available soon)`

## Customize parser of JSON modules
[自定义 JSON 模块的解析器](https://webpack.js.org/guides/asset-management/#customize-parser-of-json-modules)

可以使用自定义解析器而不是特定的 webpack 加载器将任何 `toml`，`yaml` 或 `json5` 文件导入为 `JSON` 模块。

# Output Management

https://webpack.js.org/guides/output-management/

## Preparation

```js
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
```

并在`index.js`里通过`import printMe from "./print.js";`使用了`print.js`

1. 打包生成两个文件，但是没有懒加载，因此`index.html`会发起对`index.bundle.js`和`print.bundle.js`的请求。
2. `print`的打包结果优点奇怪：

```js
(()=>{"use strict"})();
```

函数内的内容都被打包进了`index.js`里，`print.bundle.js`里只剩了空函数。


## Setting up HtmlWebpackPlugin

`html-webpack-plugin`

默认将所有`bundle`加入到生成的`html`中并为`script`添加`defer`

## Cleaning up the /dist folder

```js
output: {
  // ..
  clean: true
}
```

## The Manifest

[WebpackManifestPlugin](https://github.com/shellscape/webpack-manifest-plugin)生成`bundle`清单到`output`

# [Development](https://webpack.js.org/guides/development/)

## [Using source maps](https://webpack.js.org/guides/development/#using-source-maps)

当 `webpack` 打包源代码时，将错误和警告追踪到其原始位置可能会变得很困难。例如，如果将三个源文件 （ `a.js` 、 `b.js` 和 `c.js` ） 打包到一个包 （ bundle.js ） 中，并且其中一个源文件包含错误，则堆栈跟踪将指向 `bundle.js` 。这没有帮助，因为你想知道错误的确切来源于哪个源文件。

为了更容易地跟踪错误和警告，`JavaScript` 提供了[source maps](http://blog.teamtreehouse.com/introduction-source-maps)，将编译后的代码映射回原始源代码。如果错误源自 `b.js` ，`source map`将准确地告诉你位置。

在开发环境中，使用`inline-source-map`