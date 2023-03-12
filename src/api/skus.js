import request from "./request";

// 获取商品规格列表
export const getSkus = (page) =>
  request({ url: `/skus/${page}`, method: "get" });

// 增加商品规格
export const addSkus = (data) =>
  request({ url: `/skus`, method: "post", data });

// 修改商品规格
export const editSkus = (id,data) =>
  request({ url: `/skus/${id}`, method: "post", data });

// 修改商品规格状态
export const changeSkusStatus = (id,status) =>
  request({ url: `/skus/${id}/update_status`, method: "post", data: { status } });

  // 删除商品规格
export function delSkus(ids){
    ids = !Array.isArray(ids) ? [ids] : ids
    return request.post(`/skus/delete_all`, {ids})
}
