import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "admin",
    component: () => import("@/view/Main.vue"),
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/login.vue"),
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/view/404/404.vue"),
    meta: {
      title: "发生错误啦",
    },
  },
];

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/view/home/home.vue"),
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () => import("@/view/goods/list.vue"),
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: () => import("@/view/category/list.vue"),
    meta: {
      title: "分类列表",
    },
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: () => import("@/view/user/list.vue"),
    meta: {
      title: "用户列表",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: () => import("@/view/order/list.vue"),
    meta: {
      title: "订单列表",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: () => import("@/view/comment/list.vue"),
    meta: {
      title: "评价列表",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: () => import("@/view/image/list.vue"),
    meta: {
      title: "图库列表",
    },
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: () => import("@/view/notice/list.vue"),
    meta: {
      title: "公告列表",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: () => import("@/view/coupon/list.vue"),
    meta: {
      title: "优惠券",
    },
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: () => import("@/view/manager/list.vue"),
    meta: {
      title: "管理员管理",
    },
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: () => import("@/view/access/list.vue"),
    meta: {
      title: "权限管理",
    },
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: () => import("@/view/role/list.vue"),
    meta: {
      title: "角色管理",
    },
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: () => import("@/view/skus/list.vue"),
    meta: {
      title: "规格管理",
    },
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: () => import("@/view/level/list.vue"),
    meta: {
      title: "会员等级",
    },
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: () => import("@/view/setting/base.vue"),
    meta: {
      title: "基础设置",
    },
  },
  {
    path: "/setting/buy",
    name: "/setting/buy",
    component: () => import("@/view/setting/buy.vue"),
    meta: {
      title: "交易设置",
    },
  },
  {
    path: "/setting/ship",
    name: "/setting/ship",
    component: () => import("@/view/setting/ship.vue"),
    meta: {
      title: "物流设置",
    },
  },
  {
    path: "/distribution/index",
    name: "/distribution/index",
    component: () => import("@/view/distribution/index.vue"),
    meta: {
      title: "分销员管理",
    },
  },
  {
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: () => import("@/view/distribution/setting.vue"),
    meta: {
      title: "分销设置",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach((e) => {
      let item = asyncRoutes.find((o) => o.path == e.frontpath);
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("admin", item);
        hasNewRoutes = true;
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child);
      }
    });
  };

  findAndAddRoutesByMenus(menus);
  return hasNewRoutes;
}
