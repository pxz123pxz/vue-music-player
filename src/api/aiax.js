import qs from "qs";
// 对axios进行二次封装
import axios from "axios";

// 利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
<<<<<<< HEAD
  baseURL: "api",
=======
  baseUrl:
  process.env.NODE_ENV === "production"
      ? ""
      : "https://netease-cloud-music-api-five-beryl-41.vercel.app/",
>>>>>>> 1d486bca11ad1bc552d2a5f2397c2bce37f9d2ad
  withCredentials: true, //允许请求携带cookie
  paramsSerializer: function (params) {
    //对params参数进行序列化
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
});

// 请求拦截器：在发送请求之前，请求拦截器可以监测到
requests.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
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
