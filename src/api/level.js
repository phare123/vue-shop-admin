import request from './request'

// 会员等级列表
export const getLevel = (page) => request({url:`/user_level/${page}`,method:'get'})

// 增加会员的等级
export const addLevel = (data) => request({url:`/user_level`,method:'post',data})

// 修改会员等级
export const editLevel = (id,data) => request({url:`/user_level/${id}`,method:"post",data})

// 修改会员等级状态
export const changeLevelStatus = (id,status) => request({url:`/user_level/${id}/update_status`,method:'post',data:{status}})

// 删除会员等级
export const delLevel = (id) => request({url:`/user_level/${id}/delete`,method:'post'})