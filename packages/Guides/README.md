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

## [Choosing a Development Tool](https://webpack.js.org/guides/development/#using-source-maps)

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

### Using Watch Mode

webpack “监视”依赖关系图中的所有文件是否有更改。如果更新了其中一个文件，则代码将重新编译，因此再执行`webpack build`

缺点：需要手动刷新页面。

### [Using webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server)

`webpack-dev-server`

```js
  devServer: {
   // 告诉 webpack-dev-server 在 dist 启动服务
    static: './dist',
  },

  optimization: {
    runtimeChunk: 'single',
  },
```

1. 之所以添加 `optimization.runtimeChunk: 'single'` 是因为在此示例中，我们在单个 HTML 页面上有多个入口点。没有这个，我们可能会遇到[麻烦](https://bundlers.tooling.report/code-splitting/multi-entry/)。有关详细信息，请阅读[代码拆分](https://webpack.js.org/guides/code-splitting/)一章。
【多个`bundle`使用公共`bundle`时，公共`bundle`应该只实例化一次。为了确保这个，使用`runtimeChunk: 'single'`，（是否正确，待定）】
2. `webpack-dev-server `在提供的`output.path`启动服务。
3. webpack-dev-server doesn't write any output files after compiling. Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path. If your page expects to find the bundle files on a different path, you can change this with the [devMiddleware.publicPath](https://webpack.js.org/configuration/dev-server/#devserverdevmiddleware) option in the dev server's configuration.

现在更改任何源文件并保存它们，则Web服务器将在编译代码后自动重新加载。

`webpack-dev-server` [可配置的选项。](https://webpack.js.org/configuration/dev-server)

### [Using webpack-dev-middleware](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)

`webpack-dev-middleware` 是一个包装器，用于将 `webpack` 处理过的文件发送到服务器。

它在 `webpack-dev-server` 内部使用，但也可以作为一个单独的软件包使用，以便根据需要进行更多自定义设置。本次`commit`将结合`webpack-dev-middleware`和 `express`服务器实现自定义开发环境（具体看代码）。

1. 设置`output.publicPath`为`/`
2. 在`server.js`中使用`webpack-dev-server`作为`express`的中间件。
3. 在`package.json`添加`server`命令

发现无法通过`pnpm server`启动，`node server.js`则可以，应该是环境问题。

# [Code Splitting 代码拆分！](https://webpack.js.org/guides/code-splitting/)

1. 允许将代码拆分成不同的`bundle`，然后按需或并行加载
2. 可用于实现更小的`bundle`
3. 可用于控制资源加载优先级

三种代码拆分的常规方法：

1. **Entry Points**: Manually split code using [entry](https://webpack.js.org/configuration/entry-context) configuration.
2. **Prevent Duplication**: Use [Entry dependencies](https://webpack.js.org/configuration/entry-context/#dependencies) or [`SplitChunksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/) to dedupe and split chunks.
3. **Dynamic Imports**: Split code via inline function calls within modules.

## Entry Points（不推荐）

```js
entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
```

目前，`index.js`和`another-module.js`都引用了`lodash`。使用`Entry Points`手动拆分代码有以下问题：

1. 如果入口块之间有任何重复的模块，它们将包含在两个`bundle`中。
2. 不灵活，不能用于动态拆分具有核心应用程序逻辑的代码。

第一点绝对是问题，因为`lodash`在两个`bundle`中都存在。

## [Prevent Duplication](https://webpack.js.org/guides/code-splitting/#prevent-duplication)

使用`dependOn`创建公共`bundle`，并指定每一个`dependOn`具体包含哪些模块。

1. 两个公共模块`lodash`和`find-lowest-common-ancestor`提取为两个公共`bundle`，`lodash`提取到`shared`，`find-lowest-common-ancestor`提取到`shared2`：

```js
entry: {
    index: {
      import: "./src/index.js",
      dependOn: ["shared", "shared2"],
    },
    another: {
      import: "./src/another-module.js",
      dependOn: ["shared", "shared2"],
    },
    shared: "lodash",
    shared2: "find-lowest-common-ancestor",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    runtimeChunk: "single",
  },
```

将生成：
1. `index.bundle.js`
2. `another.bundle.js`
3. `runtime.bundle.js`包含`runtime`代码
4. `shared.bundle.js`包含`lodash`
5. `shared2.bundle.js`包含`find-lowest-common-ancestor`

---

2. 两个公共模块`lodash`和`find-lowest-common-ancestor`提取为一个公共`bundle`，`lodash`和`find-lowest-common-ancestor`提取到`shared`：

```js
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: ["shared"],
    },
    another: {
      import: "./src/another-module.js",
      dependOn: ["shared"],
    },
    shared: ["lodash", "find-lowest-common-ancestor"],
  },
```

将生成：
1. `index.bundle.js`
2. `another.bundle.js`
3. `runtime.bundle.js`包含`runtime`代码
4. `shared.bundle.js`包含`lodash`和`find-lowest-common-ancestor`

---

```js
  optimization: {
    runtimeChunk: "single",
  },
```
`runtimeChunk: single`将提取`index.bundle.js`和`another.bundle.js`中公共的`runtime`代码到`runtime.bundle.js`

---

`entry`类型定义：
```typescript
	entry?:
		| string
		| (() => string | EntryObject | string[] | Promise<EntryStatic>)
		| EntryObject
		| string[];
```



待定：
> 虽然 `webpack` 允许每个页面使用多个入口点，但应尽可能避免使用这种方法，而应使用具有多个导入的入口点： `entry：{ page：['./analytics', './app'] }`。这样在使用异步脚本标记时，可以获得更好的优化和一致的执行顺序。
> 尚不清楚`entry：{ page：['./analytics', './app'] }`效果如何，待补充。

## [SplitChunksPlugin](https://webpack.js.org/guides/code-splitting/#splitchunksplugin)

`index.js`和`another-module.js`都包含以下模块：
```js
import _ from "lodash";
import find1 from "find-lowest-common-ancestor"
```
1. 提取到公共`bundle`
```js
entry: {
    index: {
      // 和 index: './src/index.js' 相同
      import: "./src/index.js",
    },
    another: {
      import: "./src/another-module.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
```
将生成：
1. `index.bundle.js`
2. `another.bundle.js`
3. `runtime.bundle.js`包含`runtime`代码
4. 公共`bundle`，包含  `lodash`和`find-lowest-common-ancestor`

如果没有`runtimeChunk: "single",`，`runtime`代码会被提取到`公共 bundle`

---

2. 从公共`bundle`只包含`lodash`，`find-lowest-common-ancestor`被提取到`shared`

```js
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
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
```

---

其他提取插件：

[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin) ：用于将 CSS 从主应用程序中分离出来。