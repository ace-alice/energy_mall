
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  
import{O as a,b8 as o,$ as t,a$ as s,b9 as n,ba as e,bb as c,a1 as r,aL as p,bc as d,R as i}from"./vendor-kx7r3U2-.js";import{_ as l}from"./index-1kZVT1Y0.js";const b=a({name:"ClipboardBox",props:["content"],setup(a){const{proxy:r}=o();function p(){const o=new n(r.$refs.copy,{text:()=>a.content});o.on("success",(()=>{e("已复制")})),o.on("error",(()=>{c("复制失败")}))}return t((()=>{s((()=>{p()}))})),{copyHandle:p}}}),x=["data-clipboard-text"],y=l(b,[["render",function(a,o,t,s,n,e){return i(),r("span",{ref:"copy",type:"text",class:"clipboard","data-clipboard-action":"copy","data-clipboard-text":a.content,onClick:o[0]||(o[0]=d(((...o)=>a.copyHandle&&a.copyHandle(...o)),["stop"]))},[p(a.$slots,"label",{},void 0)],8,x)}],["__scopeId","data-v-524fd2a2"]]);export{y as _};
