/* empty css             *//* empty css                *//* empty css                        *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                *//* empty css                      *//* empty css               *//* empty css                  *//* empty css                   *//* empty css                   *//* empty css                  *//* empty css                */import{a4 as H,e as P,F as E,E as ne,aa as se}from"./msgTip-a00a6396.js";import{_ as le}from"./formDrawer-615cee08.js";import{d as ie,e as re,f as ce,h as me,i as ue,j as _e,E as de}from"./index-7aff1b23.js";import{_ as J}from"./_plugin-vue_export-helper-c27b6911.js";import{a as pe}from"./index-6998b886.js";import{r as c,o as fe,av as q,m as _,n as w,K as e,C as t,q as d,J as M,R as K,u as s,v as ve,I as O,E as ge,a7 as Q,h as T,D as he,B as I,G as j,H as G}from"./index-d45ed081.js";import{E as W}from"./index-c440b37e.js";import{E as Ce}from"./index-61f461ba.js";import{a as Ee,d as ke}from"./index-f79087c0.js";import{a as ye,E as be}from"./index-ae57328d.js";import{E as xe}from"./index-226dc19b.js";/* empty css               *//* empty css                *//* empty css                    *//* empty css                        */import{E as Ie}from"./index-d6a34864.js";import{E as we}from"./index-184e15d9.js";import{E as Ve,a as $e}from"./index-90167cc1.js";import{E as ze}from"./index-30c8e164.js";import{v as De}from"./directive-7bc345b5.js";const Ne={class:"aside-top"},Be=["onClick"],Le={class:"text"},Me={class:"icon"},Re={class:"aside-bottom"},Ae={__name:"imageAside",emits:["change"],setup(V,{expose:$,emit:k}){const z=H(),h={name:[{required:!0,message:"图库分类相册名不能为空",trigger:"blur"}]},u=c(1),p=c({}),y=c(0),C=(o,a)=>{y.value=o,D(a),k("change",a||p.value.list[0].id)},D=o=>{const a={id:o||p.value.list[0].id,page:u.value||1};z.dispatch("getimagelist",a)},n=async o=>{let a=o||1;u.value=o;let l=await ie(a);p.value=l.data,C(0)},f=c(!1),v=c(null),i=c({name:"",count:1}),r=c(null),N=()=>{f.value=!1,r.value.open()},b=c(0),x=o=>{f.value=!0,b.value=o.id,i.value.name=o.name,i.value.count=o.images_count,r.value.open()};$({handleAdd:N});const B=()=>{v.value.validate(async o=>{o&&(r.value.startLoading(),f.value?(await re(b.value,i.value)).msg=="ok"&&(E("编辑分类成功",1e3,"success"),r.value.endLoading(),r.value.close()):(await ce(i.value)).msg=="ok"&&(E("新增分类成功",1e3,"success"),r.value.endLoading(),r.value.close()))}),n()},L=o=>{me(o).then(a=>E("删除成功",2e3,"success")),n()};return fe(()=>{n()}),(o,a)=>{const l=pe,g=q("Edit"),R=ge,A=Q,X=q("Close"),Y=W,Z=Ce,ee=Ee,te=ne,F=ye,oe=xe,ae=be;return _(),w(M,null,[e(ee,{width:"13vw"},{default:t(()=>[d("div",Ne,[(_(!0),w(M,null,K(s(p).list,(m,S)=>(_(),w("div",{class:ve(["aside-item",s(y)==S?"active":""]),onClick:U=>C(S,m.id)},[e(l,{effect:"dark",content:m.name,placement:"left"},{default:t(()=>[d("div",Le,O(m.name),1)]),_:2},1032,["content"]),d("div",Me,[e(A,{onClick:P(U=>x(m),["stop"]),text:"",type:"primary",size:"small"},{default:t(()=>[e(R,{size:16},{default:t(()=>[e(g)]),_:1})]),_:2},1032,["onClick"]),d("span",{onClick:a[0]||(a[0]=P(()=>{},["stop"]))},[e(Y,{title:"是否删除该分类?","confirm-button-text":"确定","cancel-button-text":"取消",onConfirm:U=>L(m.id)},{reference:t(()=>[e(A,{text:"",type:"primary",size:"small"},{default:t(()=>[e(R,{size:16},{default:t(()=>[e(X)]),_:1})]),_:1})]),_:2},1032,["onConfirm"])])])],10,Be))),256))]),d("div",Re,[e(Z,{"current-page":s(u),background:"",layout:"prev, next",total:Number(s(p).totalCount),onCurrentChange:n},null,8,["current-page","total"])])]),_:1}),e(le,{ref_key:"formDrawerRef",ref:r,title:s(f)?"编辑":"新增","confirm-text":"提交",destroyOnClose:"",onSubmit:B},{default:t(()=>[e(ae,{rules:h,ref_key:"formRef",ref:v,model:s(i),"status-icon":"","label-width":"auto"},{default:t(()=>[e(F,{label:"相册名称",prop:"name"},{default:t(()=>[e(te,{modelValue:s(i).name,"onUpdate:modelValue":a[1]||(a[1]=m=>s(i).name=m)},null,8,["modelValue"])]),_:1}),e(F,{label:"排序"},{default:t(()=>[e(oe,{modelValue:s(i).count,"onUpdate:modelValue":a[2]||(a[2]=m=>s(i).count=m),min:1,max:500},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title"])],64)}}},Et=J(Ae,[["__scopeId","data-v-e87eab22"]]);const Fe={class:"main-top"},Se={class:"shadowMask"},Ue={class:"bottom"},Pe={__name:"imageMain",props:{isCheckedImg:{type:Boolean,default:!1},limit:{type:Number,default:1}},emits:["choose"],setup(V,{emit:$}){const k=V,z=H(),h=c(!1),u=T(()=>z.state.imageList);c(1);const p=n=>{se("重命名",n.name).then(({value:f})=>{h.value=!0,ue(n.id,f).then(v=>{E("修改成功",2e3,"success")}).finally(v=>h.value=!1)})},y=n=>{_e([n])},C=T(()=>u.value.filter(n=>n.checked)),D=n=>{if(n.checked&&C.value.length>k.limit)return n.checked=!1,E(`只能选择${k.limit}张图片`,2e3,"error");$("choose",C.value)};return(n,f)=>{const v=Ie,i=we,r=Q,N=W,b=de,x=Ve,B=ze,L=$e,o=ke,a=De;return he((_(),I(o,null,{default:t(()=>[d("div",Fe,[e(L,null,{default:t(()=>[(_(!0),w(M,null,K(s(u),l=>(_(),I(x,{span:6},{default:t(()=>[e(b,{shadow:"hover"},{default:t(()=>[e(v,{src:l.url,fit:"cover",lazy:"","zoom-rate":1.2,"preview-src-list":[l.url],"initial-index":0},null,8,["src","zoom-rate","preview-src-list"]),d("div",Se,O(l.name),1),d("div",Ue,[V.isCheckedImg?(_(),I(i,{key:0,modelValue:l.checked,"onUpdate:modelValue":g=>l.checked=g,onChange:g=>D(l)},null,8,["modelValue","onUpdate:modelValue","onChange"])):j("",!0),e(r,{text:"",type:"primary",size:"small",onClick:g=>p(l)},{default:t(()=>[G("重命名")]),_:2},1032,["onClick"]),e(N,{title:"是否删除该图片?","confirm-button-text":"确定","cancel-button-text":"取消",onConfirm:g=>y(l.id)},{reference:t(()=>[e(r,{text:"",type:"primary",size:"small"},{default:t(()=>[G("删除")]),_:1})]),_:2},1032,["onConfirm"])])]),_:2},1024)]),_:2},1024))),256)),s(u)&&s(u).length==0?(_(),I(x,{key:0,span:24},{default:t(()=>[e(B,{description:"暂无图片"})]),_:1})):j("",!0)]),_:1})])]),_:1})),[[a,s(h)]])}}},kt=J(Pe,[["__scopeId","data-v-31bb3717"]]);export{kt as a,Et as i};