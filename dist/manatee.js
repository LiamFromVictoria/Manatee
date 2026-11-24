var Ei=["dark","gray","red","pink","grape","violet","indigo","blue","cyan","teal","green","lime","yellow","orange"],Ki=["filled","filled-hover","light","light-hover","light-color","outline","outline-hover","text"],G=Object.fromEntries([...Ei,"primary"].map(r=>[r,!0])),Li=/^([a-z]+)[.-]([0-9])$/;function P(r){let t=(r||"primary").trim(),e={};if(G[t]){for(let a of Ki)e[`--mt-c-${a}`]=`var(--mt-color-${t}-${a})`;return e}let i=Li.exec(t),o=i&&G[i[1]]?`var(--mt-color-${i[1]}-${i[2]})`:t,s=(a,d="transparent")=>`color-mix(in srgb, ${o} ${a}%, ${d})`;return e["--mt-c-filled"]=o,e["--mt-c-filled-hover"]=s(90,"black"),e["--mt-c-light"]=s(10),e["--mt-c-light-hover"]=s(12),e["--mt-c-light-color"]=o,e["--mt-c-outline"]=o,e["--mt-c-outline-hover"]=s(5),e["--mt-c-text"]=o,e}function $(r,t="inherit"){if(!r)return t;let e=r.trim();if(e==="dimmed")return"var(--mt-color-dimmed)";if(e==="bright")return"var(--mt-color-bright)";if(e==="white")return"var(--mt-white)";if(e==="black")return"var(--mt-black)";if(G[e])return`var(--mt-color-${e}-text)`;let i=Li.exec(e);return i&&G[i[1]]?`var(--mt-color-${i[1]}-${i[2]})`:e}var Si={xs:!0,sm:!0,md:!0,lg:!0,xl:!0},Gi={spacing:!0,radius:!0,"font-size":!0,"line-height":!0,shadow:!0,breakpoint:!0},Zi=/^-?\d*\.?\d+$/;function vt(r){return Si[r]===!0}function A(r,t){if(t==null||t===""||t===!1)return"";let e=String(t).trim();return r==="raw"?e:r==="color"?$(e):Gi[r]&&Si[e]?`var(--mt-${r}-${e})`:Zi.test(e)?r==="line-height"?e:M(parseFloat(e)):e}function M(r){return r===0?"0":`${r/16}rem`}var bt={m:{props:["margin"],scale:"spacing"},mt:{props:["margin-top"],scale:"spacing"},mb:{props:["margin-bottom"],scale:"spacing"},ml:{props:["margin-left"],scale:"spacing"},mr:{props:["margin-right"],scale:"spacing"},mx:{props:["margin-left","margin-right"],scale:"spacing"},my:{props:["margin-top","margin-bottom"],scale:"spacing"},p:{props:["padding"],scale:"spacing"},pt:{props:["padding-top"],scale:"spacing"},pb:{props:["padding-bottom"],scale:"spacing"},pl:{props:["padding-left"],scale:"spacing"},pr:{props:["padding-right"],scale:"spacing"},px:{props:["padding-left","padding-right"],scale:"spacing"},py:{props:["padding-top","padding-bottom"],scale:"spacing"},w:{props:["width"],scale:"rem"},h:{props:["height"],scale:"rem"},miw:{props:["min-width"],scale:"rem"},maw:{props:["max-width"],scale:"rem"},mih:{props:["min-height"],scale:"rem"},mah:{props:["max-height"],scale:"rem"}},Ai=new Map;function n(r,...t){let e=String.raw({raw:r},...t),i=Ai.get(e);return i||(i=new CSSStyleSheet,i.replaceSync(e),Ai.set(e,i)),i}var p=(r,...t)=>String.raw({raw:r},...t);function R(r){return r.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function gt(r){return r.replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}var Qi=0;function z(r="mt"){return`${r}-${(++Qi).toString(36)}`}var Ji=n`
  :host { box-sizing: border-box; }
  :host([hidden]) { display: none !important; }
  *, *::before, *::after { box-sizing: border-box; }
`,c=class extends HTMLElement{static props={};static styles=[];static shadowOptions={mode:"open"};static get observedAttributes(){return[...Object.entries(this.props).map(([t,e])=>e.attr??R(t)),...Object.keys(bt)]}root;#t;#e=new Set;#i=!1;#o=!1;#a=null;constructor(){super();let t=this.constructor;this.#t={};for(let[e,i]of Object.entries(t.props))this.#t[i.attr??R(e)]=e;this.root=this.attachShadow(t.shadowOptions),this.root.adoptedStyleSheets=[Ji,...t.styles],this.root.innerHTML=this.template()}template(){return"<slot></slot>"}setup(){}update(t){}onConnect(){}onDisconnect(){}connectedCallback(){if(!this.#o){this.#o=!0;let t=this.constructor;for(let e of Object.keys(t.props)){if(!Object.prototype.hasOwnProperty.call(this,e))continue;let i=this[e];delete this[e],this[e]=i}for(let e of Object.keys(t.props))this.#e.add(e);for(let e of Object.keys(bt))this.hasAttribute(e)&&this.#e.add(e);this.setup()}this.onConnect(),this.#s()}disconnectedCallback(){this.onDisconnect()}attributeChangedCallback(t,e,i){e!==i&&(this.#e.add(this.#t[t]??t),this.requestUpdate())}requestUpdate(t){t&&this.#e.add(t),!this.#i&&(this.#i=!0,queueMicrotask(()=>{this.#i=!1,this.#s()}))}#s(){if(!this.isConnected||!this.#o||this.#e.size===0)return;let t=this.#e;this.#e=new Set,this.#r(),this.update(t)}prop(t){let e=this.constructor.props[t];if(!e)return null;let i=this.getAttribute(e.attr??R(t));switch(e.type??"string"){case"boolean":return i===null?e.default??!1:i!=="false";case"number":{let o=i===null||i===""?NaN:Number(i);return Number.isNaN(o)?e.default??null:o}default:return i??e.default??null}}setProp(t,e){let i=this.constructor.props[t];if(!i)return;let o=i.attr??R(t);if(i.type==="boolean"){e===!0?this.setAttribute(o,""):i.default===!0&&e===!1?this.setAttribute(o,"false"):this.removeAttribute(o);return}e==null||e===!1?this.removeAttribute(o):this.setAttribute(o,String(e))}emit(t,e,i={}){return this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!0,detail:e,...i}))}$(t){return this.root.querySelector(t)}#r(){let t=this.constructor,e=[];for(let[i,o]of Object.entries(t.props)){if(o.color)for(let[s,a]of Object.entries(P(this.prop(i))))e.push(`${s}:${a}`);if(o.css){let s=this.prop(i),a=s===null||s===!1?"":A(o.scale??"raw",s);a&&e.push(`${o.css}:${a}`)}}for(let[i,o]of Object.entries(bt)){let s=this.getAttribute(i);if(s===null||s==="")continue;let a=A(o.scale,s);for(let d of o.props)e.push(`${d}:${a}`)}e.length===0&&!this.#a||(this.#a||(this.#a=new CSSStyleSheet,this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,this.#a]),this.#a.replaceSync(`:host{${e.join(";")}}`))}};function l(r,t){for(let e of Object.keys(t.props))Object.prototype.hasOwnProperty.call(t.prototype,e)||Object.defineProperty(t.prototype,e,{get(){return this.prop(e)},set(i){this.setProp(e,i)},configurable:!0,enumerable:!0});customElements.get(r)||customElements.define(r,t)}var E=n`
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
`,L=n`
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
  .section.left { inset-inline-start: 0; width: var(--_ls-w, var(--_height)); }
  .section.right { inset-inline-end: 0; width: var(--_rs-w, var(--_height)); }
  .field.has-left .input { --_pl: var(--_ls-w, var(--_height)); }
  .field.has-right .input { --_pr: var(--_rs-w, var(--_height)); }
  :host([error]:not([error=''])) .section { color: var(--mt-color-error); }
`;function k(r,t={}){let e=t.labelFor===!1?"div":"label",i=t.labelFor===!1?"":' for="control"';return p`
    <${e} class="label" part="label" id="label"${i} hidden><slot name="label"><span class="label-text"></span></slot><span class="required" aria-hidden="true" hidden>*</span></${e}>
    <div class="description" part="description" id="description" hidden><slot name="description"><span class="description-text"></span></slot></div>
    ${r}
    <div class="error" part="error" id="error" hidden><slot name="error"><span class="error-text"></span></slot></div>
  `}function B(r){return p`
    <div class="field" part="field">
      <div class="section left" part="left-section"><slot name="left-section"></slot></div>
      ${r}
      <div class="section right" part="right-section"><slot name="right-section"></slot></div>
    </div>
  `}var b=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static props={name:{},label:{},description:{},error:{},required:{type:"boolean"},disabled:{type:"boolean"},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"},leftSectionWidth:{css:"--_ls-w",scale:"rem"},rightSectionWidth:{css:"--_rs-w",scale:"rem"}};internals;#t=!1;constructor(){super(),this.internals=this.attachInternals()}get control(){return this.root.getElementById("control")}get form(){return this.internals.form}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}get willValidate(){return this.internals.willValidate}checkValidity(){return this.internals.checkValidity()}reportValidity(){return this.internals.reportValidity()}get isDisabled(){return this.disabled||this.#t}formDisabledCallback(t){this.#t=t,this.requestUpdate("disabled")}formResetCallback(){}setup(){for(let t of["label","description","error"])this.root.querySelector(`slot[name="${t}"]`)?.addEventListener("slotchange",()=>this.syncWrapper());for(let t of["left","right"]){let e=this.root.querySelector(`slot[name="${t}-section"]`),i=()=>e?.closest(".field")?.classList.toggle(`has-${t}`,(e?.assignedNodes().length??0)>0);e?.addEventListener("slotchange",i),i()}}update(t){(t.has("label")||t.has("description")||t.has("error")||t.has("required")||t.has("disabled"))&&this.syncWrapper()}syncWrapper(){let t=(s,a)=>!!a||!!this.querySelector(`:scope > [slot="${s}"]`),e=[["label",this.label],["description",this.description],["error",this.error]],i=[];for(let[s,a]of e){let d=this.root.getElementById(s);if(!d)continue;let h=d.querySelector(`.${s}-text`);h&&(h.textContent=a??"");let u=t(s,a);d.hidden=!u,u&&s!=="label"&&i.push(s)}this.root.querySelector(".required")?.toggleAttribute("hidden",!this.required);let o=this.control;o&&(i.length?o.setAttribute("aria-describedby",i.join(" ")):o.removeAttribute("aria-describedby"),o.toggleAttribute("aria-invalid",!!this.error),this.error&&o.setAttribute("aria-invalid","true"),"disabled"in o&&(o.disabled=this.isDisabled),"required"in o&&(o.required=this.required)),this.internals.ariaInvalid=this.error?"true":null}setFormValue(t,e){this.internals.setFormValue(t,e??t),this.syncValidity()}syncValidity(){let t=this.control;t&&"validity"in t&&this.internals.setValidity(t.validity,t.validationMessage,t)}focus(t){this.control?.focus(t)}blur(){this.control?.blur()}forwardChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}};var yt="mt-color-scheme",Ti=matchMedia("(prefers-color-scheme: dark)");function j(){let r=localStorage.getItem(yt);return r==="light"||r==="dark"?r:"auto"}function q(){let r=j();return r==="auto"?Ti.matches?"dark":"light":r}function xt(){let r=q();document.documentElement.setAttribute("data-mt-color-scheme",r),window.dispatchEvent(new CustomEvent("mt-color-scheme-change",{detail:r}))}function Z(r){r==="auto"?localStorage.removeItem(yt):localStorage.setItem(yt,r),xt()}function wt(){Z(q()==="dark"?"light":"dark")}Ti.addEventListener("change",()=>{j()==="auto"&&xt()});document.documentElement.hasAttribute("data-mt-color-scheme")||xt();var kt=n`
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
`,Mi={top:"bottom",bottom:"top",left:"right",right:"left"},Q=4;function Pi(r){if(getComputedStyle(r).display!=="contents")return r.getBoundingClientRect();let e=(r instanceof HTMLSlotElement?r.assignedElements({flatten:!0}):[...r.children]).map(Pi).filter(d=>d.width||d.height);if(e.length===0)return r.getBoundingClientRect();let i=Math.min(...e.map(d=>d.left)),o=Math.min(...e.map(d=>d.top)),s=Math.max(...e.map(d=>d.right)),a=Math.max(...e.map(d=>d.bottom));return new DOMRect(i,o,s-i,a-o)}function _t(r,t,e={}){let{placement:i="bottom",offset:o=8,flip:s=!0,matchWidth:a=!1}=e,d=Pi(r);a&&(t.style.width=`${d.width}px`);let h=t.getBoundingClientRect(),u=document.documentElement.clientWidth,m=document.documentElement.clientHeight,[f,g="center"]=i.split("-"),x={bottom:m-d.bottom-o-h.height,top:d.top-o-h.height,right:u-d.right-o-h.width,left:d.left-o-h.width},y=f;s&&x[y]<0&&x[Mi[y]]>x[y]&&(y=Mi[y]);let v,_;y==="top"||y==="bottom"?(_=y==="bottom"?d.bottom+o:d.top-o-h.height,v=g==="start"?d.left:g==="end"?d.right-h.width:d.left+(d.width-h.width)/2,v=Math.min(Math.max(v,Q),u-h.width-Q)):(v=y==="right"?d.right+o:d.left-o-h.width,_=g==="start"?d.top:g==="end"?d.bottom-h.height:d.top+(d.height-h.height)/2,_=Math.min(Math.max(_,Q),m-h.height-Q)),t.style.left=`${Math.round(v)}px`,t.style.top=`${Math.round(_)}px`,t.dataset.placement=g==="center"?y:`${y}-${g}`}function S(r,t,e={}){let i=0,o=()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>_t(r,t,e))};_t(r,t,e);let s=new ResizeObserver(o);return s.observe(r),s.observe(t),addEventListener("scroll",o,{capture:!0,passive:!0}),addEventListener("resize",o,{passive:!0}),()=>{cancelAnimationFrame(i),s.disconnect(),removeEventListener("scroll",o,{capture:!0}),removeEventListener("resize",o)}}function T(r,t){let e=o=>{let s=o.composedPath();r.some(a=>s.includes(a))||t("outside")},i=o=>{o.key==="Escape"&&t("escape")};return document.addEventListener("pointerdown",e,!0),document.addEventListener("keydown",i),()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",i)}}var Ci=!1;function J(){Ci||(Ci=!0,document.addEventListener("click",r=>{let t=r.composedPath();for(let e=0;e<t.length;e++){let i=t[e];if(!(i instanceof Element))continue;let o=i.getAttribute("data-mt-open");if(o){document.getElementById(o)?.open?.();return}if(i.hasAttribute("data-mt-close")){let s=i.getAttribute("data-mt-close");if(s)document.getElementById(s)?.close?.();else for(let a=e;a<t.length;a++){let d=t[a];if(d instanceof HTMLElement&&(d.localName==="mt-modal"||d.localName==="mt-drawer")){d.close();break}}return}}}))}var zt={xs:"20rem",sm:"23.75rem",md:"27.5rem",lg:"38.75rem",xl:"48.75rem"};function tt(r){return r?zt[r]?zt[r]:r==="auto"?"auto":/^-?\d*\.?\d+$/.test(r)?`${parseFloat(r)/16}rem`:r:zt.md}var C=class extends c{static props={opened:{type:"boolean"},withCloseButton:{type:"boolean",default:!0},closeOnClickOutside:{type:"boolean",default:!0},closeOnEscape:{type:"boolean",default:!0}};#t=null;get dialog(){return this.$("dialog")}setup(){let t=this.dialog;t.addEventListener("cancel",e=>{e.preventDefault(),this.closeOnEscape&&this.close()}),t.addEventListener("click",e=>{if(!this.closeOnClickOutside)return;let i=t.getBoundingClientRect();e.clientX>=i.left&&e.clientX<=i.right&&e.clientY>=i.top&&e.clientY<=i.bottom||this.close()}),t.addEventListener("close",()=>{this.opened&&(this.opened=!1)}),this.$(".close")?.addEventListener("click",()=>this.close())}update(t){t.has("withCloseButton")&&this.$(".close")?.toggleAttribute("hidden",!this.withCloseButton),t.has("opened")&&(this.opened?this.#e():this.#i())}open(){this.opened=!0}close(){this.opened=!1}#e(){let t=this.dialog;t.open||(this.#t=document.activeElement,t.showModal(),this.emit("open"))}#i(){let t=this.dialog;if(!t.open)return;t.classList.add("closing");let e=!1,i=s=>{s.target===t&&o()},o=()=>{e||(e=!0,t.removeEventListener("transitionend",i),t.classList.remove("closing"),t.close(),this.emit("close"),this.#t?.focus(),this.#t=null)};t.addEventListener("transitionend",i),setTimeout(o,200)}};var to=n`
  :host { display: contents; }
  dialog.modal {
    position: fixed;
    inset: 0;
    margin: var(--_y, 5dvh) auto auto;
    width: var(--_w, 27.5rem);
    max-width: calc(100vw - var(--mt-spacing-md) * 2);
    max-height: calc(100dvh - var(--_y, 5dvh) * 2);
    padding: 0;
    border: 0;
    display: flex;
    flex-direction: column;
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    border-radius: var(--_radius, var(--mt-radius-default));
    box-shadow: var(--_shadow, var(--mt-shadow-xl));
    overflow: hidden;
    opacity: 1;
    transform: scale(1);
    transition: opacity var(--mt-transition), transform var(--mt-transition);
  }
  dialog.modal:not([open]) { display: none; }
  dialog.modal.closing { opacity: 0; transform: scale(0.9); }
  @starting-style {
    dialog.modal[open] { opacity: 0; transform: scale(0.9); }
  }
  dialog.modal::backdrop { background: var(--mt-color-overlay); backdrop-filter: var(--_blur, none); }
  :host([centered]) dialog.modal { margin: auto; }
  :host([full-screen]) dialog.modal {
    width: 100vw;
    height: 100dvh;
    max-width: 100vw;
    max-height: 100dvh;
    margin: 0;
    border-radius: 0;
  }

  .header { display: flex; align-items: center; justify-content: space-between; gap: var(--mt-spacing-md); padding: var(--_padding, var(--mt-spacing-md)); padding-bottom: 0; flex: 0 0 auto; }
  .header[hidden] { display: none; }
  .title { font-weight: 600; font-size: var(--mt-font-size-lg); }
  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 1.875rem;
    height: 1.875rem;
    padding: 0;
    border: 0;
    border-radius: var(--mt-radius-default);
    background: transparent;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .close:hover { background: var(--mt-color-hover); }
  .close:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .close[hidden] { display: none; }
  .body { padding: var(--_padding, var(--mt-spacing-md)); overflow-y: auto; }
  :host([full-screen]) .body { flex: 1 1 auto; }
`,Et=class extends C{static styles=[to];static props={...C.props,heading:{},size:{default:"md"},centered:{type:"boolean"},fullScreen:{type:"boolean"},padding:{css:"--_padding",scale:"spacing",default:"md"},radius:{css:"--_radius",scale:"radius"},shadow:{css:"--_shadow",scale:"shadow",default:"xl"},yOffset:{css:"--_y",scale:"raw",default:"5dvh"},overlayBlur:{}};template(){return p`
      <dialog class="modal" part="modal" aria-labelledby="title">
        <div class="header" part="header">
          <div class="title" part="title" id="title"><slot name="title"><span class="title-text"></span></slot></div>
          <button class="close" part="close-button" type="button" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="body" part="body"><slot></slot></div>
      </dialog>
    `}setup(){super.setup(),this.$('slot[name="title"]').addEventListener("slotchange",()=>this.#t())}update(t){super.update(t),(t.has("heading")||t.has("withCloseButton"))&&this.#t(),(t.has("size")||t.has("fullScreen"))&&(this.dialog.style.width=this.fullScreen?"":tt(this.size)),t.has("overlayBlur")&&this.dialog.style.setProperty("--_blur",this.overlayBlur?`blur(${this.overlayBlur}px)`:"none")}#t(){let t=this.$(".title-text");t&&(t.textContent=this.heading??"");let e=!!this.heading||this.$('slot[name="title"]').assignedNodes().length>0;this.$(".header").toggleAttribute("hidden",!e&&!this.withCloseButton)}};l("mt-modal",Et);J();var eo=n`
  :host { display: contents; }
  dialog.drawer {
    position: fixed;
    inset: 0 auto 0 0;
    margin: 0;
    padding: 0;
    border: 0;
    width: var(--_w, 23.75rem);
    max-width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    box-shadow: var(--_shadow, var(--mt-shadow-xl));
    overflow: hidden;
    transform: translateX(0);
    transition: transform var(--mt-transition);
  }
  dialog.drawer:not([open]) { display: none; }
  dialog.drawer::backdrop { background: var(--mt-color-overlay); }

  dialog.drawer.closing { transform: translateX(-100%); }
  @starting-style { dialog.drawer[open] { transform: translateX(-100%); } }

  :host([position='right']) dialog.drawer { inset: 0 0 0 auto; }
  :host([position='right']) dialog.drawer.closing { transform: translateX(100%); }
  @starting-style { :host([position='right']) dialog.drawer[open] { transform: translateX(100%); } }

  :host([position='top']) dialog.drawer { inset: 0 0 auto 0; width: 100vw; max-width: 100vw; height: var(--_w, 23.75rem); max-height: 100dvh; }
  :host([position='top']) dialog.drawer.closing { transform: translateY(-100%); }
  @starting-style { :host([position='top']) dialog.drawer[open] { transform: translateY(-100%); } }

  :host([position='bottom']) dialog.drawer { inset: auto 0 0 0; width: 100vw; max-width: 100vw; height: var(--_w, 23.75rem); max-height: 100dvh; }
  :host([position='bottom']) dialog.drawer.closing { transform: translateY(100%); }
  @starting-style { :host([position='bottom']) dialog.drawer[open] { transform: translateY(100%); } }

  .header { display: flex; align-items: center; justify-content: space-between; gap: var(--mt-spacing-md); padding: var(--mt-spacing-md); flex: 0 0 auto; }
  .header[hidden] { display: none; }
  .title { font-weight: 600; font-size: var(--mt-font-size-lg); }
  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 1.875rem;
    height: 1.875rem;
    padding: 0;
    border: 0;
    border-radius: var(--mt-radius-default);
    background: transparent;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .close:hover { background: var(--mt-color-hover); }
  .close:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .close[hidden] { display: none; }
  .body { padding: var(--mt-spacing-md); padding-top: 0; overflow-y: auto; flex: 1 1 auto; }
`,Lt=class extends C{static styles=[eo];static props={...C.props,heading:{},position:{default:"left"},size:{default:"md"}};template(){return p`
      <dialog class="drawer" part="drawer" aria-labelledby="title">
        <div class="header" part="header">
          <div class="title" part="title" id="title"><slot name="title"><span class="title-text"></span></slot></div>
          <button class="close" part="close-button" type="button" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="body" part="body"><slot></slot></div>
      </dialog>
    `}setup(){super.setup(),this.$('slot[name="title"]').addEventListener("slotchange",()=>this.#t())}update(t){super.update(t),(t.has("heading")||t.has("withCloseButton"))&&this.#t(),t.has("size")&&this.dialog.style.setProperty("--_w",tt(this.size))}#t(){let t=this.$(".title-text");t&&(t.textContent=this.heading??"");let e=!!this.heading||this.$('slot[name="title"]').assignedNodes().length>0;this.$(".header").toggleAttribute("hidden",!e&&!this.withCloseButton)}};l("mt-drawer",Lt);J();var io=n`
  :host { display: contents; }
  .tooltip {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0.3125rem 0.625rem;
    max-width: var(--_w, 13.75rem);
    width: var(--_w, max-content);
    border: 0;
    border-radius: var(--_radius, var(--mt-radius-sm));
    background: var(--_bg, var(--mt-color-tooltip));
    color: var(--_fg, var(--mt-color-tooltip-color));
    font-size: var(--mt-font-size-xs);
    line-height: 1.4;
    white-space: var(--_ws, nowrap);
    word-break: break-word;
    pointer-events: none;
    z-index: var(--mt-z-tooltip);
  }
  .tooltip:not(:popover-open) { display: none; }

  .arrow {
    display: none;
    position: absolute;
    width: var(--_arrow, 0.625rem);
    height: var(--_arrow, 0.625rem);
    background: inherit;
    transform: rotate(45deg);
  }
  :host([with-arrow]) .arrow { display: block; }
  .tooltip[data-placement^='top'] .arrow { bottom: calc(var(--_arrow, 0.625rem) / -2); left: calc(50% - var(--_arrow, 0.625rem) / 2); }
  .tooltip[data-placement^='bottom'] .arrow { top: calc(var(--_arrow, 0.625rem) / -2); left: calc(50% - var(--_arrow, 0.625rem) / 2); }
  .tooltip[data-placement^='left'] .arrow { right: calc(var(--_arrow, 0.625rem) / -2); top: calc(50% - var(--_arrow, 0.625rem) / 2); }
  .tooltip[data-placement^='right'] .arrow { left: calc(var(--_arrow, 0.625rem) / -2); top: calc(50% - var(--_arrow, 0.625rem) / 2); }
`,St=class extends c{static styles=[io];static props={label:{},position:{default:"top"},offset:{type:"number",default:5},withArrow:{type:"boolean"},arrowSize:{css:"--_arrow",scale:"rem",default:4},color:{},multiline:{type:"boolean"},w:{css:"--_w",scale:"rem"},openDelay:{type:"number",default:0},closeDelay:{type:"number",default:0},disabled:{type:"boolean"},opened:{type:"boolean"},radius:{css:"--_radius",scale:"radius",default:"sm"}};#t=null;#e=0;#i=z("mt-tt");#o=!1;template(){return p`
      <slot></slot>
      <div class="tooltip" part="tooltip" role="tooltip" popover="manual" id="tip">
        <slot name="label"></slot>
        <div class="arrow" part="arrow"></div>
      </div>
    `}get#a(){return this.querySelector(":scope > :not([slot])")}get#s(){return this.$(".tooltip")}setup(){this.addEventListener("mouseenter",()=>this.#d(!0),!0),this.addEventListener("mouseleave",()=>this.#d(!1),!0),this.addEventListener("focusin",()=>this.#d(!0)),this.addEventListener("focusout",()=>this.#d(!1)),this.$('slot[name="label"]').addEventListener("slotchange",()=>this.#n()),this.$("slot:not([name])").addEventListener("slotchange",()=>this.#r()),this.#r()}update(t){if(t.has("label")&&this.#n(),t.has("color")){let e=this.color?P(this.color):null;this.#s.style.setProperty("--_bg",e?e["--mt-c-filled"]:""),this.#s.style.setProperty("--_fg",e?"var(--mt-white)":"")}t.has("multiline")&&this.#s.style.setProperty("--_ws",this.multiline?"normal":"nowrap"),(t.has("opened")||t.has("disabled"))&&(this.disabled?this.#c():this.hasAttribute("opened")?this.#l():this.#c())}#r(){this.#n(),this.#h()}#n(){let t=this.$('slot[name="label"]'),e=t.assignedNodes().length>0?t.assignedElements().map(i=>i.textContent).join(""):this.label??"";if(t.assignedNodes().length===0){let i=this.$(".label-text");i||(i=document.createElement("span"),i.className="label-text",t.appendChild(i)),i.textContent=e}this.#h()}#h(){let t=this.#a;if(!t)return;let e=this.label??this.$('slot[name="label"]').assignedElements().map(o=>o.textContent).join(""),i=this.querySelector(":scope > [data-mt-tooltip-desc]");if(!e){i?.remove(),t.removeAttribute("aria-describedby");return}i||(i=document.createElement("span"),i.setAttribute("data-mt-tooltip-desc",""),i.setAttribute("slot","mt-tooltip-unused"),i.id=this.#i,i.hidden=!0,this.appendChild(i)),i.textContent=e,t.setAttribute("aria-describedby",this.#i)}#d(t){if(this.hasAttribute("opened")||this.disabled)return;clearTimeout(this.#e);let e=t?this.openDelay:this.closeDelay;this.#e=window.setTimeout(()=>t?this.#l():this.#c(),e)}#l(){if(this.#o||this.disabled)return;let t=this.#a;if(!t)return;this.#o=!0;let e=this.#s;e.showPopover(),this.#t?.(),this.#t=S(t,e,{placement:this.position,offset:this.offset})}#c(){this.#o&&(this.#o=!1,this.#t?.(),this.#t=null,this.#s.hidePopover())}};l("mt-tooltip",St);var et={withArrow:{type:"boolean"},arrowSize:{type:"number",default:7},arrowOffset:{type:"number",default:5},arrowPosition:{default:"side"}},it={transition:{default:"fade"},transitionDuration:{type:"number",default:150}};function ot(r){return r?getComputedStyle(r).display==="contents"?r.firstElementChild??r:r:null}var rt=n`
  .arrow {
    display: none;
    position: absolute;
    width: var(--_arrow, 0.4375rem);
    height: var(--_arrow, 0.4375rem);
    background: inherit;
    border: inherit;
    transform: rotate(45deg);
  }
  :host([with-arrow]) .arrow { display: block; }

  .dropdown[data-placement^='top'] .arrow { bottom: calc(var(--_arrow, 0.4375rem) / -2); border-top: 0; border-left: 0; }
  .dropdown[data-placement^='bottom'] .arrow { top: calc(var(--_arrow, 0.4375rem) / -2); border-bottom: 0; border-right: 0; }
  .dropdown[data-placement^='left'] .arrow { right: calc(var(--_arrow, 0.4375rem) / -2); border-bottom: 0; border-left: 0; }
  .dropdown[data-placement^='right'] .arrow { left: calc(var(--_arrow, 0.4375rem) / -2); border-top: 0; border-right: 0; }

  .dropdown[data-placement^='top'] .arrow, .dropdown[data-placement^='bottom'] .arrow { left: calc(50% - var(--_arrow, 0.4375rem) / 2); }
  .dropdown[data-placement^='left'] .arrow, .dropdown[data-placement^='right'] .arrow { top: calc(50% - var(--_arrow, 0.4375rem) / 2); }

  :host([arrow-position='side']) .dropdown[data-placement$='-start'] .arrow { left: var(--_arrow-offset, 0.3125rem); right: auto; }
  :host([arrow-position='side']) .dropdown[data-placement$='-end'] .arrow { left: auto; right: var(--_arrow-offset, 0.3125rem); }
  :host([arrow-position='side']) .dropdown[data-placement='left-start'] .arrow,
  :host([arrow-position='side']) .dropdown[data-placement='right-start'] .arrow { top: var(--_arrow-offset, 0.3125rem); bottom: auto; }
  :host([arrow-position='side']) .dropdown[data-placement='left-end'] .arrow,
  :host([arrow-position='side']) .dropdown[data-placement='right-end'] .arrow { top: auto; bottom: var(--_arrow-offset, 0.3125rem); }
`,st=n`
  .dropdown {
    opacity: 0;
    transition: opacity var(--_dur, 150ms) ease;
  }
  .dropdown:popover-open { opacity: 1; }
  .dropdown.closing { opacity: 0; }
  @starting-style { .dropdown:popover-open { opacity: 0; } }

  .dropdown[data-placement^='top'] { transform-origin: bottom; }
  .dropdown[data-placement^='bottom'] { transform-origin: top; }
  .dropdown[data-placement^='left'] { transform-origin: right; }
  .dropdown[data-placement^='right'] { transform-origin: left; }

  :host([transition='pop']) .dropdown { transform: scale(0.9); transition-property: opacity, transform; }
  :host([transition='pop']) .dropdown:popover-open { transform: scale(1); }
  :host([transition='pop']) .dropdown.closing { transform: scale(0.9); }
  @starting-style { :host([transition='pop']) .dropdown:popover-open { transform: scale(0.9); } }

  :host([transition='scale-y']) .dropdown { transform: scaleY(0); transition-property: opacity, transform; }
  :host([transition='scale-y']) .dropdown:popover-open { transform: scaleY(1); }
  :host([transition='scale-y']) .dropdown.closing { transform: scaleY(0); }
  @starting-style { :host([transition='scale-y']) .dropdown:popover-open { transform: scaleY(0); } }

  :host([transition='slide-down']) .dropdown { transform: translateY(-0.625rem); transition-property: opacity, transform; }
  :host([transition='slide-down']) .dropdown:popover-open { transform: translateY(0); }
  :host([transition='slide-down']) .dropdown.closing { transform: translateY(-0.625rem); }
  @starting-style { :host([transition='slide-down']) .dropdown:popover-open { transform: translateY(-0.625rem); } }

  .dropdown, :host([transition='pop']) .dropdown, :host([transition='scale-y']) .dropdown, :host([transition='slide-down']) .dropdown {
    transition-duration: var(--_dur, 150ms);
  }
`,H=class extends c{get box(){return this.$(".dropdown")}show(){let t=this.box;t.matches(":popover-open")||(t.classList.remove("closing"),t.showPopover())}hide(){let t=this.box;if(!t.matches(":popover-open"))return;t.classList.add("closing");let e=!1,i=s=>{s.target===t&&o()},o=()=>{e||(e=!0,t.removeEventListener("transitionend",i),t.classList.remove("closing"),t.hidePopover())};t.addEventListener("transitionend",i),setTimeout(o,250)}};var oo=n`
  :host { display: contents; }
  .dropdown {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: var(--mt-spacing-md);
    border: 1px solid var(--mt-color-border);
    border-radius: var(--mt-radius-default);
    background: var(--mt-color-dropdown);
    color: var(--mt-color-text);
    box-shadow: var(--mt-shadow-md);
    z-index: var(--mt-z-popover);
  }
`,At=class extends H{static styles=[oo,rt,st];template(){return p`<div class="dropdown" part="dropdown" popover="manual" role="dialog"><slot></slot><div class="arrow" part="arrow"></div></div>`}},ro=n`
  :host { display: contents; }
`,Tt=class extends c{static styles=[ro];static props={position:{default:"bottom"},offset:{type:"number",default:8},width:{},disabled:{type:"boolean"},opened:{type:"boolean"},closeOnClickOutside:{type:"boolean",default:!0},closeOnEscape:{type:"boolean",default:!0},...et,...it};#t=null;#e=null;#i=!1;#o=null;template(){return p`<slot name="target"></slot><slot></slot>`}get#a(){return ot(this.querySelector(':scope > [slot="target"]'))}get#s(){return this.querySelector(":scope > mt-popover-dropdown")}#r=()=>{this.disabled||(this.opened=!this.opened)};setup(){this.$('slot[name="target"]').addEventListener("slotchange",()=>this.#n()),this.#n()}#n(){let t=this.#a;t!==this.#o&&(this.#o?.removeEventListener("click",this.#r),t?.addEventListener("click",this.#r),this.#o=t)}update(t){(t.has("opened")||t.has("disabled"))&&(this.opened&&!this.disabled?this.#h():this.#d())}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}#h(){let t=this.#a,e=this.#s;!t||!e||this.#i||(this.#i=!0,e.toggleAttribute("with-arrow",this.withArrow),e.setAttribute("arrow-position",this.arrowPosition),e.setAttribute("transition",this.transition),e.box.style.setProperty("--_arrow",M(this.arrowSize)),e.box.style.setProperty("--_arrow-offset",M(this.arrowOffset)),e.box.style.setProperty("--_dur",`${this.transitionDuration}ms`),e.show(),this.width&&this.width!=="target"&&(e.box.style.width=A("rem",this.width)),this.#t=S(t,e.box,{placement:this.position,offset:this.offset,matchWidth:this.width==="target"}),this.#e=T([this,e],i=>{i==="outside"&&!this.closeOnClickOutside||i==="escape"&&!this.closeOnEscape||this.close()}),requestAnimationFrame(()=>{e.querySelector("a[href], button:not([disabled]), input:not([disabled]), [tabindex]")?.focus()}),this.emit("open"))}#d(){this.#i&&(this.#i=!1,this.#t?.(),this.#t=null,this.#e?.(),this.#e=null,this.#s?.hide(),this.emit("close"))}};l("mt-popover-dropdown",At);l("mt-popover",Tt);var Mt=class extends c{static styles=[n`:host { display: contents; }`]},so=n`
  :host { display: contents; }
  .dropdown {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: calc(var(--mt-spacing-xs) / 2);
    min-width: 10rem;
    border: 1px solid var(--mt-color-border);
    border-radius: var(--mt-radius-default);
    background: var(--mt-color-dropdown);
    color: var(--mt-color-text);
    box-shadow: var(--mt-shadow-md);
    z-index: var(--mt-z-dropdown);
  }
`,Pt=class extends H{static styles=[so,rt,st];template(){return p`<div class="dropdown" part="dropdown" popover="manual"><slot></slot><div class="arrow" part="arrow"></div></div>`}onConnect(){this.hasAttribute("role")||this.setAttribute("role","menu")}},ao=n`
  :host { display: block; }
  :host([hidden]) { display: none; }
  .control {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--mt-spacing-sm);
    padding: 0.5rem var(--mt-spacing-sm);
    border: 0;
    border-radius: calc(var(--mt-radius-default) - 0.0625rem);
    background: transparent;
    color: var(--_color, var(--mt-color-text));
    font: inherit;
    font-size: var(--mt-font-size-sm);
    text-align: start;
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .control:hover, :host(:focus-within) .control { background: var(--_hover, var(--mt-color-hover)); }
  :host([disabled]) .control { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .section { display: flex; align-items: center; flex: 0 0 auto; }
  .section:not(.filled) { display: none; }
  .label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`,Ct=class extends c{static styles=[ao];static shadowOptions={mode:"open",delegatesFocus:!0};static props={color:{},disabled:{type:"boolean"},href:{},target:{}};template(){return p`
      <button class="control" part="control" type="button">
        <span class="section left" part="left-section"><slot name="left-section"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="section right" part="right-section"><slot name="right-section"></slot></span>
      </button>
    `}onConnect(){this.hasAttribute("role")||this.setAttribute("role","menuitem"),this.tabIndex=-1}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.addEventListener("click",t=>{if(this.disabled){t.preventDefault();return}this.closest("mt-menu")?.handleItemClick(this)})}update(t){t.has("href")&&this.#t();let e=this.$(".control");if(e instanceof HTMLButtonElement?e.disabled=this.disabled:e.toggleAttribute("aria-disabled",this.disabled),this.toggleAttribute("aria-disabled",this.disabled),t.has("color")){let i=this.color?P(this.color):null;this.style.setProperty("--_color",i?i["--mt-c-text"]:""),this.style.setProperty("--_hover",i?i["--mt-c-light-hover"]:"")}t.has("target")&&(this.target?e.setAttribute("target",this.target):e.removeAttribute("target"))}get closeMenuOnClickOverride(){if(this.hasAttribute("close-menu-on-click"))return this.getAttribute("close-menu-on-click")!=="false"}focus(t){this.$(".control").focus(t)}#t(){let t=this.$(".control"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let i=document.createElement(e.toLowerCase());i.className=t.className,i.setAttribute("part","control"),e==="BUTTON"?i.setAttribute("type","button"):i.setAttribute("href",this.href??""),i.append(...t.childNodes),t.replaceWith(i)}},no=n`
  :host { display: block; padding: 0.25rem var(--mt-spacing-sm); font-size: var(--mt-font-size-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; color: var(--mt-color-dimmed); }
`,$t=class extends c{static styles=[no];onConnect(){this.hasAttribute("role")||this.setAttribute("role","presentation")}},lo=n`
  :host { display: block; margin: calc(var(--mt-spacing-xs) / 2) 0; border-top: 1px solid var(--mt-color-border); }
`,Ht=class extends c{static styles=[lo];onConnect(){this.hasAttribute("role")||this.setAttribute("role","separator")}},co=n`
  :host { display: contents; }
`,Dt=class extends c{static styles=[co];static props={trigger:{default:"click"},position:{default:"bottom"},offset:{type:"number",default:8},width:{},disabled:{type:"boolean"},opened:{type:"boolean"},closeOnItemClick:{type:"boolean",default:!0},loop:{type:"boolean",default:!0},...et,...it};#t=null;#e=null;#i=!1;#o=null;#a=0;template(){return p`<slot name="target"></slot><slot></slot>`}get#s(){return ot(this.querySelector(':scope > [slot="target"], :scope > mt-menu-target'))}get#r(){return this.querySelector(":scope > mt-menu-dropdown")}#n=()=>{this.disabled||this.trigger==="hover"||(this.opened=!this.opened)};#h=()=>{this.disabled||this.trigger==="click"||(clearTimeout(this.#a),this.opened=!0)};#d=t=>{if(this.disabled||this.trigger==="click")return;let e=t.relatedTarget;e&&(this.#s?.contains(e)||this.#r?.contains(e))||(clearTimeout(this.#a),this.#a=window.setTimeout(()=>this.opened=!1,100))};#l=t=>{let e=this.#r;if(!e)return;let i=Array.from(e.querySelectorAll("mt-menu-item"));if(i.length===0&&t.key!=="Escape"&&t.key!=="Tab")return;let o=i.indexOf(document.activeElement);switch(t.key){case"ArrowDown":t.preventDefault(),this.#c(i,o,1);break;case"ArrowUp":t.preventDefault(),this.#c(i,o,-1);break;case"Home":t.preventDefault(),i.find(s=>!s.disabled)?.focus();break;case"End":t.preventDefault(),[...i].reverse().find(s=>!s.disabled)?.focus();break;case"Escape":t.preventDefault(),this.close(),this.#s?.focus();break;case"Tab":this.close();break}};#c(t,e,i){let o=t.length,s=e;for(let a=0;a<o;a++){if(s+=i,s<0&&(s=this.loop?o-1:0),s>=o&&(s=this.loop?0:o-1),!t[s].disabled){t[s].focus();return}if(s===e)return}}setup(){this.$('slot[name="target"]').addEventListener("slotchange",()=>this.#p()),this.#p()}#p(){let t=this.#s;t!==this.#o&&(this.#o?.removeEventListener("click",this.#n),this.#o?.removeEventListener("mouseenter",this.#h),this.#o?.removeEventListener("mouseleave",this.#d),t?.addEventListener("click",this.#n),t?.addEventListener("mouseenter",this.#h),t?.addEventListener("mouseleave",this.#d),t&&(t.setAttribute("aria-haspopup","menu"),t.setAttribute("aria-expanded","false")),this.#o=t)}update(t){(t.has("opened")||t.has("disabled"))&&(this.opened&&!this.disabled?this.#u():this.#m())}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}handleItemClick(t){(t.closeMenuOnClickOverride??this.closeOnItemClick)&&(this.close(),this.#s?.focus())}#u(){let t=this.#s,e=this.#r;!t||!e||this.#i||(this.#i=!0,t.setAttribute("aria-expanded","true"),e.toggleAttribute("with-arrow",this.withArrow),e.setAttribute("arrow-position",this.arrowPosition),e.setAttribute("transition",this.transition),e.box.style.setProperty("--_arrow",M(this.arrowSize)),e.box.style.setProperty("--_arrow-offset",M(this.arrowOffset)),e.box.style.setProperty("--_dur",`${this.transitionDuration}ms`),e.show(),this.width&&this.width!=="target"&&(e.box.style.width=A("rem",this.width)),this.#t=S(t,e.box,{placement:this.position,offset:this.offset,matchWidth:this.width==="target"}),this.#e=T([this,e],i=>{i==="outside"&&this.close()}),document.addEventListener("keydown",this.#l),requestAnimationFrame(()=>{e.querySelector("mt-menu-item:not([disabled])")?.focus()}),this.emit("open"))}#m(){this.#i&&(this.#i=!1,this.#s?.setAttribute("aria-expanded","false"),this.#t?.(),this.#t=null,this.#e?.(),this.#e=null,document.removeEventListener("keydown",this.#l),this.#r?.hide(),this.emit("close"))}};l("mt-menu-target",Mt);l("mt-menu-dropdown",Pt);l("mt-menu-item",Ct);l("mt-menu-label",$t);l("mt-menu-divider",Ht);l("mt-menu",Dt);var ho=n`
  :host {
    display: block;
    animation: mt-notification-in var(--mt-transition) ease;
  }
  :host([data-leaving]) { animation: mt-notification-out var(--mt-transition) ease forwards; }
  @keyframes mt-notification-in { from { opacity: 0; transform: translateY(0.625rem) scale(0.9); } }
  @keyframes mt-notification-out { to { opacity: 0; transform: translateY(0.625rem) scale(0.9); } }

  .notification {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    gap: var(--mt-spacing-md);
    padding: var(--mt-spacing-md);
    padding-inline-start: calc(var(--mt-spacing-md) + 0.25rem);
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    border-radius: var(--_radius, var(--mt-radius-default));
    box-shadow: var(--mt-shadow-lg);
  }
  :host([with-border]) .notification { border: 1px solid var(--mt-color-border); }
  .notification::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 0.25rem;
    background: var(--_bar, var(--mt-color-primary-filled));
  }
  .icon {
    display: none;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--_icon-bg, light-dark(var(--mt-color-gray-1), var(--mt-color-dark-5)));
    color: var(--_icon-fg, var(--mt-color-dimmed));
  }
  .icon.visible { display: flex; }
  .spinner {
    display: none;
    width: 1.125rem;
    height: 1.125rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: mt-notification-spin 0.75s linear infinite;
  }
  :host([loading]) .spinner { display: block; }
  :host([loading]) .icon { display: flex; }
  @keyframes mt-notification-spin { to { transform: rotate(360deg); } }
  .body { flex: 1 1 auto; min-width: 0; }
  .title { font-weight: 600; font-size: var(--mt-font-size-sm); margin-bottom: 0.125rem; }
  .title:empty { display: none; }
  .message { font-size: var(--mt-font-size-sm); color: var(--mt-color-dimmed); }
  .close {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    border-radius: var(--mt-radius-default);
    background: transparent;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .close:hover { background: var(--mt-color-hover); }
  .close:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .close[hidden] { display: none; }
`,Ot=class extends c{static styles=[ho];static props={color:{},heading:{},loading:{type:"boolean"},withCloseButton:{type:"boolean",default:!0},withBorder:{type:"boolean"},radius:{css:"--_radius",scale:"radius"}};template(){return p`
      <div class="notification" part="notification" role="alert">
        <div class="icon" part="icon">
          <span class="spinner" part="spinner"></span>
          <slot name="icon"></slot>
        </div>
        <div class="body" part="body">
          <div class="title" part="title"><slot name="title"><span class="title-text"></span></slot></div>
          <div class="message" part="message"><slot></slot></div>
        </div>
        <button class="close" part="close-button" type="button" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
        </button>
      </div>
    `}setup(){this.$(".close").addEventListener("click",()=>this.close()),this.$('slot[name="icon"]').addEventListener("slotchange",()=>this.#t())}update(t){if(t.has("heading")){let e=this.$(".title-text");e&&(e.textContent=this.heading??"")}if(t.has("withCloseButton")&&this.$(".close").toggleAttribute("hidden",!this.withCloseButton),t.has("loading")&&this.#t(),t.has("color")){let e=this.$(".notification");if(this.color){let i=P(this.color);e.style.setProperty("--_bar",i["--mt-c-filled"]),e.style.setProperty("--_icon-bg",i["--mt-c-light"]),e.style.setProperty("--_icon-fg",i["--mt-c-filled"])}else e.style.removeProperty("--_bar"),e.style.removeProperty("--_icon-bg"),e.style.removeProperty("--_icon-fg")}}#t(){let t=this.$('slot[name="icon"]');this.$(".icon").classList.toggle("visible",this.loading||t.assignedNodes().length>0)}close(){if(this.hasAttribute("data-leaving"))return;this.setAttribute("data-leaving","");let t=!1,e=()=>{t||(t=!0,this.removeEventListener("animationend",e),this.emit("close"),this.remove())};this.addEventListener("animationend",e),setTimeout(e,250)}},po=n`
  :host {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: var(--mt-spacing-sm);
    padding: var(--mt-spacing-md);
    width: 25rem;
    max-width: calc(100vw - var(--mt-spacing-md) * 2);
    z-index: var(--mt-z-notification);
    pointer-events: none;
  }
  ::slotted(mt-notification) { pointer-events: all; }
  :host(:not([position])), :host([position='bottom-right']) { inset-block-end: 0; inset-inline-end: 0; }
  :host([position='bottom-left']) { inset-block-end: 0; inset-inline-start: 0; }
  :host([position='bottom-center']) { inset-block-end: 0; inset-inline: 0; margin-inline: auto; align-items: center; }
  :host([position='top-right']) { inset-block-start: 0; inset-inline-end: 0; flex-direction: column-reverse; }
  :host([position='top-left']) { inset-block-start: 0; inset-inline-start: 0; flex-direction: column-reverse; }
  :host([position='top-center']) { inset-block-start: 0; inset-inline: 0; margin-inline: auto; align-items: center; flex-direction: column-reverse; }
`,Nt=class extends c{static styles=[po];static props={position:{default:"bottom-right"},limit:{type:"number",default:5}};#t=new Map;#e=new Map;#i=new Map;template(){return p`<slot></slot>`}show(t){let e=t.id??z("mt-notif"),i=this.querySelector(`mt-notification[data-id="${e}"]`);if(i)return this.#o(i,t),this.#a(e,i,t.autoClose),e;let o=document.createElement("mt-notification");return o.setAttribute("data-id",e),this.#o(o,t),o.addEventListener("close",()=>this.#n(e),{once:!0}),o.addEventListener("mouseenter",()=>this.#r(e)),o.addEventListener("mouseleave",()=>this.#s(e,o)),this.appendChild(o),this.#h(),this.#a(e,o,t.autoClose),e}updateItem(t,e){let i=this.querySelector(`mt-notification[data-id="${t}"]`);i&&(this.#o(i,e),"autoClose"in e&&this.#a(t,i,e.autoClose))}hide(t){this.querySelector(`mt-notification[data-id="${t}"]`)?.close()}clean(){for(let t of Array.from(this.querySelectorAll("mt-notification")))t.close()}#o(t,e){if(e.title!==void 0&&t.setAttribute("heading",e.title),e.color!==void 0&&(e.color?t.setAttribute("color",e.color):t.removeAttribute("color")),e.loading!==void 0&&t.toggleAttribute("loading",!!e.loading),e.withCloseButton!==void 0&&t.setAttribute("with-close-button",e.withCloseButton?"":"false"),e.message!==void 0&&(t.textContent=e.message),e.icon!==void 0){let i=t.querySelector(':scope > [slot="icon"]');e.icon?(i||(i=document.createElement("span"),i.setAttribute("slot","icon"),t.appendChild(i)),i.innerHTML=e.icon):i?.remove()}}#a(t,e,i){clearTimeout(this.#t.get(t)),this.#t.delete(t);let o=i===void 0?4e3:i;if(o===!1){this.#e.delete(t);return}this.#e.set(t,o),this.#s(t,e)}#s(t,e){let i=this.#e.get(t);i!=null&&(this.#i.set(t,Date.now()),this.#t.set(t,window.setTimeout(()=>{this.#n(t),e.close()},i)))}#r(t){let e=this.#t.get(t);if(e==null)return;clearTimeout(e),this.#t.delete(t);let i=this.#i.get(t)??Date.now(),o=this.#e.get(t)??0;this.#e.set(t,Math.max(0,o-(Date.now()-i)))}#n(t){clearTimeout(this.#t.get(t)),this.#t.delete(t),this.#e.delete(t),this.#i.delete(t)}#h(){let t=Array.from(this.querySelectorAll("mt-notification"));for(;t.length>this.limit;)t.shift()?.close()}};function at(){let r=document.querySelector("mt-notifications");return r||(r=document.createElement("mt-notifications"),document.body.appendChild(r)),r}var V={show(r){return at().show(r)},update(r,t){at().updateItem(r,t)},hide(r){at().hide(r)},clean(){at().clean()}};document.addEventListener("mt-notify",r=>{let t=r.detail;t&&!Array.isArray(t)&&"value"in t&&Array.isArray(t.value)&&(t=t.value);for(let e of Array.isArray(t)?t:[t??{}])V.show(e)});l("mt-notification",Ot);l("mt-notifications",Nt);var uo=n`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    max-width: var(--_maxw);
    padding-inline: var(--mt-spacing-md);
    margin-inline: auto;
    --_maxw: 60rem;
  }
  :host([size='xs']) { --_maxw: 33.75rem; }
  :host([size='sm']) { --_maxw: 45rem; }
  :host([size='md']) { --_maxw: 60rem; }
  :host([size='lg']) { --_maxw: 71.25rem; }
  :host([size='xl']) { --_maxw: 82.5rem; }
  :host([fluid]) { --_maxw: 100%; }
  :host([centered='false']) { margin-inline: 0; }
`,It=class extends c{static styles=[uo];static props={size:{default:"md"},fluid:{type:"boolean"},centered:{type:"boolean",default:!0}};update(t){if(t.has("size")){let e=this.size;e&&!vt(e)?this.style.setProperty("--_maxw",A("rem",e)):this.style.removeProperty("--_maxw")}}};l("mt-container",It);var mo=n`
  :host {
    --_gap: var(--mt-spacing-md);
    --_justify: flex-start;
    --_align: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--_gap);
    justify-content: var(--_justify);
    align-items: var(--_align);
  }
  :host([wrap='nowrap']) { flex-wrap: nowrap; }
  :host([grow]) ::slotted(*) { flex-grow: 1; flex-basis: 0; min-width: fit-content; }
  :host([grow][prevent-grow-overflow='false']) ::slotted(*) { flex-basis: auto; }
`,Ft=class extends c{static styles=[mo];static props={gap:{css:"--_gap",scale:"spacing",default:"md"},justify:{css:"--_justify",default:"flex-start"},align:{css:"--_align",default:"center"},wrap:{default:"wrap"},grow:{type:"boolean"},preventGrowOverflow:{type:"boolean",default:!0}}};l("mt-group",Ft);var fo=n`
  :host {
    --_gap: var(--mt-spacing-md);
    --_align: stretch;
    --_justify: flex-start;
    display: flex;
    flex-direction: column;
    row-gap: var(--_gap);
    align-items: var(--_align);
    justify-content: var(--_justify);
  }
`,Rt=class extends c{static styles=[fo];static props={gap:{css:"--_gap",scale:"spacing",default:"md"},align:{css:"--_align",default:"stretch"},justify:{css:"--_justify",default:"flex-start"}}};l("mt-stack",Rt);var vo=n`
  :host {
    display: block;
    --_cols: 12;
    --_gutter: var(--mt-spacing-md);
    --_justify: flex-start;
    --_align: stretch;
    --_colgrow: 0;
  }
  :host([grow]) { --_colgrow: 1; }
  .inner {
    display: flex;
    flex-wrap: wrap;
    margin: calc(var(--_gutter) / -2);
    justify-content: var(--_justify);
    align-items: var(--_align);
  }
`,Bt=class extends c{static styles=[vo];static props={columns:{css:"--_cols",type:"number",default:12},gutter:{css:"--_gutter",scale:"spacing",default:"md"},justify:{css:"--_justify",default:"flex-start"},align:{css:"--_align",default:"stretch"},grow:{type:"boolean"}};template(){return'<div class="inner" part="inner"><slot></slot></div>'}},bo=[["xs","36em"],["sm","48em"],["md","62em"],["lg","75em"],["xl","88em"]],$i=(r,t)=>bo.map(([e,i])=>`@media (min-width: ${i}) { :host([${r}-${e}]) { ${t}: var(--_${r}-${e}); } }`).join(`
`),go=n`
  :host {
    display: block;
    box-sizing: border-box;
    --_span: 12;
    --_offset: 0;
    --_order: 0;
    width: calc(100% / var(--_cols, 12) * var(--_span));
    padding: calc(var(--_gutter, var(--mt-spacing-md)) / 2);
    margin-inline-start: calc(100% / var(--_cols, 12) * var(--_offset));
    order: var(--_order);
    flex-grow: var(--_colgrow, 0);
    flex-shrink: 0;
  }
  :host([span='auto']), :host([span='content']) { width: auto; flex: 0 0 auto; }
  :host([span='content']) { white-space: nowrap; }
  ${$i("span","--_span")}
  ${$i("offset","--_offset")}
`,jt=class extends c{static styles=[go];static props={span:{css:"--_span",default:12},offset:{css:"--_offset",type:"number",default:0},order:{css:"--_order",type:"number",default:0},spanXs:{attr:"span-xs",css:"--_span-xs",type:"number"},spanSm:{attr:"span-sm",css:"--_span-sm",type:"number"},spanMd:{attr:"span-md",css:"--_span-md",type:"number"},spanLg:{attr:"span-lg",css:"--_span-lg",type:"number"},spanXl:{attr:"span-xl",css:"--_span-xl",type:"number"},offsetXs:{attr:"offset-xs",css:"--_offset-xs",type:"number"},offsetSm:{attr:"offset-sm",css:"--_offset-sm",type:"number"},offsetMd:{attr:"offset-md",css:"--_offset-md",type:"number"},offsetLg:{attr:"offset-lg",css:"--_offset-lg",type:"number"},offsetXl:{attr:"offset-xl",css:"--_offset-xl",type:"number"}}};l("mt-grid",Bt);l("mt-grid-col",jt);var yo=[["xs","36em"],["sm","48em"],["md","62em"],["lg","75em"],["xl","88em"]],qt=(r,t)=>yo.map(([e,i])=>`@media (min-width: ${i}) { :host([${r}-${e}]) { ${t}: var(--_${r}-${e}); } }`).join(`
`),xo=n`
  :host {
    --_cols: 1;
    --_spacing: var(--mt-spacing-md);
    --_vspacing: var(--_spacing);
    display: grid;
    grid-template-columns: repeat(var(--_cols), minmax(0, 1fr));
    column-gap: var(--_spacing);
    row-gap: var(--_vspacing);
  }
  ${qt("cols","--_cols")}
  ${qt("spacing","--_spacing")}
  ${qt("vertical-spacing","--_vspacing")}
`,Vt=class extends c{static styles=[xo];static props={cols:{css:"--_cols",type:"number",default:1},spacing:{css:"--_spacing",scale:"spacing",default:"md"},verticalSpacing:{css:"--_vspacing",scale:"spacing"},colsXs:{attr:"cols-xs",css:"--_cols-xs",type:"number"},colsSm:{attr:"cols-sm",css:"--_cols-sm",type:"number"},colsMd:{attr:"cols-md",css:"--_cols-md",type:"number"},colsLg:{attr:"cols-lg",css:"--_cols-lg",type:"number"},colsXl:{attr:"cols-xl",css:"--_cols-xl",type:"number"},spacingXs:{attr:"spacing-xs",css:"--_spacing-xs",scale:"spacing"},spacingSm:{attr:"spacing-sm",css:"--_spacing-sm",scale:"spacing"},spacingMd:{attr:"spacing-md",css:"--_spacing-md",scale:"spacing"},spacingLg:{attr:"spacing-lg",css:"--_spacing-lg",scale:"spacing"},spacingXl:{attr:"spacing-xl",css:"--_spacing-xl",scale:"spacing"},verticalSpacingXs:{attr:"vertical-spacing-xs",css:"--_vertical-spacing-xs",scale:"spacing"},verticalSpacingSm:{attr:"vertical-spacing-sm",css:"--_vertical-spacing-sm",scale:"spacing"},verticalSpacingMd:{attr:"vertical-spacing-md",css:"--_vertical-spacing-md",scale:"spacing"},verticalSpacingLg:{attr:"vertical-spacing-lg",css:"--_vertical-spacing-lg",scale:"spacing"},verticalSpacingXl:{attr:"vertical-spacing-xl",css:"--_vertical-spacing-xl",scale:"spacing"}}};l("mt-simple-grid",Vt);var wo=n`
  :host { display: flex; align-items: center; justify-content: center; }
  :host([inline]) { display: inline-flex; }
`,Wt=class extends c{static styles=[wo];static props={inline:{type:"boolean"}}};l("mt-center",Wt);var _o=n`
  :host { display: block; flex-shrink: 0; width: var(--_w, auto); height: var(--_h, auto); }
`,Xt=class extends c{static styles=[_o];static props={w:{css:"--_w",scale:"spacing"},h:{css:"--_h",scale:"spacing"}}};l("mt-space",Xt);var ko=n`
  :host {
    display: block;
    --_size: 1px;
    --_color: var(--mt-color-border);
  }
  :host([size='xs']) { --_size: 1px; }
  :host([size='sm']) { --_size: 2px; }
  :host([size='md']) { --_size: 3px; }
  :host([size='lg']) { --_size: 4px; }
  :host([size='xl']) { --_size: 5px; }

  .root { display: flex; align-items: center; }
  .line { flex: 1; border-top: var(--_size) solid var(--_color); }
  :host([variant='dashed']) .line { border-top-style: dashed; }
  :host([variant='dotted']) .line { border-top-style: dotted; }
  .label {
    display: none;
    padding-inline: var(--mt-spacing-xs);
    font-size: var(--mt-font-size-sm);
    color: var(--mt-color-dimmed);
    white-space: nowrap;
  }
  :host([data-has-label]) .label { display: inline-block; }
  :host([label-position='left']) .line.before { flex: 0 0 var(--mt-spacing-xl); }
  :host([label-position='right']) .line.after { flex: 0 0 var(--mt-spacing-xl); }

  :host([orientation='vertical']) { display: inline-block; align-self: stretch; height: auto; }
  :host([orientation='vertical']) .root { flex-direction: column; height: 100%; }
  :host([orientation='vertical']) .line { border-top: none; border-left: var(--_size) solid var(--_color); }
  :host([orientation='vertical']) .label { padding-inline: 0; padding-block: var(--mt-spacing-xs); }
`,Ut=class extends c{static styles=[ko];static props={orientation:{default:"horizontal"},size:{default:"xs"},color:{css:"--_color",scale:"color"},variant:{default:"solid"},label:{},labelPosition:{attr:"label-position",default:"center"}};template(){return'<div class="root" part="root" role="separator"><div class="line before"></div><span class="label" part="label"><slot name="label"></slot></span><div class="line after"></div></div>'}setup(){this.$('slot[name="label"]').addEventListener("slotchange",()=>this.#t())}update(t){if(t.has("orientation")&&this.setAttribute("aria-orientation",this.orientation),t.has("label")){let e=this.$('slot[name="label"]');e.assignedNodes().length===0&&(e.textContent=this.label??"")}this.#t()}#t(){this.$('slot[name="label"]').assignedNodes().length>0||!!this.label?this.setAttribute("data-has-label",""):this.removeAttribute("data-has-label")}};l("mt-divider",Ut);var zo=n`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --_size: 2.125rem;
    --_radius: var(--mt-radius-default);
    --_bg: var(--mt-c-filled);
    --_hover: var(--mt-c-filled-hover);
    --_color: var(--mt-white);
    --_bd: transparent;
  }
  :host([size='xs']) { --_size: 1.375rem; }
  :host([size='sm']) { --_size: 1.75rem; }
  :host([size='md']) { --_size: 2.125rem; }
  :host([size='lg']) { --_size: 2.75rem; }
  :host([size='xl']) { --_size: 3.75rem; }
  :host([size='input-xs']) { --_size: 1.875rem; }
  :host([size='input-sm']) { --_size: 2.25rem; }
  :host([size='input-md']) { --_size: 2.625rem; }
  :host([size='input-lg']) { --_size: 3.125rem; }
  :host([size='input-xl']) { --_size: 3.75rem; }

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
    width: var(--_size);
    height: var(--_size);
    flex: 0 0 auto;
    padding: 0;
    font: inherit;
    color: var(--_color);
    text-decoration: none;
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
    cursor: pointer;
    user-select: none;
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

  .inner { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
  ::slotted(*) { width: 60%; height: 60%; }
  :host([loading]) .inner { opacity: 0; }

  .loader {
    display: none;
    position: absolute;
    inset: 0;
    margin: auto;
    width: calc(var(--_size) / 2);
    height: calc(var(--_size) / 2);
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  :host([loading]) .loader { display: block; }
  @keyframes spin { to { transform: rotate(360deg); } }
`,Yt=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[zo];static props={variant:{default:"filled"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius"},disabled:{type:"boolean"},loading:{type:"boolean"},type:{default:"button"},href:{},target:{},ariaLabel:{attr:"aria-label"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};internals=this.attachInternals();template(){return p`
      <button class="root" part="root" type="button">
        <span class="inner" part="inner"><slot></slot></span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `}setup(){this.addEventListener("click",t=>{if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}let e=this.internals.form;e&&(this.type==="submit"?e.requestSubmit():this.type==="reset"&&e.reset())})}update(t){t.has("href")&&this.#t();let e=this.$(".root"),i=this.disabled||this.loading;if(e instanceof HTMLButtonElement)e.disabled=i;else{e.setAttribute("href",this.href??"");let o=this.getAttribute("target");o?e.setAttribute("target",o):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",i),e.tabIndex=i?-1:0,this.toggleAttribute("data-disabled",i)}if(e.toggleAttribute("aria-busy",this.loading),this.ariaLabel?e.setAttribute("aria-label",this.ariaLabel):e.removeAttribute("aria-label"),t.has("size")){let o=this.getAttribute("size");o&&/^\d+(\.\d+)?$/.test(o)?this.style.setProperty("--_size",M(parseFloat(o))):this.style.removeProperty("--_size")}}#t(){let t=this.$(".root"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let i=document.createElement(e.toLowerCase());i.className=t.className,i.setAttribute("part","root"),e==="BUTTON"&&i.setAttribute("type","button"),i.append(...t.childNodes),t.replaceWith(i)}},Eo=n`
  :host { display: inline-flex; flex-direction: row; }
  :host([orientation='vertical']) { flex-direction: column; }
`,Kt=class extends c{static styles=[Eo];static props={orientation:{default:"horizontal"}};onConnect(){this.#t(),this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t())}update(){this.#t()}#t(){let t=this.getAttribute("orientation")==="vertical",e=[...this.children].filter(i=>i instanceof HTMLElement);e.forEach((i,o)=>{let s=o===0,a=o===e.length-1,d="var(--mt-radius-default)",h=t?`${s?d:0} ${s?d:0} ${a?d:0} ${a?d:0}`:`${s?d:0} ${a?d:0} ${a?d:0} ${s?d:0}`;i.style.setProperty("--_radius",h),i.style.setProperty(t?"margin-top":"margin-left",s?"0":"-1px")})}};l("mt-action-icon",Yt);l("mt-action-icon-group",Kt);var Lo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="1rem" height="1rem"><path d="M18 6 6 18M6 6l12 12"/></svg>',So=n`
  :host {
    display: block;
    --_bg: var(--mt-c-light);
    --_color: var(--mt-c-light-color);
    --_bd: transparent;
  }
  :host([variant='filled']) { --_bg: var(--mt-c-filled); --_color: var(--mt-white); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='default']) { --_bg: var(--mt-color-body); --_color: var(--mt-color-text); --_bd: var(--mt-color-border); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }

  .root {
    position: relative;
    display: flex;
    gap: var(--mt-spacing-sm);
    padding: var(--mt-spacing-md);
    background: var(--_bg);
    color: var(--_color);
    border: 1px solid var(--_bd);
    border-radius: var(--mt-radius-default);
  }
  .icon { display: none; flex: 0 0 auto; width: 1.25rem; height: 1.25rem; }
  .icon.filled { display: flex; align-items: center; }
  .body { flex: 1; min-width: 0; }
  .heading { margin: 0 0 0.25rem; font-weight: 700; font-size: var(--mt-font-size-md); line-height: 1.4; }
  .heading[hidden] { display: none; }
  .message { font-size: var(--mt-font-size-sm); line-height: var(--mt-line-height-sm); }
  .close {
    flex: 0 0 auto;
    display: none;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    margin-inline-start: auto;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: var(--mt-radius-default);
    cursor: pointer;
  }
  .close:hover { background: color-mix(in srgb, currentColor 12%, transparent); }
  .close:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([with-close-button]) .close { display: flex; }
`,Gt=class extends c{static styles=[So];static props={variant:{default:"light"},color:{color:!0},heading:{},withCloseButton:{type:"boolean"},closeButtonLabel:{default:"Close alert"}};template(){return p`
      <div class="root" part="root" role="alert">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <div class="body" part="body">
          <p class="heading" part="heading" hidden></p>
          <div class="message" part="message"><slot></slot></div>
        </div>
        <button class="close" part="close-button" type="button" aria-label="Close alert"></button>
      </div>
    `}setup(){let t=this.$(".icon slot"),e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e(),this.$(".close").innerHTML=Lo,this.$(".close").addEventListener("click",()=>{this.emit("close")&&(this.hidden=!0)})}update(t){if(t.has("heading")){let e=this.$(".heading");e.textContent=this.heading??"",e.hidden=!this.heading}t.has("closeButtonLabel")&&this.$(".close").setAttribute("aria-label",this.closeButtonLabel)}};l("mt-alert",Gt);var Ao='<svg viewBox="0 0 24 24" fill="currentColor" width="60%" height="60%"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-9 2.2-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.8-4.6-5-9-5Z"/></svg>',To=n`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --_size: 2.375rem;
    --_radius: 1000px;
    --_bg: var(--mt-c-light);
    --_color: var(--mt-c-light-color);
  }
  :host([size='xs']) { --_size: 1rem; }
  :host([size='sm']) { --_size: 1.625rem; }
  :host([size='md']) { --_size: 2.375rem; }
  :host([size='lg']) { --_size: 3.5rem; }
  :host([size='xl']) { --_size: 5.25rem; }

  :host([variant='filled']) { --_bg: var(--mt-c-filled); --_color: var(--mt-white); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_color: var(--mt-white); }

  .root {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    flex: 0 0 auto;
    overflow: hidden;
    background: var(--_bg);
    color: var(--_color);
    border: 1px solid transparent;
    border-radius: var(--_radius);
    font-size: calc(var(--_size) * 0.4);
    font-weight: 600;
    line-height: 1;
    user-select: none;
  }
  :host([variant='outline']) .root { border-color: var(--mt-c-outline); }

  .image { display: block; width: 100%; height: 100%; object-fit: cover; }
  .initials, .icon { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
  [hidden] { display: none !important; }
`;function Mo(r){let t=r.trim().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}var Zt=class extends c{static styles=[To];static props={src:{},alt:{},name:{},color:{color:!0},variant:{default:"light"},size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"1000px"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};#t=!1;template(){return p`
      <span class="root" part="root">
        <img class="image" part="image" hidden alt="" />
        <span class="initials" part="initials" hidden></span>
        <span class="icon" part="icon" aria-hidden="true" hidden><slot name="placeholder">${Ao}</slot></span>
      </span>
    `}get#e(){return this.$(".image")}setup(){this.#e.addEventListener("error",()=>{this.#t=!0,this.#i()}),this.#e.addEventListener("load",()=>{this.#t=!1,this.#i()})}update(t){t.has("src")&&(this.#t=!1,this.#e.src=this.src??""),(t.has("alt")||t.has("name"))&&(this.#e.alt=this.alt??this.name??""),this.#i()}#i(){let t=!!this.src&&!this.#t,e=this.name?Mo(this.name):"",i=this.$(".initials");this.#e.hidden=!t,i.hidden=t||!e,i.textContent=e,this.$(".icon").hidden=t||!!e}},Po=n`
  :host { display: inline-flex; --_overlap: var(--mt-spacing-sm); }
  ::slotted(mt-avatar) {
    margin-inline-start: calc(var(--_overlap) * -1);
    box-shadow: 0 0 0 2px var(--mt-color-body);
  }
  ::slotted(mt-avatar:first-child) { margin-inline-start: 0; }
`,Qt=class extends c{static styles=[Po];static props={spacing:{css:"--_overlap",scale:"spacing",default:"sm"}}};l("mt-avatar",Zt);l("mt-avatar-group",Qt);var Co=n`
  :host {
    display: inline-flex;
    vertical-align: middle;
    max-width: 100%;
    --_h: 1.25rem;
    --_fz: var(--mt-font-size-xs);
    --_px: 0.6875rem;
    --_radius: var(--mt-radius-xl);
    --_bg: var(--mt-c-filled);
    --_color: var(--mt-white);
    --_bd: transparent;
  }
  :host([size='xs']) { --_h: 1rem; --_fz: 0.5625rem; --_px: 0.4375rem; }
  :host([size='sm']) { --_h: 1.125rem; --_fz: 0.625rem; --_px: 0.5rem; }
  :host([size='md']) { --_h: 1.25rem; --_fz: 0.6875rem; --_px: 0.6875rem; }
  :host([size='lg']) { --_h: 1.625rem; --_fz: 0.8125rem; --_px: 0.875rem; }
  :host([size='xl']) { --_h: 2rem; --_fz: 1rem; --_px: 1.0625rem; }
  :host([full-width]) { display: flex; }
  :host([circle]) { --_px: 0; border-radius: 50%; }

  :host([variant='light']) { --_bg: var(--mt-c-light); --_color: var(--mt-c-light-color); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='default']) { --_bg: var(--mt-color-default); --_color: var(--mt-color-default-color); --_bd: var(--mt-color-default-border); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }
  :host([variant='dot']) { --_bg: transparent; --_color: var(--mt-color-text); --_bd: var(--mt-color-border); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_color: var(--mt-white); }

  .root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--_h);
    padding-inline: var(--_px);
    font-size: var(--_fz);
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    white-space: nowrap;
    color: var(--_color);
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
    overflow: hidden;
  }
  :host([circle]) .root { width: var(--_h); padding: 0; border-radius: 50%; }

  .label { overflow: hidden; text-overflow: ellipsis; }
  .dot { display: none; flex: 0 0 auto; width: 0.5em; height: 0.5em; margin-inline-end: 0.4em; border-radius: 50%; background: var(--mt-c-filled); }
  :host([variant='dot']) .dot { display: block; }

  .section { display: flex; align-items: center; }
  .section:not(.filled) { display: none; }
  .section.left { margin-inline-end: 0.25rem; }
  .section.right { margin-inline-start: 0.25rem; }
`,Jt=class extends c{static styles=[Co];static props={variant:{default:"filled"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius"},fullWidth:{type:"boolean"},circle:{type:"boolean"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};template(){return p`
      <span class="root" part="root">
        <span class="dot" part="dot" aria-hidden="true"></span>
        <span class="section left" part="left-section"><slot name="left-section"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="section right" part="right-section"><slot name="right-section"></slot></span>
      </span>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}}};l("mt-badge",Jt);var $o=n`
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
`,te=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[$o];static props={variant:{default:"filled"},color:{color:!0},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"},fullWidth:{type:"boolean"},disabled:{type:"boolean"},loading:{type:"boolean"},justify:{css:"--_justify"},type:{default:"button"},href:{},target:{},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};internals=this.attachInternals();template(){return p`
      <button class="root" part="root" type="button">
        <span class="inner">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="label" part="label"><slot></slot></span>
          <span class="section right" part="right-section"><slot name="right-section"></slot></span>
        </span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.addEventListener("click",t=>{if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}let e=this.internals.form;e&&(this.type==="submit"?e.requestSubmit():this.type==="reset"&&e.reset())})}update(t){t.has("href")&&this.#t();let e=this.$(".root"),i=this.disabled||this.loading;if(e instanceof HTMLButtonElement)e.disabled=i;else{e.setAttribute("href",this.href??"");let o=this.getAttribute("target");o?e.setAttribute("target",o):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",i),e.tabIndex=i?-1:0,this.toggleAttribute("data-disabled",i)}e.toggleAttribute("aria-busy",this.loading)}#t(){let t=this.$(".root"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let i=document.createElement(e.toLowerCase());i.className=t.className,i.setAttribute("part","root"),e==="BUTTON"&&i.setAttribute("type","button"),i.append(...t.childNodes),t.replaceWith(i)}},Ho=n`
  :host { display: inline-flex; flex-direction: row; }
  :host([orientation='vertical']) { flex-direction: column; }
`,ee=class extends c{static styles=[Ho];static props={orientation:{default:"horizontal"}};onConnect(){this.#t(),this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t())}update(){this.#t()}#t(){let t=this.getAttribute("orientation")==="vertical",e=[...this.children].filter(i=>i instanceof HTMLElement);e.forEach((i,o)=>{let s=o===0,a=o===e.length-1,d="var(--mt-radius-default)",h=t?`${s?d:0} ${s?d:0} ${a?d:0} ${a?d:0}`:`${s?d:0} ${a?d:0} ${a?d:0} ${s?d:0}`;i.style.setProperty("--_radius",h),i.style.setProperty(t?"margin-top":"margin-left",s?"0":"-1px")})}};l("mt-button",te);l("mt-button-group",ee);var Do=n`
  :host {
    display: block;
    --_card-padding: var(--mt-spacing-md);
    --_radius: var(--mt-radius-default);
    padding: var(--_card-padding);
    background: var(--mt-color-body);
    border-radius: var(--_radius);
    overflow: hidden;
  }
  :host([shadow]) { box-shadow: var(--_shadow); }
  :host([with-border]) { border: 1px solid var(--mt-color-border); }
`,ie=class extends c{static styles=[Do];static props={padding:{css:"--_card-padding",scale:"spacing",default:"md"},shadow:{css:"--_shadow",scale:"shadow"},radius:{css:"--_radius",scale:"radius"},withBorder:{type:"boolean"}}},Oo=n`
  :host {
    display: block;
    margin-inline: calc(var(--_card-padding, 0px) * -1);
  }
  :host(:first-child) { margin-top: calc(var(--_card-padding, 0px) * -1); }
  :host(:last-child) { margin-bottom: calc(var(--_card-padding, 0px) * -1); }
  :host([with-border]) {
    border-top: 1px solid var(--mt-color-border);
    border-bottom: 1px solid var(--mt-color-border);
  }
  :host([inherit-padding]) { padding-inline: var(--_card-padding, 0px); }
`,oe=class extends c{static styles=[Oo];static props={withBorder:{type:"boolean"},inheritPadding:{type:"boolean"}}};l("mt-card",ie);l("mt-card-section",oe);var No=n`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --_size: 2.25rem;
    --_color: var(--mt-color-primary-text);
    width: var(--_size);
    height: var(--_size);
    color: var(--_color);
  }
  :host([size='xs']) { --_size: 1.125rem; }
  :host([size='sm']) { --_size: 1.375rem; }
  :host([size='md']) { --_size: 2.25rem; }
  :host([size='lg']) { --_size: 2.75rem; }
  :host([size='xl']) { --_size: 3.625rem; }

  .oval, .bars, .dots { display: none; }
  :host(:not([type])) .oval, :host([type='oval']) .oval { display: block; }
  :host([type='bars']) .bars { display: flex; }
  :host([type='dots']) .dots { display: flex; }

  .oval {
    width: var(--_size);
    height: var(--_size);
    border: 0.1875em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: mt-loader-spin 0.8s linear infinite;
  }

  .bars { align-items: center; gap: calc(var(--_size) * 0.12); width: var(--_size); height: var(--_size); }
  .bars span {
    width: calc(var(--_size) * 0.18);
    height: 100%;
    background: currentColor;
    animation: mt-loader-bounce 1s ease-in-out infinite;
  }
  .bars span:nth-child(2) { animation-delay: 0.1s; }
  .bars span:nth-child(3) { animation-delay: 0.2s; }

  .dots { align-items: center; gap: calc(var(--_size) * 0.15); width: var(--_size); height: var(--_size); }
  .dots span {
    width: calc(var(--_size) * 0.25);
    height: calc(var(--_size) * 0.25);
    border-radius: 50%;
    background: currentColor;
    animation: mt-loader-fade 1s ease-in-out infinite;
  }
  .dots span:nth-child(2) { animation-delay: 0.15s; }
  .dots span:nth-child(3) { animation-delay: 0.3s; }

  @keyframes mt-loader-spin { to { transform: rotate(360deg); } }
  @keyframes mt-loader-bounce { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
  @keyframes mt-loader-fade { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
`,re=class extends c{static styles=[No];static props={type:{default:"oval"},color:{css:"--_color",scale:"color"},size:{default:"md"}};template(){return p`
      <span class="oval" part="oval" role="status" aria-label="Loading"></span>
      <span class="bars" part="bars" role="status" aria-label="Loading"><span></span><span></span><span></span></span>
      <span class="dots" part="dots" role="status" aria-label="Loading"><span></span><span></span><span></span></span>
    `}};l("mt-loader",re);var Io=n`
  :host {
    display: block;
    --_radius: var(--mt-radius-default);
    background: var(--mt-color-body);
    border-radius: var(--_radius);
  }
  :host([shadow]) { box-shadow: var(--_shadow); }
  :host([with-border]) { border: 1px solid var(--mt-color-border); }
`,se=class extends c{static styles=[Io];static props={shadow:{css:"--_shadow",scale:"shadow"},radius:{css:"--_radius",scale:"radius"},withBorder:{type:"boolean"}}};l("mt-paper",se);var Fo=n`
  :host {
    display: block;
    --_fz: var(--mt-font-size-sm);
    --_lh: var(--mt-line-height-sm);
    font-size: var(--_fz);
    line-height: var(--_lh);
    color: var(--mt-color-text);
  }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_lh: var(--mt-line-height-xs); }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_lh: var(--mt-line-height-md); }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_lh: var(--mt-line-height-lg); }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_lh: var(--mt-line-height-xl); }
  :host([span]) { display: inline; }
  :host([inherit]) { font-size: inherit; line-height: inherit; font-family: inherit; font-weight: inherit; }

  .root {
    display: block;
    color: var(--_color, inherit);
    font-weight: var(--_fw, inherit);
    font-style: var(--_fs, inherit);
    text-decoration: var(--_td, inherit);
    text-transform: var(--_tt, inherit);
    text-align: var(--_ta, inherit);
  }
  :host([span]) .root { display: inline; }

  :host([truncate]) .root, :host([truncate='end']) .root {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :host([truncate='start']) .root {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
    text-align: left;
  }
  :host([line-clamp]) .root {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--_clamp, 3);
    overflow: hidden;
  }

  :host([variant='gradient']) .root {
    background: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`,ae=class extends c{static styles=[Fo];static props={size:{default:"sm"},c:{css:"--_color",scale:"color"},fw:{css:"--_fw",type:"number"},fs:{css:"--_fs"},td:{css:"--_td"},tt:{css:"--_tt"},ta:{css:"--_ta"},truncate:{},lineClamp:{css:"--_clamp",type:"number"},inherit:{type:"boolean"},span:{type:"boolean"},variant:{},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};template(){return p`<span class="root" part="root"><slot></slot></span>`}};l("mt-text",ae);var Ro=n`
  :host {
    display: block;
    --_fz: var(--mt-h1-font-size);
    --_lh: var(--mt-h1-line-height);
    font-family: var(--mt-font-family-headings);
    font-weight: var(--mt-heading-font-weight);
    color: var(--mt-color-text);
  }
  :host([order='2']) { --_fz: var(--mt-h2-font-size); --_lh: var(--mt-h2-line-height); }
  :host([order='3']) { --_fz: var(--mt-h3-font-size); --_lh: var(--mt-h3-line-height); }
  :host([order='4']) { --_fz: var(--mt-h4-font-size); --_lh: var(--mt-h4-line-height); }
  :host([order='5']) { --_fz: var(--mt-h5-font-size); --_lh: var(--mt-h5-line-height); }
  :host([order='6']) { --_fz: var(--mt-h6-font-size); --_lh: var(--mt-h6-line-height); }

  .root {
    margin: 0;
    font: inherit;
    font-size: var(--_fz);
    line-height: var(--_lh);
    color: var(--_color, inherit);
    text-align: var(--_ta, inherit);
    text-wrap: var(--_text-wrap, balance);
  }
  :host([line-clamp]) .root {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--_clamp, 3);
    overflow: hidden;
  }
`,Hi={h1:"--mt-h1-font-size",h2:"--mt-h2-font-size",h3:"--mt-h3-font-size",h4:"--mt-h4-font-size",h5:"--mt-h5-font-size",h6:"--mt-h6-font-size"},Bo={h1:"--mt-h1-line-height",h2:"--mt-h2-line-height",h3:"--mt-h3-line-height",h4:"--mt-h4-line-height",h5:"--mt-h5-line-height",h6:"--mt-h6-line-height"},ne=class extends c{static styles=[Ro];static props={order:{type:"number",default:1},size:{},c:{css:"--_color",scale:"color"},ta:{css:"--_ta"},textWrap:{css:"--_text-wrap"},lineClamp:{css:"--_clamp",type:"number"}};template(){return p`<h1 class="root" part="root"><slot></slot></h1>`}update(t){t.has("order")&&this.#t(),(t.has("size")||t.has("order"))&&this.#e()}#t(){let t=Math.min(6,Math.max(1,Math.round(this.order)||1)),e=this.$(".root"),i=`H${t}`;if(e.tagName===i)return;let o=document.createElement(i.toLowerCase());o.className=e.className,o.setAttribute("part","root"),o.append(...e.childNodes),e.replaceWith(o)}#e(){let t=this.$(".root"),e=this.size;if(!e){t.style.removeProperty("font-size"),t.style.removeProperty("line-height");return}Hi[e]?(t.style.setProperty("font-size",`var(${Hi[e]})`),t.style.setProperty("line-height",`var(${Bo[e]})`)):(t.style.setProperty("font-size",/^-?\d*\.?\d+$/.test(e)?`${parseFloat(e)/16}rem`:e),t.style.removeProperty("line-height"))}};l("mt-title",ne);var jo=["placeholder","type","autocomplete","inputmode","pattern","minlength","maxlength","readonly","autofocus"],le=class extends b{static styles=[E,L];static props={...b.props,value:{},variant:{default:"default"},placeholder:{},type:{default:"text"},autocomplete:{},inputmode:{},pattern:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"}};template(){return k(B('<input id="control" class="input" part="input">'))}get input(){return this.$("#control")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value)}setup(){super.setup(),this.input.addEventListener("input",()=>this.setFormValue(this.input.value)),this.input.addEventListener("change",()=>this.forwardChange())}update(t){super.update(t);for(let e of jo){if(!t.has(e))continue;let i=this.getAttribute(e);i===null||i==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,i)}t.has("value")&&(this.value=this.getAttribute("value")??"")}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-text-input",le);var qo=["placeholder","autocomplete","minlength","maxlength","readonly","autofocus"],Vo=n`
  :host([resize='vertical']) .input { resize: vertical; }
  :host([resize='both']) .input { resize: both; }
  :host([autosize]) .input { resize: none; overflow: hidden; }
`,de=class extends b{static styles=[E,L,Vo];static props={...b.props,value:{},variant:{default:"default"},placeholder:{},autocomplete:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"},autosize:{type:"boolean"},minRows:{type:"number",default:2},maxRows:{type:"number"},resize:{default:"none"}};template(){return k(B('<textarea id="control" class="input" part="input" rows="2"></textarea>'))}get input(){return this.$("#control")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value),this.#t()}setup(){super.setup(),this.input.addEventListener("input",()=>{this.setFormValue(this.input.value),this.#t()}),this.input.addEventListener("change",()=>this.forwardChange())}update(t){super.update(t);for(let e of qo){if(!t.has(e))continue;let i=this.getAttribute(e);i===null||i==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,i)}t.has("value")&&(this.value=this.getAttribute("value")??""),t.has("minRows")&&!this.autosize&&(this.input.rows=this.minRows||2),(t.has("autosize")||t.has("minRows")||t.has("maxRows"))&&this.#t()}#t(){let t=this.input;if(!this.autosize){t.style.height="",t.style.overflowY="";return}t.style.height="auto";let e=getComputedStyle(t),i=parseFloat(e.lineHeight)||20,o=(parseFloat(e.paddingTop)||0)+(parseFloat(e.paddingBottom)||0)+(parseFloat(e.borderTopWidth)||0)+(parseFloat(e.borderBottomWidth)||0),s=this.minRows?i*this.minRows+o:0,a=this.maxRows?i*this.maxRows+o:1/0,d=Math.min(Math.max(t.scrollHeight,s),a);t.style.height=`${d}px`,t.style.overflowY=t.scrollHeight>a?"auto":"hidden"}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-textarea",de);var Wo=["placeholder","autocomplete","minlength","maxlength","readonly","autofocus"],Xo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>',Uo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.3 21.3 0 0 1 5.17-6.17M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.3 21.3 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',Yo=n`
  .section.toggle-section { pointer-events: auto; }
  .toggle {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: var(--mt-color-dimmed);
  }
  .toggle:hover { color: var(--mt-color-text); }
  .toggle:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; border-radius: var(--_radius); }
  .toggle svg { width: 1rem; height: 1rem; }
  .icon-hide { display: none; }
  :host([visible]) .icon-show { display: none; }
  :host([visible]) .icon-hide { display: flex; }
  :host([disabled]) .toggle, :host([readonly]) .toggle { pointer-events: none; opacity: 0.6; }
`,ce=class extends b{static styles=[E,L,Yo];static props={...b.props,value:{},variant:{default:"default"},placeholder:{},autocomplete:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"},visible:{type:"boolean"}};template(){return k(p`
      <div class="field has-right" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="password" autocomplete="current-password" />
        <div class="section right toggle-section" part="right-section">
          <button type="button" class="toggle" part="toggle" tabindex="-1" aria-pressed="false" aria-label="Show password">
            <span class="icon-show" aria-hidden="true">${Xo}</span>
            <span class="icon-hide" aria-hidden="true">${Uo}</span>
          </button>
        </div>
      </div>
    `)}get input(){return this.$("#control")}get toggle(){return this.$(".toggle")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value)}setup(){super.setup(),this.input.addEventListener("input",()=>this.setFormValue(this.input.value)),this.input.addEventListener("change",()=>this.forwardChange()),this.toggle.addEventListener("mousedown",t=>t.preventDefault()),this.toggle.addEventListener("click",()=>{this.isDisabled||this.getAttribute("readonly")!==null||(this.visible=!this.visible,this.emit("visibility-change",{visible:this.visible}))})}update(t){super.update(t);for(let e of Wo){if(!t.has(e))continue;let i=this.getAttribute(e);i===null||i==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,i)}if(t.has("value")&&(this.value=this.getAttribute("value")??""),t.has("visible")){let e=this.visible;this.input.type=e?"text":"password",this.toggle.setAttribute("aria-pressed",String(e)),this.toggle.setAttribute("aria-label",e?"Hide password":"Show password")}t.has("disabled")&&this.toggle.toggleAttribute("disabled",this.isDisabled)}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-password-input",ce);var Ko=["placeholder","readonly","autofocus"],Go='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5 5 1l4 4"/></svg>',Zo='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>',Qo=n`
  .section.controls { pointer-events: auto; width: var(--_height); padding: 0; }
  .stepper { display: flex; flex-direction: column; height: 100%; width: 100%; border-inline-start: 1px solid var(--mt-color-default-border); }
  .step {
    all: unset;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    color: var(--mt-color-dimmed);
  }
  .step:hover { color: var(--mt-color-text); background: var(--mt-color-hover); }
  .step svg { width: 0.625rem; height: 0.625rem; }
  .step.down { border-block-start: 1px solid var(--mt-color-default-border); }
  :host([hide-controls]) .stepper { display: none; }
  :host([disabled]) .step, :host([readonly]) .step { pointer-events: none; opacity: 0.5; }
`,he=class extends b{static styles=[E,L,Qo];static props={...b.props,value:{},variant:{default:"default"},placeholder:{},readonly:{type:"boolean"},autofocus:{type:"boolean"},min:{type:"number"},max:{type:"number"},step:{type:"number",default:1},clampBehavior:{default:"blur"},allowDecimal:{type:"boolean",default:!0},decimalScale:{type:"number"},allowNegative:{type:"boolean",default:!0},prefix:{},suffix:{},thousandSeparator:{},hideControls:{type:"boolean"}};#t="";template(){return k(p`
      <div class="field has-right" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" inputmode="decimal" autocomplete="off" />
        <div class="section right controls" part="right-section">
          <div class="stepper" part="controls">
            <button type="button" class="step up" part="control-up" tabindex="-1" aria-label="Increment">${Go}</button>
            <button type="button" class="step down" part="control-down" tabindex="-1" aria-label="Decrement">${Zo}</button>
          </div>
        </div>
      </div>
    `)}get input(){return this.$("#control")}get value(){return this.#t===""||this.#t==="-"?"":Number(this.#t)}set value(t){this.#t=t==null||t===""?"":String(t),this.#s(),this.setFormValue(this.#t===""?null:this.#t)}setup(){super.setup(),this.input.addEventListener("focus",()=>{this.input.value=this.#t}),this.input.addEventListener("blur",()=>{let i=this.#i(this.input.value);this.clampBehavior!=="none"&&(i=this.#o(i)),this.#t=i,this.#s(),this.setFormValue(this.#t===""?null:this.#t),this.forwardChange()}),this.input.addEventListener("input",()=>{let i=this.#i(this.input.value);this.clampBehavior==="strict"&&(i=this.#o(i)),this.#t=i,this.input.value!==i&&(this.input.value=i),this.setFormValue(this.#t===""?null:this.#t)}),this.input.addEventListener("keydown",i=>{i.key==="ArrowUp"?(i.preventDefault(),this.#r(1)):i.key==="ArrowDown"&&(i.preventDefault(),this.#r(-1))});let t=this.$(".step.up"),e=this.$(".step.down");t.addEventListener("pointerdown",i=>i.preventDefault()),e.addEventListener("pointerdown",i=>i.preventDefault()),t.addEventListener("click",()=>this.#r(1)),e.addEventListener("click",()=>this.#r(-1))}update(t){super.update(t);for(let e of Ko){if(!t.has(e))continue;let i=this.getAttribute(e);i===null||i==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,i)}t.has("value")&&(this.value=this.getAttribute("value")??""),(t.has("prefix")||t.has("suffix")||t.has("thousandSeparator")||t.has("decimalScale"))&&this.root.activeElement!==this.input&&this.#s()}#e(){let t=this.getAttribute("thousand-separator");return t===null||t==="false"?"":t===""?",":t}#i(t){let e=t,i=this.#e();i&&(e=e.split(i).join(""));let o=this.prefix||"",s=this.suffix||"";o&&e.startsWith(o)&&(e=e.slice(o.length)),s&&e.endsWith(s)&&(e=e.slice(0,e.length-s.length));let a=!1;e.startsWith("-")&&(a=!0,e=e.slice(1)),e=e.replace(/[^0-9.]/g,"");let d=e.indexOf("."),h=d===-1?e:e.slice(0,d),u=d===-1?"":e.slice(d+1).replace(/\./g,"");h=h.replace(/^0+(?=\d)/,""),this.decimalScale!=null&&(u=u.slice(0,this.decimalScale));let m=h;return this.allowDecimal&&d!==-1&&(m+="."+u),a&&this.allowNegative&&m!==""&&(m="-"+m),m}#o(t){if(t===""||t==="-")return t;let e=Number(t);return Number.isNaN(e)?t:(this.min!=null&&e<this.min&&(e=this.min),this.max!=null&&e>this.max&&(e=this.max),this.decimalScale!=null?e.toFixed(this.decimalScale):String(e))}#a(t){if(t===""||t==="-")return"";let e=t.startsWith("-"),i=e?t.slice(1):t,[o,s]=i.split("."),a=o||"0",d=this.#e();d&&(a=a.replace(/\B(?=(\d{3})+(?!\d))/g,d));let h=a;return s!==void 0&&(h+="."+s),e&&(h="-"+h),`${this.prefix||""}${h}${this.suffix||""}`}#s(){this.input.value=this.#a(this.#t)}#r(t){if(this.isDisabled||this.getAttribute("readonly")!==null)return;let i=(this.#t===""||this.#t==="-"?0:Number(this.#t))+t*(this.step||1);this.min!=null&&(i=Math.max(i,this.min)),this.max!=null&&(i=Math.min(i,this.max)),this.#t=this.decimalScale!=null?i.toFixed(this.decimalScale):String(i),this.#s(),this.setFormValue(this.#t===""?null:this.#t),this.forwardChange()}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-number-input",he);var Jo='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>',tr='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg>',er='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg>',ir=n`
  :host { position: relative; }
  .input { cursor: default; caret-color: transparent; padding-inline-end: calc(var(--_height) * 1.1); }
  :host([searchable]) .input { cursor: text; caret-color: auto; }
  :host([readonly]) .input, :host([disabled]) .input { cursor: not-allowed; }
  :host([clearable]) .input { padding-inline-end: calc(var(--_height) * 1.7); }

  .section.right { width: auto; min-width: var(--_height); justify-content: flex-end; padding-inline-end: 0.5rem; gap: 0.25rem; }
  .chevron { display: flex; align-items: center; justify-content: center; width: 0.75rem; height: 0.75rem; color: var(--mt-color-dimmed); transition: transform var(--mt-transition); flex: none; }
  .chevron svg { width: 100%; height: 100%; }
  :host([data-open]) .chevron { transform: rotate(180deg); }

  .clear {
    all: unset;
    pointer-events: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    flex: none;
  }
  .clear:hover { background: var(--mt-color-hover); color: var(--mt-color-text); }
  .clear svg { width: 0.625rem; height: 0.625rem; }
  .clear[hidden] { display: none; }

  .dropdown {
    box-sizing: border-box;
    max-height: var(--_max-dropdown-height, 15.625rem);
    overflow-y: auto;
    background: var(--mt-color-dropdown);
    border: 1px solid var(--mt-color-border);
    border-radius: var(--_radius);
    box-shadow: var(--mt-shadow-md);
    padding: 0.25rem;
  }
  .dropdown:not(:popover-open) { display: none; }
  .option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--mt-radius-sm);
    font-size: var(--_fz);
    color: var(--mt-color-text);
    cursor: pointer;
    user-select: none;
  }
  .option.highlighted, .option:hover:not(.disabled) { background: var(--mt-color-hover); }
  .option[aria-selected='true'] { font-weight: 500; }
  .option.disabled { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .check { display: flex; width: 1rem; height: 1rem; flex: none; color: var(--mt-color-primary-filled); }
  .check svg { width: 100%; height: 100%; }
  .option-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .group-label { padding: 0.375rem 0.5rem 0.125rem; font-size: var(--mt-font-size-xs); font-weight: 600; color: var(--mt-color-dimmed); text-transform: uppercase; }
  .empty { padding: 0.5rem; font-size: var(--_fz); color: var(--mt-color-dimmed); text-align: center; }
`,pe=class extends b{static styles=[E,L,kt,ir];static props={...b.props,value:{},placeholder:{},variant:{default:"default"},readonly:{type:"boolean"},autofocus:{type:"boolean"},searchable:{type:"boolean"},clearable:{type:"boolean"},nothingFound:{},allowDeselect:{type:"boolean",default:!0},maxDropdownHeight:{css:"--_max-dropdown-height",scale:"rem",default:250}};#t="";#e="";#i=[];#o=[];#a=-1;#s=!1;#r;#n;#h=new MutationObserver(()=>{this.#w(),this.#u(),this.#g()});template(){return k(p`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" role="combobox" aria-haspopup="listbox"
               aria-expanded="false" aria-controls="dropdown" aria-autocomplete="list" autocomplete="off"
               spellcheck="false" readonly />
        <div class="section right" part="right-section">
          <button type="button" class="clear" part="clear-button" aria-label="Clear value" tabindex="-1" hidden>${tr}</button>
          <span class="chevron" part="chevron" aria-hidden="true">${Jo}</span>
        </div>
      </div>
      <div id="dropdown" class="dropdown" part="dropdown" popover="manual" role="listbox"></div>
    `)}get input(){return this.$("#control")}get field(){return this.$(".field")}get dropdown(){return this.$("#dropdown")}get clearBtn(){return this.$(".clear")}get value(){return this.#t}set value(t){this.#t=t??"",this.setFormValue(this.#t===""?null:this.#t),this.#g(),this.#d(),this.#s&&this.#x()}setup(){super.setup(),this.#w(),this.#o=this.#i,this.#h.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value","label","disabled"],characterData:!0}),this.input.addEventListener("focus",()=>{!this.isDisabled&&!this.#s&&this.#c()}),this.input.addEventListener("click",()=>{!this.isDisabled&&!this.#s&&this.#c()}),this.input.addEventListener("blur",()=>this.#p()),this.input.addEventListener("input",()=>{this.searchable&&(this.#e=this.input.value,this.#s?this.#u():this.#c())}),this.input.addEventListener("keydown",t=>this.#l(t)),this.clearBtn.addEventListener("mousedown",t=>t.preventDefault()),this.clearBtn.addEventListener("click",t=>{t.stopPropagation(),!(this.isDisabled||this.getAttribute("readonly")!==null)&&(this.value="",this.emit("change",{value:""}))})}update(t){if(super.update(t),t.has("placeholder")){let e=this.placeholder;e?this.input.setAttribute("placeholder",e):this.input.removeAttribute("placeholder")}if(t.has("autofocus")&&(this.getAttribute("autofocus")!==null?this.input.setAttribute("autofocus",""):this.input.removeAttribute("autofocus")),t.has("readonly")||t.has("searchable")){let e=this.getAttribute("readonly")!==null;this.input.readOnly=e||!this.searchable,e&&this.#p()}t.has("disabled")&&this.isDisabled&&this.#p(),t.has("value")&&(this.value=this.getAttribute("value")??""),(t.has("clearable")||t.has("disabled")||t.has("readonly"))&&this.#d()}#d(){let t=this.getAttribute("readonly")!==null;this.clearBtn.hidden=!(this.clearable&&this.#t!==""&&!this.isDisabled&&!t)}#l(t){if(!(this.isDisabled||this.getAttribute("readonly")!==null))switch(t.key){case"ArrowDown":t.preventDefault(),this.#s?this.#v(1):this.#c();break;case"ArrowUp":t.preventDefault(),this.#s?this.#v(-1):this.#c();break;case"Home":this.#s&&(t.preventDefault(),this.#b(this.#f(1)));break;case"End":this.#s&&(t.preventDefault(),this.#b(this.#f(-1)));break;case"Enter":if(this.#s){t.preventDefault();let e=this.#o[this.#a];e&&this.#y(e)}break;case"Escape":this.#s&&(t.preventDefault(),this.#p());break}}#c(){this.#s||this.isDisabled||this.getAttribute("readonly")!==null||(this.#s=!0,this.toggleAttribute("data-open",!0),this.input.setAttribute("aria-expanded","true"),this.#u(),this.dropdown.showPopover(),this.#r=S(this.field,this.dropdown,{matchWidth:!0,offset:4}),this.#n=T([this],()=>this.#p()))}#p(){this.#s&&(this.#s=!1,this.toggleAttribute("data-open",!1),this.input.setAttribute("aria-expanded","false"),this.input.removeAttribute("aria-activedescendant"),this.dropdown.hidePopover(),this.#r?.(),this.#r=void 0,this.#n?.(),this.#n=void 0,this.#e="",this.#g())}#u(){let t=this.searchable?this.#e.trim().toLowerCase():"";this.#o=t?this.#i.filter(e=>e.label.toLowerCase().includes(t)):this.#i,this.#x(),this.#m()}#m(){let t=this.#o.findIndex(e=>e.value===this.#t);this.#b(t!==-1&&!this.#o[t].disabled?t:this.#f(1))}#f(t){let e=this.#o.length;for(let i=0;i<e;i++){let o=t===1?i:e-1-i;if(!this.#o[o].disabled)return o}return-1}#v(t){let e=this.#o.length;if(!e)return;let i=this.#a;for(let o=0;o<e;o++)if(i=(i+t+e)%e,!this.#o[i].disabled){this.#b(i);return}}#b(t){this.#a=t;for(let i of this.dropdown.querySelectorAll(".option"))i.classList.remove("highlighted");let e=t>=0?this.dropdown.querySelector(`.option[data-index="${t}"]`):null;e?(e.classList.add("highlighted"),this.input.setAttribute("aria-activedescendant",e.id),e.scrollIntoView({block:"nearest"})):this.input.removeAttribute("aria-activedescendant")}#y(t){if(t.disabled)return;let e=this.#t===t.value&&this.allowDeselect?"":t.value;this.value=e,this.emit("change",{value:e}),this.#p(),this.input.focus()}#x(){let t=this.dropdown;if(t.innerHTML="",!this.#o.length){let i=document.createElement("div");i.className="empty",i.textContent=this.nothingFound||"Nothing found",t.append(i);return}let e="\0";this.#o.forEach((i,o)=>{if(i.group!==e&&(e=i.group,i.group)){let h=document.createElement("div");h.className="group-label",h.textContent=i.group,t.append(h)}let s=document.createElement("div");s.id=`opt-${o}`,s.className="option"+(i.disabled?" disabled":""),s.setAttribute("role","option"),s.dataset.index=String(o),s.setAttribute("aria-selected",String(i.value===this.#t)),i.disabled&&s.setAttribute("aria-disabled","true");let a=document.createElement("span");a.className="check",a.setAttribute("aria-hidden","true"),i.value===this.#t&&(a.innerHTML=er);let d=document.createElement("span");d.className="option-label",d.textContent=i.label,s.append(a,d),s.addEventListener("mousedown",h=>h.preventDefault()),s.addEventListener("click",()=>this.#y(i)),t.append(s)})}#g(){let t=this.#i.find(e=>e.value===this.#t);this.input.value=t?t.label:""}#w(){let t=[],e=(i,o)=>({value:i.getAttribute("value")??i.textContent?.trim()??"",label:i.textContent?.trim()??"",disabled:i.hasAttribute("disabled"),group:o});for(let i of Array.from(this.children))if(i.tagName==="OPTION")t.push(e(i));else if(i.tagName==="OPTGROUP"){let o=i.getAttribute("label")||"";for(let s of i.querySelectorAll(":scope > option"))t.push(e(s,o))}this.#i=t}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-select",pe);function D(r){return p`
    <label class="root" part="root">
      ${r}
      <div class="body" part="body">
        <span class="label" part="label" id="label" hidden
          ><slot name="label"><span class="label-text"></span></slot
          ><span class="required" aria-hidden="true" hidden>*</span></span
        >
        <span class="description" part="description" id="description" hidden
          ><slot name="description"><span class="description-text"></span></slot
        ></span>
        <span class="error" part="error" id="error" hidden
          ><slot name="error"><span class="error-text"></span></slot
        ></span>
      </div>
    </label>
  `}var O=n`
  :host { display: block; }
  .root { display: inline-flex; align-items: flex-start; gap: var(--mt-spacing-sm); cursor: pointer; }
  :host([label-position='left']) .root { flex-direction: row-reverse; }
  :host([disabled]) .root { cursor: not-allowed; }
  .body { display: flex; flex-direction: column; min-height: var(--_control-h); justify-content: center; }
  .label {
    display: inline-block;
    font-size: var(--_label-fz);
    font-weight: 400;
    line-height: var(--_control-h);
    color: var(--mt-color-text);
    word-break: break-word;
    cursor: pointer;
  }
  :host([disabled]) .label { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .required { color: var(--mt-color-error); margin-inline-start: 0.125rem; }
  .description, .error {
    display: block;
    font-size: var(--_hint-fz);
    line-height: 1.2;
    word-break: break-word;
  }
  .description { color: var(--mt-color-dimmed); }
  .error { color: var(--mt-color-error); margin-top: calc(var(--mt-spacing-xs) / 4); }
  [hidden] { display: none !important; }
`,nt=n`
  :host { --_size: 1.25rem; --_control-h: var(--_size); --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='xs']) { --_size: 1rem; --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='sm']) { --_size: 1.25rem; --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_size: 1.5rem; --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_size: 1.875rem; --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_size: 2.25rem; --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }
`,lt=n`
  :host { display: block; }
  :host([size='xs']) { --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='sm']), :host(:not([size])) { --_hint-fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_hint-fz: var(--mt-font-size-lg); }
  .label { display: inline-block; font-size: var(--mt-font-size-sm); font-weight: 500; color: var(--mt-color-text); word-break: break-word; cursor: default; }
  .required { color: var(--mt-color-error); margin-inline-start: 0.125rem; }
  .description, .error { display: block; font-size: var(--_hint-fz); line-height: 1.2; word-break: break-word; }
  .description { color: var(--mt-color-dimmed); margin-top: calc(var(--mt-spacing-xs) / 4); }
  .error { color: var(--mt-color-error); margin-top: calc(var(--mt-spacing-xs) / 2); }
  .items { display: flex; flex-direction: column; gap: var(--mt-spacing-xs); margin-top: var(--mt-spacing-xs); }
  .label + .items, .description:not([hidden]) + .items { margin-top: var(--mt-spacing-xs); }
  [hidden] { display: none !important; }
`;var or='<path d="M1.5 5.2L4 7.8L9 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',rr='<path d="M1.5 5H8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',sr=n`
  .box { position: relative; display: inline-flex; flex: 0 0 auto; width: var(--_size); height: var(--_size); }
  .input {
    appearance: none;
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--_radius);
    border: 1px solid var(--mt-color-default-border);
    background: var(--mt-color-body);
    cursor: pointer;
    transition: background var(--mt-transition), border-color var(--mt-transition);
  }
  .input:checked, :host([indeterminate]) .input { background: var(--mt-c-filled); border-color: var(--mt-c-filled); }
  .input:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([error]:not([error=''])) .input { border-color: var(--mt-color-error); }
  :host([disabled]) .input { cursor: not-allowed; background: var(--mt-color-disabled); border-color: var(--mt-color-disabled); }
  .icon {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 62%;
    height: 62%;
    color: var(--_icon-color, var(--mt-white));
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--mt-transition);
  }
  .input:checked ~ .icon-check { opacity: 1; }
  :host([indeterminate]) .icon-check { opacity: 0; }
  :host([indeterminate]) .icon-indeterminate { opacity: 1; }
`,ue=class extends b{static styles=[O,nt,sr];static props={...b.props,value:{default:"on"},checked:{type:"boolean"},indeterminate:{type:"boolean"},color:{color:!0},iconColor:{css:"--_icon-color",scale:"color"},labelPosition:{attr:"label-position",default:"right"}};template(){return D(p`
      <span class="box" part="box">
        <input type="checkbox" id="control" class="input" part="input" />
        <svg class="icon icon-check" part="icon" viewBox="0 0 10 10" aria-hidden="true">${or}</svg>
        <svg class="icon icon-indeterminate" part="icon" viewBox="0 0 10 10" aria-hidden="true">${rr}</svg>
      </span>
    `)}get input(){return this.$("#control")}get checked(){return this.input.checked}set checked(t){this.input.checked=!!t,this.#t()}setup(){super.setup(),this.input.addEventListener("change",()=>{this.removeAttribute("indeterminate"),this.#t(),this.forwardChange()})}update(t){super.update(t),t.has("checked")&&(this.input.checked=this.prop("checked")),t.has("indeterminate")&&(this.input.indeterminate=this.indeterminate),(t.has("checked")||t.has("value"))&&this.#t()}#t(){if(this.closest("mt-checkbox-group")){this.internals.setFormValue(null);return}this.setFormValue(this.input.checked?this.value:null)}formResetCallback(){this.input.checked=this.prop("checked"),this.input.indeterminate=this.indeterminate,this.#t()}formStateRestoreCallback(t){typeof t=="string"&&(this.checked=t===this.value)}},me=class extends b{static styles=[lt];static props={...b.props,value:{}};#t=null;template(){return k('<div class="items" part="items" role="group"><slot></slot></div>',{labelFor:!1})}get control(){return null}get value(){if(this.#t)return this.#t;let t=this.getAttribute("value");return t?t.split(",").map(e=>e.trim()).filter(Boolean):[]}set value(t){this.#t=Array.isArray(t)?t:typeof t=="string"?t.split(",").map(e=>e.trim()).filter(Boolean):[],this.#i()}setup(){super.setup(),this.internals.role="group",this.addEventListener("change",t=>{t.target===this||t.target?.tagName!=="MT-CHECKBOX"||(this.#t=this.#e().filter(e=>e.checked).map(e=>e.getAttribute("value")??"on"),this.#o())})}onConnect(){this.#i()}update(t){super.update(t),t.has("value")&&(this.#t=null,this.#i()),t.has("label")&&(this.internals.ariaLabel=this.label)}#e(){return Array.from(this.querySelectorAll("mt-checkbox"))}#i(){let t=this.value;for(let e of this.#e())e.checked=t.includes(e.getAttribute("value")??"on");this.#o()}#o(){let t=this.value,e=new FormData;if(this.name)for(let i of t)e.append(this.name,i);this.setFormValue(e),this.internals.setValidity(this.required&&t.length===0?{valueMissing:!0}:{},"Select at least one option",void 0),this.emit("change",{value:t})}formResetCallback(){this.#t=null,this.#i()}};l("mt-checkbox",ue);l("mt-checkbox-group",me);var ar=n`
  :host { cursor: pointer; }
  :host(:focus-visible) { outline: none; }
  .box {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    border-radius: 50%;
    border: 1px solid var(--mt-color-default-border);
    background: var(--mt-color-body);
    transition: background var(--mt-transition), border-color var(--mt-transition);
  }
  :host(:focus-visible) .box { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([checked]) .box { background: var(--mt-c-filled); border-color: var(--mt-c-filled); }
  :host([error]:not([error=''])) .box { border-color: var(--mt-color-error); }
  :host([disabled]) .box { cursor: not-allowed; background: var(--mt-color-disabled); border-color: var(--mt-color-disabled); }
  .dot {
    width: 42%;
    height: 42%;
    border-radius: 50%;
    background: var(--_icon-color, var(--mt-white));
    opacity: 0;
    transition: opacity var(--mt-transition);
  }
  :host([checked]) .dot { opacity: 1; }
`,fe=class extends b{static styles=[O,nt,ar];static props={...b.props,value:{default:"on"},checked:{type:"boolean"},color:{color:!0},iconColor:{css:"--_icon-color",scale:"color"},labelPosition:{attr:"label-position",default:"right"}};#t=null;template(){return D(p`<span class="box" part="box"><span class="dot" part="dot"></span></span>`)}get control(){return null}focus(t){HTMLElement.prototype.focus.call(this,t)}blur(){HTMLElement.prototype.blur.call(this)}setup(){super.setup(),this.internals.role="radio",this.addEventListener("click",()=>{this.isDisabled||this.select()}),this.addEventListener("keydown",t=>{(t.key===" "||t.key==="Enter")&&!this.isDisabled&&(t.preventDefault(),this.select())})}onConnect(){this.#t=this.closest("mt-radio-group"),this.#t||(this.tabIndex=this.isDisabled?-1:0)}update(t){super.update(t),t.has("checked")&&(this.internals.ariaChecked=this.hasAttribute("checked")?"true":"false",this.#t||this.setFormValue(this.hasAttribute("checked")?this.value:null)),t.has("disabled")&&!this.#t&&(this.tabIndex=this.isDisabled?-1:0)}select(){if(this.#t){this.#t.selectValue(this.getAttribute("value")??"on");return}let t=this.name;if(t){let e=this.form??document;for(let i of e.querySelectorAll(`mt-radio[name="${CSS.escape(t)}"]`))i!==this&&i.removeAttribute("checked")}this.setAttribute("checked",""),this.forwardChange(),this.emit("change",{value:this.value})}formResetCallback(){this.toggleAttribute("checked",this.getAttribute("checked")!==null)}},ve=class extends b{static styles=[lt];static props={...b.props,value:{}};#t=null;template(){return k('<div class="items" part="items" role="radiogroup"><slot></slot></div>',{labelFor:!1})}get control(){return null}get value(){return this.#t??this.getAttribute("value")??""}set value(t){this.#t=t??"",this.#i()}selectValue(t){this.value=t}setup(){super.setup(),this.internals.role="radiogroup",this.addEventListener("keydown",t=>this.#a(t))}onConnect(){this.#i()}update(t){super.update(t),t.has("value")&&(this.#t=null,this.#i()),t.has("label")&&(this.internals.ariaLabel=this.label)}#e(){return Array.from(this.querySelectorAll("mt-radio"))}#i(){let t=this.value,e=this.#e(),i=!1;for(let o of e){let s=t!==""&&(o.getAttribute("value")??"on")===t;o.toggleAttribute("checked",s),o.tabIndex=s?0:-1,s&&(i=!0)}if(!i){for(let o of e)if(!o.hasAttribute("disabled")){o.tabIndex=0;break}}this.#o()}#o(){let t=this.value;this.setFormValue(this.name&&t?t:null),this.internals.setValidity(this.required&&!t?{valueMissing:!0}:{},"Select an option",void 0),this.emit("change",{value:t})}#a(t){let e=this.#e().filter(s=>!s.hasAttribute("disabled"));if(!e.length)return;let i=e.indexOf(t.target);if(i===-1)return;let o=-1;if(t.key==="ArrowDown"||t.key==="ArrowRight")o=(i+1)%e.length;else if(t.key==="ArrowUp"||t.key==="ArrowLeft")o=(i-1+e.length)%e.length;else return;t.preventDefault(),this.selectValue(e[o].getAttribute("value")??"on"),e[o].focus()}formResetCallback(){this.#t=null,this.#i()}};l("mt-radio",fe);l("mt-radio-group",ve);var nr=n`
  :host { --_w: 2.375rem; --_h: 1.25rem; --_control-h: var(--_h); --_thumb: 1rem; --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='xs']) { --_w: 2rem; --_h: 1rem; --_thumb: 0.75rem; --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='md']) { --_w: 2.75rem; --_h: 1.5rem; --_thumb: 1.25rem; --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_w: 3.25rem; --_h: 1.75rem; --_thumb: 1.5rem; --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_w: 3.75rem; --_h: 2rem; --_thumb: 1.75rem; --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }
`,lr=n`
  .track { position: relative; display: inline-flex; align-items: center; flex: 0 0 auto; width: var(--_w); height: var(--_h); }
  .input {
    appearance: none;
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--_radius, 100vh);
    background: var(--mt-color-default-border);
    border: 1px solid var(--mt-color-default-border);
    cursor: pointer;
    transition: background var(--mt-transition), border-color var(--mt-transition);
  }
  .input:checked { background: var(--mt-c-filled); border-color: var(--mt-c-filled); }
  .input:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([disabled]) .input { cursor: not-allowed; opacity: 0.6; }
  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--_thumb);
    height: var(--_thumb);
    border-radius: 50%;
    background: var(--mt-white);
    box-shadow: var(--mt-shadow-xs);
    color: var(--mt-color-dimmed);
    font-size: calc(var(--_thumb) * 0.6);
    transition: transform var(--mt-transition);
    pointer-events: none;
  }
  .input:checked ~ .thumb { transform: translateX(calc(var(--_w) - var(--_thumb) - 4px)); }
  .on-label, .off-label {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: calc(var(--_h) * 0.42);
    line-height: 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--mt-transition);
  }
  .on-label { left: 0.25rem; right: var(--_thumb); justify-content: flex-start; color: var(--mt-white); }
  .off-label { left: var(--_thumb); right: 0.25rem; justify-content: flex-end; color: var(--mt-color-dimmed); }
  .input:checked ~ .on-label { opacity: 1; }
  .input:not(:checked) ~ .off-label { opacity: 1; }
`,be=class extends b{static styles=[O,nr,lr];static props={...b.props,radius:{css:"--_radius",scale:"radius",default:"xl"},value:{default:"on"},checked:{type:"boolean"},color:{color:!0},onLabel:{attr:"label-on"},offLabel:{attr:"label-off"},labelPosition:{attr:"label-position",default:"right"}};template(){return D(p`
      <span class="track" part="track">
        <input type="checkbox" role="switch" id="control" class="input" part="input" />
        <span class="thumb" part="thumb"><slot name="thumb-icon"></slot></span>
        <span class="on-label" part="label-on"><slot name="label-on"><span class="on-label-text"></span></slot></span>
        <span class="off-label" part="label-off"><slot name="label-off"><span class="off-label-text"></span></slot></span>
      </span>
    `)}get input(){return this.$("#control")}get checked(){return this.input.checked}set checked(t){this.input.checked=!!t,this.#t()}setup(){super.setup(),this.input.addEventListener("change",()=>{this.#t(),this.forwardChange()})}update(t){super.update(t),t.has("checked")&&(this.input.checked=this.prop("checked")),(t.has("checked")||t.has("value"))&&this.#t(),t.has("onLabel")&&(this.$(".on-label-text").textContent=this.onLabel??""),t.has("offLabel")&&(this.$(".off-label-text").textContent=this.offLabel??"")}#t(){this.setFormValue(this.input.checked?this.value:null)}formResetCallback(){this.input.checked=this.prop("checked"),this.#t()}formStateRestoreCallback(t){typeof t=="string"&&(this.checked=t===this.value)}};l("mt-switch",be);var dr=n`
  :host { display: flex; flex-direction: column; }
  :host([orientation='vertical']) { flex-direction: row; align-items: flex-start; }
  :host([orientation='vertical'][placement='right']) { flex-direction: row-reverse; }
  :host([orientation='vertical']) ::slotted(mt-tabs-panel) { flex: 1; min-width: 0; }
`,ge=class extends c{static styles=[dr];static props={value:{},variant:{default:"default"},orientation:{default:"horizontal"},placement:{default:"left"},color:{color:!0},radius:{css:"--_radius",scale:"radius"},inverted:{type:"boolean"},keepMounted:{type:"boolean",default:!0},activateTabWithKeyboard:{type:"boolean",default:!0},allowTabDeactivation:{type:"boolean"}};#t=null;#e=!1;#i=new WeakMap;setup(){this.addEventListener("tabs-activate",t=>{let e=t.detail.value;this.#o(e)})}update(){this.#a()}#o(t){let e=this.#t;if(t===e){this.allowTabDeactivation&&(this.value=null);return}this.value=t}#a(){let t=[...this.querySelectorAll(":scope > mt-tabs-list > mt-tab")],e=[...this.querySelectorAll(":scope > mt-tabs-panel")],i=this.getAttribute("value");i===null&&(i=t.find(d=>!d.hasAttribute("disabled"))?.getAttribute("value")??null);let o=i!==this.#t;this.#t=i;let s=this.querySelector(":scope > mt-tabs-list");s&&(s.setAttribute("data-variant",this.variant),s.setAttribute("data-orientation",this.orientation),s.setAttribute("data-placement",this.placement),s.toggleAttribute("data-inverted",this.inverted),s.setAttribute("aria-orientation",this.orientation));for(let a of t){let d=a.getAttribute("value"),h=d!==null&&d===i,u=e.find(m=>m.getAttribute("value")===d);u&&(u.id||(u.id=z("tabpanel")),a.id||(a.id=z("tab")),a.setAttribute("aria-controls",u.id),u.setAttribute("aria-labelledby",a.id)),a.setAttribute("data-variant",this.variant),a.setAttribute("data-placement",this.placement),a.setAttribute("data-orientation",this.orientation),a.toggleAttribute("active",h)}for(let a of e){let d=a.getAttribute("value"),h=d!==null&&d===i;if(a.hidden=!h,!this.keepMounted){if(!h&&a.childNodes.length&&!this.#i.has(a)){let u=document.createDocumentFragment();u.append(...a.childNodes),this.#i.set(a,u)}else if(h){let u=this.#i.get(a);u&&(a.append(u),this.#i.delete(a))}}}o&&this.#e&&this.emit("change",{value:i}),this.#e=!0}},cr=n`
  :host {
    display: flex;
    flex-direction: row;
    gap: 0;
    border-bottom: 1px solid var(--mt-color-border);
    justify-content: var(--_justify, flex-start);
  }
  :host([data-orientation='vertical']) {
    flex-direction: column;
    border-bottom: 0;
    border-right: 1px solid var(--mt-color-border);
    align-self: stretch;
  }
  :host([data-orientation='vertical'][data-placement='right']) { border-right: 0; border-left: 1px solid var(--mt-color-border); }
  :host([data-variant='pills']) { border: 0; gap: var(--mt-spacing-xs); }
  :host([data-inverted]:not([data-orientation='vertical'])) { border-bottom: 0; border-top: 1px solid var(--mt-color-border); }
  ::slotted(mt-tab) { flex: 0 0 auto; }
  :host([grow]) ::slotted(mt-tab) { flex: 1; }
`,ye=class extends c{static styles=[cr];static props={grow:{type:"boolean"},justify:{css:"--_justify"}};setup(){this.setAttribute("role","tablist"),this.addEventListener("keydown",t=>this.#t(t))}#t(t){let e=t.target.closest("mt-tab");if(!e)return;let i=[...this.querySelectorAll(":scope > mt-tab")].filter(m=>!m.hasAttribute("disabled")),o=i.indexOf(e);if(o<0)return;let s=this.getAttribute("data-orientation")==="vertical",a=s?"ArrowDown":"ArrowRight",d=s?"ArrowUp":"ArrowLeft",h=null;if(t.key===a?h=i[(o+1)%i.length]:t.key===d?h=i[(o-1+i.length)%i.length]:t.key==="Home"?h=i[0]:t.key==="End"&&(h=i[i.length-1]),!h)return;t.preventDefault(),h.focus(),this.closest("mt-tabs")?.activateTabWithKeyboard!==!1&&h.dispatchEvent(new CustomEvent("tabs-activate",{bubbles:!0,composed:!0,detail:{value:h.getAttribute("value")}}))}},hr=n`
  :host { display: inline-flex; }
  :host([data-orientation='vertical']) { display: flex; width: 100%; }
  .tab {
    display: flex;
    align-items: center;
    gap: var(--mt-spacing-xs);
    width: 100%;
    height: 2.25rem;
    padding-inline: var(--mt-spacing-md);
    font: inherit;
    font-size: var(--mt-font-size-sm);
    font-weight: 500;
    color: var(--mt-color-text);
    background: transparent;
    border: 0;
    border-radius: var(--_radius, var(--mt-radius-default));
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
  }
  .tab:hover { background: var(--mt-color-hover); }
  .tab:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; }
  :host([data-variant='default']) .tab { border-radius: 0; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  :host([data-variant='default'][active]) .tab { border-color: var(--mt-c-filled); color: var(--mt-c-filled); }
  :host([data-variant='default'][data-orientation='vertical']) .tab { border-bottom: 0; border-right: 2px solid transparent; margin-bottom: 0; margin-right: -1px; }
  :host([data-variant='default'][data-orientation='vertical'][data-placement='right']) .tab { border-right: 0; border-left: 2px solid transparent; margin-right: 0; margin-left: -1px; }
  :host([data-variant='outline']) .tab { border: 1px solid transparent; border-bottom: 0; border-radius: var(--_radius, var(--mt-radius-default)) var(--_radius, var(--mt-radius-default)) 0 0; margin-bottom: -1px; }
  :host([data-variant='outline'][active]) .tab { border-color: var(--mt-color-border); background: var(--mt-color-body); }
  :host([data-variant='outline'][data-orientation='vertical']) .tab { border-radius: var(--_radius, var(--mt-radius-default)) 0 0 var(--_radius, var(--mt-radius-default)); border-bottom: 1px solid transparent; border-right: 0; margin-bottom: 0; margin-right: -1px; }
  :host([data-variant='outline'][data-orientation='vertical'][active]) .tab { border-right-color: var(--mt-color-body); }
  :host([data-variant='outline'][data-orientation='vertical'][data-placement='right']) .tab { border-radius: 0 var(--_radius, var(--mt-radius-default)) var(--_radius, var(--mt-radius-default)) 0; border-left: 0; margin-right: 0; margin-left: -1px; }
  :host([data-variant='outline'][data-orientation='vertical'][data-placement='right'][active]) .tab { border-left-color: var(--mt-color-body); border-right-color: var(--mt-color-border); }
  :host([data-variant='pills']) .tab { border-radius: var(--_radius, var(--mt-radius-default)); }
  :host([data-variant='pills'][active]) .tab { background: var(--mt-c-filled); color: var(--mt-white); }
  :host([disabled]) .tab { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .section { display: flex; align-items: center; }
  .section:not(.filled) { display: none; }
`,xe=class extends c{static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[hr];static props={value:{},disabled:{type:"boolean"},active:{type:"boolean"},color:{color:!0},href:{},target:{}};template(){return p`
      <button class="tab" part="tab" type="button">
        <span class="section left"><slot name="left-section"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="section right"><slot name="right-section"></slot></span>
      </button>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.setAttribute("role","tab"),this.addEventListener("click",t=>{if(this.disabled){t.preventDefault();return}this.href||this.dispatchEvent(new CustomEvent("tabs-activate",{bubbles:!0,composed:!0,detail:{value:this.value}}))})}update(t){t.has("href")&&this.#t(),this.setAttribute("aria-selected",this.active?"true":"false"),this.tabIndex=this.active?0:-1,this.toggleAttribute("aria-disabled",this.disabled);let e=this.$(".tab");e instanceof HTMLButtonElement?e.disabled=this.disabled:(this.href&&e.setAttribute("href",this.href),this.target?e.setAttribute("target",this.target):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",this.disabled))}#t(){let t=this.$(".tab"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let i=document.createElement(e.toLowerCase());i.className=t.className,i.setAttribute("part","tab"),e==="BUTTON"&&i.setAttribute("type","button"),i.append(...t.childNodes),t.replaceWith(i)}},pr=n`
  :host { display: block; }
  .panel { padding-top: var(--mt-spacing-md); }
  :host([data-orientation='vertical']) .panel { padding-top: 0; padding-left: var(--mt-spacing-md); }
`,we=class extends c{static styles=[pr];static props={value:{}};template(){return'<div class="panel" part="panel"><slot></slot></div>'}setup(){this.setAttribute("role","tabpanel"),this.tabIndex=0}};l("mt-tabs",ge);l("mt-tabs-list",ye);l("mt-tab",xe);l("mt-tabs-panel",we);var ur='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',mr=n`
  :host { display: block; }
`,_e=class extends c{static styles=[mr];static props={value:{},multiple:{type:"boolean"},variant:{default:"default"},chevronPosition:{default:"right"},disableChevronRotation:{type:"boolean"},radius:{css:"--_radius",scale:"radius"},transitionDuration:{type:"number",default:200}};setup(){this.addEventListener("keydown",t=>this.#i(t))}update(t){t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),this.#e()}toggle(t){if(t===null)return;let e=this.#t();this.multiple?(e.has(t)?e.delete(t):e.add(t),this.value=[...e].join(",")||null):this.value=e.has(t)?null:t,this.emit("change",{value:this.value})}#t(){let t=this.getAttribute("value");return t?this.multiple?new Set(t.split(",").filter(Boolean)):new Set([t]):new Set}#e(){let t=this.#t();for(let e of this.querySelectorAll(":scope > mt-accordion-item")){let i=e.getAttribute("value");e.setAttribute("data-variant",this.variant),e.toggleAttribute("opened",i!==null&&t.has(i));let o=e.querySelector(":scope > mt-accordion-control");o?.setAttribute("data-chevron-position",this.chevronPosition),o?.toggleAttribute("data-disable-rotation",this.disableChevronRotation)}}#i(t){let e=t.target.closest("mt-accordion-control");if(!e)return;let i=[...this.querySelectorAll("mt-accordion-control")].filter(a=>a.getAttribute("aria-disabled")!=="true"),o=i.indexOf(e);if(o<0)return;let s=null;t.key==="ArrowDown"?s=i[(o+1)%i.length]:t.key==="ArrowUp"?s=i[(o-1+i.length)%i.length]:t.key==="Home"?s=i[0]:t.key==="End"&&(s=i[i.length-1]),s&&(t.preventDefault(),s.focus())}},fr=n`
  :host { display: block; }
  .item { border-bottom: 1px solid var(--mt-color-border); }
  :host(:last-child) .item { border-bottom: 0; }
  :host([data-variant='contained']) .item,
  :host([data-variant='separated']) .item {
    border: 1px solid var(--mt-color-border);
    border-radius: var(--_radius, var(--mt-radius-default));
    overflow: hidden;
  }
  :host([data-variant='separated']) { display: block; margin-bottom: var(--mt-spacing-md); }
  :host([data-variant='contained']) { display: block; margin-bottom: -1px; }
  :host([data-variant='contained']:last-child) { margin-bottom: 0; }
  :host([data-variant='filled'][opened]) .item { background: var(--mt-color-hover); border-radius: var(--_radius, var(--mt-radius-default)); }
`,ke=class extends c{static styles=[fr];static props={value:{},disabled:{type:"boolean"},opened:{type:"boolean"}};template(){return'<div class="item" part="item"><slot></slot></div>'}setup(){this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t()),this.#t()}update(t){(t.has("opened")||t.has("disabled"))&&this.#t()}#t(){let t=this.querySelector(":scope > mt-accordion-control"),e=this.querySelector(":scope > mt-accordion-panel");t&&(t.id||(t.id=z("accctrl")),t.setAttribute("aria-expanded",String(this.opened)),t.setAttribute("aria-disabled",String(this.disabled)),t.toggleAttribute("disabled",this.disabled)),e&&(e.id||(e.id=z("accpanel")),t&&(e.setAttribute("aria-labelledby",t.id),t.setAttribute("aria-controls",e.id)),e.toggleAttribute("opened",this.opened))}},vr=n`
  :host { display: block; }
  .control {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2.75rem;
    padding: var(--mt-spacing-md);
    gap: var(--mt-spacing-md);
    font: inherit;
    font-size: var(--mt-font-size-sm);
    font-weight: 500;
    color: var(--mt-color-text);
    background: transparent;
    border: 0;
    text-align: start;
    cursor: pointer;
  }
  .control:hover { background: var(--mt-color-hover); }
  .control:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; }
  :host([aria-disabled='true']) .control { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  :host([data-chevron-position='left']) .control { flex-direction: row-reverse; }
  .icon { display: none; align-items: center; }
  :host([data-has-icon]) .icon { display: flex; }
  .label { flex: 1; min-width: 0; }
  .chevron { display: flex; align-items: center; color: var(--mt-color-dimmed); }
  .chevron svg { transition: transform var(--mt-transition); }
  :host([aria-expanded='true']) .chevron svg { transform: rotate(180deg); }
  :host([data-disable-rotation]) .chevron svg { transform: none !important; }
`,ze=class extends c{static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[vr];static props={disabled:{type:"boolean"}};template(){return p`
      <button type="button" class="control" part="control">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="chevron" part="chevron" aria-hidden="true">${ur}</span>
      </button>
    `}setup(){this.setAttribute("role","button");let t=this.root.querySelector('slot[name="icon"]'),e=()=>this.toggleAttribute("data-has-icon",(t?.assignedNodes().length??0)>0);t?.addEventListener("slotchange",e),e(),this.addEventListener("click",()=>{if(this.disabled)return;let i=this.closest("mt-accordion-item"),o=this.closest("mt-accordion");!i||!o||o.toggle(i.getAttribute("value"))})}update(){this.$(".control").disabled=this.disabled,this.tabIndex=this.disabled?-1:0}},br=n`
  :host { display: block; }
  .box { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--_duration, 200ms) ease; }
  :host([opened]) .box { grid-template-rows: 1fr; }
  .content { overflow: hidden; min-height: 0; }
  .inner { padding: 0 var(--mt-spacing-md) var(--mt-spacing-md); }
`,Ee=class extends c{static styles=[br];static props={opened:{type:"boolean"}};template(){return'<div class="box" part="box"><div class="content" part="content"><div class="inner"><slot></slot></div></div></div>'}setup(){this.setAttribute("role","region")}update(){this.$(".content").toggleAttribute("inert",!this.opened)}};l("mt-accordion",_e);l("mt-accordion-item",ke);l("mt-accordion-control",ze);l("mt-accordion-panel",Ee);var gr='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',yr=n`
  :host { display: block; --_children-offset: var(--mt-spacing-lg); }
  .control {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--mt-spacing-sm);
    padding: var(--mt-spacing-xs) var(--mt-spacing-sm);
    border-radius: var(--mt-radius-default);
    color: var(--mt-color-text);
    text-decoration: none;
    font: inherit;
    font-size: var(--mt-font-size-sm);
    background: transparent;
    border: 0;
    text-align: start;
    cursor: pointer;
  }
  .control:hover { background: var(--mt-color-hover); }
  .control:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; }
  :host([active]) .control { background: var(--mt-c-light); color: var(--mt-c-light-color); }
  :host([active]) .control:hover { background: var(--mt-c-light-hover); }
  :host([variant='filled'][active]) .control { background: var(--mt-c-filled); color: var(--mt-white); }
  :host([variant='filled'][active]) .control:hover { background: var(--mt-c-filled-hover); }
  :host([variant='subtle'][active]) .control { background: transparent; color: var(--mt-c-text); }
  :host([disabled]) .control { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  :host([disabled]) .control:hover { background: transparent; }

  .section { display: none; align-items: center; color: var(--mt-color-dimmed); }
  .section.show { display: flex; }
  :host([active]) .section.left { color: inherit; }

  .body { flex: 1; min-width: 0; }
  .label { display: block; font-weight: 500; }
  :host([no-wrap]) .label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .description { display: block; font-size: var(--mt-font-size-xs); color: var(--mt-color-dimmed); }
  .description[hidden] { display: none; }

  .chevron svg { display: block; transition: transform var(--mt-transition); }
  :host([opened]) .chevron svg { transform: rotate(90deg); }

  .children { padding-inline-start: var(--_children-offset); display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--mt-transition); }
  :host([opened]) .children { grid-template-rows: 1fr; }
  .children-inner { overflow: hidden; min-height: 0; }
`,Le=class extends c{static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[yr];static props={label:{},description:{},active:{type:"boolean"},variant:{default:"light"},color:{color:!0},href:{},target:{},disabled:{type:"boolean"},noWrap:{type:"boolean"},opened:{type:"boolean"},childrenOffset:{css:"--_children-offset",scale:"spacing",default:"lg"}};#t=!1;template(){return p`
      <div class="root" part="root">
        <a class="control" part="control" id="control">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="body" part="body">
            <span class="label" part="label"><slot name="label"><span class="label-text"></span></slot></span>
            <span class="description" part="description" hidden><slot name="description"><span class="description-text"></span></slot></span>
          </span>
          <span class="section right" part="right-section">
            <slot name="right-section"><span class="chevron" part="chevron" aria-hidden="true">${gr}</span></slot>
          </span>
        </a>
        <div class="children" part="children"><div class="children-inner"><slot></slot></div></div>
      </div>
    `}setup(){let t=this.root.querySelector('slot[name="left-section"]'),e=()=>t?.parentElement?.classList.toggle("show",(t?.assignedNodes().length??0)>0);t?.addEventListener("slotchange",e),e(),this.root.querySelector('slot[name="right-section"]')?.addEventListener("slotchange",()=>this.#o());for(let o of["label","description"])this.root.querySelector(`slot[name="${o}"]`)?.addEventListener("slotchange",()=>this.#e());this.root.querySelector(".children slot").addEventListener("slotchange",()=>this.#i()),this.#e(),this.#i(),this.addEventListener("click",o=>{if(o.composedPath().includes(this.$(".control"))){if(this.disabled){o.preventDefault();return}this.#t&&(this.opened=!this.opened,this.emit("change",{opened:this.opened}))}})}update(t){t.has("href")&&this.#a();let e=this.$(".control");e instanceof HTMLAnchorElement&&(this.href&&e.setAttribute("href",this.href),this.target?e.setAttribute("target",this.target):e.removeAttribute("target")),e.toggleAttribute("aria-disabled",this.disabled),e.tabIndex=this.disabled?-1:0,(t.has("label")||t.has("description"))&&this.#e(),t.has("opened")&&this.#t&&this.setAttribute("aria-expanded",String(this.opened)),this.#o()}#e(){let t=(s,a)=>!!a||!!this.querySelector(`:scope > [slot="${s}"]`),e=this.$(".label-text");e&&(e.textContent=this.label??"");let i=this.$(".description-text");i&&(i.textContent=this.description??"");let o=this.$(".description");o.hidden=!t("description",this.description)}#i(){this.#t=[...this.children].some(t=>t.tagName==="MT-NAV-LINK"),this.#t||(this.opened=!1),this.#t?this.setAttribute("aria-expanded",String(this.opened)):this.removeAttribute("aria-expanded"),this.#o()}#o(){let t=this.root.querySelector('slot[name="right-section"]'),e=(t?.assignedNodes().length??0)>0;t?.parentElement?.classList.toggle("show",e||this.#t)}#a(){let t=this.$(".control"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let i=document.createElement(e.toLowerCase());i.className=t.className,i.id="control",i.setAttribute("part","control"),e==="BUTTON"&&i.setAttribute("type","button"),i.append(...t.childNodes),t.replaceWith(i)}};l("mt-nav-link",Le);var xr=n`
  :host { display: flex; align-items: center; flex-wrap: wrap; }
  .root { display: flex; align-items: center; flex-wrap: wrap; }
  .item { display: flex; align-items: center; }
  .separator { display: flex; align-items: center; margin-inline: var(--_sep-margin, var(--mt-spacing-xs)); color: var(--mt-color-dimmed); }
  ::slotted(a) { color: var(--mt-color-anchor); text-decoration: none; font-size: var(--mt-font-size-sm); }
  ::slotted(a:hover) { text-decoration: underline; }
  ::slotted(*) { font-size: var(--mt-font-size-sm); }
`,Se=class extends c{static styles=[xr];static props={separator:{default:"/"},separatorMargin:{css:"--_sep-margin",scale:"spacing",default:"xs"}};#t;template(){return'<div class="root" part="root"></div>'}setup(){this.setAttribute("role","navigation"),this.setAttribute("aria-label","breadcrumb"),this.#t=new MutationObserver(()=>this.#e()),this.#t.observe(this,{childList:!0}),this.#e()}update(t){t.has("separator")&&this.#e()}onDisconnect(){this.#t?.disconnect()}#e(){let t=this.$(".root");t.innerHTML="";let e=this.querySelector(':scope > [slot="separator"]'),i=[...this.children].filter(o=>o.getAttribute("slot")!=="separator");i.forEach((o,s)=>{o.getAttribute("slot")||o.setAttribute("slot",z("bc"));let a=document.createElement("span");a.className="item";let d=document.createElement("slot");if(d.name=o.getAttribute("slot"),a.append(d),t.append(a),s<i.length-1){let h=document.createElement("span");h.className="separator",h.setAttribute("aria-hidden","true"),e?h.append(e.cloneNode(!0)):h.textContent=this.separator,t.append(h)}})}};l("mt-breadcrumbs",Se);function wr(r,t,e,i){if(t*2+3+e*2>=r)return Array.from({length:r},(m,f)=>f+1);let s=Math.max(i-t,e+1),a=Math.min(i+t,r-e),d=s>e+2,h=a<r-e-1,u=(m,f)=>Array.from({length:f-m+1},(g,x)=>m+x);if(!d&&h){let m=t*2+e+2;return[...u(1,m),"dots",...u(r-e+1,r)]}if(d&&!h){let m=t*2+e+2;return[...u(1,e),"dots",...u(r-m+1,r)]}return[...u(1,e),"dots",...u(s,a),"dots",...u(r-e+1,r)]}var _r=n`
  :host { display: inline-flex; --_height: 2rem; }
  :host([size='xs']) { --_height: 1.625rem; }
  :host([size='md']) { --_height: 2.25rem; }
  :host([size='lg']) { --_height: 2.5rem; }
  :host([size='xl']) { --_height: 2.75rem; }
  .root { display: flex; align-items: center; gap: var(--_gap, 0.5rem); }
  .control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--_height);
    height: var(--_height);
    padding-inline: 0.375rem;
    border: 1px solid var(--mt-color-default-border);
    border-radius: var(--_radius, var(--mt-radius-default));
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    font-size: var(--mt-font-size-sm);
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
  .control:hover:not(:disabled):not([aria-current='page']):not([aria-disabled='true']) { background: var(--mt-color-hover); }
  .control[aria-current='page'] { background: var(--mt-c-filled); border-color: var(--mt-c-filled); color: var(--mt-white); }
  .control:disabled, .control[aria-disabled='true'] { opacity: 0.5; cursor: not-allowed; }
  .dots {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--_height);
    height: var(--_height);
    color: var(--mt-color-dimmed);
  }
`,Ae=class extends c{static styles=[_r];static props={total:{type:"number",default:0},value:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},withEdges:{type:"boolean"},withControls:{type:"boolean",default:!0},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"},color:{color:!0},gap:{css:"--_gap",scale:"rem",default:8},disabled:{type:"boolean"},hrefTemplate:{attr:"href-template"}};template(){return'<div class="root" part="root"></div>'}setup(){this.setAttribute("role","navigation"),this.setAttribute("aria-label","Pagination")}update(){this.#e()}#t(t,e,i,o){let s=!!this.hrefTemplate,a=document.createElement(s?"a":"button");a.className="control",a.textContent=t,a.setAttribute("aria-label",o.ariaLabel),e===i&&a.setAttribute("aria-current","page");let h=this.disabled||o.disabled;return a instanceof HTMLAnchorElement?h?a.setAttribute("aria-disabled","true"):a.href=this.hrefTemplate.replace("{page}",String(e)):(a.type="button",a.disabled=h,a.addEventListener("click",()=>{this.value=e,this.emit("change",{value:e})})),a}#e(){let t=this.$(".root");t.innerHTML="";let e=Math.max(0,Math.trunc(this.total));if(!e)return;let i=Math.min(Math.max(1,Math.trunc(this.value)||1),e),o=wr(e,this.siblings,this.boundaries,i);this.withEdges&&t.append(this.#t("«",1,i,{ariaLabel:"First page",disabled:i<=1})),this.withControls&&t.append(this.#t("‹",i-1,i,{ariaLabel:"Previous page",disabled:i<=1}));for(let s of o){if(s==="dots"){let a=document.createElement("span");a.className="dots",a.textContent="…",a.setAttribute("aria-hidden","true"),t.append(a);continue}t.append(this.#t(String(s),s,i,{ariaLabel:`Page ${s}`,disabled:!1}))}this.withControls&&t.append(this.#t("›",i+1,i,{ariaLabel:"Next page",disabled:i>=e})),this.withEdges&&t.append(this.#t("»",e,i,{ariaLabel:"Last page",disabled:i>=e}))}};l("mt-pagination",Ae);function Di(r){let t=getComputedStyle(document.documentElement).getPropertyValue(`--mt-breakpoint-${r}`).trim();if(!t){let i=parseFloat(r);return Number.isNaN(i)?0:i}let e=parseFloat(t);return Number.isNaN(e)?0:t.endsWith("px")?e:e*16}var kr=n`
  :host {
    display: block;
    position: relative;
    --app-shell-navbar-offset: 0px;
    --app-shell-aside-offset: 0px;
    --app-shell-header-offset: 0px;
    --app-shell-footer-offset: 0px;
  }
  :host([data-has-header]) { --app-shell-header-offset: var(--app-shell-header-height, 60px); }
  :host([data-has-footer]) { --app-shell-footer-offset: var(--app-shell-footer-height, 0px); }
  :host([data-navbar-visible]) { --app-shell-navbar-offset: var(--app-shell-navbar-width, 300px); }
  :host([data-aside-visible]) { --app-shell-aside-offset: var(--app-shell-aside-width, 300px); }
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--mt-color-overlay);
    z-index: calc(var(--app-shell-z-index, 200) - 1);
  }
  :host([data-navbar-mobile-open]) .backdrop { display: block; }
`,Te=class extends c{static styles=[kr];static props={headerHeight:{css:"--app-shell-header-height",scale:"rem",default:60},navbarWidth:{css:"--app-shell-navbar-width",scale:"rem",default:300},navbarBreakpoint:{default:"sm"},navbarCollapsedMobile:{type:"boolean",default:!0},navbarCollapsedDesktop:{type:"boolean"},asideWidth:{css:"--app-shell-aside-width",scale:"rem",default:300},asideBreakpoint:{default:"md"},asideCollapsedMobile:{type:"boolean",default:!0},asideCollapsedDesktop:{type:"boolean"},footerHeight:{css:"--app-shell-footer-height",scale:"rem"},padding:{css:"--app-shell-padding",scale:"spacing",default:"md"},layout:{default:"default"},withBorder:{type:"boolean",default:!0},zIndex:{css:"--app-shell-z-index",type:"number",default:200},navbarOpened:{type:"boolean"}};#t=null;#e=null;#i=null;#o=()=>this.#r();#a=t=>{let e=t.target;!e||e.tagName!=="MT-BURGER"||(this.navbarOpened=!!t.detail?.opened)};template(){return p`<div class="backdrop" part="backdrop"></div><slot></slot>`}setup(){this.$(".backdrop").addEventListener("click",()=>{this.navbarOpened=!1}),this.addEventListener("toggle",this.#a),this.#i=new MutationObserver(()=>this.#r()),this.#i.observe(this,{childList:!0})}onConnect(){this.#t?.removeEventListener("change",this.#o),this.#e?.removeEventListener("change",this.#o),this.#t=matchMedia(`(max-width: ${Di(this.navbarBreakpoint)}px)`),this.#e=matchMedia(`(max-width: ${Di(this.asideBreakpoint)}px)`),this.#t.addEventListener("change",this.#o),this.#e.addEventListener("change",this.#o),this.#r()}onDisconnect(){this.#t?.removeEventListener("change",this.#o),this.#e?.removeEventListener("change",this.#o),this.#i?.disconnect()}update(t){if(t.has("navbarBreakpoint")||t.has("asideBreakpoint")){this.onConnect();return}this.#r()}#s(){for(let t of this.querySelectorAll("mt-burger"))t.toggleAttribute("opened",this.navbarOpened)}#r(){let t=this.querySelector(":scope > mt-app-shell-header"),e=this.querySelector(":scope > mt-app-shell-footer"),i=this.querySelector(":scope > mt-app-shell-navbar"),o=this.querySelector(":scope > mt-app-shell-aside"),s=this.#t?.matches??!1,a=this.#e?.matches??!1,d=!!i&&!s&&!this.navbarCollapsedDesktop,h=!!i&&s&&(this.navbarOpened||!this.navbarCollapsedMobile),u=!!o&&!a&&!this.asideCollapsedDesktop,m=!!o&&a&&!this.asideCollapsedMobile;this.toggleAttribute("data-has-header",!!t),this.toggleAttribute("data-has-footer",!!e),this.toggleAttribute("data-navbar-visible",d),this.toggleAttribute("data-aside-visible",u),this.toggleAttribute("data-navbar-mobile-open",s&&h);let f=this.layout==="alt",g=!this.withBorder;t&&(t.toggleAttribute("data-no-border",g),t.toggleAttribute("data-offset-left",f&&d),t.toggleAttribute("data-offset-right",f&&u)),e&&(e.toggleAttribute("data-no-border",g),e.toggleAttribute("data-offset-left",f&&d),e.toggleAttribute("data-offset-right",f&&u)),i&&(i.setAttribute("data-mode",s?"mobile":"desktop"),i.setAttribute("data-layout",f?"alt":"default"),i.toggleAttribute("data-hidden",s?!h:!d),i.toggleAttribute("data-no-border",g)),o&&(o.setAttribute("data-mode",a?"mobile":"desktop"),o.setAttribute("data-layout",f?"alt":"default"),o.toggleAttribute("data-hidden",a?!m:!u),o.toggleAttribute("data-no-border",g)),this.#s()}},Oi=r=>n`
  :host {
    display: block;
    position: fixed;
    top: var(--app-shell-header-offset, 0);
    bottom: var(--app-shell-footer-offset, 0);
    ${r==="left"?"left":"right"}: 0;
    width: var(--app-shell-${r==="left"?"navbar":"aside"}-width, 300px);
    overflow-y: auto;
    background: var(--mt-color-body);
    border-${r}: 1px solid var(--mt-color-border);
    z-index: var(--app-shell-z-index, 200);
    padding: var(--mt-spacing-md);
    transition: transform var(--mt-transition);
  }
  :host([data-layout='alt']) { top: 0; bottom: 0; }
  :host([data-no-border]) { border-${r}-color: transparent; }
  :host([data-mode='mobile']) { width: min(100%, var(--app-shell-${r==="left"?"navbar":"aside"}-width, 300px)); box-shadow: var(--mt-shadow-md); }
  :host([data-hidden]) { transform: translateX(${r==="left"?"-100%":"100%"}); }
`,Me=class extends c{static styles=[Oi("left")]},Pe=class extends c{static styles=[Oi("right")]},Ni=r=>n`
  :host {
    display: block;
    position: fixed;
    ${r}: 0;
    left: 0;
    right: 0;
    height: var(--app-shell-${r==="top"?"header":"footer"}-offset, ${r==="top"?"60px":"0px"});
    z-index: var(--app-shell-z-index, 200);
    background: var(--mt-color-body);
    border-${r==="top"?"bottom":"top"}: 1px solid var(--mt-color-border);
  }
  :host([data-no-border]) { border-${r==="top"?"bottom":"top"}-color: transparent; }
  :host([data-offset-left]) { left: var(--app-shell-navbar-offset, 0); }
  :host([data-offset-right]) { right: var(--app-shell-aside-offset, 0); }
  .inner {
    display: flex;
    align-items: center;
    height: 100%;
    gap: var(--mt-spacing-sm);
    padding-inline: var(--mt-spacing-md);
  }
`,Ce=class extends c{static styles=[Ni("top")];template(){return p`<div class="inner" part="inner"><slot></slot></div>`}},$e=class extends c{static styles=[Ni("bottom")];template(){return p`<div class="inner" part="inner"><slot></slot></div>`}},zr=n`
  :host {
    display: block;
    padding-top: var(--app-shell-header-offset, 0);
    padding-bottom: var(--app-shell-footer-offset, 0);
    padding-left: var(--app-shell-navbar-offset, 0);
    padding-right: var(--app-shell-aside-offset, 0);
  }
  .inner { padding: var(--app-shell-padding, 0); }
`,He=class extends c{static styles=[zr];template(){return p`<div class="inner" part="inner"><slot></slot></div>`}};l("mt-app-shell",Te);l("mt-app-shell-header",Ce);l("mt-app-shell-navbar",Me);l("mt-app-shell-aside",Pe);l("mt-app-shell-main",He);l("mt-app-shell-footer",$e);var Er=n`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --_size: 1.5rem;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  :host([size='xs']) { --_size: 0.75rem; }
  :host([size='sm']) { --_size: 1.125rem; }
  :host([size='md']) { --_size: 1.5rem; }
  :host([size='lg']) { --_size: 2.125rem; }
  :host([size='xl']) { --_size: 2.625rem; }

  .root {
    all: unset;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    padding: 0.5rem;
    border-radius: var(--mt-radius-default);
    cursor: pointer;
  }
  .root:hover { background: var(--mt-color-hover); }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }

  .box { position: relative; width: var(--_size); height: var(--_size); }
  .line {
    position: absolute;
    left: 0;
    right: 0;
    height: var(--_line-size, 0.125rem);
    background: var(--_color, var(--mt-color-text));
    border-radius: 1px;
    transition: transform var(--_duration, 300ms) ease, opacity var(--_duration, 300ms) ease, background var(--mt-transition);
  }
  .line-top { top: 15%; }
  .line-mid { top: 50%; transform: translateY(-50%); }
  .line-bot { bottom: 15%; }
  :host([opened]) .line-top { top: 50%; transform: translateY(-50%) rotate(45deg); }
  :host([opened]) .line-mid { opacity: 0; }
  :host([opened]) .line-bot { bottom: auto; top: 50%; transform: translateY(-50%) rotate(-45deg); }
`,De=class extends c{static styles=[Er];static props={opened:{type:"boolean"},size:{default:"md"},color:{css:"--_color",scale:"color"},lineSize:{css:"--_line-size",scale:"rem"},transitionDuration:{type:"number",default:300},ariaLabel:{attr:"aria-label",default:"Toggle navigation"},controls:{}};#t=new MutationObserver(()=>this.#i());template(){return p`
      <button class="root" part="root" type="button">
        <span class="box" part="box" aria-hidden="true">
          <span class="line line-top"></span>
          <span class="line line-mid"></span>
          <span class="line line-bot"></span>
        </span>
      </button>
    `}setup(){this.$(".root").addEventListener("click",()=>{this.opened=!this.opened,this.#e()?.toggleAttribute("opened",this.opened),this.emit("toggle",{opened:this.opened})})}onDisconnect(){this.#t.disconnect()}#e(){return this.controls?document.getElementById(this.controls):null}#i(){let t=this.#e();t&&this.toggleAttribute("opened",t.hasAttribute("opened"))}update(t){let e=this.$(".root");if(t.has("opened")&&e.setAttribute("aria-expanded",String(this.opened)),t.has("ariaLabel")&&e.setAttribute("aria-label",this.ariaLabel),t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),t.has("controls")){this.#t.disconnect();let i=this.#e();i?(e.setAttribute("aria-controls",i.id),this.#t.observe(i,{attributes:!0,attributeFilter:["opened"]}),this.#i()):e.removeAttribute("aria-controls")}}};l("mt-burger",De);var Ii=!1;function Lr(){if(Ii)return;Ii=!0;let r=new CSSStyleSheet;r.replaceSync(`
    mt-table > table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--mt-font-size-sm);
      color: var(--mt-color-text);
      caption-side: bottom;
    }
    mt-table[caption-side='top'] > table { caption-side: top; }
    mt-table > table > caption {
      margin-top: var(--mt-spacing-xs);
      font-size: var(--mt-font-size-xs);
      color: var(--mt-color-dimmed);
    }
    mt-table > table thead th {
      text-align: start;
      font-weight: 700;
      border-bottom: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table > table th, mt-table > table td {
      padding-block: var(--_vspace, var(--mt-spacing-xs));
      padding-inline: var(--_hspace, var(--mt-spacing-xs));
    }
    mt-table[with-table-border] > table {
      border: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table[with-column-borders] > table :is(th, td) + :is(th, td) {
      border-inline-start: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table:not([with-row-borders='false']) > table tbody tr:not(:last-child) > :is(th, td) {
      border-bottom: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table[striped] > table tbody tr:nth-child(odd),
    mt-table[striped='odd'] > table tbody tr:nth-child(odd) {
      background: var(--_striped, var(--mt-color-striped));
    }
    mt-table[striped='even'] > table tbody tr:nth-child(even) {
      background: var(--_striped, var(--mt-color-striped));
    }
    mt-table[highlight-on-hover] > table tbody tr:hover {
      background: var(--_hover, var(--mt-color-hover));
    }
    mt-table[sticky-header] > table thead th {
      position: sticky;
      top: var(--_sticky-offset, 0);
      z-index: 1;
      background: var(--mt-color-body);
    }
    mt-table[layout='fixed'] > table { table-layout: fixed; }
  `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,r]}var Sr=n`
  :host { display: block; }
`,Oe=class extends c{static styles=[Sr];static props={striped:{},highlightOnHover:{type:"boolean"},withTableBorder:{type:"boolean"},withColumnBorders:{type:"boolean"},withRowBorders:{type:"boolean",default:!0},verticalSpacing:{css:"--_vspace",scale:"spacing"},horizontalSpacing:{css:"--_hspace",scale:"spacing"},captionSide:{default:"bottom"},stickyHeader:{type:"boolean"},stickyHeaderOffset:{css:"--_sticky-offset",scale:"rem"},layout:{default:"auto"},stripedColor:{css:"--_striped",scale:"color"},highlightOnHoverColor:{css:"--_hover",scale:"color"},borderColor:{css:"--_border",scale:"color"}};constructor(){super(),Lr()}},Ar=n`
  :host {
    display: block;
    overflow: auto;
    min-width: var(--_min-w, auto);
    max-width: 100%;
    max-height: var(--_max-h, none);
  }
`,Ne=class extends c{static styles=[Ar];static props={minWidth:{css:"--_min-w",scale:"rem"},maxHeight:{css:"--_max-h",scale:"rem"}}};l("mt-table",Oe);l("mt-table-scroll-container",Ne);function Fi(r){return Math.min(100,Math.max(0,r))}var Ri=n`
  .bar[data-striped] {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }
  .bar[data-animated] { animation: mt-progress-stripes 1s linear infinite; }
  @keyframes mt-progress-stripes {
    from { background-position: 1rem 0; }
    to { background-position: 0 0; }
  }
`,Tr=n`
  :host { display: block; width: 100%; --_size: 0.5rem; }
  :host([size='xs']) { --_size: 0.1875rem; }
  :host([size='sm']) { --_size: 0.3125rem; }
  :host([size='md']) { --_size: 0.5rem; }
  :host([size='lg']) { --_size: 0.75rem; }
  :host([size='xl']) { --_size: 1rem; }
  .track {
    position: relative;
    width: 100%;
    height: var(--_size);
    background: light-dark(var(--mt-color-gray-2), var(--mt-color-dark-4));
    border-radius: var(--_radius, var(--mt-radius-xl));
    overflow: hidden;
  }
  .bar {
    height: 100%;
    width: var(--_value, 0%);
    background: var(--mt-c-filled);
    transition: width var(--_duration, 100ms) ease;
  }
`,Ie=class extends c{static styles=[Tr,Ri];static props={value:{type:"number",default:0},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"xl"},striped:{type:"boolean"},animated:{type:"boolean"},transitionDuration:{type:"number",default:100}};template(){return p`<div class="track" part="track"><div class="bar" part="bar"></div></div>`}setup(){this.setAttribute("role","progressbar"),this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100")}update(t){let e=this.$(".bar");if(t.has("value")){let i=Fi(this.value);e.style.setProperty("--_value",`${i}%`),this.setAttribute("aria-valuenow",String(i))}t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),t.has("striped")&&e.toggleAttribute("data-striped",this.striped),t.has("animated")&&e.toggleAttribute("data-animated",this.animated)}},Mr=n`
  :host {
    display: flex;
    width: 100%;
    --_size: 0.5rem;
    height: var(--_size);
    border-radius: var(--_radius, var(--mt-radius-xl));
    background: light-dark(var(--mt-color-gray-2), var(--mt-color-dark-4));
    overflow: hidden;
  }
  :host([size='xs']) { --_size: 0.1875rem; }
  :host([size='sm']) { --_size: 0.3125rem; }
  :host([size='md']) { --_size: 0.5rem; }
  :host([size='lg']) { --_size: 0.75rem; }
  :host([size='xl']) { --_size: 1rem; }
`,Fe=class extends c{static styles=[Mr];static props={size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"xl"}}},Pr=n`
  :host { display: block; height: 100%; flex: 0 0 auto; width: var(--_value, 0%); }
  .bar { height: 100%; display: flex; background: var(--mt-c-filled); }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: var(--mt-font-size-xs);
    font-weight: 700;
    color: var(--mt-white);
    white-space: nowrap;
    overflow: hidden;
    padding-inline: 0.3rem;
  }
`,Re=class extends c{static styles=[Pr,Ri];static props={value:{type:"number",default:0},color:{color:!0},striped:{type:"boolean"},animated:{type:"boolean"}};template(){return p`<div class="bar" part="bar"><span class="label" part="label"><slot></slot></span></div>`}setup(){this.setAttribute("role","progressbar"),this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100")}update(t){if(t.has("value")){let i=Fi(this.value);this.style.setProperty("--_value",`${i}%`),this.setAttribute("aria-valuenow",String(i))}let e=this.$(".bar");t.has("striped")&&e.toggleAttribute("data-striped",this.striped),t.has("animated")&&e.toggleAttribute("data-animated",this.animated)}};l("mt-progress",Ie);l("mt-progress-root",Fe);l("mt-progress-section",Re);var Cr=n`
  :host { display: block; }
`,Be=class extends c{static styles=[Cr]};l("mt-box",Be);var $r=n`
  :host {
    display: inline;
    --_fz: inherit;
    --_lh: inherit;
  }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_lh: var(--mt-line-height-xs); }
  :host([size='sm']) { --_fz: var(--mt-font-size-sm); --_lh: var(--mt-line-height-sm); }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_lh: var(--mt-line-height-md); }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_lh: var(--mt-line-height-lg); }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_lh: var(--mt-line-height-xl); }
  :host([inherit]) { --_fz: inherit; --_lh: inherit; }

  .root {
    display: inline;
    font-size: var(--_fz);
    line-height: var(--_lh);
    font-weight: var(--_fw, inherit);
    color: var(--_color, var(--mt-color-anchor));
    text-decoration: none;
    cursor: pointer;
  }
  :host(:not([underline])) .root:hover,
  :host([underline='hover']) .root:hover,
  :host([underline='always']) .root,
  :host([underline='not-hover']) .root {
    text-decoration: underline;
  }
  :host([underline='not-hover']) .root:hover,
  :host([underline='never']) .root:hover {
    text-decoration: none;
  }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; border-radius: 2px; }

  :host([truncate]) .root, :host([truncate='end']) .root {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :host([truncate='start']) .root {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
    text-align: left;
  }
  :host([line-clamp]) .root {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--_clamp, 3);
    overflow: hidden;
  }
`,je=class extends c{static styles=[$r];static props={href:{},target:{},rel:{},underline:{default:"hover"},c:{css:"--_color",scale:"color"},size:{},fw:{css:"--_fw",type:"number"},inherit:{type:"boolean"},truncate:{},lineClamp:{css:"--_clamp",type:"number"}};template(){return p`<a class="root" part="root"><slot></slot></a>`}update(){let t=this.$(".root");this.href?t.setAttribute("href",this.href):t.removeAttribute("href"),this.target?t.setAttribute("target",this.target):t.removeAttribute("target"),this.rel?t.setAttribute("rel",this.rel):t.removeAttribute("rel")}};l("mt-anchor",je);var Hr=n`
  :host { display: block; }

  .root {
    display: inherit;
    flex-direction: inherit;
    flex-wrap: inherit;
    align-items: inherit;
    justify-content: inherit;
    align-content: inherit;
    gap: inherit;
    row-gap: inherit;
    column-gap: inherit;
    grid-template-columns: inherit;
    grid-template-rows: inherit;
    grid-auto-flow: inherit;
    place-items: inherit;
    width: 100%;
    height: 100%;
    font: inherit;
    color: inherit;
    text-align: inherit;
    text-decoration: none;
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .root:disabled, :host([data-disabled]) .root {
    cursor: not-allowed;
    color: var(--mt-color-disabled-color);
  }
`,qe=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[Hr];static props={type:{default:"button"},href:{},target:{},disabled:{type:"boolean"}};internals=this.attachInternals();template(){return p`<button class="root" part="root" type="button"><slot></slot></button>`}setup(){this.addEventListener("click",t=>{if(this.disabled){t.preventDefault(),t.stopImmediatePropagation();return}let e=this.internals.form;e&&(this.type==="submit"?e.requestSubmit():this.type==="reset"&&e.reset())})}update(t){t.has("href")&&this.#t();let e=this.$(".root");if(e instanceof HTMLButtonElement)e.disabled=this.disabled;else{e.setAttribute("href",this.href??"");let i=this.getAttribute("target");i?e.setAttribute("target",i):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",this.disabled),e.tabIndex=this.disabled?-1:0}this.toggleAttribute("data-disabled",this.disabled)}#t(){let t=this.$(".root"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let i=document.createElement(e.toLowerCase());i.className=t.className,i.setAttribute("part","root"),e==="BUTTON"&&i.setAttribute("type","button"),i.append(...t.childNodes),t.replaceWith(i)}};l("mt-unstyled-button",qe);var Dr=n`
  :host {
    display: block;
    width: 100%;
    --_fit: cover;
    --_radius: 0;
  }
  .root {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: var(--_fit);
    border-radius: var(--_radius);
  }
`,Ve=class extends c{static styles=[Dr];static props={src:{},alt:{},fit:{css:"--_fit",default:"cover"},radius:{css:"--_radius",scale:"radius"},fallbackSrc:{},loading:{}};#t=!1;template(){return p`<img class="root" part="root" alt="" />`}get#e(){return this.$(".root")}setup(){this.#e.addEventListener("error",()=>{this.fallbackSrc&&this.#e.src!==new URL(this.fallbackSrc,location.href).href&&(this.#t=!0,this.#e.src=this.fallbackSrc)})}update(t){t.has("src")?(this.#t=!1,this.#e.src=this.src??""):t.has("fallbackSrc")&&this.#t&&this.fallbackSrc&&(this.#e.src=this.fallbackSrc),this.#e.alt=this.alt??"",this.loading?this.#e.loading=this.loading:this.#e.removeAttribute("loading")}};l("mt-image",Ve);var Or=n`
  :host {
    display: block;
    position: relative;
    --_ratio: 1;
    aspect-ratio: var(--_ratio);
  }
  ::slotted(*) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`,We=class extends c{static styles=[Or];static props={ratio:{css:"--_ratio",scale:"raw",default:"1"}}};l("mt-aspect-ratio",We);var Bi={xs:22,sm:28,md:34,lg:44,xl:60},Nr=n`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex: 0 0 auto;
    --_size: 2.125rem;
    width: var(--_size);
    height: var(--_size);
    --_radius: var(--mt-radius-default);
    --_bg: var(--mt-c-filled);
    --_color: var(--mt-white);
    --_bd: transparent;
    color: var(--_color);
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
  }

  :host([variant='light']) { --_bg: var(--mt-c-light); --_color: var(--mt-c-light-color); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='default']) { --_bg: var(--mt-color-default); --_color: var(--mt-color-default-color); --_bd: var(--mt-color-default-border); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_color: var(--mt-white); }

  ::slotted(*) { width: 60%; height: 60%; }
`,Xe=class extends c{static styles=[Nr];static props={variant:{default:"filled"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};update(t){if(!t.has("size"))return;let e=Bi[this.size]??(/^-?\d*\.?\d+$/.test(this.size)?parseFloat(this.size):Bi.md);this.style.setProperty("--_size",`${e/16}rem`)}};l("mt-theme-icon",Xe);var Ir=n`
  :host { display: inline; }
  :host([block]) { display: block; }

  .root {
    display: inline;
    font-family: var(--mt-font-family-monospace);
    font-size: var(--mt-font-size-xs);
    background: var(--mt-color-code-bg);
    color: inherit;
    border-radius: var(--mt-radius-sm);
    padding: 0.125em 0.4em;
  }
  :host([color]) .root { background: var(--mt-c-light); color: var(--mt-c-light-color); }

  :host([block]) .root {
    display: block;
    padding: var(--mt-spacing-sm);
    overflow-x: auto;
    white-space: pre;
    border-radius: var(--mt-radius-sm);
  }
`,Ue=class extends c{static styles=[Ir];static props={color:{color:!0},block:{type:"boolean"}};template(){return p`<code class="root" part="root"><slot></slot></code>`}};l("mt-code",Ue);var Fr=n`
  :host {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,Ye=class extends c{static styles=[Fr]};l("mt-visually-hidden",Ye);var Rr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="60%" height="60%"><path d="M18 6 6 18M6 6l12 12"/></svg>',Br=n`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --_size: 2.125rem;
    --_radius: var(--mt-radius-default);
    --_hover: var(--mt-c-light-hover);
    --_color: var(--mt-c-light-color);
  }
  :host([size='xs']) { --_size: 1.375rem; }
  :host([size='sm']) { --_size: 1.75rem; }
  :host([size='md']) { --_size: 2.125rem; }
  :host([size='lg']) { --_size: 2.75rem; }
  :host([size='xl']) { --_size: 3.75rem; }
  :host([variant='transparent']) { --_hover: transparent; }

  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    flex: 0 0 auto;
    padding: 0;
    color: var(--_color);
    background: transparent;
    border: 0;
    border-radius: var(--_radius);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .root:hover:not(:disabled) { background: var(--_hover); }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .root:disabled {
    color: var(--mt-color-disabled-color);
    cursor: not-allowed;
  }
`,Ke=class extends c{static styles=[Br];static props={variant:{default:"subtle"},color:{color:!0,default:"gray"},size:{default:"md"},radius:{css:"--_radius",scale:"radius"},disabled:{type:"boolean"},ariaLabel:{attr:"aria-label"}};template(){return p`<button class="root" part="root" type="button"><slot>${Rr}</slot></button>`}update(){let t=this.$(".root");t.disabled=this.disabled,t.setAttribute("aria-label",this.ariaLabel??"Close")}};l("mt-close-button",Ke);var jr=n`
  :host {
    position: absolute;
    inset: 0;
    display: block;
    --_bg: color-mix(in srgb, #000 60%, transparent);
    --_z: 200;
    --_radius: 0;
  }
  :host([fixed]) { position: fixed; }

  .root {
    position: absolute;
    inset: 0;
    background: var(--_gradient, var(--_bg));
    border-radius: var(--_radius);
    z-index: var(--_z);
  }
  :host([blur]) .root { backdrop-filter: var(--_filter, none); }
  :host([center]) .root { display: flex; align-items: center; justify-content: center; }
`,Ge=class extends c{static styles=[jr];static props={color:{default:"#000"},backgroundOpacity:{type:"number",default:.6},backdropBlur:{attr:"blur",type:"number"},gradient:{},radius:{css:"--_radius",scale:"radius"},zIndex:{css:"--_z",scale:"raw",type:"number",default:200},center:{type:"boolean"},fixed:{type:"boolean"}};template(){return p`<div class="root" part="root"><slot></slot></div>`}update(t){if(t.has("color")||t.has("backgroundOpacity")){let e=(this.backgroundOpacity??.6)*100;this.style.setProperty("--_bg",`color-mix(in srgb, ${this.color??"#000"} ${e}%, transparent)`)}t.has("gradient")&&(this.gradient?this.style.setProperty("--_gradient",this.gradient):this.style.removeProperty("--_gradient")),t.has("backdropBlur")&&(this.backdropBlur?this.style.setProperty("--_filter",`blur(${this.backdropBlur/16}rem)`):this.style.removeProperty("--_filter"))}};l("mt-overlay",Ge);var qr=n`
  :host {
    display: block;
    --_h: auto;
    --_w: 100%;
    --_radius: var(--mt-radius-default);
    position: relative;
  }
  .wrap { position: relative; display: block; height: var(--_h); width: var(--_w); }
  ::slotted(*) { visibility: visible; }
  :host(:not([visible='false'])) ::slotted(*) { visibility: hidden; }

  .skeleton { display: none; }
  :host(:not([visible='false'])) .skeleton {
    display: block;
    position: absolute;
    inset: 0;
    border-radius: var(--_radius);
    background: var(--mt-color-disabled);
    overflow: hidden;
  }
  :host([circle]) .skeleton { border-radius: 50%; }

  .skeleton::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-color-text) 12%, transparent), transparent);
    transform: translateX(-100%);
  }
  :host(:not([animate='false'])) .skeleton::after {
    animation: mt-skeleton-wave 1.5s ease-in-out infinite;
  }
  @keyframes mt-skeleton-wave {
    to { transform: translateX(100%); }
  }
`,Ze=class extends c{static styles=[qr];static props={height:{css:"--_h",scale:"rem"},width:{css:"--_w",scale:"rem",default:"100%"},circle:{type:"boolean"},radius:{css:"--_radius",scale:"radius"},animate:{type:"boolean",default:!0},visible:{type:"boolean",default:!0}};template(){return p`
      <span class="wrap" part="wrap">
        <slot></slot>
        <span class="skeleton" part="skeleton" aria-hidden="true"></span>
      </span>
    `}};l("mt-skeleton",Ze);var Vr=n`
  :host {
    display: block;
    --_fz: var(--mt-font-size-sm);
    --_lh: var(--mt-line-height-sm);
    --_spacing: 0;
    font-size: var(--_fz);
    line-height: var(--_lh);
    color: var(--mt-color-text);
  }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_lh: var(--mt-line-height-xs); }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_lh: var(--mt-line-height-md); }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_lh: var(--mt-line-height-lg); }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_lh: var(--mt-line-height-xl); }

  .root {
    margin: 0;
    padding-inline-start: 1.25rem;
    list-style-type: disc;
  }
  :host([type='ordered']) .root { list-style-type: decimal; }
  :host([with-padding]) .root { padding-inline-start: 2rem; }
  :host([list-style-type]) .root { list-style-type: var(--_list-style); }
  :host([center]) .root { list-style: none; padding-inline-start: 0; }

  ::slotted(mt-list-item) { margin-block-start: var(--_spacing); }
  ::slotted(mt-list-item:first-child) { margin-block-start: 0; }
`,Qe=class extends c{static styles=[Vr];static props={type:{default:"unordered"},size:{default:"sm"},spacing:{css:"--_spacing",scale:"spacing"},center:{type:"boolean"},withPadding:{type:"boolean"},listStyleType:{css:"--_list-style",scale:"raw"}};template(){return p`
      <ul class="root" part="root">
        <slot name="icon" hidden></slot>
        <slot></slot>
      </ul>
    `}setup(){this.setAttribute("role","list"),this.$('slot[name="icon"]').addEventListener("slotchange",()=>this.#t()),this.$("slot:not([name])").addEventListener("slotchange",()=>this.#t())}onConnect(){this.#t()}update(t){if(!t.has("type"))return;let e=this.type==="ordered"?"OL":"UL",i=this.$(".root");if(i.tagName===e)return;let o=document.createElement(e.toLowerCase());o.className=i.className,o.setAttribute("part","root"),o.append(...i.childNodes),i.replaceWith(o)}#t(){let t=this.$('slot[name="icon"]').assignedElements(),e=t.length>0;for(let i of this.querySelectorAll(":scope > mt-list-item")){i.querySelector(":scope > [data-cloned-icon]")?.remove();let o=i.querySelector(':scope > [slot="icon"]:not([data-cloned-icon])')!==null;if(i.toggleAttribute("data-has-icon",e||o),e&&!o){let s=t[0].cloneNode(!0);s.setAttribute("slot","icon"),s.setAttribute("data-cloned-icon",""),i.insertBefore(s,i.firstChild)}}}},Wr=n`
  :host {
    display: list-item;
  }
  :host([data-has-icon]) {
    display: flex;
    align-items: flex-start;
    gap: var(--mt-spacing-xs);
    list-style: none;
  }
  .icon { display: none; flex: 0 0 auto; align-items: center; margin-top: 0.1em; }
  :host([data-has-icon]) .icon { display: flex; }
  .content { flex: 1; min-width: 0; }
`,Je=class extends c{static styles=[Wr];setup(){this.setAttribute("role","listitem")}template(){return p`
      <span class="icon" part="icon"><slot name="icon"></slot></span>
      <span class="content" part="content"><slot></slot></span>
    `}};l("mt-list",Qe);l("mt-list-item",Je);var ji=!1;function Xr(){if(ji)return;ji=!0;let r=new CSSStyleSheet;r.replaceSync(`
    mt-typography {
      display: block;
      font-size: var(--mt-font-size-sm);
      line-height: var(--mt-line-height-md);
      color: var(--mt-color-text);
    }
    mt-typography[size='xs'] { font-size: var(--mt-font-size-xs); }
    mt-typography[size='md'] { font-size: var(--mt-font-size-md); }
    mt-typography[size='lg'] { font-size: var(--mt-font-size-lg); }
    mt-typography[size='xl'] { font-size: var(--mt-font-size-xl); }
    mt-typography > :first-child { margin-top: 0; }
    mt-typography > :last-child { margin-bottom: 0; }

    mt-typography p { margin: var(--mt-spacing-sm) 0; }

    mt-typography h1, mt-typography h2, mt-typography h3,
    mt-typography h4, mt-typography h5, mt-typography h6 {
      font-family: var(--mt-font-family-headings);
      font-weight: var(--mt-heading-font-weight);
      color: var(--mt-color-text);
      margin: var(--mt-spacing-xl) 0 var(--mt-spacing-sm);
    }
    mt-typography h1 { font-size: var(--mt-h1-font-size); line-height: var(--mt-h1-line-height); }
    mt-typography h2 { font-size: var(--mt-h2-font-size); line-height: var(--mt-h2-line-height); }
    mt-typography h3 { font-size: var(--mt-h3-font-size); line-height: var(--mt-h3-line-height); }
    mt-typography h4 { font-size: var(--mt-h4-font-size); line-height: var(--mt-h4-line-height); }
    mt-typography h5 { font-size: var(--mt-h5-font-size); line-height: var(--mt-h5-line-height); }
    mt-typography h6 { font-size: var(--mt-h6-font-size); line-height: var(--mt-h6-line-height); }

    mt-typography a {
      color: var(--mt-color-anchor);
      text-decoration: underline;
    }
    mt-typography a:hover { text-decoration: none; }

    mt-typography ul, mt-typography ol {
      margin: var(--mt-spacing-sm) 0;
      padding-inline-start: 2rem;
    }
    mt-typography li { margin-block: 0.25rem; }
    mt-typography li::marker { color: var(--mt-color-dimmed); }

    mt-typography blockquote {
      margin: var(--mt-spacing-md) 0;
      padding: var(--mt-spacing-sm) var(--mt-spacing-md);
      border-inline-start: 3px solid var(--mt-color-border);
      color: var(--mt-color-dimmed);
      background: var(--mt-color-hover);
    }

    mt-typography code {
      font-family: var(--mt-font-family-monospace);
      font-size: 0.85em;
      background: var(--mt-color-code-bg);
      border-radius: var(--mt-radius-sm);
      padding: 0.1em 0.4em;
    }
    mt-typography pre {
      margin: var(--mt-spacing-md) 0;
      padding: var(--mt-spacing-sm);
      background: var(--mt-color-code-bg);
      border-radius: var(--mt-radius-sm);
      overflow-x: auto;
      white-space: pre;
    }
    mt-typography pre code { background: none; padding: 0; }

    mt-typography img { max-width: 100%; border-radius: var(--mt-radius-sm); }

    mt-typography hr {
      margin: var(--mt-spacing-lg) 0;
      border: 0;
      border-top: 1px solid var(--mt-color-border);
    }

    mt-typography table {
      width: 100%;
      margin: var(--mt-spacing-md) 0;
      font-size: var(--mt-font-size-sm);
      border-collapse: collapse;
    }
    mt-typography th, mt-typography td {
      padding: var(--mt-spacing-xs) var(--mt-spacing-sm);
      border: 1px solid var(--mt-color-border);
      text-align: start;
    }
    mt-typography th { font-weight: 700; }

    mt-typography kbd {
      font-family: var(--mt-font-family-monospace);
      font-size: 0.85em;
      padding: 0.1em 0.4em;
      background: light-dark(var(--mt-color-gray-0), var(--mt-color-dark-6));
      border: 1px solid var(--mt-color-border);
      border-bottom-width: 2px;
      border-radius: var(--mt-radius-sm);
    }
  `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,r]}var ti=class extends c{static props={size:{default:"sm"}};constructor(){super(),Xr()}};l("mt-typography",ti);var Ur=n`
  :host { display: contents; }
`,ei=class extends c{static styles=[Ur];static props={value:{},timeout:{type:"number",default:1e3}};#t;template(){return p`<slot></slot><slot name="copied" hidden></slot>`}setup(){this.addEventListener("click",()=>this.#e())}onDisconnect(){window.clearTimeout(this.#t)}#e(){!this.value||!navigator.clipboard||navigator.clipboard.writeText(this.value).then(()=>{this.#i(!0),this.emit("copy",{value:this.value}),window.clearTimeout(this.#t),this.#t=window.setTimeout(()=>this.#i(!1),this.timeout||1e3)}).catch(()=>{})}#i(t){this.toggleAttribute("copied",t),this.$("slot:not([name])").hidden=t,this.$('slot[name="copied"]').hidden=!t}};l("mt-copy-button",ei);var qi=!1;function Yr(){qi||(qi=!0,document.addEventListener("click",r=>{let t=r.composedPath();for(let e of t){if(!(e instanceof Element))continue;let i=e.getAttribute("data-mt-toggle");if(!i)continue;let o=document.getElementById(i);if(!o)return;let s=!o.hasAttribute("opened");o.toggleAttribute("opened",s),e.setAttribute("aria-expanded",String(s));return}}))}Yr();var Kr=n`
  :host { display: block; }
  .box {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--_duration, 200ms) var(--_easing, ease);
  }
  :host([opened]) .box { grid-template-rows: 1fr; }
  .content { overflow: hidden; min-height: 0; }
  :host([data-animate-opacity]) .content {
    opacity: 0;
    transition: opacity var(--_duration, 200ms) var(--_easing, ease);
  }
  :host([data-animate-opacity][opened]) .content { opacity: 1; }
`,ii=class extends c{static styles=[Kr];static props={opened:{type:"boolean"},transitionDuration:{type:"number",default:200},transitionTimingFunction:{default:"ease"},animateOpacity:{type:"boolean",default:!0}};template(){return p`<div class="box" part="box"><div class="content" part="content"><slot></slot></div></div>`}get#t(){return this.$(".content")}update(t){t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),t.has("transitionTimingFunction")&&this.style.setProperty("--_easing",this.transitionTimingFunction),t.has("animateOpacity")&&this.toggleAttribute("data-animate-opacity",this.animateOpacity),t.has("opened")&&this.#t.toggleAttribute("inert",!this.opened)}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}};l("mt-collapse",ii);var Gr=n`
  :host { display: block; position: relative; overflow: hidden; }
  .viewport {
    width: 100%;
    height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }
  .viewport::-webkit-scrollbar { display: none; }
  :host([offset-scrollbars='true']) .viewport,
  :host([offset-scrollbars='']) .viewport { padding-inline-end: var(--_sb-size, 0.5rem); padding-block-end: var(--_sb-size, 0.5rem); }
  :host([offset-scrollbars='x']) .viewport { padding-inline-end: var(--_sb-size, 0.5rem); }
  :host([offset-scrollbars='y']) .viewport { padding-block-end: var(--_sb-size, 0.5rem); }

  .scrollbar {
    position: absolute;
    display: none;
    z-index: 2;
    opacity: 0;
    transition: opacity 150ms ease;
    pointer-events: none;
    touch-action: none;
  }
  .scrollbar[data-visible] { opacity: 1; pointer-events: auto; }
  :host([type='always']) .scrollbar, :host([type='auto']) .scrollbar { opacity: 1; pointer-events: auto; }
  :host([type='never']) .scrollbar { display: none !important; }

  :host([data-overflow-x]) .scrollbar-x { display: block; }
  :host([data-overflow-y]) .scrollbar-y { display: block; }
  :host([scrollbars='x']) .scrollbar-y { display: none !important; }
  :host([scrollbars='y']) .scrollbar-x { display: none !important; }

  .scrollbar-x { left: 0; right: 0; bottom: 0; height: var(--_sb-size, 0.5rem); }
  :host([data-overflow-y]:not([scrollbars='x'])) .scrollbar-x { right: var(--_sb-size, 0.5rem); }
  .scrollbar-y { top: 0; bottom: 0; right: 0; width: var(--_sb-size, 0.5rem); }
  :host([data-overflow-x]:not([scrollbars='y'])) .scrollbar-y { bottom: var(--_sb-size, 0.5rem); }

  .thumb {
    position: absolute;
    background: var(--mt-color-dimmed);
    opacity: 0.5;
    border-radius: 999px;
    cursor: pointer;
  }
  .thumb:hover, .thumb:active { opacity: 0.7; }
  .scrollbar-x .thumb { top: 0; bottom: 0; }
  .scrollbar-y .thumb { left: 0; right: 0; }

  .corner {
    position: absolute;
    right: 0;
    bottom: 0;
    width: var(--_sb-size, 0.5rem);
    height: var(--_sb-size, 0.5rem);
    display: none;
  }
  :host([data-overflow-x][data-overflow-y]:not([scrollbars='x']):not([scrollbars='y'])) .corner { display: block; }
`,W=class extends c{static styles=[Gr];static props={type:{default:"hover"},scrollbarSize:{css:"--_sb-size",scale:"rem",default:8},scrollHideDelay:{type:"number",default:1e3},offsetScrollbars:{},scrollbars:{default:"xy"}};#t=!1;#e=0;#i=new ResizeObserver(()=>this.#l());template(){return p`
      <div class="viewport" part="viewport" tabindex="0"><slot></slot></div>
      <div class="scrollbar scrollbar-x" part="scrollbar" data-orientation="horizontal"><div class="thumb" part="thumb"></div></div>
      <div class="scrollbar scrollbar-y" part="scrollbar" data-orientation="vertical"><div class="thumb" part="thumb"></div></div>
      <div class="corner" part="corner"></div>
    `}get viewport(){return this.$(".viewport")}get#o(){return this.$(".scrollbar-x")}get#a(){return this.$(".scrollbar-y")}get#s(){return this.$(".scrollbar-x .thumb")}get#r(){return this.$(".scrollbar-y .thumb")}setup(){let t=this.viewport;t.addEventListener("scroll",()=>{this.#l(),this.emit("scroll-position-change",{x:t.scrollLeft,y:t.scrollTop}),(this.type==="hover"||this.type==="scroll")&&this.#h()}),this.addEventListener("mouseenter",()=>{this.#t=!0,this.type==="hover"&&this.#n(!0)}),this.addEventListener("mouseleave",()=>{this.#t=!1,this.type==="hover"&&this.#d()}),this.#s.addEventListener("pointerdown",o=>this.#c(o,"x")),this.#r.addEventListener("pointerdown",o=>this.#c(o,"y")),this.#o.addEventListener("pointerdown",o=>this.#p(o,"x")),this.#a.addEventListener("pointerdown",o=>this.#p(o,"y"));let e=this.root.querySelector("slot"),i=()=>{this.#i.disconnect(),this.#i.observe(t);for(let o of e.assignedElements())this.#i.observe(o);this.#l()};e.addEventListener("slotchange",i),i()}update(t){t.has("type")&&(this.type==="always"||this.type==="auto")&&this.#l()}#n(t){this.#s.parentElement.toggleAttribute("data-visible",t),this.#r.parentElement.toggleAttribute("data-visible",t)}#h(){clearTimeout(this.#e),this.#n(!0),this.#d()}#d(){clearTimeout(this.#e),!(this.type==="always"||this.type==="auto"||this.type==="never")&&(this.#e=window.setTimeout(()=>{this.type==="hover"&&this.#t||this.#n(!1)},this.scrollHideDelay))}#l(){let t=this.viewport,e=t.clientWidth,i=t.scrollWidth,o=t.clientHeight,s=t.scrollHeight,a=i>e+1,d=s>o+1;if(this.toggleAttribute("data-overflow-x",a),this.toggleAttribute("data-overflow-y",d),this.#o.toggleAttribute("data-overflow",a),this.#a.toggleAttribute("data-overflow",d),a){let h=this.#o.clientWidth,u=Math.max(20,h*e/i),m=Math.max(0,h-u),f=i-e>0?t.scrollLeft/(i-e):0;this.#s.style.width=`${u}px`,this.#s.style.transform=`translateX(${f*m}px)`}if(d){let h=this.#a.clientHeight,u=Math.max(20,h*o/s),m=Math.max(0,h-u),f=s-o>0?t.scrollTop/(s-o):0;this.#r.style.height=`${u}px`,this.#r.style.transform=`translateY(${f*m}px)`}}#c(t,e){t.preventDefault(),t.stopPropagation();let i=this.viewport,o=e==="x"?this.#s:this.#r,s=e==="x"?this.#o:this.#a;o.setPointerCapture(t.pointerId);let a=e==="x"?s.clientWidth:s.clientHeight,d=e==="x"?o.offsetWidth:o.offsetHeight,h=e==="x"?i.scrollWidth:i.scrollHeight,u=e==="x"?i.clientWidth:i.clientHeight,m=e==="x"?t.clientX:t.clientY,f=e==="x"?i.scrollLeft:i.scrollTop,g=a-d,x=h-u;this.#n(!0);let y=_=>{let I=e==="x"?_.clientX:_.clientY,K=g>0?(I-m)/g*x:0;e==="x"?i.scrollLeft=f+K:i.scrollTop=f+K},v=_=>{o.releasePointerCapture(_.pointerId),o.removeEventListener("pointermove",y),o.removeEventListener("pointerup",v),(this.type==="hover"||this.type==="scroll")&&this.#d()};o.addEventListener("pointermove",y),o.addEventListener("pointerup",v)}#p(t,e){if(t.target!==(e==="x"?this.#o:this.#a))return;let i=this.viewport,o=e==="x"?this.#o:this.#a,s=e==="x"?this.#s:this.#r,a=o.getBoundingClientRect(),d=e==="x"?a.width:a.height,h=e==="x"?s.offsetWidth:s.offsetHeight,u=e==="x"?i.scrollWidth:i.scrollHeight,m=e==="x"?i.clientWidth:i.clientHeight,f=(e==="x"?t.clientX-a.left:t.clientY-a.top)-h/2,g=d-h,y=(g>0?Math.min(1,Math.max(0,f/g)):0)*(u-m);e==="x"?i.scrollTo({left:y,behavior:"smooth"}):i.scrollTo({top:y,behavior:"smooth"})}},Zr=n`
  .viewport { height: auto; max-height: inherit; }
`,oi=class extends W{static styles=[...W.styles,Zr]};l("mt-scroll-area",W);l("mt-scroll-area-autosize",oi);var Qr=n`
  :host { display: contents; }
  .dropdown {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: var(--mt-spacing-md);
    border: 1px solid var(--mt-color-border);
    border-radius: var(--_radius, var(--mt-radius-default));
    background: var(--mt-color-dropdown);
    color: var(--mt-color-text);
    box-shadow: var(--_shadow, var(--mt-shadow-md));
    z-index: var(--mt-z-popover);
    opacity: 0;
    transform: scale(0.9);
    transition: opacity var(--mt-transition), transform var(--mt-transition);
  }
  .dropdown:popover-open { opacity: 1; transform: scale(1); }
  .dropdown:not(:popover-open) { display: none; }

  .arrow { display: none; position: absolute; width: 0.625rem; height: 0.625rem; background: inherit; border: inherit; transform: rotate(45deg); }
  :host([with-arrow]) .arrow { display: block; }
  .dropdown[data-placement^='top'] .arrow { bottom: -0.3125rem; left: calc(50% - 0.3125rem); border-top: 0; border-left: 0; }
  .dropdown[data-placement^='bottom'] .arrow { top: -0.3125rem; left: calc(50% - 0.3125rem); border-bottom: 0; border-right: 0; }
  .dropdown[data-placement^='left'] .arrow { right: -0.3125rem; top: calc(50% - 0.3125rem); border-bottom: 0; border-left: 0; }
  .dropdown[data-placement^='right'] .arrow { left: -0.3125rem; top: calc(50% - 0.3125rem); border-top: 0; border-right: 0; }
`,ri=class extends c{static styles=[Qr];static props={radius:{css:"--_radius",scale:"radius"},shadow:{css:"--_shadow",scale:"shadow",default:"md"}};template(){return p`<div class="dropdown" part="dropdown" popover="manual" role="dialog"><slot></slot><div class="arrow" part="arrow"></div></div>`}get box(){return this.$(".dropdown")}show(){this.box.showPopover()}hide(){this.box.matches(":popover-open")&&this.box.hidePopover()}},Jr=n`
  :host { display: contents; }
`,si=class extends c{static styles=[Jr];static props={position:{default:"bottom"},offset:{type:"number",default:8},withArrow:{type:"boolean"},width:{},disabled:{type:"boolean"},opened:{type:"boolean"},openDelay:{type:"number",default:0},closeDelay:{type:"number",default:150},closeOnClickOutside:{type:"boolean",default:!0}};#t=null;#e=null;#i=!1;#o=0;template(){return p`<slot name="target"></slot><slot></slot>`}get#a(){return this.querySelector(':scope > [slot="target"]')}get#s(){return this.querySelector(":scope > mt-hover-card-dropdown")}#r=()=>this.#h(!0);#n=()=>this.#h(!1);setup(){this.addEventListener("mouseenter",this.#r,!0),this.addEventListener("mouseleave",this.#n,!0),this.addEventListener("focusin",this.#r),this.addEventListener("focusout",this.#n)}update(t){(t.has("opened")||t.has("disabled"))&&(this.opened&&!this.disabled?this.#d():this.#l())}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}#h(t){if(this.disabled)return;clearTimeout(this.#o);let e=t?this.openDelay:this.closeDelay;this.#o=window.setTimeout(()=>t?this.open():this.close(),e)}#d(){let t=this.#a,e=this.#s;!t||!e||this.#i||(this.#i=!0,e.toggleAttribute("with-arrow",this.withArrow),e.show(),this.width&&this.width!=="target"&&(e.box.style.width=A("rem",this.width)),this.#t=S(t,e.box,{placement:this.position,offset:this.offset,matchWidth:this.width==="target"}),this.#e=T([this,e],i=>{i==="outside"&&!this.closeOnClickOutside||this.close()}),this.emit("open"))}#l(){this.#i&&(this.#i=!1,this.#t?.(),this.#t=null,this.#e?.(),this.#e=null,this.#s?.hide(),this.emit("close"))}};l("mt-hover-card-dropdown",ri);l("mt-hover-card",si);var ts=n`
  :host { display: inline-block; --_fz: var(--mt-font-size-sm); --_pad-y: 0.375rem; --_pad-x: 0.75rem; }
  :host([full-width]) { display: block; }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_pad-y: 0.25rem; --_pad-x: 0.5rem; }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_pad-y: 0.5rem; --_pad-x: 1rem; }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_pad-y: 0.625rem; --_pad-x: 1.25rem; }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_pad-y: 0.75rem; --_pad-x: 1.5rem; }

  .root {
    position: relative;
    display: inline-flex;
    gap: 0.125rem;
    padding: 0.25rem;
    background: light-dark(var(--mt-color-gray-1), var(--mt-color-dark-8));
    border-radius: var(--_radius, var(--mt-radius-default));
  }
  :host([full-width]) .root { display: flex; width: 100%; }
  :host([orientation='vertical']) .root { flex-direction: column; }
  :host([disabled]) .root { opacity: 0.6; }

  .indicator {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: light-dark(var(--mt-white), var(--mt-color-dark-5));
    border-radius: calc(var(--_radius, var(--mt-radius-default)) - 0.125rem);
    box-shadow: var(--mt-shadow-xs);
    opacity: 0;
    transition: transform var(--_duration, 200ms) var(--_easing, ease), width var(--_duration, 200ms) var(--_easing, ease), height var(--_duration, 200ms) var(--_easing, ease), opacity 150ms ease;
  }
  :host([data-color]) .indicator { background: var(--mt-c-filled); box-shadow: none; }

  .segment { position: relative; z-index: 1; display: flex; }
  :host([full-width]) .segment { flex: 1; }
  .radio {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: var(--_pad-y) var(--_pad-x);
    font-size: var(--_fz);
    line-height: 1.2;
    font-weight: 500;
    color: light-dark(var(--mt-color-gray-7), var(--mt-color-dark-1));
    border-radius: calc(var(--_radius, var(--mt-radius-default)) - 0.125rem);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: color 150ms ease;
  }
  .label:hover { color: light-dark(var(--mt-black), var(--mt-white)); }
  .radio:checked + .label { color: light-dark(var(--mt-black), var(--mt-white)); }
  :host([data-color]) .radio:checked + .label { color: var(--mt-white); }
  .radio:disabled + .label { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .radio:disabled + .label:hover { color: var(--mt-color-disabled-color); }
  :host([disabled]) .label, :host([readonly]) .label { cursor: not-allowed; }
  .radio:focus-visible + .label { outline: 2px solid var(--mt-color-primary-filled); outline-offset: 2px; }
`,ai=class extends b{static styles=[ts];static props={...b.props,value:{},color:{color:!0},readonly:{type:"boolean"},orientation:{default:"horizontal"},fullWidth:{type:"boolean"},transitionDuration:{type:"number",default:200},transitionTimingFunction:{default:"ease"}};#t=z("mt-sc");#e=[];#i="";#o=new ResizeObserver(()=>this.#l(!1));#a=new MutationObserver(()=>{this.#r(),this.#n()});template(){return p`<div id="control" class="root" part="root" role="radiogroup" tabindex="-1"><div class="indicator" part="indicator"></div></div>`}get#s(){return this.$(".root")}get value(){return this.#i}set value(t){this.#i=t??"",this.setFormValue(this.#i===""?null:this.#i),this.#h()}setup(){super.setup(),this.#r(),this.toggleAttribute("data-color",!!this.getAttribute("color")),this.#n(),this.#o.observe(this.#s),this.#a.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value","disabled"],characterData:!0}),this.addEventListener("keydown",t=>this.#c(t))}update(t){super.update(t),t.has("color")&&this.toggleAttribute("data-color",!!this.getAttribute("color")),t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),t.has("transitionTimingFunction")&&this.style.setProperty("--_easing",this.transitionTimingFunction),t.has("value")&&this.hasAttribute("value")&&(this.value=this.getAttribute("value")),(t.has("disabled")||t.has("readonly"))&&this.#d()}#r(){this.#e=Array.from(this.children).filter(t=>t.tagName==="OPTION").map(t=>({value:t.getAttribute("value")??t.textContent?.trim()??"",label:t.textContent?.trim()??"",disabled:t.hasAttribute("disabled")}))}#n(){let t=this.#s;t.querySelectorAll(".segment").forEach(e=>e.remove()),!this.#i&&this.#e.length&&(this.#i=this.#e.find(e=>!e.disabled)?.value??"");for(let e of this.#e){let i=document.createElement("label");i.className="segment";let o=document.createElement("input");o.type="radio",o.className="radio",o.name=this.#t,o.value=e.value,o.disabled=e.disabled||this.isDisabled,o.checked=e.value===this.#i,o.addEventListener("change",()=>{this.getAttribute("readonly")===null&&(this.#i=e.value,this.setFormValue(this.#i===""?null:this.#i),this.#l(!0),this.emit("change",{value:this.#i}))});let s=document.createElement("span");s.className="label",s.textContent=e.label,i.append(o,s),t.append(i)}this.#d(),requestAnimationFrame(()=>this.#l(!1))}#h(){for(let t of this.root.querySelectorAll(".radio"))t.checked=t.value===this.#i;this.#l(!0)}#d(){let t=this.getAttribute("readonly")!==null;for(let e of this.root.querySelectorAll(".radio")){let i=this.#e.find(o=>o.value===e.value);e.disabled=(i?.disabled??!1)||this.isDisabled||t}}#l(t){let e=this.$(".indicator"),i=this.root.querySelector(".radio:checked"),o=i?.parentElement;if(!i||!o){e.style.opacity="0";return}t||(e.style.transition="none"),e.style.opacity="1",e.style.width=`${o.offsetWidth}px`,e.style.height=`${o.offsetHeight}px`,e.style.transform=`translate(${o.offsetLeft}px, ${o.offsetTop}px)`,t||(e.getBoundingClientRect(),e.style.transition="")}#c(t){if(this.isDisabled||this.getAttribute("readonly")!==null)return;let e=this.orientation==="vertical"?t.key==="ArrowDown":t.key==="ArrowRight",i=this.orientation==="vertical"?t.key==="ArrowUp":t.key==="ArrowLeft";if(!e&&!i)return;t.preventDefault();let o=this.#e.filter(d=>!d.disabled);if(!o.length)return;let s=o.findIndex(d=>d.value===this.#i),a=o[(s+(e?1:-1)+o.length)%o.length];this.#i=a.value,this.setFormValue(this.#i===""?null:this.#i),this.#h(),this.root.querySelector(`.radio[value="${CSS.escape(a.value)}"]`)?.focus(),this.emit("change",{value:this.#i})}formResetCallback(){this.value=this.getAttribute("value")??this.#e.find(t=>!t.disabled)?.value??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-segmented-control",ai);var es='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>',is=L,ni=class extends b{static styles=[E,is];static props={...b.props,value:{},variant:{default:"default"}};#t=new MutationObserver(()=>this.#e());template(){return k(p`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <select id="control" class="input" part="input" style="padding-inline-end:var(--_height)"></select>
        <div class="section right" part="right-section" aria-hidden="true">${es}</div>
      </div>
    `)}get select(){return this.$("#control")}get value(){return this.select.value}set value(t){this.select.value=t??"",this.setFormValue(this.select.value)}setup(){super.setup(),this.#e(),this.#t.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value","disabled","selected","label"],characterData:!0}),this.select.addEventListener("input",()=>this.setFormValue(this.select.value)),this.select.addEventListener("change",()=>this.forwardChange())}update(t){super.update(t),t.has("value")&&this.hasAttribute("value")&&(this.value=this.getAttribute("value"))}#e(){let t=this.getAttribute("value"),e=this.select.selectedOptions[0]?.value;this.select.innerHTML="";for(let o of Array.from(this.children))(o.tagName==="OPTION"||o.tagName==="OPTGROUP")&&this.select.append(o.cloneNode(!0));let i=t??e;i!=null&&[...this.select.options].some(o=>o.value===i)&&(this.select.value=i),this.setFormValue(this.select.value)}formResetCallback(){this.value=this.getAttribute("value")??this.select.options[0]?.value??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-native-select",ni);var os='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg>',rs=n`
  :host { position: relative; }
  :host([clearable]) .input { padding-inline-end: calc(var(--_height) * 1.1); }
  :host([loading]) .input { padding-inline-end: calc(var(--_height) * 1.1); }
  :host([clearable][loading]) .input { padding-inline-end: calc(var(--_height) * 1.7); }

  .section.right { width: auto; min-width: var(--_height); justify-content: flex-end; padding-inline-end: 0.5rem; gap: 0.25rem; }
  .clear {
    all: unset;
    pointer-events: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    flex: none;
  }
  .clear:hover { background: var(--mt-color-hover); color: var(--mt-color-text); }
  .clear svg { width: 0.625rem; height: 0.625rem; }
  .clear[hidden] { display: none; }

  .loader { width: 1rem; height: 1rem; flex: none; border-radius: 50%; border: 0.125rem solid var(--mt-color-border); border-top-color: var(--mt-color-primary-filled); animation: mt-ac-spin 0.6s linear infinite; }
  .loader[hidden] { display: none; }
  @keyframes mt-ac-spin { to { transform: rotate(360deg); } }

  .dropdown {
    box-sizing: border-box;
    max-height: var(--_max-dropdown-height, 15.625rem);
    overflow-y: auto;
    background: var(--mt-color-dropdown);
    border: 1px solid var(--mt-color-border);
    border-radius: var(--_radius);
    box-shadow: var(--mt-shadow-md);
    padding: 0.25rem;
  }
  .dropdown:not(:popover-open) { display: none; }
  .option {
    padding: 0.5rem;
    border-radius: var(--mt-radius-sm);
    font-size: var(--_fz);
    color: var(--mt-color-text);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .option.highlighted { background: var(--mt-color-hover); }
  .group-label { padding: 0.375rem 0.5rem 0.125rem; font-size: var(--mt-font-size-xs); font-weight: 600; color: var(--mt-color-dimmed); text-transform: uppercase; }
`,li=class extends b{static styles=[E,L,rs];static props={...b.props,value:{},placeholder:{},variant:{default:"default"},readonly:{type:"boolean"},autofocus:{type:"boolean"},clearable:{type:"boolean"},loading:{type:"boolean"},limit:{type:"number"},maxDropdownHeight:{css:"--_max-dropdown-height",scale:"rem",default:250}};#t=[];#e=[];#i=-1;#o=!1;#a;#s;#r=new MutationObserver(()=>{this.#v(),this.#c()});template(){return k(p`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" role="combobox" aria-haspopup="listbox"
               aria-expanded="false" aria-controls="dropdown" aria-autocomplete="list" autocomplete="off" spellcheck="false" />
        <div class="section right" part="right-section">
          <span class="loader" part="loader" aria-hidden="true" hidden></span>
          <button type="button" class="clear" part="clear-button" aria-label="Clear value" tabindex="-1" hidden>${os}</button>
        </div>
      </div>
      <div id="dropdown" class="dropdown" part="dropdown" popover="manual" role="listbox"></div>
    `)}get input(){return this.$("#control")}get field(){return this.$(".field")}get dropdown(){return this.$("#dropdown")}get clearBtn(){return this.$(".clear")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value===""?null:this.input.value),this.#n()}setup(){super.setup(),this.#v(),this.#e=this.#t,this.#r.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value","label"],characterData:!0}),this.input.addEventListener("focus",()=>this.#d()),this.input.addEventListener("click",()=>this.#d()),this.input.addEventListener("blur",()=>this.#l()),this.input.addEventListener("input",()=>{this.setFormValue(this.input.value===""?null:this.input.value),this.#n(),this.#o?this.#c():this.#d()}),this.input.addEventListener("keydown",t=>this.#h(t)),this.clearBtn.addEventListener("mousedown",t=>t.preventDefault()),this.clearBtn.addEventListener("click",t=>{t.stopPropagation(),!(this.isDisabled||this.getAttribute("readonly")!==null)&&(this.value="",this.input.focus(),this.#c())})}update(t){if(super.update(t),t.has("placeholder")){let e=this.getAttribute("placeholder");e?this.input.setAttribute("placeholder",e):this.input.removeAttribute("placeholder")}if(t.has("autofocus")&&this.input.toggleAttribute("autofocus",this.getAttribute("autofocus")!==null),t.has("readonly")){let e=this.getAttribute("readonly")!==null;this.input.readOnly=e,e&&this.#l()}t.has("disabled")&&this.isDisabled&&this.#l(),t.has("value")&&(this.value=this.getAttribute("value")??""),t.has("loading")&&(this.$(".loader").hidden=!this.loading),(t.has("clearable")||t.has("disabled")||t.has("readonly"))&&this.#n(),t.has("limit")&&this.#o&&this.#c()}#n(){let t=this.getAttribute("readonly")!==null;this.clearBtn.hidden=!(this.clearable&&this.input.value!==""&&!this.isDisabled&&!t)}#h(t){if(!(this.isDisabled||this.getAttribute("readonly")!==null))switch(t.key){case"ArrowDown":t.preventDefault(),this.#o?this.#p(1):this.#d();break;case"ArrowUp":t.preventDefault(),this.#o?this.#p(-1):this.#d();break;case"Enter":if(this.#o){let e=this.#e[this.#i];e&&(t.preventDefault(),this.#m(e))}break;case"Escape":this.#o&&(t.preventDefault(),this.#l());break}}#d(){this.#o||this.isDisabled||this.getAttribute("readonly")!==null||(this.#o=!0,this.input.setAttribute("aria-expanded","true"),this.#c(),this.#s=T([this],()=>this.#l()))}#l(){this.#o&&(this.#o=!1,this.input.setAttribute("aria-expanded","false"),this.input.removeAttribute("aria-activedescendant"),this.dropdown.hidePopover(),this.#a?.(),this.#a=void 0,this.#s?.(),this.#s=void 0)}#c(){let t=this.input.value.trim().toLowerCase(),e=t?this.#t.filter(i=>i.label.toLowerCase().includes(t)):this.#t;if(this.limit&&(e=e.slice(0,this.limit)),this.#e=e,!this.#e.length){this.#l();return}this.dropdown.matches(":popover-open")||(this.dropdown.showPopover(),this.#a=S(this.field,this.dropdown,{matchWidth:!0,offset:4})),this.#f(),this.#i=-1}#p(t){let e=this.#e.length;e&&this.#u((this.#i+t+e)%e)}#u(t){this.#i=t;for(let i of this.dropdown.querySelectorAll(".option"))i.classList.remove("highlighted");let e=t>=0?this.dropdown.querySelector(`.option[data-index="${t}"]`):null;e?(e.classList.add("highlighted"),this.input.setAttribute("aria-activedescendant",e.id),e.scrollIntoView({block:"nearest"})):this.input.removeAttribute("aria-activedescendant")}#m(t){this.value=t.value,this.emit("option-submit",{value:t.value}),this.#l(),this.input.focus()}#f(){let t=this.dropdown;t.innerHTML="";let e="\0";this.#e.forEach((i,o)=>{if(i.group!==e&&(e=i.group,i.group)){let a=document.createElement("div");a.className="group-label",a.textContent=i.group,t.append(a)}let s=document.createElement("div");s.id=`ac-opt-${o}`,s.className="option",s.setAttribute("role","option"),s.dataset.index=String(o),s.textContent=i.label,s.addEventListener("mousedown",a=>a.preventDefault()),s.addEventListener("click",()=>this.#m(i)),t.append(s)})}#v(){let t=[],e=(i,o)=>{let s=i.getAttribute("value")??i.textContent?.trim()??"";return{value:s,label:i.textContent?.trim()||s,group:o}};for(let i of Array.from(this.children))if(i.tagName==="OPTION")t.push(e(i));else if(i.tagName==="OPTGROUP"){let o=i.getAttribute("label")||"";for(let s of i.querySelectorAll(":scope > option"))t.push(e(s,o))}this.#t=t}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};l("mt-autocomplete",li);function w(r,t,e){return Math.min(Math.max(r,t),e)}function X(r){if(!r)return 0;let t=String(r).split(".");return t.length>1?t[1].length:0}function N(r,t,e){return e===t?0:w((r-t)/(e-t)*100,0,100)}function U(r){let{pct:t,min:e,max:i,step:o,precision:s}=r,a=w(t,0,1)*(i-e),d=o?Math.round(a/o)*o:a,h=w(d+e,e,i),u=s??X(o);return Number(h.toFixed(u))}function dt(r){if(!r)return[];try{let t=JSON.parse(r);if(!Array.isArray(t))return[];let e=[];for(let i of t)typeof i=="number"?e.push({value:i}):i&&typeof i=="object"&&typeof i.value=="number"&&e.push({value:i.value,label:i.label});return e}catch{return[]}}function ct(r,t){return t.length?t.reduce((e,i)=>Math.abs(i-r)<Math.abs(e-r)?i:e,t[0]):r}function ht(r){if(r.childNodes.length===0)return;let t=document.createElement("div");for(let e of Array.from(r.childNodes))t.appendChild(e.cloneNode(!0));return t.innerHTML.trim()?t.innerHTML:void 0}function Y(r,t){return(r??"{value}").replace("{value}",String(t))}function pt(r,t,e){return r.map(i=>{let o=N(i.value,t,e),s=i.labelHtml?`<span class="mark-label" part="mark-label">${i.labelHtml}</span>`:i.label?`<span class="mark-label" part="mark-label">${gt(i.label)}</span>`:"";return`<span class="mark" part="mark" data-value="${i.value}" style="left:${o}%">${s}</span>`}).join("")}var ut=n`
  :host { display: block; width: 100%; --_size: 0.5rem; --_thumb-size: calc(var(--_size) * 2); --_radius: var(--mt-radius-xl); }
  :host([size='xs']) { --_size: 0.25rem; }
  :host([size='sm']) { --_size: 0.375rem; }
  :host([size='lg']) { --_size: 0.625rem; }
  :host([size='xl']) { --_size: 0.75rem; }
`,mt=n`
  .root { position: relative; padding-block: calc(var(--_thumb-size) / 2); outline: none; -webkit-tap-highlight-color: transparent; touch-action: none; }
  .track-container { position: relative; width: 100%; }
  .track { position: relative; height: var(--_size); border-radius: var(--_radius); background: light-dark(var(--mt-color-gray-2), var(--mt-color-dark-4)); cursor: pointer; }
  :host([disabled]) .track { cursor: not-allowed; }

  .bar { position: absolute; top: 0; bottom: 0; background: var(--mt-c-filled); border-radius: var(--_radius); }
  :host([disabled]) .bar { background: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); }

  .thumb {
    position: absolute;
    top: 50%;
    width: var(--_thumb-size);
    height: var(--_thumb-size);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--mt-color-body);
    border: 2px solid var(--mt-c-filled);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    outline: none;
    box-shadow: var(--mt-shadow-sm);
    z-index: 2;
  }
  .thumb:active { cursor: grabbing; }
  .thumb:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([disabled]) .thumb { background: light-dark(var(--mt-color-gray-1), var(--mt-color-dark-5)); border-color: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); cursor: not-allowed; box-shadow: none; }

  .label {
    position: absolute;
    bottom: calc(100% + 0.625rem);
    left: 50%;
    transform: translate(-50%, 4px) scale(0.4);
    padding: 0.125rem 0.5rem;
    border-radius: var(--mt-radius-sm);
    background: var(--mt-c-filled);
    color: var(--mt-white);
    font-size: var(--mt-font-size-xs);
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: transform 100ms ease, opacity 100ms ease;
  }
  .thumb.hover-label:hover .label,
  .thumb.dragging .label,
  .thumb.always-on .label { opacity: 1; transform: translate(-50%, 0) scale(1); }
  .label[hidden] { display: none !important; }

  .marks { position: absolute; inset: 0; }
  .mark {
    position: absolute;
    top: 50%;
    width: var(--_size);
    height: var(--_size);
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3));
    border: 2px solid var(--mt-color-body);
    pointer-events: none;
  }
  .mark[data-filled] { background: var(--mt-c-filled); border-color: var(--mt-c-filled); }
  :host([disabled]) .mark[data-filled] { background: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); border-color: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); }
  .mark-label {
    position: absolute;
    top: calc(100% + var(--mt-spacing-xs));
    left: 50%;
    transform: translate(-50%, 0);
    font-size: var(--mt-font-size-xs);
    color: var(--mt-color-dimmed);
    white-space: nowrap;
  }
`;var di=class extends c{static props={value:{type:"number",default:0},label:{}};onConnect(){this.style.display="none"}update(){this.emit("mark-change")}},ci=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[ut,mt];static props={value:{type:"number"},min:{type:"number",default:0},max:{type:"number",default:100},step:{type:"number",default:1},precision:{type:"number"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"xl"},thumbSize:{css:"--_thumb-size",scale:"rem"},thumbLabel:{},label:{type:"boolean",default:!0},labelFormat:{default:"{value}"},labelAlwaysOn:{type:"boolean"},showLabelOnHover:{type:"boolean",default:!0},marks:{},restrictToMarks:{type:"boolean"},inverted:{type:"boolean"},disabled:{type:"boolean"},name:{}};internals=this.attachInternals();#t=0;#e=[];#i=!1;template(){return p`
      <div class="root" part="root">
        <div class="track-container" part="track-container">
          <div class="track" part="track">
            <div class="bar" part="bar"></div>
            <div class="marks" part="marks"></div>
            <div class="thumb" part="thumb" role="slider" tabindex="0">
              <slot name="thumb-children"></slot>
              <div class="label" part="label"></div>
            </div>
          </div>
        </div>
      </div>
    `}get value(){return this.#t}set value(t){this.#n(Number(t),!1),this.#h()}get isDisabled(){return this.disabled||this.#i}formDisabledCallback(t){this.#i=t,this.requestUpdate("disabled")}formResetCallback(){let t=this.getAttribute("value");this.#n(t!==null?Number(t):this.min,!1)}formStateRestoreCallback(t){typeof t=="string"&&this.#n(Number(t),!1)}setup(){let t=this.getAttribute("value");this.#t=w(t!==null&&t!==""&&!Number.isNaN(Number(t))?Number(t):this.min,this.min,this.max),this.addEventListener("mark-change",()=>this.#a()),this.$(".track-container").addEventListener("pointerdown",e=>this.#d(e)),this.$(".thumb").addEventListener("keydown",e=>this.#c(e)),this.internals.setFormValue(String(this.#t)),this.#a()}update(t){if((t.has("marks")||t.has("min")||t.has("max"))&&this.#a(),t.has("value")){let i=this.getAttribute("value");if(i!==null&&i!==""){let o=Number(i);Number.isNaN(o)||this.#n(o,!1)}}let e=this.$(".thumb");t.has("disabled")&&(e.tabIndex=this.isDisabled?-1:0,this.toggleAttribute("aria-disabled",this.isDisabled)),t.has("thumbLabel")&&this.thumbLabel&&e.setAttribute("aria-label",this.thumbLabel),t.has("showLabelOnHover")&&e.classList.toggle("hover-label",this.showLabelOnHover),this.#r()}#o(){return this.precision??X(this.step)}#a(){let t=this.getAttribute("marks");t?this.#e=dt(t):this.#e=Array.from(this.querySelectorAll(":scope > mt-slider-mark")).map(e=>({value:Number(e.getAttribute("value")??"0"),label:e.getAttribute("label")??void 0,labelHtml:ht(e)})),this.$(".marks").innerHTML=pt(this.#e,this.min,this.max),this.#s()}#s(){for(let t of this.root.querySelectorAll(".mark")){let e=Number(t.dataset.value),i=this.inverted?e>=this.#t:e<=this.#t;t.toggleAttribute("data-filled",i)}}#r(){let t=N(this.#t,this.min,this.max),e=this.$(".bar"),i=this.$(".thumb");this.inverted?(e.style.left=`${t}%`,e.style.width=`${100-t}%`):(e.style.left="0%",e.style.width=`${t}%`),i.style.left=`${t}%`,i.setAttribute("aria-valuenow",String(this.#t)),i.setAttribute("aria-valuemin",String(this.min)),i.setAttribute("aria-valuemax",String(this.max)),i.setAttribute("aria-orientation","horizontal");let o=Y(this.labelFormat,this.#t);i.setAttribute("aria-valuetext",o);let s=this.$(".label");s.textContent=o,s.hidden=!this.label,i.classList.toggle("always-on",this.labelAlwaysOn&&this.label),this.#s()}#n(t,e){let i=Number(w(t,this.min,this.max).toFixed(this.#o()));i!==this.#t&&(this.#t=i,this.internals.setFormValue(String(this.#t)),this.#r(),e&&this.emit("input",{value:i}))}#h(){this.emit("change",{value:this.#t})}#d(t){if(this.isDisabled)return;t.preventDefault();let e=this.$(".thumb"),i=this.$(".track");e.focus(),e.classList.add("dragging");let o=d=>{let h=i.getBoundingClientRect(),u=h.width===0?0:(d.clientX-h.left)/h.width,m=U({pct:u,min:this.min,max:this.max,step:this.step,precision:this.#o()});this.restrictToMarks&&this.#e.length&&(m=ct(m,this.#e.map(f=>f.value))),this.#n(m,!0)},s=d=>o(d),a=d=>{o(d),e.classList.remove("dragging"),window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",a),this.#h()};window.addEventListener("pointermove",s),window.addEventListener("pointerup",a,{once:!0}),o(t)}#l(t){if(this.restrictToMarks&&this.#e.length){let e=[...new Set(this.#e.map(s=>s.value))].sort((s,a)=>s-a),i=e.indexOf(this.#t);i===-1&&(i=e.findIndex(s=>s>=this.#t)),i===-1&&(i=t>0?-1:e.length);let o=w(i+(t>0?1:-1),0,e.length-1);return e[o]}return Number(w(this.#t+t,this.min,this.max).toFixed(this.#o()))}#c(t){if(this.isDisabled)return;let e=this.step||1,i=null;switch(t.key){case"ArrowRight":case"ArrowUp":i=this.#l(e);break;case"ArrowLeft":case"ArrowDown":i=this.#l(-e);break;case"PageUp":i=this.#l(e*10);break;case"PageDown":i=this.#l(-e*10);break;case"Home":i=this.restrictToMarks&&this.#e.length?Math.min(...this.#e.map(o=>o.value)):this.min;break;case"End":i=this.restrictToMarks&&this.#e.length?Math.max(...this.#e.map(o=>o.value)):this.max;break;default:return}t.preventDefault(),this.#n(i,!0),this.#h()}};l("mt-slider",ci);l("mt-slider-mark",di);var ss=n`
  .bar.inverted-a, .bar.inverted-b { display: none; }
  :host([inverted]) .bar.range { display: none; }
  :host([inverted]) .bar.inverted-a, :host([inverted]) .bar.inverted-b { display: block; }
`,hi=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[ut,mt,ss];static props={value:{},min:{type:"number",default:0},max:{type:"number",default:100},step:{type:"number",default:1},precision:{type:"number"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"xl"},thumbSize:{css:"--_thumb-size",scale:"rem"},thumbLabel:{},thumbFromLabel:{},thumbToLabel:{},label:{type:"boolean",default:!0},labelFormat:{default:"{value}"},labelAlwaysOn:{type:"boolean"},showLabelOnHover:{type:"boolean",default:!0},marks:{},restrictToMarks:{type:"boolean"},inverted:{type:"boolean"},disabled:{type:"boolean"},name:{},minRange:{type:"number",default:10},maxRange:{type:"number"},pushOnOverlap:{type:"boolean",default:!0}};internals=this.attachInternals();#t=20;#e=80;#i=!1;#o=[];template(){return p`
      <div class="root" part="root">
        <div class="track-container" part="track-container">
          <div class="track" part="track">
            <div class="bar range" part="bar"></div>
            <div class="bar inverted-a" part="bar"></div>
            <div class="bar inverted-b" part="bar"></div>
            <div class="marks" part="marks"></div>
            <div class="thumb from" part="thumb-from" role="slider" tabindex="0">
              <slot name="thumb-from-children"></slot>
              <div class="label" part="label"></div>
            </div>
            <div class="thumb to" part="thumb-to" role="slider" tabindex="0">
              <slot name="thumb-to-children"></slot>
              <div class="label" part="label"></div>
            </div>
          </div>
        </div>
      </div>
    `}get value(){return[this.#t,this.#e]}set value(t){this.#t=w(Math.min(t[0],t[1]),this.min,this.max),this.#e=w(Math.max(t[0],t[1]),this.min,this.max),this.#c(),this.#u(),this.#p()}get isDisabled(){return this.disabled||this.#i}formDisabledCallback(t){this.#i=t,this.requestUpdate("disabled")}formResetCallback(){let[t,e]=this.#a();this.#t=t,this.#e=e,this.#c(),this.#u()}setup(){let[t,e]=this.#a();this.#t=t,this.#e=e,this.addEventListener("mark-change",()=>this.#r()),this.$(".track-container").addEventListener("pointerdown",i=>this.#m(i)),this.$(".thumb.from").addEventListener("keydown",i=>this.#v(i,0)),this.$(".thumb.to").addEventListener("keydown",i=>this.#v(i,1)),this.#n(),this.#c(),this.#r()}update(t){if((t.has("marks")||t.has("min")||t.has("max"))&&this.#r(),t.has("value")){let[e,i]=this.#a();this.#t=e,this.#e=i}if(t.has("disabled")){for(let e of this.root.querySelectorAll(".thumb"))e.tabIndex=this.isDisabled?-1:0;this.toggleAttribute("aria-disabled",this.isDisabled)}if(t.has("thumbLabel")||t.has("thumbFromLabel")||t.has("thumbToLabel")){let e=this.thumbFromLabel??this.thumbLabel,i=this.thumbToLabel??this.thumbLabel,o=this.$(".thumb.from"),s=this.$(".thumb.to");e?o.setAttribute("aria-label",e):o.removeAttribute("aria-label"),i?s.setAttribute("aria-label",i):s.removeAttribute("aria-label")}if(t.has("showLabelOnHover"))for(let e of this.root.querySelectorAll(".thumb"))e.classList.toggle("hover-label",this.showLabelOnHover);this.#u()}#a(){let t=this.getAttribute("value");if(!t)return[this.min,this.max];let[e,i]=t.split(",").map(Number);return Number.isNaN(e)||Number.isNaN(i)?[this.min,this.max]:[w(e,this.min,this.max),w(i,this.min,this.max)]}#s(){return this.precision??X(this.step)}#r(){let t=this.getAttribute("marks");t?this.#o=dt(t):this.#o=Array.from(this.querySelectorAll(":scope > mt-slider-mark")).map(e=>({value:Number(e.getAttribute("value")??"0"),label:e.getAttribute("label")??void 0,labelHtml:ht(e)})),this.$(".marks").innerHTML=pt(this.#o,this.min,this.max),this.#h()}#n(){let t=Array.from(this.querySelectorAll(':scope > [slot="thumb-children"]'));for(let e of["from","to"]){let i=this.$(`slot[name="thumb-${e}-children"]`),o=this.querySelectorAll(`:scope > [slot="thumb-${e}-children"]`).length>0;if(i.innerHTML="",!o)for(let s of t)i.appendChild(s.cloneNode(!0))}}#h(){for(let t of this.root.querySelectorAll(".mark")){let e=Number(t.dataset.value);t.toggleAttribute("data-filled",e>=this.#t&&e<=this.#e)}}#d(t,e){let i=this.maxRange??1/0,o=this.#t,s=this.#e,a=this.#s(),d=Number(w(e,this.min,this.max).toFixed(a));t===0?(o=Math.min(d,this.max),s-o<this.minRange&&(this.pushOnOverlap?s=w(o+this.minRange,this.min,this.max):o=w(s-this.minRange,this.min,this.max)),s-o>i&&this.pushOnOverlap&&(s=w(o+i,this.min,this.max))):(s=Math.max(d,this.min),s-o<this.minRange&&(this.pushOnOverlap?o=w(s-this.minRange,this.min,this.max):s=w(o+this.minRange,this.min,this.max)),s-o>i&&this.pushOnOverlap&&(o=w(s-i,this.min,this.max))),o>s&&(t===0?s=o:o=s);let h=o!==this.#t||s!==this.#e;this.#t=o,this.#e=s,h&&(this.internals.setFormValue(this.#l()),this.#u())}#l(){let t=new FormData,e=this.getAttribute("name");return e&&(t.append(e,String(this.#t)),t.append(e,String(this.#e))),t}#c(){this.internals.setFormValue(this.#l())}#p(){this.emit("change",{value:[this.#t,this.#e]})}#u(){let t=N(this.#t,this.min,this.max),e=N(this.#e,this.min,this.max),i=this.$(".bar.range");i.style.left=`${t}%`,i.style.width=`${e-t}%`;let o=this.$(".bar.inverted-a");o.style.left="0%",o.style.width=`${t}%`;let s=this.$(".bar.inverted-b");s.style.left=`${e}%`,s.style.width=`${100-e}%`;let a=this.$(".thumb.from"),d=this.$(".thumb.to");a.style.left=`${t}%`,d.style.left=`${e}%`;let h=Y(this.labelFormat,this.#t),u=Y(this.labelFormat,this.#e);for(let[m,f,g]of[[a,this.#t,h],[d,this.#e,u]]){m.setAttribute("aria-valuenow",String(f)),m.setAttribute("aria-valuemin",String(this.min)),m.setAttribute("aria-valuemax",String(this.max)),m.setAttribute("aria-orientation","horizontal"),m.setAttribute("aria-valuetext",g);let x=m.querySelector(".label");x.textContent=g,x.hidden=!this.label,m.classList.toggle("always-on",this.labelAlwaysOn&&this.label)}this.#h()}#m(t){if(this.isDisabled)return;t.preventDefault();let e=this.$(".track"),i=e.getBoundingClientRect(),o=i.width===0?0:(t.clientX-i.left)/i.width,s=U({pct:o,min:this.min,max:this.max,step:this.step,precision:this.#s()}),a=Math.abs(s-this.#t)<=Math.abs(s-this.#e)?0:1,d=this.$(a===0?".thumb.from":".thumb.to");d.focus(),d.classList.add("dragging");let h=f=>{let g=e.getBoundingClientRect(),x=g.width===0?0:(f.clientX-g.left)/g.width,y=U({pct:x,min:this.min,max:this.max,step:this.step,precision:this.#s()});this.restrictToMarks&&this.#o.length&&(y=ct(y,this.#o.map(v=>v.value))),this.#d(a,y),this.emit("input",{value:[this.#t,this.#e]})},u=f=>h(f),m=f=>{h(f),d.classList.remove("dragging"),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",m),this.#p()};window.addEventListener("pointermove",u),window.addEventListener("pointerup",m,{once:!0}),h(t)}#f(t,e){let i=t===0?this.#t:this.#e;if(this.restrictToMarks&&this.#o.length){let o=[...new Set(this.#o.map(d=>d.value))].sort((d,h)=>d-h),s=o.indexOf(i);s===-1&&(s=o.findIndex(d=>d>=i)),s===-1&&(s=e>0?-1:o.length);let a=w(s+(e>0?1:-1),0,o.length-1);return o[a]}return Number(w(i+e,this.min,this.max).toFixed(this.#s()))}#v(t,e){if(this.isDisabled)return;let i=this.step||1,o=null;switch(t.key){case"ArrowRight":case"ArrowUp":o=this.#f(e,i);break;case"ArrowLeft":case"ArrowDown":o=this.#f(e,-i);break;case"PageUp":o=this.#f(e,i*10);break;case"PageDown":o=this.#f(e,-i*10);break;case"Home":o=this.min;break;case"End":o=this.max;break;default:return}t.preventDefault(),this.#d(e,o),this.emit("input",{value:[this.#t,this.#e]}),this.#p()}};l("mt-range-slider",hi);var as=n`
  :host { display: inline-block; --_size: 7.5rem; --_label-offset: 1.5rem; }
  .root { position: relative; width: var(--_size); height: var(--_size); }
  .svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); }
  .label {
    position: absolute;
    inset: var(--_label-offset);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }
`,pi=class extends c{static props={value:{type:"number",default:0},color:{},tooltip:{}};onConnect(){this.style.display="none"}update(){this.emit("section-change")}},ui=class extends c{static styles=[as];static props={size:{type:"number",default:120,css:"--_size",scale:"rem"},thickness:{type:"number",default:12},roundCaps:{type:"boolean"},rootColor:{}};template(){return p`
      <div class="root" part="root">
        <svg class="svg" part="svg"></svg>
        <div class="label" part="label"><slot name="label"></slot></div>
      </div>
    `}setup(){this.addEventListener("section-change",()=>this.#e()),this.root.querySelector('slot[name="label"]')?.addEventListener("slotchange",()=>this.#e())}update(t){t.has("thickness")&&this.style.setProperty("--_label-offset",`${Math.min(this.thickness,this.size/4)*2}px`),this.#e()}#t(){return Array.from(this.querySelectorAll(":scope > mt-ring-progress-section")).map(t=>({value:Number(t.getAttribute("value")??"0"),color:t.getAttribute("color"),tooltip:t.getAttribute("tooltip")}))}#e(){let t=this.size||120,e=Math.min(this.thickness||12,t/4),i=t/2,o=(t-e)/2,s=2*Math.PI*o,a=this.$(".svg");a.setAttribute("viewBox",`0 0 ${t} ${t}`);let d=this.rootColor?$(this.rootColor):"light-dark(var(--mt-color-gray-2), var(--mt-color-dark-4))",h=[`<circle cx="${i}" cy="${i}" r="${o}" fill="none" stroke="${d}" stroke-width="${e}"></circle>`],u=0;for(let m of this.#t()){let f=s*Math.max(m.value,0)/100,g=$(m.color,"var(--mt-color-primary-filled)"),x=this.roundCaps?"round":"butt",y=m.tooltip?`<title>${m.tooltip.replace(/[&<>"']/g,v=>`&#${v.charCodeAt(0)};`)}</title>`:"";h.push(`<circle cx="${i}" cy="${i}" r="${o}" fill="none" stroke="${g}" stroke-width="${e}" stroke-linecap="${x}" stroke-dasharray="${f} ${s-f}" stroke-dashoffset="${-u}">${y}</circle>`),u+=f}a.innerHTML=h.join("")}};l("mt-ring-progress",ui);l("mt-ring-progress-section",pi);var ns=[["xs","36em"],["sm","48em"],["md","62em"],["lg","75em"],["xl","88em"]],mi=(r,t)=>ns.map(([e,i])=>`@media (min-width: ${i}) { :host([${r}-${e}]) { ${t}: var(--_${r}-${e}); } }`).join(`
`),Vi='<svg viewBox="0 0 24 24" width="40%" height="40%" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',ls=n`
  :host {
    display: block;
    position: relative;
    --_slide-size: 100%;
    --_slide-gap: 0px;
    --_slides-to-scroll: 1;
    --_align: center;
    --_controls-offset: var(--mt-spacing-sm);
    --_control-size: 1.625rem;
    --_height: auto;
    --_indicator-w: 1.875rem;
    --_indicator-active-w: 2.5rem;
  }
  ${mi("slide-size","--_slide-size")}
  ${mi("slide-gap","--_slide-gap")}
  ${mi("slides-to-scroll","--_slides-to-scroll")}

  .viewport {
    position: relative;
    overflow: hidden;
    border-radius: var(--_radius, 0);
  }
  .container {
    display: flex;
    height: var(--_height);
    gap: var(--_slide-gap);
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    outline: none;
    touch-action: pan-y;
  }
  .container::-webkit-scrollbar { display: none; }
  .container.dragging { scroll-snap-type: none; scroll-behavior: auto; cursor: grabbing; user-select: none; }
  :host([drag-free]) .container { scroll-snap-type: none; }

  :host([orientation='vertical']) .container {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    touch-action: pan-x;
  }
  :host([orientation='vertical'][drag-free]) .container { scroll-snap-type: none; }

  .control {
    position: absolute;
    z-index: 2;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--_control-size);
    height: var(--_control-size);
    transform: translateY(-50%);
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    box-shadow: var(--mt-shadow-md);
    cursor: pointer;
    opacity: 1;
    transition: opacity var(--mt-transition), background-color var(--mt-transition);
  }
  .control:hover:not(:disabled) { background: var(--mt-color-hover); }
  .control:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .control:disabled { opacity: 0.4; cursor: not-allowed; }
  .control.prev { inset-inline-start: var(--_controls-offset); }
  .control.next { inset-inline-end: var(--_controls-offset); }
  :host([with-controls='false']) .control { display: none; }

  :host([orientation='vertical']) .control {
    top: auto;
    inset-inline-start: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
  :host([orientation='vertical']) .control.prev { top: var(--_controls-offset); inset-inline-end: auto; }
  :host([orientation='vertical']) .control.next { bottom: var(--_controls-offset); top: auto; inset-inline-end: auto; }

  .indicators {
    display: none;
    position: absolute;
    z-index: 2;
    bottom: var(--_controls-offset);
    inset-inline-start: 0;
    inset-inline-end: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    pointer-events: none;
  }
  :host([with-indicators]) .indicators { display: flex; }
  :host([orientation='vertical']) .indicators {
    bottom: 0;
    top: 0;
    inset-inline-start: auto;
    inset-inline-end: var(--_controls-offset);
    flex-direction: column;
    width: auto;
  }
  .indicator {
    pointer-events: all;
    width: var(--_indicator-w);
    height: 0.25rem;
    padding: 0;
    border: none;
    border-radius: var(--mt-radius-xl);
    background: var(--mt-white);
    opacity: 0.6;
    cursor: pointer;
    transition: opacity var(--mt-transition), width var(--mt-transition);
  }
  .indicator[data-active] { opacity: 1; --_indicator-w: var(--_indicator-active-w); }
  :host([orientation='vertical']) .indicator { width: 0.25rem; height: var(--_indicator-w); }
`,fi=class extends c{static styles=[ls];static props={orientation:{default:"horizontal"},slideSize:{attr:"slide-size",css:"--_slide-size",default:"100%"},slideGap:{attr:"slide-gap",css:"--_slide-gap",scale:"spacing",default:0},slideSizeXs:{attr:"slide-size-xs",css:"--_slide-size-xs"},slideSizeSm:{attr:"slide-size-sm",css:"--_slide-size-sm"},slideSizeMd:{attr:"slide-size-md",css:"--_slide-size-md"},slideSizeLg:{attr:"slide-size-lg",css:"--_slide-size-lg"},slideSizeXl:{attr:"slide-size-xl",css:"--_slide-size-xl"},slideGapXs:{attr:"slide-gap-xs",css:"--_slide-gap-xs",scale:"spacing"},slideGapSm:{attr:"slide-gap-sm",css:"--_slide-gap-sm",scale:"spacing"},slideGapMd:{attr:"slide-gap-md",css:"--_slide-gap-md",scale:"spacing"},slideGapLg:{attr:"slide-gap-lg",css:"--_slide-gap-lg",scale:"spacing"},slideGapXl:{attr:"slide-gap-xl",css:"--_slide-gap-xl",scale:"spacing"},slidesToScroll:{attr:"slides-to-scroll",css:"--_slides-to-scroll",type:"number",default:1},slidesToScrollXs:{attr:"slides-to-scroll-xs",css:"--_slides-to-scroll-xs",type:"number"},slidesToScrollSm:{attr:"slides-to-scroll-sm",css:"--_slides-to-scroll-sm",type:"number"},slidesToScrollMd:{attr:"slides-to-scroll-md",css:"--_slides-to-scroll-md",type:"number"},slidesToScrollLg:{attr:"slides-to-scroll-lg",css:"--_slides-to-scroll-lg",type:"number"},slidesToScrollXl:{attr:"slides-to-scroll-xl",css:"--_slides-to-scroll-xl",type:"number"},align:{css:"--_align",default:"center"},loop:{type:"boolean"},dragFree:{attr:"drag-free",type:"boolean"},withControls:{attr:"with-controls",type:"boolean",default:!0},withIndicators:{attr:"with-indicators",type:"boolean"},controlsOffset:{attr:"controls-offset",css:"--_controls-offset",scale:"spacing",default:"sm"},controlSize:{attr:"control-size",css:"--_control-size",scale:"rem",default:26},height:{css:"--_height",scale:"rem"},radius:{css:"--_radius",scale:"radius"},initialSlide:{attr:"initial-slide",type:"number",default:0}};#t=0;#e=!1;#i=!1;#o=0;#a=0;#s;#r;template(){return p`
      <div class="viewport" part="viewport">
        <div class="container" part="container" tabindex="0" role="group" aria-roledescription="carousel"><slot></slot></div>
      </div>
      <button class="control prev" part="control-prev" type="button" aria-label="Previous slide">${Vi.replace("M9 6l6 6-6 6","M15 6l-6 6 6 6")}</button>
      <button class="control next" part="control-next" type="button" aria-label="Next slide">${Vi}</button>
      <div class="indicators" part="indicators" role="tablist"></div>
    `}setup(){this.#r=this.$(".container"),this.#s=this.$("slot"),this.$(".control.prev").addEventListener("click",()=>this.prev()),this.$(".control.next").addEventListener("click",()=>this.next()),this.#r.addEventListener("keydown",i=>{let o=this.orientation!=="vertical";o&&i.key==="ArrowLeft"?(i.preventDefault(),this.prev()):o&&i.key==="ArrowRight"?(i.preventDefault(),this.next()):!o&&i.key==="ArrowUp"?(i.preventDefault(),this.prev()):!o&&i.key==="ArrowDown"&&(i.preventDefault(),this.next())}),this.#r.addEventListener("pointerdown",i=>{i.pointerType==="touch"||i.target.closest("a,button,input,textarea,select")||(this.#e=!0,this.#i=!1,this.#o=this.orientation==="vertical"?i.clientY:i.clientX,this.#a=this.orientation==="vertical"?this.#r.scrollTop:this.#r.scrollLeft,this.#r.setPointerCapture(i.pointerId),this.#r.classList.add("dragging"))}),this.#r.addEventListener("pointermove",i=>{if(!this.#e)return;let s=(this.orientation==="vertical"?i.clientY:i.clientX)-this.#o;Math.abs(s)>3&&(this.#i=!0),this.orientation==="vertical"?this.#r.scrollTop=this.#a-s:this.#r.scrollLeft=this.#a-s});let t=i=>{if(this.#e){this.#e=!1,this.#r.classList.remove("dragging");try{this.#r.releasePointerCapture(i.pointerId)}catch{}this.dragFree?this.#l():requestAnimationFrame(()=>this.scrollToSlide(this.#d()))}};this.#r.addEventListener("pointerup",t),this.#r.addEventListener("pointercancel",t),this.#r.addEventListener("click",i=>{this.#i&&(i.preventDefault(),i.stopPropagation(),this.#i=!1)},!0),this.#r.addEventListener("scrollend",()=>this.#l());let e;this.#r.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(()=>this.#l(),120)}),this.#s.addEventListener("slotchange",()=>{this.#u(),this.#p()})}onConnect(){requestAnimationFrame(()=>{this.#u(),this.scrollToSlide(this.initialSlide,{smooth:!1})})}update(t){t.has("withIndicators")&&this.#u(),(t.has("loop")||t.has("withControls"))&&this.#p()}get slides(){return Array.from(this.children).filter(t=>t.tagName==="MT-CAROUSEL-SLIDE")}next(){let t=this.slides;if(!t.length)return;let e=this.#n(),i=this.#t+e;i>=t.length&&(this.loop?i%=t.length:i=t.length-1),i!==this.#t&&this.scrollToSlide(i)}prev(){let t=this.slides;if(!t.length)return;let e=this.#n(),i=this.#t-e;i<0&&(this.loop?i=(i%t.length+t.length)%t.length:i=0),i!==this.#t&&this.scrollToSlide(i)}#n(){let t=parseInt(getComputedStyle(this).getPropertyValue("--_slides-to-scroll"),10);return Number.isFinite(t)&&t>0?t:1}scrollToSlide(t,e={}){let i=this.slides;if(!i.length)return;let o=Math.max(0,Math.min(t,i.length-1)),s=this.#h(i[o]),a=e.smooth!==!1;this.orientation==="vertical"?this.#r.scrollTo({top:s,behavior:a?"smooth":"instant"}):this.#r.scrollTo({left:s,behavior:a?"smooth":"instant"}),this.#c(o)}#h(t){let e=this.orientation==="vertical",i=this.#r.getBoundingClientRect(),o=t.getBoundingClientRect(),s=e?this.#r.clientHeight:this.#r.clientWidth,a=e?o.height:o.width,d=(e?o.top-i.top:o.left-i.left)+(e?this.#r.scrollTop:this.#r.scrollLeft),h=d;this.align==="center"?h=d-(s-a)/2:this.align==="end"&&(h=d-(s-a));let u=e?this.#r.scrollHeight-s:this.#r.scrollWidth-s;return Math.max(0,Math.min(h,u))}#d(){let t=this.slides;if(!t.length)return 0;let i=this.orientation==="vertical"?this.#r.scrollTop:this.#r.scrollLeft,o=0,s=1/0;return t.forEach((a,d)=>{let h=Math.abs(this.#h(a)-i);h<s&&(s=h,o=d)}),o}#l(){this.#e||this.#c(this.#d())}#c(t){if(t===this.#t){this.#p();return}this.#t=t,this.#p(),this.emit("slide-change",{index:t})}#p(){let t=this.slides,e=this.$(".control.prev"),i=this.$(".control.next");e.disabled=!this.loop&&this.#t<=0,i.disabled=!this.loop&&this.#t>=t.length-1,this.root.querySelectorAll(".indicator").forEach((o,s)=>{let a=s===this.#t;o.toggleAttribute("data-active",a),o.setAttribute("part",a?"indicator indicator-active":"indicator"),o.setAttribute("aria-selected",a?"true":"false")})}#u(){let t=this.$(".indicators"),e=this.slides;t.innerHTML="",e.forEach((i,o)=>{let s=document.createElement("button");s.type="button",s.className="indicator",s.setAttribute("part","indicator"),s.setAttribute("role","tab"),s.setAttribute("aria-label",`Slide ${o+1}`),s.addEventListener("click",()=>this.scrollToSlide(o)),t.append(s)}),this.#p()}},ds=n`
  :host {
    display: block;
    flex: 0 0 var(--_slide-size, 100%);
    min-width: 0;
    min-height: 0;
    scroll-snap-align: var(--_align, center);
    scroll-snap-stop: always;
  }
`,vi=class extends c{static styles=[ds];template(){return"<slot></slot>"}};l("mt-carousel",fi);l("mt-carousel-slide",vi);var cs=n`
  :host { display: block; --_radius: var(--mt-radius-md); }
  .root {
    position: relative;
    display: block;
    width: 100%;
    border: 1px dashed var(--mt-color-default-border);
    border-radius: var(--_radius);
    padding: var(--mt-spacing-md);
    cursor: pointer;
    outline: none;
    transition: border-color var(--mt-transition), background-color var(--mt-transition);
  }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([data-accept]) .root { border-color: var(--mt-color-primary-filled); background: color-mix(in srgb, var(--mt-color-primary-filled) 5%, transparent); }
  :host([data-reject]) .root { border-color: var(--mt-color-error); background: color-mix(in srgb, var(--mt-color-error) 5%, transparent); }
  :host([disabled]) .root, :host([loading]) .root {
    cursor: not-allowed;
    border-style: solid;
    border-color: var(--mt-color-border);
    background: var(--mt-color-disabled);
  }
  .input { position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0; pointer-events: none; }
  .overlay {
    display: none;
    position: absolute;
    inset: 0;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background: color-mix(in srgb, var(--mt-color-body) 75%, transparent);
  }
  :host([loading]) .overlay { display: flex; }
  .loader {
    width: 2.25rem;
    height: 2.25rem;
    border: 0.1875em solid var(--mt-color-primary-filled);
    border-right-color: transparent;
    border-radius: 50%;
    animation: mt-dropzone-spin 0.8s linear infinite;
  }
  @keyframes mt-dropzone-spin { to { transform: rotate(360deg); } }
`,Wi=!1;function hs(){Wi||(Wi=!0,document.addEventListener("click",r=>{let t=r.target?.closest?.("[data-mt-dropzone-open]");if(!t)return;let e=t.getAttribute("data-mt-dropzone-open");if(!e)return;document.getElementById(e)?.open()}))}function Xi(r){let t=[],e=[];for(let i of(r??"").split(",").map(o=>o.trim()).filter(Boolean))i.startsWith(".")?e.push(i.toLowerCase()):t.push(i);return{mimes:t,exts:e}}function Ui(r,t){return t.endsWith("/*")?r.startsWith(t.slice(0,-1)):r===t}var bi=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[cs];static props={accept:{},maxSize:{attr:"max-size",type:"number"},maxFiles:{attr:"max-files",type:"number"},multiple:{type:"boolean",default:!0},disabled:{type:"boolean"},loading:{type:"boolean"},activateOnClick:{attr:"activate-on-click",type:"boolean",default:!0},radius:{css:"--_radius",scale:"radius",default:"md"},name:{}};internals=this.attachInternals();#t=0;#e=[];get isInactive(){return this.disabled||this.loading}get input(){return this.$(".input")}template(){return p`
      <div class="root" part="root" tabindex="0" role="button" aria-label="File upload">
        <input class="input" type="file" tabindex="-1" aria-hidden="true" />
        <slot></slot>
        <div class="overlay" part="overlay"><span class="loader" part="loader" role="status" aria-label="Loading"></span></div>
      </div>
    `}setup(){let t=this.$(".root");hs(),this.addEventListener("dragenter",e=>{e.preventDefault(),this.#t++,!this.isInactive&&this.#i(this.#o(e.dataTransfer)?"accept":"reject")}),this.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=this.isInactive?"none":"copy")}),this.addEventListener("dragleave",()=>{this.#t=Math.max(0,this.#t-1),this.#t===0&&this.#i("idle")}),this.addEventListener("drop",e=>{e.preventDefault(),this.#t=0,this.#i("idle"),!this.isInactive&&this.#s(e.dataTransfer?.files??null)}),t.addEventListener("click",e=>{!this.activateOnClick||this.isInactive||e.target.closest(".input")||this.open()}),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&this.activateOnClick&&!this.isInactive&&(e.preventDefault(),this.open())}),this.input.addEventListener("change",()=>{this.#s(this.input.files),this.input.value=""}),this.#i("idle")}update(t){let e=this.$(".root");e.toggleAttribute("aria-disabled",this.isInactive),e.tabIndex=this.isInactive?-1:0,this.input.toggleAttribute("disabled",this.isInactive),t.has("multiple")&&this.input.toggleAttribute("multiple",this.multiple),t.has("accept")&&this.input.setAttribute("accept",this.accept??"")}formResetCallback(){this.#e=[],this.internals.setFormValue(null)}open(){this.isInactive||this.input.click()}#i(t){this.removeAttribute("data-accept"),this.removeAttribute("data-reject"),this.removeAttribute("data-idle"),this.setAttribute(`data-${t}`,"");for(let e of["mt-dropzone-accept","mt-dropzone-reject","mt-dropzone-idle"]){let i=e===`mt-dropzone-${t}`;this.querySelectorAll(e).forEach(o=>o.toggleAttribute("data-active",i))}}#o(t){if(!t)return!0;let{mimes:e,exts:i}=Xi(this.accept);if(e.length===0&&i.length===0)return!0;let o=Array.from(t.items).filter(s=>s.kind==="file");return o.length===0||e.length===0?!0:o.every(s=>e.some(a=>Ui(s.type,a)))}#a(t){let e=[],i=[],o=t?Array.from(t):[];this.multiple||(o=o.slice(0,1));let{mimes:s,exts:a}=Xi(this.accept),d=this.maxFiles;for(let h of o){let u=[];if(s.length||a.length){let m=h.name.toLowerCase(),f=s.some(x=>Ui(h.type,x)),g=a.some(x=>m.endsWith(x));!f&&!g&&u.push("file-invalid-type")}this.maxSize!=null&&h.size>this.maxSize&&u.push("file-too-large"),u.length===0&&d!=null&&e.length>=d&&u.push("too-many-files"),u.length?i.push({file:h,errors:u}):e.push(h)}return{accepted:e,rejected:i}}#s(t){let{accepted:e,rejected:i}=this.#a(t);e.length&&(this.#e=e,this.#r(),this.emit("drop",{files:e})),i.length&&this.emit("reject",{files:i.map(o=>o.file),errors:i})}#r(){if(!this.name)return;let t=new FormData;for(let e of this.#e)t.append(this.name,e);this.internals.setFormValue(t)}};function wi(){return n`
    :host { display: none; }
    :host([data-active]) { display: contents; }
  `}var gi=class extends c{static styles=[wi()];template(){return"<slot></slot>"}},yi=class extends c{static styles=[wi()];template(){return"<slot></slot>"}},xi=class extends c{static styles=[wi()];template(){return"<slot></slot>"}};l("mt-dropzone",bi);l("mt-dropzone-accept",gi);l("mt-dropzone-reject",yi);l("mt-dropzone-idle",xi);var Yi=!1;function ps(){if(Yi)return;Yi=!0;let r=new CSSStyleSheet;r.replaceSync(`
    mt-sortable [data-sortable-item] { touch-action: none; }
    mt-sortable [data-sortable-handle] { cursor: grab; touch-action: none; }
    mt-sortable [data-sortable-item].mt-sortable-dragging {
      position: relative;
      z-index: 2;
      cursor: grabbing;
      background: var(--mt-color-body);
      box-shadow: var(--mt-shadow-md);
    }
    mt-sortable [data-sortable-item][data-sortable-lifted] {
      outline: 2px solid var(--mt-color-primary-filled);
      outline-offset: -2px;
      background: var(--mt-color-hover);
    }
  `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,r]}var us=n`
  :host { display: contents; }
  .live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
`,_i=class extends c{static formAssociated=!0;static styles=[us];static props={items:{default:":scope > *"},handle:{},orientation:{default:"vertical"},disabled:{type:"boolean"},name:{}};internals=this.attachInternals();#t=new WeakSet;#e;#i=null;#o=-1;template(){return p`<span class="live" part="live" role="status" aria-live="assertive"></span><slot></slot>`}setup(){ps(),this.#e=new MutationObserver(()=>this.#s()),this.#e.observe(this,{childList:!0,subtree:!0}),this.#s(),this.#u()}onDisconnect(){this.#e?.disconnect()}#a(){return Array.from(this.querySelectorAll(this.items))}#s(){for(let t of this.#a()){if(this.#t.has(t))continue;this.#t.add(t),t.setAttribute("data-sortable-item","");let e=this.handle?t.querySelector(this.handle)??t:t;e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.addEventListener("pointerdown",i=>this.#m(i,t,e)),e.addEventListener("keydown",i=>this.#n(i,t))}}#r(t){this.$(".live").textContent=t}#n(t,e){if(this.disabled)return;let i=this.#a(),o=i.indexOf(e);if(o<0)return;let s=this.orientation==="horizontal",a=s?"ArrowRight":"ArrowDown",d=s?"ArrowLeft":"ArrowUp";if(t.key===" "||t.key==="Enter"){t.preventDefault(),this.#i===e?this.#d():this.#h(e,o,i.length);return}if(t.key==="Escape"&&this.#i===e){t.preventDefault(),this.#l();return}if(this.#i!==e||t.key!==a&&t.key!==d)return;t.preventDefault();let h=o+(t.key===a?1:-1);h<0||h>=i.length||(this.#c(e,h),(this.handle?e.querySelector(this.handle)??e:e).focus(),this.#r(`Item moved to position ${h+1} of ${i.length}.`))}#h(t,e,i){this.#i=t,this.#o=e,t.setAttribute("data-sortable-lifted",""),this.#r(`Picked up item at position ${e+1} of ${i}. Use arrow keys to move, space or enter to drop, escape to cancel.`)}#d(){let t=this.#i;if(!t)return;t.removeAttribute("data-sortable-lifted");let i=this.#a().indexOf(t);this.#i=null,i!==this.#o&&this.#p(this.#o,i),this.#r("Item dropped.")}#l(){let t=this.#i;t&&(this.#c(t,this.#o),t.removeAttribute("data-sortable-lifted"),this.#i=null,this.#r("Reorder cancelled."))}#c(t,e){let i=this.#a().filter(o=>o!==t);e>=i.length?i[i.length-1]?.after(t):i[e].before(t)}#p(t,e){let o=this.#a().map((s,a)=>s.getAttribute("data-value")??String(a));this.#u(o),this.emit("reorder",{from:t,to:e,order:o})}#u(t){if(!this.name)return;let e=t??this.#a().map((o,s)=>o.getAttribute("data-value")??String(s)),i=new FormData;for(let o of e)i.append(this.name,o);this.internals.setFormValue(i)}#m(t,e,i){if(this.disabled||t.button!==0||this.#i)return;let o=this.#a(),s=o.indexOf(e);if(s<0)return;t.preventDefault();try{i.setPointerCapture(t.pointerId)}catch{}let a=this.orientation==="horizontal"?"x":"y",d=o.map(v=>v.getBoundingClientRect()),h=d.map(v=>a==="x"?v.left:v.top),u=d.map(v=>a==="x"?v.width:v.height),m=a==="x"?t.clientX:t.clientY,f=s;e.classList.add("mt-sortable-dragging");for(let v of o)v!==e&&(v.style.transition="transform 150ms ease");let g=()=>{for(let v=0;v<o.length;v++){if(v===s)continue;let _=0;f>=s&&v>s&&v<=f?_=h[v-1]-h[v]:f<=s&&v<s&&v>=f&&(_=h[v+1]-h[v]),o[v].style.transform=_?a==="x"?`translateX(${_}px)`:`translateY(${_}px)`:""}},x=v=>{let I=(a==="x"?v.clientX:v.clientY)-m;e.style.transform=a==="x"?`translateX(${I}px)`:`translateY(${I}px)`;let K=h[s]+I+u[s]/2,ki=1/0,ft=f;for(let F=0;F<o.length;F++){let zi=Math.abs(K-(h[F]+u[F]/2));zi<ki&&(ki=zi,ft=F)}ft!==f&&(f=ft,g())},y=v=>{document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",y),document.removeEventListener("pointercancel",y);try{i.releasePointerCapture(v.pointerId)}catch{}e.classList.remove("mt-sortable-dragging");for(let _ of o)_.style.transition="",_.style.transform="";f!==s&&(this.#c(e,f),this.#p(s,f))};document.addEventListener("pointermove",x),document.addEventListener("pointerup",y),document.addEventListener("pointercancel",y)}};l("mt-sortable",_i);window.manatee={setColorScheme:Z,getColorScheme:j,resolvedColorScheme:q,toggleColorScheme:wt,notifications:V};export{c as MtElement,b as MtFormElement,Ei as PALETTE,S as autoPosition,P as colorVars,n as css,l as define,gt as escapeHtml,B as fieldTemplate,kt as floatingStyles,j as getColorScheme,p as html,L as inputStyles,vt as isToken,R as kebab,V as notifications,T as onDismiss,_t as position,M as rem,A as resolve,$ as resolveColor,q as resolvedColorScheme,Z as setColorScheme,wt as toggleColorScheme,z as uid,E as wrapperStyles,k as wrapperTemplate};
