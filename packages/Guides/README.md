食用指南？

每个`commit`代表`webpack`文档中的一个或多个小节，按每个`commit`提交顺序学习。

`webpack`版本信息：
```json
{
  "webpack": "^5.91.0",
  "webpack-cli": "^5.1.4",
}
```

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

# Development

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

`optimization.runtimeChunk` 选项将运行时代码拆分为单独的块。将其设置为 `single` 为所有块创建单个运行时包。

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

## Dynamic Imports

`import()`动态导入原理：
将`import()`内的模块提取为单独的`bundle`，并在使用时通过`<script>`添加到`<head>`，待执行完成在删除该`<script>`

动态添加的`lodash script`：

`<script charset="utf-8" data-webpack="basic-setup:chunk-vendors-node_modules_pnpm_lodash_4_17_21_node_modules_lodash_lodash_js" src="http://localhost:8080/vendors-node_modules_pnpm_lodash_4_17_21_node_modules_lodash_lodash_js.bundle.js"></script>`

```js
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function getComponent() {
  await sleep(5000);
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");

      element.innerHTML = _.join(["Hello", "webpack"], " ");

      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

`5s`后动态加载`lodash`，可在代码之后后到`Elements devtool`，并在`<head> element`执行`Break on > subtree modifications`查看查看/移除过程。

## [Prefetching/Preloading modules](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)

`Resource Hint`：

- **prefetch**: resource is probably needed for some navigation in the future（导航后使用，空闲时加载，`fetchPriority`为最低）
- **preload**: resource will also be needed during the current navigation（本次导航就要使用，立即加载，`fetchPriority`为中）

举例说明：

在`index.js`导入`a.js`，在`a.js`导入`b.js`，导入关系为： `index.js` -> `a.js` -> `b.js`

`a.js`内容：
```js
import(/*webpackPreload: true */ "./b.js");

// import(/*webpackPrefetch: true */ "./b.js");
```

`b.js`内容：
```js
console.log('b')
```

修改`server.js`， 加载`a.js`时延迟`3s`，通过`nodemon server.js`启动服务，在`network devtool`观察`preload`和`prefetch`的区别

```js
// 添加如下内容
app.use(async (req, res, next) => {
  const { url } = req;
  if (url === "/src_a_js.bundle.js") {
    const { sleep } = await import("share");
    await sleep(3000);
  }
  next();
});
```

`a.js`使用`import(/*webpackPreload: true */ "./b.js");`时，`a.js`和`b.js`并行加载。
`a.js`使用`import(/*webpackPrefetch: true */ "./b.js");`时，`a.js`加载完才开始加载`b.js`。

`preload / prefetch`总结：

1. 加载时机不同。如果`a.js`使用`webpackPreload`动态导入`b.js`，则在加载`a.js`时并行加载`b.js`；使用`webpackPrefetch`，则加载完`a.js`后加载`b.js`
2. `preload`的`chunk`具有中等优先级，并立即下载。在浏览器空闲时下载`fetch`的`chunk`。

原理：

动态添加`link`，但和`import("./b.js");`不同，不会在`b.js`执行完后删除标签。
`<link charset="utf-8" rel="preload" as="script" href="http://localhost:3000/src_b_js.bundle.js">`
`<link rel="prefetch" as="script" href="http://localhost:3000/src_b_js.bundle.js">`

### 在 entry生成的 bundle 中使用`import(/*webpackPreload*/)`等 不生效

在`index.js（将生成入口 bundle.js）`定义`import(/*webpackPreload: true*/ "./a.js")`不会将`<link rel="preload" href="a.js"`添加到`index.html`。
如上面的在`a.js`中定义`import(/*webpackPreload: true */ "./b.js");`则可以。

当在入口代码块中使用预取或预加载时，Webpack 自己不会自动添加相应的 `<link rel="prefetch">` 或 `<link rel="preload">` 标签到 HTML 中。这个任务是由 HTML 生成器（如 html-webpack-plugin）负责的。

为了让`bundle.js`内的`import()`预加载生效，可以分析`webpack`生成`stats.json`，自行将入口`bundle`的`preload asset`添加到`index.html`

1. 通过`webpack-stats-plugin`生成`stats.json`，用于获取`bundle`内的`preload asset`
2. 将`bundle > preload asset`加入的`index.html`，可使用`cheerio`简化操作。（`cheerio`是`node`端的`jquery`）

### preload/prefetch的资源有效性不同

`preload`的资源只在当前页面有效，如果导航到另一个页面，该资源将无法使用。
`prefetch`的资源不管是在本页面还是导航后都有效。

### Further Reading

- [<link rel="prefetch/preload" /\> in webpack](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)。推荐阅读。

  1. `webpackPrefetch`除了`true`还接受数字，如`webpackPrefetch: 2`，数字越大越先发起请求。因为多个`webpackPrefetch`会排队，可以用数字控制顺序，`true`相当于0。也接受负值。
  2. `import()`接收多个魔法注释，它们直接通过`,`逗号分隔。如：
```js
import(
  /* webpackChunkName: "test", webpackPrefetch: true */
  "LoginModal"
)
// or
import(
  /* webpackChunkName: "test" */
  /* webpackPrefetch: true */
  "LoginModal"
)
```

- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) 推荐阅读。

## Bundle Analysis 捆绑分析

开始拆分代码后，分析输出以检查模块的最终位置会很有用。

1. [官方分析工具](https://github.com/webpack/analyse)
2. [webpack-chart](https://alexkuz.github.io/webpack-chart/)：webpack 统计信息的交互式饼图。
3. [webpack-visualizer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：可视化和分析您的捆绑包，以查看哪些模块占用了空间，哪些模块可能是重复的。
4. [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：此工具将分析您的捆绑包，并为您提供可操作的建议，说明需要改进哪些方面以减小捆绑包大小。
5. [bundle-stats](https://github.com/bundle-stats/bundle-stats)：生成捆绑包报告（捆绑包大小、资产、模块）并比较不同构建之间的结果。
6. [webpack-stats-viewer](https://github.com/moonrailgun/webpack-stats-viewer)：一个用于构建 webpack stats 的插件。显示有关 webpack bundle 详细信息的更多信息。

`module`、`chunk`、`bundle` 的区别：

1. `module（模块）`: 代码的最小单位，可以是  `js`文件、`css`文件、`image`文件等。在`Webpack`中，任何一个独立的文件都可以被视为模块。

    特征：
   - 模块是 Webpack 打包过程中的基本构建单元。
   - 每个模块只会加载一次，并且在需要时可以被多个地方引用。
   - Webpack 使用模块加载器（loaders）来处理不同类型的文件，比如 babel-loader 处理 JavaScript 文件，css-loader 处理 CSS 文件。

2. `chunk（代码块）`: 由 `Webpack` 生成的一组模块的集合，通常是在打包过程中按需拆分出来的，以便于懒加载或按需加载。

    特征：
   - 一个 chunk 可以包含多个模块。
   - Webpack 可以根据配置将代码分割成多个 chunk，以实现按需加载、代码拆分等功能，如`entry point`、`splitchunksplugin`、`import()`等
   - **不会初始加载，即不会直接在`index.html`引入，根据需要动态加载。**
  
3. `bundle（包）`: 由 `Webpack` 输出的最终文件，即打包后的文件。它是由一个或多个 `chunk` 组成的，可以被`index.html`加载运行。

    特征：
    -  每个 `bundle` 通常是一个 `js`文件，但也可以包括其他类型的文件（如`css`）。
    -  `Webpack` 会将所有的 `chunk` 合并并生成最终的 `bundle`。
    -  **会初始加载，即在`index.html`直接引入。**

# Caching

```js
output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  optimization: {
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
```

1. `[contenthash]` 将根据资产的内容添加唯一的哈希值。
2. `optimization.runtimeChunk` 选项将运行时代码拆分为单独的块。将其设置为 `single` 为所有块创建单个运行时包
3. `optimization.splitChunks.cacheGroups`将`node_modules`内的第三方库提取到单独的`vendor`，取名为`vendors`，最终生成`vendors.[contenthash].js`
4. 默认情况下，每个 `module.id` 都是根据解析顺序递增的。这意味着当解析顺序更改时，`ID` 也会更改。因此在`index.js`添加了`print.js`代码后，即使`vendors`内的第三方库的代码没有改变，他的`contenthash`依然会改变（受`ID`变化影响）。为了长期缓存，使用`optimization.moduleIds: 'deterministic'`。*（比较添加`moduleIds: 'deterministic'`前后修改`index.js`是否会影响`vendors`名称。实测下来，即使不添加`moduleIds: 'deterministic'`，`index.js`改变不会影响`vendors`的`contenthash`，可能是`webpack`版本和官方文档使用的不同。）*
