function r(o){let t=[];for(const e in o)o[e]&&t.push(`${e}=${encodeURIComponent(o[e])}`);let n=t.join("&");return n=n?"?"+n:"",n}export{r as q};
