import request from './request'
import {queryParams} from '@/util/queryParams'

//获取订单列表
export function getOrder(page,query = {}){
    let r = queryParams(query)
    return request.get(`/order/${page}${r}`)
}

// 批量删除订单
export const delOrders = function(ids){
    ids = !Array.isArray(ids) ? [ids] : ids
    return request.post('/order/delete_all',{ids})
}

// 订单发货
export const shipOrder = (id,data) => request({url:`/order/${id}/ship`,method:'post',data})

// 拒绝/同意退款
export const refund = (id,{agree,disagree_reason}) => request({url:`/order/${id}/handle_refund`,method:'post',data:{agree,disagree_reason}})

// 导出订单
export function exportExcel(query = {}){
    let r = queryParams(query)
    return request.post(`/order/excelexport${r}`,{},{
        responseType:'blob'
    })
}

// 快递公司列表
export const company = () => request({url:`/express_company/1`,method:'get'})

// 查看订单物流
export const getShipInfo = (id) => request({url:`/order/${id}/get_ship_info`,method:'get'})