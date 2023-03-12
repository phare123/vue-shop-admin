import request from '@/api/request'

// 获取公告列表数据
export const getNotice = (page) => request({url:`/notice/${page}`,method:'get'})

// 新增公告
export const addNotice = (data) => request({url:'/notice',method:'post',data})

// 删除公告
export const delNotice = (id) => request({url:`notice/${id}/delete`,method:'post'})

// 修改公告
export const editNotice = (id,data) => request({url:`/notice/${id}`,method:'post',data})