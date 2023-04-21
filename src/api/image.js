// 图库模块
import request from './request'

// 获取图库列表
export const getImageClass = (page) => request({url:`/image_class/${page}`,method:'get'})

// 修改图库分类
export const editImageClass = (id,params) => request({url:`/image_class/${id}`,method:'post',data:params})

// 删除图库分类
export const delImageClass = (id) => request({url:`/image_class/${id}/delete`,method:'post'})

// 新增图库分类
export const addImageClass = (params) => request({url:`/image_class`,method:'post',data:params})

// 获取图库图片
export const getImageList = (id,page) => request({url:`/image_class/${id}/image/${page}?limit=1000`,method:'get'})

// 图片重命名
export const reNameImg = (id,name) => request({url:`/image/${id}`,method:'post',data:{name}})

// 删除图片
export const delImg = (ids) => request({url:'/image/delete_all',method:'post',data:{ids}})

// 上传图片
export const uploadSrc = import.meta.env.VITE_APP_BASE_API + '/image/upload'