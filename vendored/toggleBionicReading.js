// Source: https://github.com/ansh/jiffyreader.com/blob/master/src/Bookmarklet/index.ts
export const toggleBionicReading =
  '(()=>{var Q=Object.defineProperty;var I=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var N=(e,t,i)=>t in e?Q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,k=(e,t)=>{for(var i in t||(t={}))Z.call(t,i)&&N(e,i,t[i]);if(I)for(var i of I(t))K.call(t,i)&&N(e,i,t[i]);return e};var P=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};var s=(e,t,i)=>(P(e,t,"read from private field"),i?i.call(e):t.get(e)),c=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},v=(e,t,i,n)=>(P(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i);var _=new Map([["true",!1],["false",!0]]),L=(e="false")=>{let t=e.toLowerCase();return _.has(t)&&_.get(t)},R=()=>null,y=e=>L("false")?R:e,ee=e=>L("false")?()=>R:(console.time(e),()=>console.timeEnd(e)),te=y(console.log),B=y(console.trace),ie=({lastError:e=null}=chrome.runtime)=>e&&B(e),r={logTime:ee,logInfo:te,logError:B,LogLastError:y(ie),LogTable:y(console.table)};var ne={onPageLoad:!1,scope:"global",lineHeight:1,edgeOpacity:70,saccadesColor:"",saccadesStyle:"bold-600",saccadesInterval:0,fixationStrength:2,fixationEdgeOpacity:80,MAX_FIXATION_PARTS:4,FIXATION_LOWER_BOUND:0,BR_WORD_STEM_PERCENTAGE:.7},u=ne;var m,d,T,h,x,f=class{constructor(t,i,n){c(this,m,{childList:!0,subtree:!0,characterData:!0});c(this,d,void 0);c(this,T,void 0);c(this,h,void 0);c(this,x,void 0);v(this,d,new MutationObserver(n)),v(this,h,i!=null?i:s(this,m)),v(this,x,t)}observe(){s(this,d).observe(s(this,x),s(this,h))}destroy(){s(this,d).disconnect()}};m=new WeakMap,d=new WeakMap,T=new WeakMap,h=new WeakMap,x=new WeakMap;var oe={"twitter.com":["div.DraftEditor-root"],"youtube.com":[".ytd-commentbox","ytd-commentbox"],"play.google.com":[".mat-icon-button","mat-icon-button",".scrubber-container","header>nav>a"],"app.grammarly.com":[".editor-editorContainer"],"notion.so":["[data-content-editable-leaf=true]",".notion-frame"]},M=e=>{var i;r.logInfo("makeExcluder",e);let[,t]=(i=Object.entries(oe).find(([n])=>new RegExp(n,"i").test(e)))!=null?i:[null,[]];return n=>t.filter(a=>n.closest(a)).length};var ae={"play.google.com":"[br-mode=on] reader-rendered-page { overflow: auto !important; }"},re=e=>(r.logInfo("siteOverrides check url:",e),Object.entries(ae).filter(([t])=>RegExp(t,"i").test(e)).map(([,t])=>t).join("")),D={getSiteOverride:re};var{MAX_FIXATION_PARTS:U,FIXATION_LOWER_BOUND:le,BR_WORD_STEM_PERCENTAGE:se}=u,ce=["STYLE","SCRIPT","BR-SPAN","BR-FIXATION","BR-BOLD","BR-EDGE","SVG","INPUT","TEXTAREA"],de=["childList","characterData"];var b,X="",G;function be(e){return e.replace(new RegExp("\\\\p{L}+","gu"),t=>{let{length:i}=t,n=i>3?Math.round(i*se):i,o=t.slice(0,n),a=t.slice(n);return`<br-bold>${fe(o)}</br-bold>${a.length?`<br-edge>${a}</br-edge>`:""}`})}function fe(e){let t=e.length>=U?U:e.length,i=Math.ceil(e.length*(1/t));return i===le?`<br-fixation fixation-strength="1">${e}</br-fixation>`:new Array(t).fill(null).map((o,a)=>{let l=a*i,w=l+i>e.length?e.length:l+i;return`<br-fixation fixation-strength="${a+1}">${e.slice(l,w)}</br-fixation>`}).join("")}function S(e){var t,i,n;if(!(!((t=e==null?void 0:e.parentElement)!=null&&t.tagName)||ce.includes(e.parentElement.tagName))){if(((i=e==null?void 0:e.parentElement)==null?void 0:i.closest("body"))&&G(e==null?void 0:e.parentElement)){e.parentElement.setAttribute("br-ignore-on-mutation","true"),r.logInfo("found node to exclude",e,e.parentElement);return}if(V(e)){r.logInfo("found br-ignore-on-mutation","skipping");return}if(e.nodeType===Node.TEXT_NODE&&e.nodeValue.length){try{let o=document.createElement("br-span");if(o.innerHTML=be(e.nodeValue),o.childElementCount===0)return;((n=e.previousSibling)==null?void 0:n.tagName)==="BR-SPAN"&&e.parentElement.removeChild(e.previousSibling),e.parentElement.insertBefore(o,e),e.textContent=""}catch(o){r.logError(o)}return}e.hasChildNodes()&&[...e.childNodes].forEach(S)}}var he=(e,t,i)=>{var o;let n=r.logTime("ToggleReading-Time");X=(o=t==null?void 0:t.URL)!=null?o:"",G=M(X);try{e?(t.getElementsByTagName("br-bold").length<1&&ge(i,t),t.body.setAttribute("br-mode","on"),[...t.body.childNodes].forEach(S),b||(b=new f(t.body,null,xe),b.observe())):(t.body.setAttribute("br-mode","off"),b&&(b.destroy(),b=null))}catch(a){r.logError(a)}finally{n()}};function V(e){var t;return(t=e==null?void 0:e.parentElement)==null?void 0:t.closest("[br-ignore-on-mutation]")}function xe(e){var i,n,o;let t=(o=(n=(i=e[0])==null?void 0:i.target)==null?void 0:n.parentElement)==null?void 0:o.closest("body");if(t&&["textarea:focus","input:focus"].filter(a=>t==null?void 0:t.querySelector(a)).length){r.logInfo("focused or active input found, exiting mutationCallback");return}r.logInfo("mutationCallback fired ",e.length,e),e.forEach(({type:a,addedNodes:l,target:w})=>{var A;!de.includes(a)||(A=[...l,w].filter(J=>!V(J)))==null||A.forEach(S)})}function ge(e,t){let i=t.createElement("style");i.setAttribute("br-style",""),i.textContent=e+D.getSiteOverride(t==null?void 0:t.URL),r.logInfo("contentStyle",i.textContent),t.head.appendChild(i)}var pe=e=>(t,i)=>{e.body.setAttribute(t,i)},ve=e=>t=>e.body.getAttribute(t),g=e=>(t,i)=>{e.body.style.setProperty(t,i)},ye=e=>t=>e.body.style.getPropertyValue(t),ue=e=>t=>{if(r.logInfo("saccades-style",t),/bold/i.test(t)){let[,i]=t.split("-");g(e)("--br-boldness",i),g(e)("--br-line-style","")}if(/line$/i.test(t)){let[i]=t.split("-");g(e)("--br-line-style",i),g(e)("--br-boldness","")}},W={setReadingMode:he,makeHandlers:e=>({setAttribute:pe(e),getAttribute:ve(e),setProperty:g(e),getProperty:ye(e),setSaccadesStyle:ue(e)})};var H=`/**\tgenerate (3) fixation-strength variants*/[br-mode=on] br-bold *,[br-mode=on] br-edge {  opacity: var(--fixation-edge-opacity, 100%);}[br-mode=on][saccades-interval="0"][fixation-strength="1"] br-bold:nth-of-type(1n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="1"] br-bold:nth-of-type(2n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="1"] br-bold:nth-of-type(3n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="1"] br-bold:nth-of-type(4n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="1"] br-bold:nth-of-type(5n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="2"] br-bold:nth-of-type(1n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="2"] br-bold:nth-of-type(1n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="2"] br-bold:nth-of-type(2n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="2"] br-bold:nth-of-type(2n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="2"] br-bold:nth-of-type(3n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="2"] br-bold:nth-of-type(3n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="2"] br-bold:nth-of-type(4n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="2"] br-bold:nth-of-type(4n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="2"] br-bold:nth-of-type(5n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="2"] br-bold:nth-of-type(5n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="3"] br-bold:nth-of-type(1n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="3"] br-bold:nth-of-type(1n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="3"] br-bold:nth-of-type(1n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="3"] br-bold:nth-of-type(2n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="3"] br-bold:nth-of-type(2n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="3"] br-bold:nth-of-type(2n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="3"] br-bold:nth-of-type(3n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="3"] br-bold:nth-of-type(3n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="3"] br-bold:nth-of-type(3n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="3"] br-bold:nth-of-type(4n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="3"] br-bold:nth-of-type(4n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="3"] br-bold:nth-of-type(4n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="3"] br-bold:nth-of-type(5n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="3"] br-bold:nth-of-type(5n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="3"] br-bold:nth-of-type(5n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="4"] br-bold:nth-of-type(1n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="4"] br-bold:nth-of-type(1n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="4"] br-bold:nth-of-type(1n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="0"][fixation-strength="4"] br-bold:nth-of-type(1n + 1) [fixation-strength="4"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="4"] br-bold:nth-of-type(2n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="4"] br-bold:nth-of-type(2n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="4"] br-bold:nth-of-type(2n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="1"][fixation-strength="4"] br-bold:nth-of-type(2n + 1) [fixation-strength="4"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="4"] br-bold:nth-of-type(3n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="4"] br-bold:nth-of-type(3n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="4"] br-bold:nth-of-type(3n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="2"][fixation-strength="4"] br-bold:nth-of-type(3n + 1) [fixation-strength="4"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="4"] br-bold:nth-of-type(4n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="4"] br-bold:nth-of-type(4n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="4"] br-bold:nth-of-type(4n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="3"][fixation-strength="4"] br-bold:nth-of-type(4n + 1) [fixation-strength="4"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="4"] br-bold:nth-of-type(5n + 1) [fixation-strength="1"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="4"] br-bold:nth-of-type(5n + 1) [fixation-strength="2"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="4"] br-bold:nth-of-type(5n + 1) [fixation-strength="3"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-interval="4"][fixation-strength="4"] br-bold:nth-of-type(5n + 1) [fixation-strength="4"] {  display: inline;  --fixation-edge-opacity: $activeFixationOpacity;  font-weight: var(--br-boldness);  line-height: var(--br-line-height, initial);  color: var(--saccadesColor);  text-decoration: var(--br-line-style) underline 2px;  text-underline-offset: 3px;}[br-mode=on][saccades-color=light] br-bold:nth-of-type(4n + 0) {  --saccadesColor: #4ac069;}[br-mode=on][saccades-color=light-100] br-bold:nth-of-type(4n + 0) {  --saccadesColor: #7dd294;}[br-mode=on][saccades-color=dark] br-bold:nth-of-type(4n + 0) {  --saccadesColor: #2f8947;}[br-mode=on][saccades-color=dark-100] br-bold:nth-of-type(4n + 0) {  --saccadesColor: #1e552c;}[br-mode=on][saccades-color=light] br-bold:nth-of-type(4n + 1) {  --saccadesColor: #604e31;}[br-mode=on][saccades-color=light-100] br-bold:nth-of-type(4n + 1) {  --saccadesColor: #8e7348;}[br-mode=on][saccades-color=dark] br-bold:nth-of-type(4n + 1) {  --saccadesColor: #2a2215;}[br-mode=on][saccades-color=dark-100] br-bold:nth-of-type(4n + 1) {  --saccadesColor: black;}[br-mode=on][saccades-color=light] br-bold:nth-of-type(4n + 2) {  --saccadesColor: #742a4a;}[br-mode=on][saccades-color=light-100] br-bold:nth-of-type(4n + 2) {  --saccadesColor: #a73c6b;}[br-mode=on][saccades-color=dark] br-bold:nth-of-type(4n + 2) {  --saccadesColor: #381424;}[br-mode=on][saccades-color=dark-100] br-bold:nth-of-type(4n + 2) {  --saccadesColor: #050203;}[br-mode=on][saccades-color=light] br-bold:nth-of-type(4n + 3) {  --saccadesColor: #6db1ff;}[br-mode=on][saccades-color=light-100] br-bold:nth-of-type(4n + 3) {  --saccadesColor: #b2d6ff;}[br-mode=on][saccades-color=dark] br-bold:nth-of-type(4n + 3) {  --saccadesColor: #1b85ff;}[br-mode=on][saccades-color=dark-100] br-bold:nth-of-type(4n + 3) {  --saccadesColor: #0063d5;}`;var{saccadesInterval:me,fixationStrength:Oe,saccadesColor:Ce,saccadesStyle:O,fixationEdgeOpacity:Ee}=k({},u);function Fe(){var e,t,i,n;if(E("saccades-interval",(e=$("saccades-interval"))!=null?e:me),E("fixation-strength",(t=$("fixation-strength"))!=null?t:Oe),E("saccades-color",(i=$("saccades-color"))!=null?i:Ce),/bold/i.test(O)){let[,o]=O.split("-"),a=F("--br-boldness"),l=!Number.isNaN(a)&&a!==""?a:o;p("--br-boldness",l)}if(/line/i.test(O)){let[o]=O.split("-"),a=F("--br-line-style"),l=!Number.isNaN(a)&&a!==""?a:o;p("--br-line-style",l)}p("--fixation-edge-opacity",(n=F("--fixation-edge-opacity"))!=null?n:`${Ee}%`)}function j(){r.logInfo("called"),W.setReadingMode(document.body.getAttribute("br-mode")!=="on",document,H)}var Y={"fixation-strength":[[null,1],["",1],[1,2],[2,3],[3,4],[4,1]],"saccades-interval":[[null,1],["",1],[0,1],[1,2],[2,3],[3,4],[4,0]],"saccades-color":[[null,"light"],["","light"],["light","light-100"],["light-100","dark"],["dark","dark-100"],["dark-100",""]],"--fixation-edge-opacity":[[null,"25%"],["","25%"],["25%","50%"],["50%","75%"],["75%","100%"],["80%","25%"],["100%","25%"]]};function $e(e,t){return Y[e].find(([i])=>`${i}`==`${t}`)}function C(e,t=E,i=$){let n=i(e),[,o]=$e(e,n);r.logInfo("stateTransitionKey",e,"currentActiveState",n,"nextState",o,Y[e]),t(e,o),document.body.getAttribute("br-mode")!=="on"&&j()}var p=(e,t)=>{r.logInfo({setProperty:p,property:e,value:t}),document.body.style.setProperty(e,t)},E=(e,t)=>document.body.setAttribute(e,t),F=e=>document.body.style.getPropertyValue(e),$=e=>document.body.getAttribute(e),q={fireReadingToggle:j,fireFixationStrengthTransition:()=>C("fixation-strength"),fireSaccadesIntervalTransition:()=>C("saccades-interval"),fireSaccadesColorTransition:()=>C("saccades-color"),firefixationEdgeOpacityTransition:()=>C("--fixation-edge-opacity",p,F)},z="fireReadingToggle";r.logInfo("actionToFire",z,q);q[z]();function we(){Fe()}we();})';