import{as as r}from"./index-d45ed081.js";const u=100,v=600,m={beforeMount(s,l){const e=l.value,{interval:i=u,delay:c=v}=r(e)?{}:e;let t,n;const o=()=>r(e)?e():e.handler(),a=()=>{n&&(clearTimeout(n),n=void 0),t&&(clearInterval(t),t=void 0)};s.addEventListener("mousedown",d=>{d.button===0&&(a(),o(),document.addEventListener("mouseup",()=>a(),{once:!0}),n=setTimeout(()=>{t=setInterval(()=>{o()},i)},c))})}};export{m as v};
