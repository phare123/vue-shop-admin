// 管理员
import request from './request'

// 登录接口
export const Login = (params) => request({url:'/login',method:'post',data:params})

// 获取管理员信息和权限菜单
export const getInfo = () => request({url:'/getinfo',method:'post'})

// 退出登录
export const logout = () => request({url:'/logout',method:'post'})

// 修改密码
export const updatePassword = (params) => request({url:'/updatepassword',method:'post',data:params})