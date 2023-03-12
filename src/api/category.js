import request from "./request";

// 获取商品分类
export const getCategory = () => request({ url: `/category`, method: "get" });

// 修改商品分类
export const editCategory = (id, data) =>
  request({ url: `/category/${id}`, method: "post", data });

// 增加商品分类
export const addCategory = (data) =>
  request({ url: `/category`, method: "post", data });

// 删除商品分类
export const delCategory = (id) =>
  request({ url: `/category/${id}/delete`, method: "post" });

// 修改商品分类状态
export const changeCategoryStatus = (id, status) =>
  request({ url: `/category/${id}/update_status`, method:'post',data: { status } });

//分类关联产品列表
export const getCategoryItem = (id) => request({url:`/app_category_item/list?category_id=${id}`,method:"get"})

// 删除关联产品
export const delCategoryItem = (id) => request({url:`/app_category_item/${id}/delete`,method:'post'})

// 关联产品 

export function releCategoryItem(category_id,goods_ids){
  goods_ids != Array.isArray(goods_ids) ? [goods_ids] : goods_ids
  return request.post(`/app_category_item`,{
    category_id,
    goods_ids
  })
}