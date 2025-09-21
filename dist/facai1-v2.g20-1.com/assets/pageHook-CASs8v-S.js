
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  
import{H as a}from"./vendor-kx7r3U2-.js";function e({api:e,otherForm:l=()=>({})}){const t=a([]),u=a(!1),v=a(!1),n=a(!1),r=a(0),o=()=>{e(Object.assign({page:r.value+1},l())).then((a=>{n.value&&(t.value=[],n.value=!1),r.value||(t.value=[]),r.value=r.value+1,t.value=[...t.value,...a.data.data.data],a.data.data.current_page>=a.data.data.last_page&&(v.value=!0)})).finally((()=>{u.value=!1}))};return{list:t,loading:u,finished:v,refreshing:n,onLoad:o,onRefresh:()=>{v.value=!1,u.value=!0,r.value=0,o()}}}export{e as p};
