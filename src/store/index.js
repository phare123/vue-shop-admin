import { createStore } from "vuex";
import { Login, getInfo, logout,updatePassword } from "@/api/manage";
import { getImageList } from "../api/image";
import { setToken, rmToken } from "../util/token";
import { notification } from "../util/msgTip";
import {router} from "../router";

const store = createStore({
  state() {
    // 用户信息
    user: {}
    // 侧边展开与折叠
    collapse:false
    // 侧边菜单
    asideMenu:[]
    // 权限相关
    ruleNames:[]
    // 图库图片
    imageList:[]
  },
  mutations: {
    // 修改用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 退出登录
    LOGOUT(state) {
      // 清除vuex数据
      state.user = {}
      // 清除token
      rmToken();
      // 跳转登录页面
      router.replace("/login");
    },
    // 修改侧边展开折叠
    changeCollapse(state){
      state.collapse = !state.collapse
    },
    // 给侧边菜单赋值
    SET_ASIDEMENU(state,menu){
      state.asideMenu = menu
    },
    SET_RULENAMES(state,ruleNames){
      state.ruleNames = ruleNames
    },
    // 设置图库
    SET_IMAGELIST(state,imageList){
      imageList.list.map(item => item.checked = false)
      state.imageList = imageList.list
    }
  },
  actions: {
    // 登录
    login({ state, commit }, form) {
      return new Promise((resolve, reject) => {
        Login(form)
          .then((res) => {
            setToken(res.data.token);

            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 获取用户信息
    getinfo({ commit }) {
      return new Promise((resolve,reject)=>{
        getInfo().then(res=>{
            commit("SET_USERINFO",res)
            commit('SET_ASIDEMENU',res.data.menus)
            commit('SET_RULENAMES',res.data.ruleNames)
            resolve(res)
        }).catch(err=>reject(err))
    })
    },
    // 退出登录
    async logout({ commit }) {
      let res = await logout();
      if (res.msg == 'ok') {
        commit("LOGOUT");
      }
    },
    // 修改密码
    async updatepassword({commit},form){
      let res = await updatePassword(form)
      console.log(res);
    },
    // 获取图库图片
    async getimagelist({commit},{id,page}){
      let res = await getImageList(id,page)       
       commit('SET_IMAGELIST',res.data)
    }
  },
});

export default store;
