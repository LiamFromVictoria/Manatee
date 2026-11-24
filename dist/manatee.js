var D=["dark","gray","red","pink","grape","violet","indigo","blue","cyan","teal","green","lime","yellow","orange"],Z=["filled","filled-hover","light","light-hover","light-color","outline","outline-hover","text"],_=Object.fromEntries([...D,"primary"].map(o=>[o,!0])),N=/^([a-z]+)[.-]([0-9])$/;function C(o){let t=(o||"primary").trim(),e={};if(_[t]){for(let a of Z)e[`--mt-c-${a}`]=`var(--mt-color-${t}-${a})`;return e}let r=N.exec(t),i=r&&_[r[1]]?`var(--mt-color-${r[1]}-${r[2]})`:t,s=(a,n="transparent")=>`color-mix(in srgb, ${i} ${a}%, ${n})`;return e["--mt-c-filled"]=i,e["--mt-c-filled-hover"]=s(90,"black"),e["--mt-c-light"]=s(10),e["--mt-c-light-hover"]=s(12),e["--mt-c-light-color"]=i,e["--mt-c-outline"]=i,e["--mt-c-outline-hover"]=s(5),e["--mt-c-text"]=i,e}function A(o,t="inherit"){if(!o)return t;let e=o.trim();if(e==="dimmed")return"var(--mt-color-dimmed)";if(e==="bright")return"var(--mt-color-bright)";if(e==="white")return"var(--mt-white)";if(e==="black")return"var(--mt-black)";if(_[e])return`var(--mt-color-${e}-text)`;let r=N.exec(e);return r&&_[r[1]]?`var(--mt-color-${r[1]}-${r[2]})`:e}var W={xs:!0,sm:!0,md:!0,lg:!0,xl:!0},G={spacing:!0,radius:!0,"font-size":!0,"line-height":!0,shadow:!0,breakpoint:!0},J=/^-?\d*\.?\d+$/;function Q(o){return W[o]===!0}function w(o,t){if(t==null||t===""||t===!1)return"";let e=String(t).trim();return o==="raw"?e:o==="color"?A(e):G[o]&&W[e]?`var(--mt-${o}-${e})`:J.test(e)?o==="line-height"?e:B(parseFloat(e)):e}function B(o){return o===0?"0":`${o/16}rem`}var $={m:{props:["margin"],scale:"spacing"},mt:{props:["margin-top"],scale:"spacing"},mb:{props:["margin-bottom"],scale:"spacing"},ml:{props:["margin-left"],scale:"spacing"},mr:{props:["margin-right"],scale:"spacing"},mx:{props:["margin-left","margin-right"],scale:"spacing"},my:{props:["margin-top","margin-bottom"],scale:"spacing"},p:{props:["padding"],scale:"spacing"},pt:{props:["padding-top"],scale:"spacing"},pb:{props:["padding-bottom"],scale:"spacing"},pl:{props:["padding-left"],scale:"spacing"},pr:{props:["padding-right"],scale:"spacing"},px:{props:["padding-left","padding-right"],scale:"spacing"},py:{props:["padding-top","padding-bottom"],scale:"spacing"},w:{props:["width"],scale:"rem"},h:{props:["height"],scale:"rem"},miw:{props:["min-width"],scale:"rem"},maw:{props:["max-width"],scale:"rem"},mih:{props:["min-height"],scale:"rem"},mah:{props:["max-height"],scale:"rem"}},U=new Map;function d(o,...t){let e=String.raw({raw:o},...t),r=U.get(e);return r||(r=new CSSStyleSheet,r.replaceSync(e),U.set(e,r)),r}var m=(o,...t)=>String.raw({raw:o},...t);function y(o){return o.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function tt(o){return o.replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}var et=0;function rt(o="mt"){return`${o}-${(++et).toString(36)}`}var ot=d`
  :host { box-sizing: border-box; }
  :host([hidden]) { display: none !important; }
  *, *::before, *::after { box-sizing: border-box; }
`,p=class extends HTMLElement{static props={};static styles=[];static shadowOptions={mode:"open"};static get observedAttributes(){return[...Object.entries(this.props).map(([t,e])=>e.attr??y(t)),...Object.keys($)]}root;#t;#e=new Set;#o=!1;#i=!1;#r=null;constructor(){super();let t=this.constructor;this.#t={};for(let[e,r]of Object.entries(t.props))this.#t[r.attr??y(e)]=e;this.root=this.attachShadow(t.shadowOptions),this.root.adoptedStyleSheets=[ot,...t.styles],this.root.innerHTML=this.template()}template(){return"<slot></slot>"}setup(){}update(t){}onConnect(){}onDisconnect(){}connectedCallback(){if(!this.#i){this.#i=!0;let t=this.constructor;for(let e of Object.keys(t.props))this.#e.add(e);for(let e of Object.keys($))this.hasAttribute(e)&&this.#e.add(e);this.setup()}this.onConnect(),this.#s()}disconnectedCallback(){this.onDisconnect()}attributeChangedCallback(t,e,r){e!==r&&(this.#e.add(this.#t[t]??t),this.requestUpdate())}requestUpdate(t){t&&this.#e.add(t),!this.#o&&(this.#o=!0,queueMicrotask(()=>{this.#o=!1,this.#s()}))}#s(){if(!this.isConnected||!this.#i||this.#e.size===0)return;let t=this.#e;this.#e=new Set,this.#n(),this.update(t)}prop(t){let e=this.constructor.props[t];if(!e)return null;let r=this.getAttribute(e.attr??y(t));switch(e.type??"string"){case"boolean":return r===null?e.default??!1:r!=="false";case"number":{let i=r===null||r===""?NaN:Number(r);return Number.isNaN(i)?e.default??null:i}default:return r??e.default??null}}setProp(t,e){let r=this.constructor.props[t];if(!r)return;let i=r.attr??y(t);if(r.type==="boolean"){e===!0?this.setAttribute(i,""):r.default===!0&&e===!1?this.setAttribute(i,"false"):this.removeAttribute(i);return}e==null||e===!1?this.removeAttribute(i):this.setAttribute(i,String(e))}emit(t,e,r={}){return this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!0,detail:e,...r}))}$(t){return this.root.querySelector(t)}#n(){let t=this.constructor,e=[];for(let[r,i]of Object.entries(t.props)){if(i.color)for(let[s,a]of Object.entries(C(this.prop(r))))e.push(`${s}:${a}`);if(i.css){let s=this.prop(r),a=s===null||s===!1?"":w(i.scale??"raw",s);a&&e.push(`${i.css}:${a}`)}}for(let[r,i]of Object.entries($)){let s=this.getAttribute(r);if(s===null||s==="")continue;let a=w(i.scale,s);for(let n of i.props)e.push(`${n}:${a}`)}e.length===0&&!this.#r||(this.#r||(this.#r=new CSSStyleSheet,this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,this.#r]),this.#r.replaceSync(`:host{${e.join(";")}}`))}};function u(o,t){for(let e of Object.keys(t.props))Object.prototype.hasOwnProperty.call(t.prototype,e)||Object.defineProperty(t.prototype,e,{get(){return this.prop(e)},set(r){this.setProp(e,r)},configurable:!0,enumerable:!0});customElements.get(o)||customElements.define(o,t)}var T=d`
  :host {
    display: block;
    --_height: 2.25rem;
    --_fz: var(--mt-font-size-sm);
    --_label-fz: var(--mt-font-size-sm);
    --_hint-fz: var(--mt-font-size-xs);
    --_radius: var(--mt-radius-default);
    font-size: var(--_fz);
    line-height: var(--mt-line-height);
  }
  :host([size='xs']) { --_height: 1.875rem; --_fz: var(--mt-font-size-xs); --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='md']) { --_height: 2.625rem; --_fz: var(--mt-font-size-md); --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_height: 3.125rem; --_fz: var(--mt-font-size-lg); --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_height: 3.75rem; --_fz: var(--mt-font-size-xl); --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }

  .label {
    display: inline-block;
    font-size: var(--_label-fz);
    font-weight: 500;
    color: var(--mt-color-text);
    word-break: break-word;
    cursor: default;
  }
  .required { color: var(--mt-color-error); margin-inline-start: 0.125rem; }
  .description, .error {
    display: block;
    font-size: var(--_hint-fz);
    line-height: 1.2;
    word-break: break-word;
  }
  .description { color: var(--mt-color-dimmed); margin-top: calc(var(--mt-spacing-xs) / 4); }
  .error { color: var(--mt-color-error); margin-top: calc(var(--mt-spacing-xs) / 2); }
  .label + .description { margin-top: 0; }
  [hidden] { display: none !important; }
`,L=d`
  .field { position: relative; margin-top: calc(var(--mt-spacing-xs) / 2); }
  .label[hidden] + .description[hidden] + .field,
  .label[hidden] + .field { margin-top: 0; }
  .description:not([hidden]) + .field { margin-top: calc(var(--mt-spacing-xs) / 2); }

  .input {
    display: block;
    width: 100%;
    height: var(--_height);
    min-height: var(--_height);
    padding-inline: calc(var(--_height) / 3);
    padding-inline-start: var(--_pl, calc(var(--_height) / 3));
    padding-inline-end: var(--_pr, calc(var(--_height) / 3));
    font: inherit;
    font-size: var(--_fz);
    line-height: calc(var(--_height) - 0.125rem);
    color: var(--mt-color-text);
    background: var(--mt-color-input-bg);
    border: 1px solid var(--mt-color-default-border);
    border-radius: var(--_radius);
    outline: none;
    appearance: none;
    resize: none;
    transition: border-color var(--mt-transition), box-shadow var(--mt-transition);
  }
  textarea.input { height: auto; line-height: var(--mt-line-height); padding-block: calc(var(--_height) / 6); }
  .input::placeholder { color: var(--mt-color-placeholder); opacity: 1; }
  .input:focus, .input:focus-within { border-color: var(--mt-color-primary-filled); }
  :host([variant='filled']) .input { background: var(--mt-color-input-filled-bg); border-color: transparent; }
  :host([variant='filled']) .input:focus { border-color: var(--mt-color-primary-filled); }
  :host([variant='unstyled']) .input { background: transparent; border-color: transparent; padding-inline: 0; }
  :host([error]:not([error=''])) .input { border-color: var(--mt-color-error); color: var(--mt-color-error); }
  :host([error]:not([error=''])) .input::placeholder { color: var(--mt-color-error); }
  :host([disabled]) .input {
    background: var(--mt-color-disabled);
    color: var(--mt-color-disabled-color);
    opacity: 0.6;
    cursor: not-allowed;
  }

  .section {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--_height);
    color: var(--mt-color-dimmed);
    pointer-events: none;
  }
  .section ::slotted(*) { pointer-events: all; }
  .section.left { inset-inline-start: 0; }
  .section.right { inset-inline-end: 0; }
  .field.has-left .input { --_pl: var(--_height); }
  .field.has-right .input { --_pr: var(--_height); }
  :host([error]:not([error=''])) .section { color: var(--mt-color-error); }
`;function M(o,t={}){let e=t.labelFor===!1?"div":"label",r=t.labelFor===!1?"":' for="control"';return m`
    <${e} class="label" part="label" id="label"${r} hidden><slot name="label"><span class="label-text"></span></slot><span class="required" aria-hidden="true" hidden>*</span></${e}>
    <div class="description" part="description" id="description" hidden><slot name="description"><span class="description-text"></span></slot></div>
    ${o}
    <div class="error" part="error" id="error" hidden><slot name="error"><span class="error-text"></span></slot></div>
  `}function P(o){return m`
    <div class="field" part="field">
      <div class="section left" part="left-section"><slot name="left-section"></slot></div>
      ${o}
      <div class="section right" part="right-section"><slot name="right-section"></slot></div>
    </div>
  `}var g=class extends p{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static props={name:{},label:{},description:{},error:{},required:{type:"boolean"},disabled:{type:"boolean"},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"}};internals;#t=!1;constructor(){super(),this.internals=this.attachInternals()}get control(){return this.root.getElementById("control")}get form(){return this.internals.form}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}get willValidate(){return this.internals.willValidate}checkValidity(){return this.internals.checkValidity()}reportValidity(){return this.internals.reportValidity()}get isDisabled(){return this.disabled||this.#t}formDisabledCallback(t){this.#t=t,this.requestUpdate("disabled")}formResetCallback(){}setup(){for(let t of["label","description","error"])this.root.querySelector(`slot[name="${t}"]`)?.addEventListener("slotchange",()=>this.syncWrapper());for(let t of["left","right"]){let e=this.root.querySelector(`slot[name="${t}-section"]`),r=()=>e?.closest(".field")?.classList.toggle(`has-${t}`,(e?.assignedNodes().length??0)>0);e?.addEventListener("slotchange",r),r()}}update(t){(t.has("label")||t.has("description")||t.has("error")||t.has("required")||t.has("disabled"))&&this.syncWrapper()}syncWrapper(){let t=(s,a)=>!!a||!!this.querySelector(`:scope > [slot="${s}"]`),e=[["label",this.label],["description",this.description],["error",this.error]],r=[];for(let[s,a]of e){let n=this.root.getElementById(s);if(!n)continue;let l=n.querySelector(`.${s}-text`);l&&(l.textContent=a??"");let f=t(s,a);n.hidden=!f,f&&s!=="label"&&r.push(s)}this.root.querySelector(".required")?.toggleAttribute("hidden",!this.required);let i=this.control;i&&(r.length?i.setAttribute("aria-describedby",r.join(" ")):i.removeAttribute("aria-describedby"),i.toggleAttribute("aria-invalid",!!this.error),this.error&&i.setAttribute("aria-invalid","true"),"disabled"in i&&(i.disabled=this.isDisabled),"required"in i&&(i.required=this.required)),this.internals.ariaInvalid=this.error?"true":null}setFormValue(t,e){this.internals.setFormValue(t,e??t),this.syncValidity()}syncValidity(){let t=this.control;t&&"validity"in t&&this.internals.setValidity(t.validity,t.validationMessage,t)}focus(t){this.control?.focus(t)}blur(){this.control?.blur()}forwardChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}};var O="mt-color-scheme",K=matchMedia("(prefers-color-scheme: dark)");function x(){let o=localStorage.getItem(O);return o==="light"||o==="dark"?o:"auto"}function S(){let o=x();return o==="auto"?K.matches?"dark":"light":o}function H(){let o=S();document.documentElement.setAttribute("data-mt-color-scheme",o),window.dispatchEvent(new CustomEvent("mt-color-scheme-change",{detail:o}))}function E(o){o==="auto"?localStorage.removeItem(O):localStorage.setItem(O,o),H()}function F(){E(S()==="dark"?"light":"dark")}K.addEventListener("change",()=>{x()==="auto"&&H()});document.documentElement.hasAttribute("data-mt-color-scheme")||H();var it=d`
  [popover] {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    overflow: visible;
  }
`,Y={top:"bottom",bottom:"top",left:"right",right:"left"},z=4;function q(o,t,e={}){let{placement:r="bottom",offset:i=8,flip:s=!0,matchWidth:a=!1}=e,n=o.getBoundingClientRect();a&&(t.style.width=`${n.width}px`);let l=t.getBoundingClientRect(),f=document.documentElement.clientWidth,j=document.documentElement.clientHeight,[X,h="center"]=r.split("-"),k={bottom:j-n.bottom-i-l.height,top:n.top-i-l.height,right:f-n.right-i-l.width,left:n.left-i-l.width},c=X;s&&k[c]<0&&k[Y[c]]>k[c]&&(c=Y[c]);let v,b;c==="top"||c==="bottom"?(b=c==="bottom"?n.bottom+i:n.top-i-l.height,v=h==="start"?n.left:h==="end"?n.right-l.width:n.left+(n.width-l.width)/2,v=Math.min(Math.max(v,z),f-l.width-z)):(v=c==="right"?n.right+i:n.left-i-l.width,b=h==="start"?n.top:h==="end"?n.bottom-l.height:n.top+(n.height-l.height)/2,b=Math.min(Math.max(b,z),j-l.height-z)),t.style.left=`${Math.round(v)}px`,t.style.top=`${Math.round(b)}px`,t.dataset.placement=h==="center"?c:`${c}-${h}`}function st(o,t,e={}){let r=0,i=()=>{cancelAnimationFrame(r),r=requestAnimationFrame(()=>q(o,t,e))};q(o,t,e);let s=new ResizeObserver(i);return s.observe(o),s.observe(t),addEventListener("scroll",i,{capture:!0,passive:!0}),addEventListener("resize",i,{passive:!0}),()=>{cancelAnimationFrame(r),s.disconnect(),removeEventListener("scroll",i,{capture:!0}),removeEventListener("resize",i)}}function nt(o,t){let e=i=>{let s=i.composedPath();o.some(a=>s.includes(a))||t("outside")},r=i=>{i.key==="Escape"&&t("escape")};return document.addEventListener("pointerdown",e,!0),document.addEventListener("keydown",r),()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",r)}}var at=d`
  :host {
    display: inline-block;
    vertical-align: middle;
    --_height: 2.25rem;
    --_px: 1.125rem;
    --_fz: var(--mt-font-size-sm);
    --_radius: var(--mt-radius-default);
    --_bg: var(--mt-c-filled);
    --_hover: var(--mt-c-filled-hover);
    --_color: var(--mt-white);
    --_bd: transparent;
  }
  :host([size='xs']) { --_height: 1.875rem; --_px: 0.875rem; --_fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_height: 2.625rem; --_px: 1.375rem; --_fz: var(--mt-font-size-md); }
  :host([size='lg']) { --_height: 3.125rem; --_px: 1.625rem; --_fz: var(--mt-font-size-lg); }
  :host([size='xl']) { --_height: 3.75rem; --_px: 2rem; --_fz: var(--mt-font-size-xl); }
  :host([size='compact-xs']) { --_height: 1.375rem; --_px: 0.4375rem; --_fz: var(--mt-font-size-xs); }
  :host([size='compact-sm']) { --_height: 1.625rem; --_px: 0.5rem; --_fz: var(--mt-font-size-sm); }
  :host([size='compact-md']) { --_height: 1.875rem; --_px: 0.625rem; --_fz: var(--mt-font-size-md); }
  :host([size='compact-lg']) { --_height: 2.125rem; --_px: 0.75rem; --_fz: var(--mt-font-size-lg); }
  :host([size='compact-xl']) { --_height: 2.5rem; --_px: 0.875rem; --_fz: var(--mt-font-size-xl); }
  :host([full-width]) { display: block; width: 100%; }

  :host([variant='light']) { --_bg: var(--mt-c-light); --_hover: var(--mt-c-light-hover); --_color: var(--mt-c-light-color); }
  :host([variant='outline']) { --_bg: transparent; --_hover: var(--mt-c-outline-hover); --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='subtle']) { --_bg: transparent; --_hover: var(--mt-c-light-hover); --_color: var(--mt-c-light-color); }
  :host([variant='transparent']) { --_bg: transparent; --_hover: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='default']) { --_bg: var(--mt-color-default); --_hover: var(--mt-color-default-hover); --_color: var(--mt-color-default-color); --_bd: var(--mt-color-default-border); }
  :host([variant='white']) { --_bg: var(--mt-white); --_hover: var(--mt-color-gray-0); --_color: var(--mt-c-filled); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_hover: var(--_bg); }

  .root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--_height);
    padding-inline: var(--_px);
    font: inherit;
    font-size: var(--_fz);
    font-weight: 600;
    line-height: 1;
    color: var(--_color);
    text-decoration: none;
    white-space: nowrap;
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .root:hover:not(:disabled) { background: var(--_hover); }
  .root:active:not(:disabled) { transform: translateY(1px); }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .root:disabled, :host([data-disabled]) .root {
    background: var(--mt-color-disabled);
    color: var(--mt-color-disabled-color);
    border-color: transparent;
    cursor: not-allowed;
    transform: none;
  }
  :host([loading]) .root:disabled { background: var(--_bg); color: var(--_color); opacity: 0.6; cursor: default; }

  .inner { display: flex; align-items: center; justify-content: var(--_justify, center); width: 100%; height: 100%; overflow: visible; }
  .label { display: flex; align-items: center; height: 100%; overflow: hidden; }
  .section { display: flex; align-items: center; }
  .section:not(.filled) { display: none; }
  .section.left { margin-inline-end: var(--mt-spacing-xs); }
  .section.right { margin-inline-start: var(--mt-spacing-xs); }

  .loader {
    display: none;
    position: absolute;
    inset: 0;
    margin: auto;
    width: calc(var(--_height) / 2);
    height: calc(var(--_height) / 2);
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  :host([loading]) .loader { display: block; }
  :host([loading]) .inner { opacity: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
`,R=class extends p{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[at];static props={variant:{default:"filled"},color:{color:!0},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"},fullWidth:{type:"boolean"},disabled:{type:"boolean"},loading:{type:"boolean"},justify:{css:"--_justify"},type:{default:"button"},href:{},target:{},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};internals=this.attachInternals();template(){return m`
      <button class="root" part="root" type="button">
        <span class="inner">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="label" part="label"><slot></slot></span>
          <span class="section right" part="right-section"><slot name="right-section"></slot></span>
        </span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.addEventListener("click",t=>{if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}let e=this.internals.form;e&&(this.type==="submit"?e.requestSubmit():this.type==="reset"&&e.reset())})}update(t){t.has("href")&&this.#t();let e=this.$(".root"),r=this.disabled||this.loading;if(e instanceof HTMLButtonElement)e.disabled=r;else{e.setAttribute("href",this.href??"");let i=this.getAttribute("target");i?e.setAttribute("target",i):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",r),e.tabIndex=r?-1:0,this.toggleAttribute("data-disabled",r)}e.toggleAttribute("aria-busy",this.loading)}#t(){let t=this.$(".root"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let r=document.createElement(e.toLowerCase());r.className=t.className,r.setAttribute("part","root"),e==="BUTTON"&&r.setAttribute("type","button"),r.append(...t.childNodes),t.replaceWith(r)}},lt=d`
  :host { display: inline-flex; flex-direction: row; }
  :host([orientation='vertical']) { flex-direction: column; }
`,I=class extends p{static styles=[lt];static props={orientation:{default:"horizontal"}};onConnect(){this.#t(),this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t())}update(){this.#t()}#t(){let t=this.getAttribute("orientation")==="vertical",e=[...this.children].filter(r=>r instanceof HTMLElement);e.forEach((r,i)=>{let s=i===0,a=i===e.length-1,n="var(--mt-radius-default)",l=t?`${s?n:0} ${s?n:0} ${a?n:0} ${a?n:0}`:`${s?n:0} ${a?n:0} ${a?n:0} ${s?n:0}`;r.style.setProperty("--_radius",l),r.style.setProperty(t?"margin-top":"margin-left",s?"0":"-1px")})}};u("mt-button",R);u("mt-button-group",I);var ct=["placeholder","type","autocomplete","inputmode","pattern","minlength","maxlength","readonly","autofocus"],V=class extends g{static styles=[T,L];static props={...g.props,value:{},variant:{default:"default"},placeholder:{},type:{default:"text"},autocomplete:{},inputmode:{},pattern:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"}};template(){return M(P('<input id="control" class="input" part="input">'))}get input(){return this.$("#control")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value)}setup(){super.setup(),this.input.addEventListener("input",()=>this.setFormValue(this.input.value)),this.input.addEventListener("change",()=>this.forwardChange())}update(t){super.update(t);for(let e of ct){if(!t.has(e))continue;let r=this.getAttribute(e);r===null||r==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,r)}t.has("value")&&(this.value=this.getAttribute("value")??"")}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};u("mt-text-input",V);window.manatee={setColorScheme:E,getColorScheme:x,resolvedColorScheme:S,toggleColorScheme:F};export{p as MtElement,g as MtFormElement,D as PALETTE,st as autoPosition,C as colorVars,d as css,u as define,tt as escapeHtml,P as fieldTemplate,it as floatingStyles,x as getColorScheme,m as html,L as inputStyles,Q as isToken,y as kebab,nt as onDismiss,q as position,B as rem,w as resolve,A as resolveColor,S as resolvedColorScheme,E as setColorScheme,F as toggleColorScheme,rt as uid,T as wrapperStyles,M as wrapperTemplate};
