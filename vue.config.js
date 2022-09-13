const path = require("path");
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  devServer: {
    proxy: {
      '/user': {
        target: 'http://127.0.0.1:3000/user',
        changeOrigin: true,
        pathRewrite: {
          '^/user': ''
        }
      }
    }
  }
}