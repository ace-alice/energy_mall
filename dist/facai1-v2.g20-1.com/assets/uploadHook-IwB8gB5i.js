
/**
 * 由 flying services 提供技术支持
 * Powered by Hector
 */
  
import{k as e}from"./index-1kZVT1Y0.js";import{H as a}from"./vendor-kx7r3U2-.js";function s({callBack:s}){return{fileList:a([]),afterRead:a=>{a.status="uploading",a.message="上传中...";const t=a.file,n=new File([t],Date.now()+".jpg",{type:t.type}),i=new FormData;i.append("file",n),e(i).then((e=>{a.status="success",a.message="上传成功",s&&s(e.data.data.url)})).catch((e=>{a.status="failed",a.message="上传失败"}))}}}export{s as u};
