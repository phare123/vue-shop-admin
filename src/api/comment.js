import request from './request'
import {queryParams} from '@/util/queryParams'

// 获取评论
export function getComment(page,query = {}){
    let r = queryParams(query)
    return request.get(`/goods_comment/${page}${r}`)
}

// 修改商品评价状态
export const changeCommentStatus = (id,status) => request({url:`/goods_comment/${id}/update_status`,method:'post',data:{status}})

// 回复评价
export const reviewwComment = (id,msg) => request({url:`/goods_comment/review/${id}`,method:'post',data:{
    data:msg
}})