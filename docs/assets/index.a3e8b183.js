import{d,t as N,o as c,c as i,a as n,b as f,u as v,F as x,w as D,r as p,n as L,e as O,p as q,f as w,g as B,h as W,i as R,j as $,k as A,l as K,m as X}from"./vendor.ffb16ac6.js";const Z=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(l){if(l.ep)return;l.ep=!0;const s=e(l);fetch(l.href,s)}};Z();var m=(u,r)=>{for(const[e,a]of r)u[e]=a;return u};const G={for:"asm-file-input"},H=["value"],J=d({props:{isFileUploaded:{type:Boolean,required:!0},fileName:{type:String,required:!0}},emits:["asmFileSelected"],setup(u,{emit:r}){const e=u,{isFileUploaded:a,fileName:l}=N(e),s=o=>{r("asmFileSelected",o)};return(o,_)=>(c(),i(x,null,[n("label",G,f(v(a)?"Uploaded":"Upload"),1),n("input",{type:"file",id:"asm-file-input",name:"asm-file-input",value:v(l).length===0?v(l):void 0,onChange:s},null,40,H)],64))}});var Q=m(J,[["__scopeId","data-v-5949f508"]]);const Y={};function ee(u,r){return c(),i("button",null,"Reset")}var te=m(Y,[["render",ee],["__scopeId","data-v-d747ad50"]]);const se={class:"name"},ae={class:"value"},ue=d({props:{regName:{type:String,required:!0},regValue:{type:String,required:!0}},setup(u){const r=u,{regName:e,regValue:a}=N(r);D(a,(o,_)=>{o!==_?l.value=!0:s.value=!0,setTimeout(()=>{l.value=!1,s.value=!1},500)});const l=p(!1),s=p(!1);return(o,_)=>(c(),i("div",{class:"register",style:L({backgroundColor:l.value?"red":s.value?"#f66c68":"#333"})},[n("div",se,f(v(e)),1),n("div",ae,f(v(a)),1)],4))}});var le=m(ue,[["__scopeId","data-v-1141c27e"]]);const re=u=>(q("data-v-0d564174"),u=u(),w(),u),oe=re(()=>n("h2",null,"Registers",-1)),ne={class:"registers"},ce=d({props:{reg:{type:Object,required:!0}},setup(u){const r=u,{reg:e}=N(r);return(a,l)=>(c(),i(x,null,[oe,n("div",ne,[(c(!0),i(x,null,O(v(e),(s,o)=>(c(),B(le,{key:o,"reg-name":o.toString(),"reg-value":s.toString()},null,8,["reg-name","reg-value"]))),128))])],64))}});var ie=m(ce,[["__scopeId","data-v-0d564174"]]);const ve={class:"index"},pe={class:"value"},_e=d({props:{index:{type:Number,required:!0},value:{type:Number,required:!0}},setup(u){const r=u,{index:e,value:a}=N(r);D(a,(o,_)=>{o!==_?l.value=!0:s.value=!0,setTimeout(()=>{l.value=!1,s.value=!1},500)});const l=p(!1),s=p(!1);return(o,_)=>(c(),i("div",{class:"mem-block",style:L({backgroundColor:l.value?"red":s.value?"#f66c68":"#333"})},[n("div",ve,f(v(e)),1),n("div",pe,f(v(a)),1)],4))}});var de=m(_e,[["__scopeId","data-v-6f378672"]]);const fe=u=>(q("data-v-201e478c"),u=u(),w(),u),me=fe(()=>n("h2",null,"Memory",-1)),he={class:"memory"},ge=d({props:{store:{type:Object,required:!0}},setup(u){const r=u,{store:e}=N(r);return(a,l)=>(c(),i(x,null,[me,n("div",he,[(c(!0),i(x,null,O(v(e),(s,o)=>(c(),B(de,{class:W(typeof s=="number"?"":"hidden"),index:o,value:typeof s=="number"?s:0},null,8,["class","index","value"]))),256))])],64))}});var ye=m(ge,[["__scopeId","data-v-201e478c"]]);const be=["disabled"],xe=d({props:{isDisabled:{type:Boolean,required:!0}},setup(u){return(r,e)=>(c(),i("button",{disabled:u.isDisabled},"Next",8,be))}});var Ie=m(xe,[["__scopeId","data-v-749832a1"]]);const Ne=["disabled"],$e=d({props:{isDisabled:{type:Boolean,required:!0}},setup(u){return(r,e)=>(c(),i("button",{disabled:u.isDisabled},"Prev",8,Ne))}});var Se=m($e,[["__scopeId","data-v-2280095e"]]);const Ee={class:"output"},Fe=d({props:{index:{type:Number,required:!0},outputValue:{type:Number,required:!0}},setup(u){const r=u,{outputValue:e}=N(r);return(a,l)=>(c(),i("div",Ee,f(v(e)),1))}});var ke=m(Fe,[["__scopeId","data-v-7ff1e41b"]]);const Ce=u=>(q("data-v-68ab4cfe"),u=u(),w(),u),je=Ce(()=>n("h2",null,"Outputs",-1)),Oe={class:"outputs"},qe=d({props:{outputs:{type:Object,required:!0}},setup(u){const r=u,{outputs:e}=N(r);return(a,l)=>(c(),i(x,null,[je,n("div",Oe,[(c(!0),i(x,null,O(v(e).outputs,(s,o)=>(c(),B(ke,{key:o,index:o,"output-value":s},null,8,["index","output-value"]))),128))])],64))}});var we=m(qe,[["__scopeId","data-v-68ab4cfe"]]);const Be={class:"input-and-reset"},Ae={class:"buttons"},De={class:"instructions"},Le={class:"prev"},Re={key:0},Ve={key:1,class:"instruction"},Me={class:"next"},Pe={key:0,class:"instruction"},Te={class:"container"},Ue={class:"registers-container"},ze={class:"memory-container"},We={class:"outputs-container"},Ke=n("footer",null,"Made with \u{1F497} by Nethrenial",-1),Xe=d({setup(u){const r=100;let e=p(new Proxy({a:0,b:0,c:0,d:0,e:0,f:0,sp:0,acc:0,pc:0,ivec:0,int:0,timer:0,halt:!1},{set:(t,h,b)=>(t[h]=b,!0)})),a=p({store:new Array(r).fill(0)});const l={mov:t=>{e.value[t[0]]=e.value[t[1]],e.value.pc=e.value.pc+1},movv:t=>{e.value[t[0]]=Number.parseInt(t[1]),e.value.pc=e.value.pc+1},load:t=>{e.value[t[0]]=a.value.store[Number.parseInt(t[1])],e.value.pc=e.value.pc+1},loadr:t=>{e.value[t[0]]=a.value.store[e.value[t[1]]],e.value.pc=e.value.pc+1},store:t=>{a.value.store[Number.parseInt(t[0])]=e.value[t[1]],e.value.pc=e.value.pc+1},storer:t=>{a.value.store[e.value[t[0]]]=e.value[t[1]],e.value.pc=e.value.pc+1},add:t=>{e.value.acc=e.value[t[0]]+e.value[t[1]],e.value.pc=e.value.pc+1},sub:t=>{e.value.acc=e.value[t[0]]-e.value[t[1]],e.value.pc=e.value.pc+1},mod:t=>{e.value.acc=e.value[t[0]]%e.value[t[1]],e.value.pc=e.value.pc+1},call:t=>{e.value.sp=e.value.sp+1,a.value.store[e.value.sp]=e.value.pc+1,e.value.pc=Number.parseInt(t[0])},ret:()=>{e.value.pc=a.value.store[e.value.sp],e.value.sp=e.value.sp-1},out:t=>{console.log(e.value[t[0]]),F.value.outputs.push(e.value[t[0]]),e.value.pc=e.value.pc+1},push:t=>{e.value.sp=e.value.sp+1,a.value.store[e.value.sp]=e.value[t[0]],e.value.pc=e.value.pc+1},pop:t=>{e.value[t[0]]=a.value.store[e.value.sp],e.value.sp=e.value.sp-1,e.value.pc=e.value.pc+1},jmp:t=>{e.value.pc=Number.parseInt(t[0])},jnz:t=>{e.value[t[1]]!==0?e.value.pc=Number.parseInt(t[0]):e.value.pc=e.value.pc+1},halt:()=>{e.value.halt=!0,e.value.pc=e.value.pc+1}},s=p(!1),o=p("");let _=null,k=[],I=p(""),E=p("");const g=p([]),y=p(!1),S=p(!0),V=R(()=>!!(y.value||!s.value)),M=R(()=>!!(S.value||!s.value)),P=()=>{if(k.length===0||!_)console.log("Not any instructions");else if(!e.value.halt&&!y.value){S.value=!1,console.log(I.value),g.value.push({memoryState:Object.assign({},a.value),registersState:Object.assign({},e.value),nextInstruction:`${a.value.store[e.value.pc].join(" ")}`,prevInstruction:`${E.value}`}),E.value=I.value;let t=e.value.pc,h=l[a.value.store[t][0]];a.value.store[t][0]==="halt"&&(y.value=!0,g.value[g.value.length-1].nextInstruction="halt",console.log(g.value)),h(a.value.store[t].slice(1)),e.value.timer=e.value.timer-1,e.value.int===1&&e.value.timer===0&&(e.value.sp=e.value.sp+1,a.value.store[e.value.sp]=e.value.pc,e.value.pc=e.value.ivec,e.value.int=0);const b=a.value.store[e.value.pc];b&&(I.value=b.join(" "))}},T=()=>{if(g.value.length>0){y.value=!1;const t=g.value.pop();e.value=t.registersState,a.value=t.memoryState,I.value=t.nextInstruction,E.value=t.prevInstruction,t.nextInstruction.startsWith("out")&&F.value.outputs.pop(),g.value.length===0&&(S.value=!0)}},U=t=>{var h;((h=t.target.files)==null?void 0:h.length)!=0&&(s.value=!0,_=new FileReader,_.onload=b=>{k=b.target.result.split(`
`);for(const C of k){if(C.startsWith("#")||C==="")continue;const j=C.split(" ");j.length>0&&(a.value.store[Number.parseInt(j[0])]=j.slice(1))}I.value=a.value.store[e.value.pc].join(" ")},o.value=t.target.files[0].name,_.readAsText(t.target.files[0]))},F=p({outputs:[]}),z=()=>{e.value=new Proxy({a:0,b:0,c:0,d:0,e:0,f:0,sp:0,acc:0,pc:0,ivec:0,int:0,timer:0,halt:!1},{set:(t,h,b)=>(t[h]=b,!0)}),a.value.store=new Array(r).fill(0),s.value=!1,y.value=!1,S.value=!0,g.value=[],F.value={outputs:[]},I.value="",E.value=""};return(t,h)=>(c(),i(x,null,[n("div",Be,[n("div",Ae,[$(Q,{onAsmFileSelected:U,"is-file-uploaded":s.value,"file-name":o.value},null,8,["is-file-uploaded","file-name"]),$(te,{onClick:z}),$(Se,{onClick:T,"is-disabled":v(M)},null,8,["is-disabled"]),$(Ie,{onClick:P,"is-disabled":v(V)},null,8,["is-disabled"])]),n("div",De,[n("div",Le,[S.value?A("",!0):(c(),i("span",Re,f(s.value?"PREV :  ":"FILE NOT SELECTED"),1)),S.value?A("",!0):(c(),i("strong",Ve,f(s.value?v(E):""),1))]),n("div",Me,[K(f(s.value?y.value?"ENDED":"NEXT :  ":"FILE NOT SELECTED")+" ",1),y.value?A("",!0):(c(),i("strong",Pe,f(s.value?y.value?"":v(I):""),1))])])]),n("div",Te,[n("div",Ue,[$(ie,{reg:v(e)},null,8,["reg"])]),n("div",ze,[$(ye,{store:v(a).store},null,8,["store"])]),n("div",We,[$(we,{outputs:F.value},null,8,["outputs"])])]),Ke],64))}});X(Xe).mount("#app");
