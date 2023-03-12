import request from './request'
import {queryParams} from '@/util/queryParams'

// 获取角色列表
export function getUser(page,query = {}){
    let r = queryParams(query)
    return request.get(`/user/${page}${r}`)
}

// 编辑角色列表
export const editUser = (id,data) => request({url:`/user/${id}`,method:'post',data})

// 新增角色
export const addUser = (data) => request({url:`/user`,method:'post',data})

// 修改角色状态
export const changeUserStatus = (id,status) => request({url:`/user/${id}/update_status`,method:'post',data:{status}})

// 删除会员
export const delUser = (id) => request({url:`/user/${id}/delete`,method:'post'})