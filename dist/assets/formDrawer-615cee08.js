/* empty css             *//* empty css                  */import{_ as g}from"./_plugin-vue_export-helper-c27b6911.js";import{r as i,m as d,B as w,C as a,q as n,t as x,n as k,K as c,u,H as f,I as B,G as C,a as V,a7 as b}from"./index-d45ed081.js";import{E as D}from"./index-1cb0abaf.js";const S={class:"formDrawer"},z={class:"body",style:{overflow:"auto"}},E={class:"btn"},L={key:0,style:{flex:"auto"}},N={__name:"formDrawer",props:{title:String,size:{type:String,default:"40%"},confirmText:{type:String},destroyOnClose:{type:Boolean,default:!1}},emits:["submit"],setup(t,{expose:m,emit:_}){const e=i(!1),s=i(!1),p=()=>_("submit");return m({open:()=>{e.value=!0},close:()=>{e.value=!1},startLoading:()=>{s.value=!0},endLoading:()=>{s.value=!1}}),(y,o)=>{const l=b,v=D;return d(),w(v,{modelValue:u(e),"onUpdate:modelValue":o[1]||(o[1]=r=>V(e)?e.value=r:null),title:t.title,"close-on-click-modal":!1,size:t.size,"destroy-on-close":t.destroyOnClose},{default:a(()=>[n("div",S,[n("div",z,[x(y.$slots,"default",{},void 0,!0)]),n("div",E,[t.confirmText?(d(),k("div",L,[c(l,{type:"primary",color:"#6366f1",loading:u(s),onClick:p},{default:a(()=>[f(B(t.confirmText),1)]),_:1},8,["loading"]),c(l,{onClick:o[0]||(o[0]=r=>e.value=!1)},{default:a(()=>[f("取消")]),_:1})])):C("",!0)])])]),_:3},8,["modelValue","title","size","destroy-on-close"])}}},R=g(N,[["__scopeId","data-v-1072241f"]]);export{R as _};