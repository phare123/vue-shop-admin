import{b as k,az as z,c as v,Z as _,d as b,f as d,g as C,r as B,h as l,L as w,j as P,l as A,m as n,n as u,x as f,u as o,B as m,C as L,F as N,E as j,t as F,v as I,_ as T,y as q}from"./index-d45ed081.js";const D=k({size:{type:[Number,String],values:z,default:"",validator:e=>v(e)},shape:{type:String,values:["circle","square"],default:"circle"},icon:{type:_},src:{type:String,default:""},alt:String,srcSet:String,fit:{type:b(String),default:"cover"}}),U={error:e=>e instanceof Event},V=["src","alt","srcset"],Z=d({name:"ElAvatar"}),$=d({...Z,props:D,emits:U,setup(e,{emit:y}){const t=e,a=C("avatar"),c=B(!1),S=l(()=>{const{size:s,icon:i,shape:p}=t,r=[a.b()];return w(s)&&r.push(a.m(s)),i&&r.push(a.m("icon")),p&&r.push(a.m(p)),r}),h=l(()=>{const{size:s}=t;return v(s)?a.cssVarBlock({size:P(s)||""}):void 0}),E=l(()=>({objectFit:t.fit}));A(()=>t.src,()=>c.value=!1);function g(s){c.value=!0,y("error",s)}return(s,i)=>(n(),u("span",{class:I(o(S)),style:f(o(h))},[(s.src||s.srcSet)&&!c.value?(n(),u("img",{key:0,src:s.src,alt:s.alt,srcset:s.srcSet,style:f(o(E)),onError:g},null,44,V)):s.icon?(n(),m(o(j),{key:1},{default:L(()=>[(n(),m(N(s.icon)))]),_:1})):F(s.$slots,"default",{key:2})],6))}});var G=T($,[["__file","/home/runner/work/element-plus/element-plus/packages/components/avatar/src/avatar.vue"]]);const J=q(G);export{J as E};
