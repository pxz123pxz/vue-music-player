import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import {Message} from 'element-ui';
import { Slider } from "element-ui";
Vue.component(Slider.name, Slider);
// 注册全局组件
import Progress from '@/components/Progress';
Vue.component(Progress.name, Progress);
import {Loading} from 'element-ui';
Vue.use(Loading.directive)
// 引入路由
import router from "@/router/routes";
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
    Vue.prototype.$message = Message;
    
  },
}).$mount("#app");
