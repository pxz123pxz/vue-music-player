module.exports = {
  pages: {
    index: {
      // page的入口
      entry: "src/main.js",
    },
  },
  productionSourceMap: false,
  lintOnSave: false, //关闭语法检查，
  //代理跨域
  devServer: {
    proxy: "https://netease-cloud-music-api-five-beryl-41.vercel.app",
    // proxy: "http://localhost:3000",
  },
  publicPath: '/'
};
