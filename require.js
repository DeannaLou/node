/**
 * node 模块机制
 *  - 路径分析
 *    - 核心模块(已缓存),文件模块(.,..,/,自定义模块) 缓存 -> 核心 -> 文件模块;
 *    - 自定义文件模块的规则是,从当前目录 node_modules 一层层往上找, 直到找到或者到达根节点
 *  - 文件定位
 *    - 允许不包含后缀, 自动依次尝试后缀 .js, .node, .json
 *    - 如果没有找到文件而得到一个目录, 则先找 package.json/main 属性指定文件, 否则把 index 当做默认文件名, 依次尝试 .js, .node, .json
 *  - 模块编译
 *    - 每个文件模块都是一个对象, 包含 id, exports, parent, children, loaded 属性
 *    - 默认支持三种载入方法, js/node/json,其余后缀都当做 js 载入.
 *    - 如果想要自定义载入, require.extensions['.xxx' ] 来实现. 但不建议, 最好是写成 js 来require, 理由是不在 node 执行时引入繁琐的编译加载等过程.
 */
  //Module._extensions['.json'] = function (module, filename) {
//  var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
//  try {
//    module.exports = JSON.parse(stripBOM(content));
//  } catch (err) {
//    err.message = filename + ':' + err.message;
//    throw err;
//  }
//};
console.log(require.extensions);