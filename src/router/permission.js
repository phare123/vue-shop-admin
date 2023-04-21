import {router,addRoutes} from "@/router";
import { notification } from "../util/msgTip";
import store from "../store";
import { getToken } from "../util/token";


router.beforeEach(async(to, from, next) => {
  const token = getToken()
  //没有token且要到达的不是登录页，返回登录页
  if (!token && to.path != "/login") {
    notification("请先登录", 3000, "error");
    next("/login");
  }
  // 防止重复登录
  if (token && to.path == "/login") {
    notification("请勿重复登录", 3000, "warning");
    next({ path: from.path ? from.path : "/" });
  }
  
  let hasNewRoutes = false
  let hasGetInfo = false
  if(token && !hasGetInfo){
    let res = await store.dispatch('getinfo')
    hasGetInfo = true
    // 动态添加路由
    hasNewRoutes = addRoutes(res.data.menus)
  }
  // 设置页面标题
  let title = "小罗商城管理系统--" + (to.meta.title ? to.meta.title : "");
  document.title = title;

  hasNewRoutes ? next(to.fullPath) : next()
});
