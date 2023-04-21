import axios from "axios";
import { getToken } from "../util/token";
import { notification } from "../util/msgTip";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "../store";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,  
});

service.interceptors.request.use(
  (config) => {
    nprogress.start()
    // 往headers添加token
    const token = getToken()
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data;
  },
  (err) => {
    const msg = err.response.data.msg
    if(msg == '非法token，请先登录！'){
      store.dispatch('logout').finally(() => location.reload())
    }
    notification(msg || '登录失败' ,3000,'error')
    return Promise.reject(err);
  }
);

export default service;
