module.exports = {
  pages: {
    index: {
      // page的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
    },
  },
  productionSourceMap: false,
  lintOnSave: false, //关闭语法检查，
  //代理跨域
  devServer: {
    // proxy: "http://43.143.108.234:3003",
    
    proxy: {
      '/api': {
        target: 'http://43.143.108.234:3003/',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  },
};
