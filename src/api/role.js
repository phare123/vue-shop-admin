import request from './request'

// 获取角色列表
export const getRoles = (page) => request({url:`/role/${page}`,method:'get'})

// 增加角色
export const addRoles = (data) => request({url:'/role',method:'post',data})

// 修改角色
export const editRoles = (id,data) => request({url:`/role/${id}`,method:'post',data})

// 删除角色
export const delRoles = (id) => request({url:`/role/${id}/delete`,method:'post'})

// 修改角色状态
export const changeRoleStatus = (id,status) => request({url:`role/${id}/update_status`,method:'post',data:{status}})

// 配置角色权限
export const setRoleRule = (id,data) => request({url:`/role/set_rules`,method:'post',data:{
    id,
    "rule_ids":data
}})