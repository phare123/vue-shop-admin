import request from './request'
import {queryParams} from '@/util/queryParams'

// 分销数据统计
export const getStatistic = () => request({url:`/agent/statistics`})

// 分销推广员列表
export function getAgentList(page,query = {}){
    let r = queryParams(query)
    return request.get(`/agent/${page}${r}`)
}

// 推广订单列表
export function getPromoteList(page,query = {}){
    let r = queryParams(query)
    return request.get(`/user_bill/${page}${r}`)
}

// 获取分销配置
export const getSetting = () => request({url:`/distribution_setting/get`})

// 修改分销配置
export const setSetting = (data) => request({url:`/distribution_setting/set`,method:"post",data})
