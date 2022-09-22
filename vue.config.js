const path = require("path");
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
})
module.exports = {
  publicPath: './',
  parallel: false,
  productionSourceMap: false,
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  devServer: {
    proxy: {
      '/user': {
        target: 'http://127.0.0.1:3000/user',
        changeOrigin: true,
        pathRewrite: {
          '^/user': ''
        }
      },
      '/fav': {
        target: 'http://127.0.0.1:3000/fav',
        changeOrigin: true,
        pathRewrite: {
          '^/fav': ''
        }
      }
    }
  },

}
