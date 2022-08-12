// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";

// 利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
  baseUrl: "https://netease-cloud-music-api-five-beryl-41.vercel.app/",
  withCredentials: true, //允许请求携带cookie
  // 代表请求超时的时间为5s
});

// 请求拦截器：在发送请求之前，请求拦截器可以监测到
requests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done();
    // 返回响应体中的data数据
    return res.data;
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);

// 对外暴露
export default requests;
