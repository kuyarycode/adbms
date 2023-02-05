import{r as u,R as g}from"./main.js";var $e=Object.defineProperty,Ae=(e,t,n)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,W=(e,t,n)=>(Ae(e,typeof t!="symbol"?t+"":t,n),n);let Pe=class{constructor(){W(this,"current",this.detect()),W(this,"handoffState","pending"),W(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},x=new Pe,L=(e,t)=>{x.isServer?u.useEffect(e,t):u.useLayoutEffect(e,t)};function A(e){let t=u.useRef(e);return L(()=>{t.current=e},[e]),t}function Le(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function O(){let e=[],t=[],n={enqueue(r){t.push(r)},addEventListener(r,i,s,o){return r.addEventListener(i,s,o),n.add(()=>r.removeEventListener(i,s,o))},requestAnimationFrame(...r){let i=requestAnimationFrame(...r);return n.add(()=>cancelAnimationFrame(i))},nextFrame(...r){return n.requestAnimationFrame(()=>n.requestAnimationFrame(...r))},setTimeout(...r){let i=setTimeout(...r);return n.add(()=>clearTimeout(i))},microTask(...r){let i={current:!0};return Le(()=>{i.current&&r[0]()}),n.add(()=>{i.current=!1})},add(r){return e.push(r),()=>{let i=e.indexOf(r);if(i>=0){let[s]=e.splice(i,1);s()}}},dispose(){for(let r of e.splice(0))r()},async workQueue(){for(let r of t.splice(0))await r()}};return n}function le(){let[e]=u.useState(O);return u.useEffect(()=>()=>e.dispose(),[e]),e}let $=function(e){let t=A(e);return g.useCallback((...n)=>t.current(...n),[t])};function Z(){let[e,t]=u.useState(x.isHandoffComplete);return e&&x.isHandoffComplete===!1&&t(!1),u.useEffect(()=>{e!==!0&&t(!0)},[e]),u.useEffect(()=>x.handoff(),[]),e}var ie;let rt=(ie=g.useId)!=null?ie:function(){let e=Z(),[t,n]=g.useState(e?()=>x.nextId():null);return L(()=>{t===null&&n(x.nextId())},[t]),t!=null?""+t:void 0};function w(e,t,...n){if(e in t){let i=t[e];return typeof i=="function"?i(...n):i}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(i=>`"${i}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,w),r}function ee(e){return x.isServer?null:e instanceof Node?e.ownerDocument:e!=null&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let Y=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var Oe=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(Oe||{}),Re=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(Re||{}),Ce=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(Ce||{});function ae(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(Y)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}var se=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(se||{});function ce(e,t=0){var n;return e===((n=ee(e))==null?void 0:n.body)?!1:w(t,{[0](){return e.matches(Y)},[1](){let r=e;for(;r!==null;){if(r.matches(Y))return!0;r=r.parentElement}return!1}})}function it(e){let t=ee(e);O().nextFrame(()=>{t&&!ce(t.activeElement,0)&&je(e)})}function je(e){e?.focus({preventScroll:!0})}let Ie=["textarea","input"].join(",");function Me(e){var t,n;return(n=(t=e?.matches)==null?void 0:t.call(e,Ie))!=null?n:!1}function De(e,t=n=>n){return e.slice().sort((n,r)=>{let i=t(n),s=t(r);if(i===null||s===null)return 0;let o=i.compareDocumentPosition(s);return o&Node.DOCUMENT_POSITION_FOLLOWING?-1:o&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function ot(e,t){return He(ae(),t,{relativeTo:e})}function He(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:i=[]}={}){let s=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,o=Array.isArray(e)?n?De(e):e:ae(e);i.length>0&&o.length>1&&(o=o.filter(p=>!i.includes(p))),r=r??s.activeElement;let d=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),a=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,o.indexOf(r))-1;if(t&4)return Math.max(0,o.indexOf(r))+1;if(t&8)return o.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),c=t&32?{preventScroll:!0}:{},f=0,m=o.length,v;do{if(f>=m||f+m<=0)return 0;let p=a+f;if(t&16)p=(p+m)%m;else{if(p<0)return 3;if(p>=m)return 1}v=o[p],v?.focus(c),f+=d}while(v!==s.activeElement);return t&6&&Me(v)&&v.select(),v.hasAttribute("tabindex")||v.setAttribute("tabindex","0"),2}function K(e,t,n){let r=A(t);u.useEffect(()=>{function i(s){r.current(s)}return document.addEventListener(e,i,n),()=>document.removeEventListener(e,i,n)},[e,n])}function ut(e,t,n=!0){let r=u.useRef(!1);u.useEffect(()=>{requestAnimationFrame(()=>{r.current=n})},[n]);function i(o,d){if(!r.current||o.defaultPrevented)return;let a=function f(m){return typeof m=="function"?f(m()):Array.isArray(m)||m instanceof Set?m:[m]}(e),c=d(o);if(c!==null&&c.getRootNode().contains(c)){for(let f of a){if(f===null)continue;let m=f instanceof HTMLElement?f:f.current;if(m!=null&&m.contains(c)||o.composed&&o.composedPath().includes(m))return}return!ce(c,se.Loose)&&c.tabIndex!==-1&&o.preventDefault(),t(o,c)}}let s=u.useRef(null);K("mousedown",o=>{var d,a;r.current&&(s.current=((a=(d=o.composedPath)==null?void 0:d.call(o))==null?void 0:a[0])||o.target)},!0),K("click",o=>{!s.current||(i(o,()=>s.current),s.current=null)},!0),K("blur",o=>i(o,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}let fe=Symbol();function lt(e,t=!0){return Object.assign(e,{[fe]:t})}function de(...e){let t=u.useRef(e);u.useEffect(()=>{t.current=e},[e]);let n=$(r=>{for(let i of t.current)i!=null&&(typeof i=="function"?i(r):i.current=r)});return e.every(r=>r==null||r?.[fe])?void 0:n}function me(...e){return e.filter(Boolean).join(" ")}var pe=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(pe||{}),S=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(S||{});function ve({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:i,visible:s=!0,name:o}){let d=he(t,e);if(s)return M(d,n,r,o);let a=i??0;if(a&2){let{static:c=!1,...f}=d;if(c)return M(f,n,r,o)}if(a&1){let{unmount:c=!0,...f}=d;return w(c?0:1,{[0](){return null},[1](){return M({...f,hidden:!0,style:{display:"none"}},n,r,o)}})}return M(d,n,r,o)}function M(e,t={},n,r){var i;let{as:s=n,children:o,refName:d="ref",...a}=X(e,["unmount","static"]),c=e.ref!==void 0?{[d]:e.ref}:{},f=typeof o=="function"?o(t):o;a.className&&typeof a.className=="function"&&(a.className=a.className(t));let m={};if(t){let v=!1,p=[];for(let[l,E]of Object.entries(t))typeof E=="boolean"&&(v=!0),E===!0&&p.push(l);v&&(m["data-headlessui-state"]=p.join(" "))}if(s===u.Fragment&&Object.keys(oe(a)).length>0){if(!u.isValidElement(f)||Array.isArray(f)&&f.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(a).map(l=>`  - ${l}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(l=>`  - ${l}`).join(`
`)].join(`
`));let v=me((i=f.props)==null?void 0:i.className,a.className),p=v?{className:v}:{};return u.cloneElement(f,Object.assign({},he(f.props,oe(X(a,["ref"]))),m,c,ke(f.ref,c.ref),p))}return u.createElement(s,Object.assign({},X(a,["ref"]),s!==u.Fragment&&c,s!==u.Fragment&&m),f)}function ke(...e){return{ref:e.every(t=>t==null)?void 0:t=>{for(let n of e)n!=null&&(typeof n=="function"?n(t):n.current=t)}}}function he(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let i in r)i.startsWith("on")&&typeof r[i]=="function"?(n[i]!=null||(n[i]=[]),n[i].push(r[i])):t[i]=r[i];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(r=>[r,void 0])));for(let r in n)Object.assign(t,{[r](i,...s){let o=n[r];for(let d of o){if((i instanceof Event||i?.nativeEvent instanceof Event)&&i.defaultPrevented)return;d(i,...s)}}});return t}function te(e){var t;return Object.assign(u.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function oe(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function X(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}function at(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=t?.getAttribute("disabled")==="";return r&&Ue(n)?!1:r}function Ue(e){if(!e)return!1;let t=e.previousElementSibling;for(;t!==null;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}let ne=u.createContext(null);ne.displayName="OpenClosedContext";var P=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(P||{});function Ee(){return u.useContext(ne)}function qe({value:e,children:t}){return g.createElement(ne.Provider,{value:e},t)}var _e=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(_e||{});function be(){let e=u.useRef(!1);return L(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function st(...e){return u.useMemo(()=>ee(...e),[...e])}function Be(e){let t={called:!1};return(...n)=>{if(!t.called)return t.called=!0,e(...n)}}function J(e,...t){e&&t.length>0&&e.classList.add(...t)}function Q(e,...t){e&&t.length>0&&e.classList.remove(...t)}function Ge(e,t){let n=O();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:i}=getComputedStyle(e),[s,o]=[r,i].map(d=>{let[a=0]=d.split(",").filter(Boolean).map(c=>c.includes("ms")?parseFloat(c):parseFloat(c)*1e3).sort((c,f)=>f-c);return a});if(s+o!==0){let d=n.addEventListener(e,"transitionend",a=>{a.target===a.currentTarget&&(t(),d())})}else t();return n.add(()=>t()),n.dispose}function Ve(e,t,n,r){let i=n?"enter":"leave",s=O(),o=r!==void 0?Be(r):()=>{};i==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let d=w(i,{enter:()=>t.enter,leave:()=>t.leave}),a=w(i,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),c=w(i,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return Q(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),J(e,...d,...c),s.nextFrame(()=>{Q(e,...c),J(e,...a),Ge(e,()=>(Q(e,...d),J(e,...t.entered),o()))}),s.dispose}function We({container:e,direction:t,classes:n,onStart:r,onStop:i}){let s=be(),o=le(),d=A(t);L(()=>{let a=O();o.add(a.dispose);let c=e.current;if(c&&d.current!=="idle"&&s.current)return a.dispose(),r.current(d.current),a.add(Ve(c,n.current,d.current==="enter",()=>{a.dispose(),i.current(d.current)})),a.dispose},[t])}function N(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let D=u.createContext(null);D.displayName="TransitionContext";var Ke=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Ke||{});function Xe(){let e=u.useContext(D);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Je(){let e=u.useContext(H);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let H=u.createContext(null);H.displayName="NestingContext";function k(e){return"children"in e?k(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function ge(e,t){let n=A(e),r=u.useRef([]),i=be(),s=le(),o=$((p,l=S.Hidden)=>{let E=r.current.findIndex(({el:h})=>h===p);E!==-1&&(w(l,{[S.Unmount](){r.current.splice(E,1)},[S.Hidden](){r.current[E].state="hidden"}}),s.microTask(()=>{var h;!k(r)&&i.current&&((h=n.current)==null||h.call(n))}))}),d=$(p=>{let l=r.current.find(({el:E})=>E===p);return l?l.state!=="visible"&&(l.state="visible"):r.current.push({el:p,state:"visible"}),()=>o(p,S.Unmount)}),a=u.useRef([]),c=u.useRef(Promise.resolve()),f=u.useRef({enter:[],leave:[],idle:[]}),m=$((p,l,E)=>{a.current.splice(0),t&&(t.chains.current[l]=t.chains.current[l].filter(([h])=>h!==p)),t?.chains.current[l].push([p,new Promise(h=>{a.current.push(h)})]),t?.chains.current[l].push([p,new Promise(h=>{Promise.all(f.current[l].map(([b,y])=>y)).then(()=>h())})]),l==="enter"?c.current=c.current.then(()=>t?.wait.current).then(()=>E(l)):E(l)}),v=$((p,l,E)=>{Promise.all(f.current[l].splice(0).map(([h,b])=>b)).then(()=>{var h;(h=a.current.shift())==null||h()}).then(()=>E(l))});return u.useMemo(()=>({children:r,register:d,unregister:o,onStart:m,onStop:v,wait:c,chains:f}),[d,o,r,m,v,f,c])}function Qe(){}let Ye=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function ue(e){var t;let n={};for(let r of Ye)n[r]=(t=e[r])!=null?t:Qe;return n}function ze(e){let t=u.useRef(ue(e));return u.useEffect(()=>{t.current=ue(e)},[e]),t}let Ze="div",we=pe.RenderStrategy,ye=te(function(e,t){let{beforeEnter:n,afterEnter:r,beforeLeave:i,afterLeave:s,enter:o,enterFrom:d,enterTo:a,entered:c,leave:f,leaveFrom:m,leaveTo:v,...p}=e,l=u.useRef(null),E=de(l,t),h=p.unmount?S.Unmount:S.Hidden,{show:b,appear:y,initial:Se}=Xe(),[T,U]=u.useState(b?"visible":"hidden"),re=Je(),{register:R,unregister:C}=re,q=u.useRef(null);u.useEffect(()=>R(l),[R,l]),u.useEffect(()=>{if(h===S.Hidden&&l.current){if(b&&T!=="visible"){U("visible");return}return w(T,{hidden:()=>C(l),visible:()=>R(l)})}},[T,l,R,C,b,h]);let _=A({enter:N(o),enterFrom:N(d),enterTo:N(a),entered:N(c),leave:N(f),leaveFrom:N(m),leaveTo:N(v)}),j=ze({beforeEnter:n,afterEnter:r,beforeLeave:i,afterLeave:s}),B=Z();u.useEffect(()=>{if(B&&T==="visible"&&l.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[l,T,B]);let G=Se&&!y,Te=(()=>!B||G||q.current===b?"idle":b?"enter":"leave")(),Fe=$(F=>w(F,{enter:()=>j.current.beforeEnter(),leave:()=>j.current.beforeLeave(),idle:()=>{}})),xe=$(F=>w(F,{enter:()=>j.current.afterEnter(),leave:()=>j.current.afterLeave(),idle:()=>{}})),I=ge(()=>{U("hidden"),C(l)},re);We({container:l,classes:_,direction:Te,onStart:A(F=>{I.onStart(l,F,Fe)}),onStop:A(F=>{I.onStop(l,F,xe),F==="leave"&&!k(I)&&(U("hidden"),C(l))})}),u.useEffect(()=>{!G||(h===S.Hidden?q.current=null:q.current=b)},[b,G,T]);let V=p,Ne={ref:E};return y&&b&&x.isServer&&(V={...V,className:me(p.className,..._.current.enter,..._.current.enterFrom)}),g.createElement(H.Provider,{value:I},g.createElement(qe,{value:w(T,{visible:P.Open,hidden:P.Closed})},ve({ourProps:Ne,theirProps:V,defaultTag:Ze,features:we,visible:T==="visible",name:"Transition.Child"})))}),z=te(function(e,t){let{show:n,appear:r=!1,unmount:i,...s}=e,o=u.useRef(null),d=de(o,t);Z();let a=Ee();if(n===void 0&&a!==null&&(n=w(a,{[P.Open]:!0,[P.Closed]:!1})),![!0,!1].includes(n))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[c,f]=u.useState(n?"visible":"hidden"),m=ge(()=>{f("hidden")}),[v,p]=u.useState(!0),l=u.useRef([n]);L(()=>{v!==!1&&l.current[l.current.length-1]!==n&&(l.current.push(n),p(!1))},[l,n]);let E=u.useMemo(()=>({show:n,appear:r,initial:v}),[n,r,v]);u.useEffect(()=>{if(n)f("visible");else if(!k(m))f("hidden");else{let b=o.current;if(!b)return;let y=b.getBoundingClientRect();y.x===0&&y.y===0&&y.width===0&&y.height===0&&f("hidden")}},[n,m]);let h={unmount:i};return g.createElement(H.Provider,{value:m},g.createElement(D.Provider,{value:E},ve({ourProps:{...h,as:u.Fragment,children:g.createElement(ye,{ref:d,...h,...s})},theirProps:{},defaultTag:u.Fragment,features:we,visible:c==="visible",name:"Transition"})))}),et=te(function(e,t){let n=u.useContext(D)!==null,r=Ee()!==null;return g.createElement(g.Fragment,null,!n&&r?g.createElement(z,{ref:t,...e}):g.createElement(ye,{ref:t,...e}))}),ct=Object.assign(z,{Child:et,Root:z});export{De as A,qe as C,se as F,He as I,ct as K,Oe as L,Re as N,je as S,lt as T,te as V,ve as X,L as a,x as b,rt as c,Ee as d,ee as e,be as f,P as g,ut as h,_e as i,pe as j,ce as k,Z as l,O as m,st as n,$ as o,le as p,it as q,at as r,A as s,Le as t,w as u,ot as v,de as y};