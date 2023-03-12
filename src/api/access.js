import request from './request'

// 获取菜单权限列表
export const getRules = () => request({url:`/rule/1`,method:'get'})

// 增加菜单权限
export const addRules = (data) => request({url:`/rule`,method:'post',data})

// 修改菜单权限
export const editRules = (data) => request({url:'/rule/193',method:'post',data})

// 删除菜单权限
export const delRules = (id) => request({url:`/rule/${id}/delete`,method:'post'})

// 修改菜单权限状态
export const changeRulesStatus = (id,status) => request({url:`/rule/${id}/update_status`,method:'post',data:{status}})