/* empty css             *//* empty css               *//* empty css                *//* empty css                  */import"./el-form-item-4ed993c7.js";/* empty css                 */import{ac as k,r as g,o as b,a9 as B,a7 as I,m as S,B as C,C as t,K as e,u as s,H as R,cJ as U,cK as q,cG as F,cH as K,q as o}from"./index-d45ed081.js";import{a4 as N,a7 as H,E as L,F as G}from"./msgTip-a00a6396.js";import{_ as J}from"./_plugin-vue_export-helper-c27b6911.js";import{E as M,a as P}from"./index-90167cc1.js";import{a as T,E as j}from"./index-ae57328d.js";import"./_initCloneObject-4b55852b.js";const v=n=>(F("data-v-65588222"),n=n(),K(),n),z=v(()=>o("div",null,[o("h2",null,"欢迎光临"),o("p",null,"此站点是基于vue3+vite与Element-Plus开发的商城后台管理系统")],-1)),A=v(()=>o("div",{class:"text"},[o("h2",null,"欢迎回来"),o("div",{class:"info"},[o("span"),o("p",null,"账号密码登录"),o("span")])],-1)),D={__name:"login",setup(n){const x=N(),E=H(),a=k({username:"admin",password:"admin"}),w={username:[{required:!0,message:"用户名不能为空",trigger:"blur"},{min:1,max:10,message:"用户名过长，请重新输入",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:5,max:10,message:"密码长度应为5到10个字符",trigger:"blur"}]},u=g(!1),i=g(null),d=()=>{i.value.validate(l=>{if(!l)return!1;u.value=!0,x.dispatch("login",a).then(r=>{G("登录成功",3e3,"success"),E.replace("/")}).finally(()=>{u.value=!1})})},c=l=>{l.key=="Enter"&&d()};return b(()=>{document.addEventListener("keyup",c)}),B(()=>{document.removeEventListener("keyup",c)}),(l,r)=>{const _=M,f=L,m=T,y=I,h=j,V=P;return S(),C(V,null,{default:t(()=>[e(_,{lg:16,md:12},{default:t(()=>[z]),_:1}),e(_,{lg:8,md:12},{default:t(()=>[A,e(h,{ref_key:"formRef",ref:i,"status-icon":"",rules:w,model:s(a)},{default:t(()=>[e(m,{prop:"username"},{default:t(()=>[e(f,{modelValue:s(a).username,"onUpdate:modelValue":r[0]||(r[0]=p=>s(a).username=p),placeholder:"请输入用户名","prefix-icon":s(U)},null,8,["modelValue","prefix-icon"])]),_:1}),e(m,{prop:"password"},{default:t(()=>[e(f,{modelValue:s(a).password,"onUpdate:modelValue":r[1]||(r[1]=p=>s(a).password=p),"show-password":"",type:"password",placeholder:"请输入密码","prefix-icon":s(q)},null,8,["modelValue","prefix-icon"])]),_:1}),e(m,null,{default:t(()=>[e(y,{round:"",color:"#6366f1",type:"primary",loading:s(u),onClick:d},{default:t(()=>[R("登 录")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})}}},re=J(D,[["__scopeId","data-v-65588222"]]);export{re as default};
