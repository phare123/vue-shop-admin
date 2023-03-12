import request from './request'
import {queryParams} from '@/util/queryParams'

// 获取商品列表
export function getGoods(page,query = {}){
    let r = queryParams(query)
    return request.get(`/goods/${page}${r}`)
}
// 获取商品分类列表
export const getCategory = () => request({ url: `/category`, method: "get" });

// 增加商品
export const addGoods = (data) => request({url:`/goods`,method:"post",data})

// 编辑商品
export const editGoods = (id,data) => request({url:`/goods/${id}`,method:"post",data})

// 设置轮播图
export function setBanner(id,banners){
    banners = !Array.isArray(banners) ? [banners] : banners
    return request.post(`/goods/banners/${id}`,{
        banners
    })
}

// 批量上架、下架商品
export function changeStatus(ids,status){
    ids = !Array.isArray(ids) ? [ids] : ids
    return request.post(`/goods/changestatus`,{
        ids,
        status
    })
}

// 审核商品
export const checkGoods = (id,ischeck) => request({url:`/goods/${id}/check`,body:{ischeck}})

// 批量删除商品
export const delGoods = function(ids){
    ids != Array.isArray(ids) ? [ids] : ids
    return request.post(`/goods/delete_all`,{ids})
}

// 彻底删除商品
export const destroyGoods = function(ids){
    ids != Array.isArray(ids) ? [ids] : ids
    return request.post(`/goods/destroy`,{ids})
}

// 批量恢复商品
export const restoreGoods = function(ids){
    ids != Array.isArray(ids) ? [ids] : ids
    return request.post(`/goods/restore`,{ids})
}