//主控台
import request from './request'

// 面板数据
export const getOneStatic = () => request({url:'/statistics1',method:'get'})
// 面板2数据 
export const getTwoStatic = () => request({url:'/statistics2',method:'get'})
// 图表数据
export const getChartTable = (type) => request({url:`/statistics3?type=${type}`,method:'get'})