/* empty css             *//* empty css                  */import{g as ee}from"./access-6eda05a4.js";/* empty css                    *//* empty css                   *//* empty css               */import{_ as te}from"./formDrawer-615cee08.js";/* empty css                */import"./el-form-item-4ed993c7.js";/* empty css                 *//* empty css                *//* empty css                      *//* empty css                        *//* empty css                   *//* empty css                  *//* empty css                  */import{t as oe}from"./tableHeader-f66fb168.js";import{b as c,E as le}from"./index-7aff1b23.js";import{u as ae,a as ne}from"./useCommon-3fca7f65.js";import{F as re,E as se}from"./msgTip-a00a6396.js";import{_ as ie}from"./_plugin-vue_export-helper-c27b6911.js";import{v as me}from"./directive-7bc345b5.js";import{a as de,E as ue}from"./index-4bd039ef.js";import{E as ce}from"./index-d4c13dda.js";import{r as u,o as pe,m as b,n as _e,K as e,C as o,u as t,D,B as S,H as h,q as T,I,a7 as fe}from"./index-d45ed081.js";import{E as he}from"./index-c440b37e.js";import{E as ve}from"./index-61f461ba.js";import{a as ge,E as be}from"./index-ae57328d.js";import{E as ye}from"./index-151d4a8e.js";import{q as Ce}from"./index-c090aad6.js";import"./index-1cb0abaf.js";/* empty css                */import"./index-6998b886.js";import"./js.cookie-cf83ad76.js";import"./strings-5238cde9.js";import"./index-184e15d9.js";import"./_initCloneObject-4b55852b.js";import"./index-b06f2c24.js";const Ee=a=>c({url:`/role/${a}`,method:"get"}),ke=a=>c({url:"/role",method:"post",data:a}),we=(a,s)=>c({url:`/role/${a}`,method:"post",data:s}),xe=a=>c({url:`/role/${a}/delete`,method:"post"}),Re=(a,s)=>c({url:`role/${a}/update_status`,method:"post",data:{status:s}}),Ve=(a,s)=>c({url:"/role/set_rules",method:"post",data:{id:a,rule_ids:s}});const De={__name:"list",setup(a){const{loading:s,tableData:$,total:B,changePage:F,getData:_,handleDel:L,handleChange:K}=ae({changeStatus:Re,del:xe,getList:Ee}),{formDrawerRef:z,formRef:P,isEdit:H,Form:m,handleCreate:N,handleEdit:U,onSubmit:q}=ne({Form:{name:"",status:1,desc:""},getData:_,add:ke,edit:we}),O=window.innerHeight-170,p=u(null),y=u(null),C=u([]),E=u([]),k=u(0),f=u([]),M=d=>{k.value=d.id,ee().then(n=>{E.value=n.data.list,p.value.open(),C.value=n.data.list.map(r=>r.id),f.value=d.rules.map(r=>r.id),setTimeout(()=>{y.value.setCheckedKeys(f.value)},150)})},j=(...d)=>{const{checkedKeys:n,halfCheckedKeys:r}=d[1];f.value=[...n,...r]},A=()=>{p.value.startLoading(),Ve(k.value,f.value).then(d=>{re("配置成功",2e3,"success"),p.value.close(),_()}).finally(()=>{p.value.endLoading()})};return pe(()=>{_()}),(d,n)=>{const r=de,w=ce,v=fe,G=he,J=ue,Q=ve,W=le,x=se,g=ge,X=be,R=te,Y=ye,Z=Ce,V=me;return b(),_e("div",null,[e(W,{shadow:"always"},{default:o(()=>[e(oe,{onCreate:t(N),onRefresh:t(_)},null,8,["onCreate","onRefresh"]),D((b(),S(J,{"max-height":"480px",data:t($),stripe:"",style:{width:"100%"}},{default:o(()=>[e(r,{prop:"name",label:"角色名称",width:"320"}),e(r,{prop:"desc",label:"角色描述",width:"360"}),e(r,{label:"状态",width:"320"},{default:o(({row:l})=>[e(w,{disabled:l.super==1,onChange:i=>t(K)(i,l),"model-value":l.status,"active-value":1,"inactive-value":0,"active-color":"#4339ca"},null,8,["disabled","onChange","model-value"])]),_:1}),e(r,{fixed:"right",label:"操作",width:"200",align:"center"},{default:o(l=>[e(v,{link:"",type:"primary",size:"small",onClick:i=>M(l.row)},{default:o(()=>[h("配置权限")]),_:2},1032,["onClick"]),e(v,{link:"",type:"primary",size:"small",onClick:i=>t(U)(l.row)},{default:o(()=>[h("编辑")]),_:2},1032,["onClick"]),e(G,{title:"确认删除吗?","confirm-button-text":"确定","cancel-button-text":"取消",onConfirm:i=>t(L)(l.row.id)},{reference:o(()=>[e(v,{link:"",type:"primary",size:"small"},{default:o(()=>[h("删除")]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"])),[[V,t(s)]]),e(Q,{small:"",background:"",layout:"prev, pager, next",total:t(B),onCurrentChange:t(F)},null,8,["total","onCurrentChange"])]),_:1}),e(R,{ref_key:"formDrawerRef",ref:z,title:t(H)?"编辑公告":"新增公告","confirm-text":"提交",destroyOnClose:"",onSubmit:t(q)},{default:o(()=>[e(X,{ref_key:"formRef",ref:P,model:t(m),"status-icon":"","label-width":"auto"},{default:o(()=>[e(g,{label:"角色名称"},{default:o(()=>[e(x,{modelValue:t(m).name,"onUpdate:modelValue":n[0]||(n[0]=l=>t(m).name=l),placeholder:"请输入角色名称"},null,8,["modelValue"])]),_:1}),e(g,{label:"角色描述"},{default:o(()=>[e(x,{type:"textarea",rows:"4",modelValue:t(m).desc,"onUpdate:modelValue":n[1]||(n[1]=l=>t(m).desc=l),placeholder:"请输入角色描述"},null,8,["modelValue"])]),_:1}),e(g,{label:"状态"},{default:o(()=>[e(w,{modelValue:t(m).status,"onUpdate:modelValue":n[2]||(n[2]=l=>t(m).status=l),"active-value":1,"inactive-value":0,"active-color":"#4339ca"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title","onSubmit"]),e(R,{ref_key:"setRoleformDrawerRef",ref:p,title:"配置权限","confirm-text":"提交",destroyOnClose:"",onSubmit:A},{default:o(()=>[D((b(),S(Z,{ref_key:"treeRef",ref:y,data:E.value,props:{label:"name",children:"child"},"show-checkbox":"",height:O,"default-expanded-keys":C.value,onCheck:j},{default:o(({node:l,data:i})=>[T("div",null,[e(Y,{type:i.menu==1?"":"info",size:"small",style:{margin:"0 5px"}},{default:o(()=>[h(I(i.menu==1?"菜单":"权限"),1)]),_:2},1032,["type"]),T("span",null,I(i.name),1)])]),_:1},8,["data","default-expanded-keys"])),[[V,t(s)]])]),_:1},512)])}}},pt=ie(De,[["__scopeId","data-v-a5b3c0b9"]]);export{pt as default};
