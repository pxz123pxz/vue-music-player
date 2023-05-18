import Vue from "vue";
import Vuex from "vuex";
// 使用插件一次
Vue.use(Vuex);
// 引入小仓库
import search from "./search/search";
import lyric from "./lyric/lyric";
import userinfo from "./userinfo/userinfo";
// import findmusic from "./findmusic/findmusic"
// 对外暴露实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules: {
    search,
    lyric,
    userinfo,
  },
});
