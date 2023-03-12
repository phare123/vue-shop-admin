import request from './request'

// 获取系统设置
export const getSetting = () => request({url:`/sysconfig`})

// 修改系统设置
export const changeSetting = (data) => request({url:`/sysconfig`,method:'post',data})

// 上传文件
export const uploadFileSrc = `/api/sysconfig/upload`