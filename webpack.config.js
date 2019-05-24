var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash:8].js',
  },
  devServer: {
    port: 1200,
    hot: true,
    open: true, // 自打打开浏览器
    historyApiFallback: true,
  },
  resolve: {
    // extensions: ['jsx', 'js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader', // 用 babel 解析jsx || js
          options: {
            cacheDirectory: true,
            presets: [
              // 预设置
              'mobx', // mobx 内置了很多 plugins，例如 修饰符、属性初始化等
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime', // 告诉 babel 要引用 runtime 来代替注入
            ],
          },
        },
        // exclude: /node_modules\//, // 排除node_modules里的文件
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      // true|body|head|false，四种值，默认为true
      // true和body相同, 是将js注入到body结束标签前
      // head将打包的js文件放在head结束前
      // false是不注入，这时得要手工在html中加js
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
  ],
};
