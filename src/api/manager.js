import request from '@/api/request'
import {queryParams} from '@/util/queryParams'

// 获取管理员列表
export function getManagerList(page,query = {}){
    let r = queryParams(query)
    return request.get(`/manager/${page}${r}`)
}

// 删除管理员
export const delManager = (id) => request({url:`/manager/${id}/delete`,method:'post'})

// 修改管理员状态
export const changeStatus = (id,status) => request({url:`manager/${id}/update_status`,method:'post',data:{status}})

// 编辑管理员
export const EditManager = (id,data) => request({url:`/manager/${id}`,method:'post',data})

// 新增管理员
export const addManager = (data) => request({url:`/manager`,method:'post',data})