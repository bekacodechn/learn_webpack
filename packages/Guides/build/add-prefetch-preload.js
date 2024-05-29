/**
 * 分析stats.json，将bundle的preload/prefetch asset 添加到 index.html
 */

// 引入所需的模块
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// 读取 stats.json 文件，这个文件包含了 Webpack 打包的详细信息
const stats = require("../stats.json");

// 设置 HTML 文件的路径
const htmlFilePath = path.join(__dirname, "../dist/index.html");

// 读取 HTML 文件的内容
const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

// 使用 Cheerio 加载 HTML 内容，便于操作 DOM
const $ = cheerio.load(htmlContent);

// 获取入口点的信息
const entrypoints = stats.entrypoints;

/**
 * 在 HTML 的 <head> 部分追加 <link> 标签
 * @param {string} url - 资源的 URL
 * @param {string} type - 预取或预加载类型，默认是 "preload"
 * @param {string} linkAs - 资源类型，默认是 "script"
 */
const appendLink = (url, type = "preload", linkAs = "script") => {
  $("head").append(
    `<link rel="${type}" href="${url}" as="${linkAs}" fetchpriority="high">`
  );
};

// 遍历每个入口点，处理其中的预取和预加载资源
Object.entries(entrypoints).forEach(([entry, entryValue]) => {
  // 从入口点中提取 childAssets 信息，包括 preload 和 prefetch
  const { childAssets: { preload, prefetch } = {} } = entryValue;

  // 如果有预加载资源，将其添加到 HTML 的 <head> 中
  if (Array.isArray(preload)) {
    preload.forEach((url) => appendLink(url));
  }

  // 如果有预取资源，将其添加到 HTML 的 <head> 中
  if (Array.isArray(prefetch)) {
    prefetch.forEach((url) => appendLink(url, "prefetch"));
  }
});

// 将修改后的 HTML 写回文件
fs.writeFileSync(htmlFilePath, $.html(), "utf-8");
