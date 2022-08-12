// 配置路由
import Vue from "vue";
// 引入vue-router路由插件
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 获取原型对象的push函数
const originalPush = VueRouter.prototype.push;
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// 导入路由组件
import MusicContent from "@/pages/MusicContent";
import MyFavrouiteMusic from "@/pages/MyFavrouiteMusic";
import UserHomePage from "@/pages/UserHomePage";
import FindMusic from "@/pages/FindMusic";
// 创建router实例对象，统一管理路由规则
let router = new VueRouter({
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的这个y=0，代表的滚动条在最上方
    return { y: 0 };
  },
  routes: [
    {
      path: "/musiccontent",
      component: MusicContent,
    },
    {
      path: "/myfavouritemusic",
      component: MyFavrouiteMusic,
    },
    {
      path: "/userhomepage",
      component: UserHomePage,
    },
    {
      path: "/findmusic",
      component: FindMusic,
    },
    // 重定向，在项目跑起来的时候,立马让他定向到首页
    {
      path: "*",
      redirect: "/findmusic",
    },
  ],
});

// 对外暴露VueRouter实例
export default router;
