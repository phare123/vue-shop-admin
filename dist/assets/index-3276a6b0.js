import{s as ge,ay as _e,b as D,d as Y,f as F,a0 as Z,g as I,r as w,l as O,V as J,m as ne,n as le,v as oe,u as k,x as Ne,_ as re,a2 as K,h as L,o as ie,aZ as Ce,K as v,E as M,aa as Te,ab as we,am as Pe,a4 as Ee,$ as Se,c6 as $e,t as ce,L as xe,c as ke,ae as te,A as Be,cx as ae,ac as Oe,ad as Re,D as ze,G as Ae,y as Fe,a3 as Le}from"./index-d45ed081.js";import{l as Me,m as ue,t as Q,i as de,a2 as Ve,a3 as De,h as V,U as be,v as Ie}from"./msgTip-a00a6396.js";import{c as B}from"./strings-5238cde9.js";const U=Symbol("tabsRootContextKey"),Ke=(e,n,f)=>Me(e.subTree).filter(t=>{var l;return _e(t)&&((l=t.type)==null?void 0:l.name)===n&&!!t.component}).map(t=>t.component.uid).map(t=>f[t]).filter(t=>!!t),Ue=(e,n)=>{const f={},C=ge([]);return{children:C,addChild:l=>{f[l.uid]=l,C.value=Ke(e,n,f)},removeChild:l=>{delete f[l],C.value=C.value.filter(E=>E.uid!==l)}}},qe=D({tabs:{type:Y(Array),default:()=>ue([])}}),ve="ElTabBar",He=F({name:ve}),We=F({...He,props:qe,setup(e,{expose:n}){const f=e,C=K(),i=Z(U);i||Q(ve,"<el-tabs><el-tab-bar /></el-tabs>");const t=I("tabs"),l=w(),E=w(),u=()=>{let m=0,r=0;const d=["top","bottom"].includes(i.props.tabPosition)?"width":"height",b=d==="width"?"x":"y",S=b==="x"?"left":"top";return f.tabs.every(P=>{var R,a;const h=(a=(R=C.parent)==null?void 0:R.refs)==null?void 0:a[`tab-${P.uid}`];if(!h)return!1;if(!P.active)return!0;m=h[`offset${B(S)}`],r=h[`client${B(d)}`];const g=window.getComputedStyle(h);return d==="width"&&(f.tabs.length>1&&(r-=Number.parseFloat(g.paddingLeft)+Number.parseFloat(g.paddingRight)),m+=Number.parseFloat(g.paddingLeft)),!1}),{[d]:`${r}px`,transform:`translate${B(b)}(${m}px)`}},y=()=>E.value=u();return O(()=>f.tabs,async()=>{await J(),y()},{immediate:!0}),de(l,()=>y()),n({ref:l,update:y}),(m,r)=>(ne(),le("div",{ref_key:"barRef",ref:l,class:oe([k(t).e("active-bar"),k(t).is(k(i).props.tabPosition)]),style:Ne(E.value)},null,6))}});var je=re(We,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const Ge=D({panes:{type:Y(Array),default:()=>ue([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),Xe={tabClick:(e,n,f)=>f instanceof Event,tabRemove:(e,n)=>n instanceof Event},se="ElTabNav",Ye=F({name:se,props:Ge,emits:Xe,setup(e,{expose:n,emit:f}){const C=K(),i=Z(U);i||Q(se,"<el-tabs><tab-nav /></el-tabs>");const t=I("tabs"),l=Ve(),E=De(),u=w(),y=w(),m=w(),r=w(!1),d=w(0),b=w(!1),S=w(!0),P=L(()=>["top","bottom"].includes(i.props.tabPosition)?"width":"height"),R=L(()=>({transform:`translate${P.value==="width"?"X":"Y"}(-${d.value}px)`})),a=()=>{if(!u.value)return;const o=u.value[`offset${B(P.value)}`],c=d.value;if(!c)return;const s=c>o?c-o:0;d.value=s},h=()=>{if(!u.value||!y.value)return;const o=y.value[`offset${B(P.value)}`],c=u.value[`offset${B(P.value)}`],s=d.value;if(o-s<=c)return;const x=o-s>c*2?s+c:o-c;d.value=x},g=async()=>{const o=y.value;if(!r.value||!m.value||!u.value||!o)return;await J();const c=m.value.querySelector(".is-active");if(!c)return;const s=u.value,x=["top","bottom"].includes(i.props.tabPosition),N=c.getBoundingClientRect(),_=s.getBoundingClientRect(),$=x?o.offsetWidth-_.width:o.offsetHeight-_.height,T=d.value;let p=T;x?(N.left<_.left&&(p=T-(_.left-N.left)),N.right>_.right&&(p=T+N.right-_.right)):(N.top<_.top&&(p=T-(_.top-N.top)),N.bottom>_.bottom&&(p=T+(N.bottom-_.bottom))),p=Math.max(p,0),d.value=Math.min(p,$)},z=()=>{if(!y.value||!u.value)return;const o=y.value[`offset${B(P.value)}`],c=u.value[`offset${B(P.value)}`],s=d.value;c<o?(r.value=r.value||{},r.value.prev=s,r.value.next=s+c<o,o-s<c&&(d.value=o-c)):(r.value=!1,s>0&&(d.value=0))},q=o=>{const c=o.code,{up:s,down:x,left:N,right:_}=V;if(![s,x,N,_].includes(c))return;const $=Array.from(o.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),T=$.indexOf(o.target);let p;c===N||c===s?T===0?p=$.length-1:p=T-1:T<$.length-1?p=T+1:p=0,$[p].focus({preventScroll:!0}),$[p].click(),ee()},ee=()=>{S.value&&(b.value=!0)},H=()=>b.value=!1;return O(l,o=>{o==="hidden"?S.value=!1:o==="visible"&&setTimeout(()=>S.value=!0,50)}),O(E,o=>{o?setTimeout(()=>S.value=!0,50):S.value=!1}),de(m,z),ie(()=>setTimeout(()=>g(),0)),Ce(()=>z()),n({scrollToActiveTab:g,removeFocus:H}),O(()=>e.panes,()=>C.update(),{flush:"post"}),()=>{const o=r.value?[v("span",{class:[t.e("nav-prev"),t.is("disabled",!r.value.prev)],onClick:a},[v(M,null,{default:()=>[v(Te,null,null)]})]),v("span",{class:[t.e("nav-next"),t.is("disabled",!r.value.next)],onClick:h},[v(M,null,{default:()=>[v(we,null,null)]})])]:null,c=e.panes.map((s,x)=>{var N,_,$,T;const p=s.uid,W=s.props.disabled,j=(_=(N=s.props.name)!=null?N:s.index)!=null?_:`${x}`,G=!W&&(s.isClosable||e.editable);s.index=`${x}`;const pe=G?v(M,{class:"is-icon-close",onClick:A=>f("tabRemove",s,A)},{default:()=>[v(Pe,null,null)]}):null,he=((T=($=s.slots).label)==null?void 0:T.call($))||s.props.label,ye=!W&&s.active?0:-1;return v("div",{ref:`tab-${p}`,class:[t.e("item"),t.is(i.props.tabPosition),t.is("active",s.active),t.is("disabled",W),t.is("closable",G),t.is("focus",b.value)],id:`tab-${j}`,key:`tab-${p}`,"aria-controls":`pane-${j}`,role:"tab","aria-selected":s.active,tabindex:ye,onFocus:()=>ee(),onBlur:()=>H(),onClick:A=>{H(),f("tabClick",s,j,A)},onKeydown:A=>{G&&(A.code===V.delete||A.code===V.backspace)&&f("tabRemove",s,A)}},[he,pe])});return v("div",{ref:m,class:[t.e("nav-wrap"),t.is("scrollable",!!r.value),t.is(i.props.tabPosition)]},[o,v("div",{class:t.e("nav-scroll"),ref:u},[v("div",{class:[t.e("nav"),t.is(i.props.tabPosition),t.is("stretch",e.stretch&&["top","bottom"].includes(i.props.tabPosition))],ref:y,style:R.value,role:"tablist",onKeydown:q},[e.type?null:v(je,{tabs:[...e.panes]},null),c])])])}}}),Ze=D({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:Y(Function),default:()=>!0},stretch:Boolean}),X=e=>xe(e)||ke(e),Je={[be]:e=>X(e),tabClick:(e,n)=>n instanceof Event,tabChange:e=>X(e),edit:(e,n)=>["remove","add"].includes(n),tabRemove:e=>X(e),tabAdd:()=>!0};var Qe=F({name:"ElTabs",props:Ze,emits:Je,setup(e,{emit:n,slots:f,expose:C}){var i,t;const l=I("tabs"),{children:E,addChild:u,removeChild:y}=Ue(K(),"ElTabPane"),m=w(),r=w((t=(i=e.modelValue)!=null?i:e.activeName)!=null?t:"0"),d=a=>{r.value=a,n(be,a),n("tabChange",a)},b=async a=>{var h,g,z;if(!(r.value===a||te(a)))try{await((h=e.beforeLeave)==null?void 0:h.call(e,a,r.value))!==!1&&(d(a),(z=(g=m.value)==null?void 0:g.removeFocus)==null||z.call(g))}catch{}},S=(a,h,g)=>{a.props.disabled||(b(h),n("tabClick",a,g))},P=(a,h)=>{a.props.disabled||te(a.props.name)||(h.stopPropagation(),n("edit",a.props.name,"remove"),n("tabRemove",a.props.name))},R=()=>{n("edit",void 0,"add"),n("tabAdd")};return Ee({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},L(()=>!!e.activeName)),O(()=>e.activeName,a=>b(a)),O(()=>e.modelValue,a=>b(a)),O(r,async()=>{var a;await J(),(a=m.value)==null||a.scrollToActiveTab()}),Se(U,{props:e,currentName:r,registerPane:u,unregisterPane:y}),C({currentName:r}),()=>{const a=e.editable||e.addable?v("span",{class:l.e("new-tab"),tabindex:"0",onClick:R,onKeydown:z=>{z.code===V.enter&&R()}},[v(M,{class:l.is("icon-plus")},{default:()=>[v($e,null,null)]})]):null,h=v("div",{class:[l.e("header"),l.is(e.tabPosition)]},[a,v(Ye,{ref:m,currentName:r.value,editable:e.editable,type:e.type,panes:E.value,stretch:e.stretch,onTabClick:S,onTabRemove:P},null)]),g=v("div",{class:l.e("content")},[ce(f,"default")]);return v("div",{class:[l.b(),l.m(e.tabPosition),{[l.m("card")]:e.type==="card",[l.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[h,g]:[g,h]])}}});const et=D({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),tt=["id","aria-hidden","aria-labelledby"],fe="ElTabPane",at=F({name:fe}),st=F({...at,props:et,setup(e){const n=e,f=K(),C=Be(),i=Z(U);i||Q(fe,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const t=I("tab-pane"),l=w(),E=L(()=>n.closable||i.props.closable),u=ae(()=>{var b;return i.currentName.value===((b=n.name)!=null?b:l.value)}),y=w(u.value),m=L(()=>{var b;return(b=n.name)!=null?b:l.value}),r=ae(()=>!n.lazy||y.value||u.value);O(u,b=>{b&&(y.value=!0)});const d=Oe({uid:f.uid,slots:C,props:n,paneName:m,active:u,index:l,isClosable:E});return ie(()=>{i.registerPane(d)}),Re(()=>{i.unregisterPane(d.uid)}),(b,S)=>k(r)?ze((ne(),le("div",{key:0,id:`pane-${k(m)}`,class:oe(k(t).b()),role:"tabpanel","aria-hidden":!k(u),"aria-labelledby":`tab-${k(m)}`},[ce(b.$slots,"default")],10,tt)),[[Ie,k(u)]]):Ae("v-if",!0)}});var me=re(st,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const rt=Fe(Qe,{TabPane:me}),it=Le(me);export{rt as E,it as a,Ue as u};