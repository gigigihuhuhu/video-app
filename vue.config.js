const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  devServer:{
    hot: true,
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    }
  }
});