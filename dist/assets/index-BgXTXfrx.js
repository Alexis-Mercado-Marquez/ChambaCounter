import{r as d,j as e,R as K}from"./react-PRVk9eUf.js";import{c as Q}from"./react-dom-CVYAfHRs.js";import{M as U,a as X,b as q,F as H,c as I,L,I as J,d as Y,B as R,C as O,e as Z,f as _,R as B,g,h as V,D as W,i as ee,j as w,k as re,N as te,l as z,m as E,T as se,n as P}from"./reactstrap-DOpIMaKD.js";/* empty css                  */import{Z as oe}from"./react-colorful-BLsZ--xn.js";import{R as T,B as ne,X as ie,a as ae,C as D,P as ce,b as le}from"./recharts-Ce_Va2tp.js";import"./classnames-4m0nnevf.js";import"./scheduler-CzFDRTuY.js";import"./prop-types-BKgtCGqk.js";import"./react-popper-scISoHhJ.js";import"./react-fast-compare-Des79_iB.js";import"./@popperjs-BQBsAJpH.js";import"./warning-BQMFTuiE.js";import"./react-transition-group-Ct129y6Y.js";import"./@babel-RuvQnnb-.js";import"./clsx-B-dksMZM.js";import"./lodash-BeLTOBko.js";import"./react-is-8JwjhRSi.js";import"./react-smooth-CfVIon-J.js";import"./fast-equals-C7I1S-bJ.js";import"./tiny-invariant-BaFNuDhB.js";import"./d3-shape-DjFPhhqo.js";import"./d3-path-CimkQT29.js";import"./victory-vendor-6_AdwBXU.js";import"./d3-scale-BYIooUZQ.js";import"./internmap-BkD7Hj8s.js";import"./d3-array-g_qRI3rN.js";import"./d3-time-format-BKO53YJi.js";import"./d3-time-QpEiTrED.js";import"./d3-interpolate-CvRPKVI0.js";import"./d3-color-9lF95FHy.js";import"./d3-format-CzD4bSOQ.js";import"./recharts-scale-DiOBu8nk.js";import"./decimal.js-light-B5-9uEc-.js";import"./eventemitter3-Bj8YYhvP.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function u(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(o){if(o.ep)return;o.ep=!0;const t=u(o);fetch(o.href,t)}})();const de=({mostrar:r,setMostrar:n,jugadores:u,setJugadores:i,cuenta:o,setCuenta:t})=>{const[a,C]=d.useState(""),[c,l]=d.useState("#aabbcc");d.useEffect(()=>{C(""),l("#aabbcc");const m=console.error;return console.error=(...p)=>{typeof p[0]=="string"&&/defaultProps/.test(p[0])||m(...p)},()=>{console.error=m}},[r]);const h=()=>{const m={id:o,nombre:a,color:c,puntos:0,ptsPositivos:0};i([...u,m]),t(p=>p+1),n(!1)},b=()=>{n(!1)};return e.jsxs(U,{isOpen:r,children:[e.jsx(X,{children:"Agregar jugador"}),e.jsx(q,{children:e.jsxs(H,{children:[e.jsxs(I,{children:[e.jsx(L,{children:"Nombre"}),e.jsx(J,{name:"nombre",value:a,onChange:m=>C(m.target.value)})]}),e.jsxs(I,{children:[e.jsx(L,{children:"Color"}),e.jsx(oe,{color:c,onChange:l})]})]})}),e.jsxs(Y,{children:[e.jsx(R,{color:"primary",size:"sm",onClick:()=>h(),children:"Agregar"}),e.jsx(R,{color:"danger",size:"sm",onClick:()=>b(),children:"Cerrar"})]})]})},ue=({jugadorPrev:r,jugadores:n,setJugadores:u,unidades:i,borrarJugador:o})=>{const[t,a]=d.useState(r.puntos);d.useEffect(()=>{C()},[t]);const C=()=>{const h=t>0?t:0,b={id:r.id,nombre:r.nombre,color:r.color,puntos:t,ptsPositivos:h},m=n.map(p=>p.id===b.id?b:p);u(m)},c=()=>{a(h=>h+Number(i))},l=()=>{a(h=>h-Number(i))};return e.jsx(O,{className:"div-tarjeta",children:e.jsx(Z,{children:e.jsxs(_,{style:{backgroundColor:`${r.color}`,borderColor:`${r.color}`},children:[e.jsxs(B,{children:[e.jsx(g,{xs:"6",children:r.nombre.length<9?e.jsx("h1",{className:"texto-grande",children:r.nombre}):e.jsx("h1",{className:"texto-mediano",children:r.nombre})}),e.jsx(g,{xs:"6",children:e.jsx("h1",{className:"texto-grande",children:t})})]}),e.jsxs(B,{children:[e.jsx(g,{xs:"6",children:e.jsx("button",{className:"boton-tarjeta",onClick:()=>o(r.id),children:"Quitar"})}),e.jsx(g,{xs:"3",children:e.jsx("button",{className:"boton-tarjeta",onClick:l,children:"-"})}),e.jsx(g,{xs:"3",children:e.jsx("button",{className:"boton-tarjeta",onClick:c,children:"+"})})]})]})})})},me=({jugadores:r,setJugadores:n})=>{const[u,i]=d.useState(!1),[o,t]=d.useState(0),[a,C]=d.useState(1),[c,l]=d.useState(!1),h=d.useRef(),b=s=>{var x=window.confirm("�Quieres borrar a este jugador?");x&&n(r.filter(j=>j.id!==s))},m=()=>{var s=window.confirm("�Quieres borrar a todos los jugadores?");s&&n([])},p=()=>{let s="";for(const f of r)s+="id:="+f.id+`
`,s+="nombre:="+f.nombre+`
`,s+="color:="+f.color+`
`,s+="puntos:="+f.puntos+`

`;s=s.substring(0,s.length-2);const x=document.createElement("a"),j=new Blob([s],{type:"text/plain"});x.href=URL.createObjectURL(j),x.download="jugadores.txt",document.body.appendChild(x),x.click()},M=async s=>{if(s.preventDefault(),s.target.files.length==0)return;if(r.length>0&&!window.confirm("Ya hay datos de jugadores. �Quiere sobreescribirlos?")){s.target.value="";return}n([]);let x=[];const j=new FileReader;j.onload=async f=>{const F=f.target.result.split(`

`);for(const N of F){const k=N.split(`
`);let y={id:0,nombre:"",color:"#000000",puntos:0,ptsPositivos:0};for(const G of k){const v=G.split(":=");if(v.length===2)switch(v[0]){case"id":y.id=Number(v[1]);break;case"nombre":y.nombre=v[1];break;case"color":y.color=v[1];break;case"puntos":const S=Number(v[1]);y.puntos=S,y.ptsPositivos=S>0?S:0;break}}x.push(y)}n(x);const $=x.reduce((N,k)=>N&&N.id>k.id?N:k);t($.id+1)},j.readAsText(s.target.files[0])};return e.jsxs(O,{className:"margen-superior",children:[e.jsxs(B,{children:[e.jsx(g,{xs:"6",children:e.jsx(J,{type:"number",name:"aumento",value:a,onChange:s=>C(s.target.value)})}),e.jsx(g,{xs:"3",children:e.jsx(R,{color:"primary",size:"sm",onClick:()=>i(!0),children:"Nuevo"})}),e.jsx(g,{xs:"3",children:e.jsxs(V,{isOpen:c,toggle:()=>l(!c),children:[e.jsx(W,{caret:!0,children:"Opciones"}),e.jsxs(ee,{children:[e.jsx(w,{header:!0,children:"Jugadores"}),e.jsx(w,{onClick:()=>h.current.click(),children:"Subir"}),e.jsx(w,{disabled:r.length==0,onClick:()=>p(),children:"Descargar"}),e.jsx(w,{divider:!0}),e.jsx(w,{disabled:r.length==0,onClick:()=>m(),children:"Borrar"})]})]})}),e.jsx(g,{xs:"12",children:e.jsx("input",{type:"file",ref:h,multiple:!1,onChange:s=>M(s),hidden:!0})})]}),e.jsx(de,{mostrar:u,setMostrar:i,jugadores:r,setJugadores:n,cuenta:o,setCuenta:t}),r.map(s=>e.jsx("div",{children:e.jsx(ue,{jugadorPrev:s,jugadores:r,setJugadores:n,unidades:a,borrarJugador:b})},s.id))]})},he=({jugadores:r})=>{const[n,u]=d.useState("barras"),[i,o]=d.useState(1),t=500;d.useEffect(()=>{new ResizeObserver(l=>{o(l[0].contentBoxSize[0].inlineSize*.35)}).observe(document.getElementById("div-grafico"))});const a=Math.PI/180,C=c=>{const{cx:l,cy:h,midAngle:b,innerRadius:m,outerRadius:p,percent:M,index:s,data:x}=c,j=m+(p-m)*.5,f=l+j*Math.cos(-b*a),A=h+j*Math.sin(-b*a);return e.jsx("text",{x:f,y:A,fill:"black",textAnchor:f>l?"start":"end",dominantBaseline:"central",children:`${c.nombre}: ${(M*100).toFixed(0)}%`})};return e.jsxs("div",{className:"margen-superior",children:[e.jsxs(re,{children:[e.jsx(R,{color:"primary",onClick:()=>u("barras"),children:"Barras"}),e.jsx(R,{color:"danger",onClick:()=>u("pastel"),children:"Pastel"})]}),e.jsx("div",{id:"div-grafico",className:"margen-superior",children:n=="barras"?e.jsx(T,{width:"100%",height:t,children:e.jsxs(ne,{data:r,margin:{top:20},width:"100%",height:"100%",children:[e.jsx(ie,{dataKey:"nombre"}),e.jsx(ae,{dataKey:"puntos",fill:"#8884d8",label:{position:"top",fontSize:25},children:r.map((c,l)=>e.jsx(D,{fill:c.color},`cell-${l}`))})]})}):e.jsx(T,{width:"100%",height:t,children:e.jsx(ce,{width:"100%",height:"100%",children:e.jsx(le,{data:r,cx:"50%",cy:"50%",labelLine:!1,label:C,outerRadius:i,dataKey:"ptsPositivos",children:r.map((c,l)=>e.jsx(D,{fill:c.color},`cell-${l}`))})})})})]})};function pe(){const[r,n]=d.useState([]),[u,i]=d.useState("1");return e.jsxs(O,{children:[e.jsx("h2",{children:"Chamba Counter"}),e.jsxs(te,{tabs:!0,children:[e.jsx(z,{className:"nav-tab",children:e.jsx(E,{active:u=="1",onClick:()=>i("1"),children:"Jugadores"})}),e.jsx(z,{className:"nav-tab",children:e.jsx(E,{active:u=="2",onClick:()=>i("2"),children:"Grafica"})})]}),e.jsxs(se,{activeTab:u,children:[e.jsx(P,{tabId:"1",children:e.jsx(me,{jugadores:r,setJugadores:n})}),e.jsx(P,{tabId:"2",children:e.jsx(he,{jugadores:r})})]})]})}Q.createRoot(document.getElementById("root")).render(e.jsx(K.StrictMode,{children:e.jsx(pe,{})}));
