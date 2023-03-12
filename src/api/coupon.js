import request from './request'

// 获取优惠券列表
export const getCoupon = (page) => request({url:`/coupon/${page}`,method:'get'})

// 增加优惠券
export const addCoupon = (data) => request({url:`/coupon`,method:"post",data})

// 编辑优惠券
export const editCoupon = (id,data) => request({url:`/coupon/${id}`,method:"post",data})

// 删除优惠券
export const delCoupon = (id) => request({url:`/coupon/${id}/delete`,method:"post"})

// 失效优惠券
export const updateCoupon = (id,status) => request({url:`/coupon/${id}/update_status`,method:'post',data:{status}})