
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  
var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r,i=(e,a)=>{for(var t in a||(a={}))n.call(a,t)&&o(e,t,a[t]);if(r)for(var t of r(a))s.call(a,t)&&o(e,t,a[t]);return e},c=(e,r)=>a(e,t(r));import{O as l,a1 as p,a9 as d,as as m,R as b,T as u}from"./vendor-kx7r3U2-.js";import{_ as v}from"./index-1kZVT1Y0.js";import{f}from"./bankList-DOKx2y8u.js";const _={class:"usdt-card"},O=l({name:"UsdtCard"}),j=v(l(c(i({},O),{props:["item","delAble"],setup:e=>(a,t)=>(b(),p("div",_,[d("div",null,m(e.item.coin_blockchain),1),d("div",null,m(e.item.coin_account),1)]))})),[["__scopeId","data-v-59982a72"]]),y={class:"bank-card"},k={class:"name"},P=l({name:"BankCard"}),w=v(l(c(i({},P),{props:["item"],setup:e=>(a,t)=>(b(),p("div",y,[d("div",null,m(e.item.bank_name),1),d("div",null,m(e.item.bank_branch),1),d("div",null,m(u(f)(e.item.bank_account)),1),d("div",k,m(e.item.name),1)]))})),[["__scopeId","data-v-7f65e840"]]);export{w as _,j as a};
