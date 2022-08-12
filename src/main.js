import Vue from "vue";
import App from "./App.vue";
import store from "@/store";

// 引入路由
import router from "@/router/routes";
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
  },
}).$mount("#app");
