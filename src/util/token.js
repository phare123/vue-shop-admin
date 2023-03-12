// 封装token相关功能
import Cookies from "js-cookie";
const tokenKey = "admin-token";

// 设置token
export const setToken = (token) => {
    return Cookies.set(tokenKey,token)
};

// 获取token
export const getToken = () => {
    return Cookies.get(tokenKey)
};

// 删除token
export const rmToken = () => {
    return Cookies.remove(tokenKey)
};
