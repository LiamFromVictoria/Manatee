var ve=["dark","gray","red","pink","grape","violet","indigo","blue","cyan","teal","green","lime","yellow","orange"],He=["filled","filled-hover","light","light-hover","light-color","outline","outline-hover","text"],B=Object.fromEntries([...ve,"primary"].map(i=>[i,!0])),be=/^([a-z]+)[.-]([0-9])$/;function z(i){let t=(i||"primary").trim(),e={};if(B[t]){for(let l of He)e[`--mt-c-${l}`]=`var(--mt-color-${t}-${l})`;return e}let o=be.exec(t),r=o&&B[o[1]]?`var(--mt-color-${o[1]}-${o[2]})`:t,s=(l,d="transparent")=>`color-mix(in srgb, ${r} ${l}%, ${d})`;return e["--mt-c-filled"]=r,e["--mt-c-filled-hover"]=s(90,"black"),e["--mt-c-light"]=s(10),e["--mt-c-light-hover"]=s(12),e["--mt-c-light-color"]=r,e["--mt-c-outline"]=r,e["--mt-c-outline-hover"]=s(5),e["--mt-c-text"]=r,e}function U(i,t="inherit"){if(!i)return t;let e=i.trim();if(e==="dimmed")return"var(--mt-color-dimmed)";if(e==="bright")return"var(--mt-color-bright)";if(e==="white")return"var(--mt-white)";if(e==="black")return"var(--mt-black)";if(B[e])return`var(--mt-color-${e}-text)`;let o=be.exec(e);return o&&B[o[1]]?`var(--mt-color-${o[1]}-${o[2]})`:e}var ye={xs:!0,sm:!0,md:!0,lg:!0,xl:!0},Oe={spacing:!0,radius:!0,"font-size":!0,"line-height":!0,shadow:!0,breakpoint:!0},De=/^-?\d*\.?\d+$/;function K(i){return ye[i]===!0}function k(i,t){if(t==null||t===""||t===!1)return"";let e=String(t).trim();return i==="raw"?e:i==="color"?U(e):Oe[i]&&ye[e]?`var(--mt-${i}-${e})`:De.test(e)?i==="line-height"?e:xe(parseFloat(e)):e}function xe(i){return i===0?"0":`${i/16}rem`}var X={m:{props:["margin"],scale:"spacing"},mt:{props:["margin-top"],scale:"spacing"},mb:{props:["margin-bottom"],scale:"spacing"},ml:{props:["margin-left"],scale:"spacing"},mr:{props:["margin-right"],scale:"spacing"},mx:{props:["margin-left","margin-right"],scale:"spacing"},my:{props:["margin-top","margin-bottom"],scale:"spacing"},p:{props:["padding"],scale:"spacing"},pt:{props:["padding-top"],scale:"spacing"},pb:{props:["padding-bottom"],scale:"spacing"},pl:{props:["padding-left"],scale:"spacing"},pr:{props:["padding-right"],scale:"spacing"},px:{props:["padding-left","padding-right"],scale:"spacing"},py:{props:["padding-top","padding-bottom"],scale:"spacing"},w:{props:["width"],scale:"rem"},h:{props:["height"],scale:"rem"},miw:{props:["min-width"],scale:"rem"},maw:{props:["max-width"],scale:"rem"},mih:{props:["min-height"],scale:"rem"},mah:{props:["max-height"],scale:"rem"}},we=new Map;function a(i,...t){let e=String.raw({raw:i},...t),o=we.get(e);return o||(o=new CSSStyleSheet,o.replaceSync(e),we.set(e,o)),o}var p=(i,...t)=>String.raw({raw:i},...t);function $(i){return i.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Ne(i){return i.replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}var Be=0;function v(i="mt"){return`${i}-${(++Be).toString(36)}`}var Fe=a`
  :host { box-sizing: border-box; }
  :host([hidden]) { display: none !important; }
  *, *::before, *::after { box-sizing: border-box; }
`,c=class extends HTMLElement{static props={};static styles=[];static shadowOptions={mode:"open"};static get observedAttributes(){return[...Object.entries(this.props).map(([t,e])=>e.attr??$(t)),...Object.keys(X)]}root;#t;#e=new Set;#o=!1;#i=!1;#s=null;constructor(){super();let t=this.constructor;this.#t={};for(let[e,o]of Object.entries(t.props))this.#t[o.attr??$(e)]=e;this.root=this.attachShadow(t.shadowOptions),this.root.adoptedStyleSheets=[Fe,...t.styles],this.root.innerHTML=this.template()}template(){return"<slot></slot>"}setup(){}update(t){}onConnect(){}onDisconnect(){}connectedCallback(){if(!this.#i){this.#i=!0;let t=this.constructor;for(let e of Object.keys(t.props)){if(!Object.prototype.hasOwnProperty.call(this,e))continue;let o=this[e];delete this[e],this[e]=o}for(let e of Object.keys(t.props))this.#e.add(e);for(let e of Object.keys(X))this.hasAttribute(e)&&this.#e.add(e);this.setup()}this.onConnect(),this.#r()}disconnectedCallback(){this.onDisconnect()}attributeChangedCallback(t,e,o){e!==o&&(this.#e.add(this.#t[t]??t),this.requestUpdate())}requestUpdate(t){t&&this.#e.add(t),!this.#o&&(this.#o=!0,queueMicrotask(()=>{this.#o=!1,this.#r()}))}#r(){if(!this.isConnected||!this.#i||this.#e.size===0)return;let t=this.#e;this.#e=new Set,this.#a(),this.update(t)}prop(t){let e=this.constructor.props[t];if(!e)return null;let o=this.getAttribute(e.attr??$(t));switch(e.type??"string"){case"boolean":return o===null?e.default??!1:o!=="false";case"number":{let r=o===null||o===""?NaN:Number(o);return Number.isNaN(r)?e.default??null:r}default:return o??e.default??null}}setProp(t,e){let o=this.constructor.props[t];if(!o)return;let r=o.attr??$(t);if(o.type==="boolean"){e===!0?this.setAttribute(r,""):o.default===!0&&e===!1?this.setAttribute(r,"false"):this.removeAttribute(r);return}e==null||e===!1?this.removeAttribute(r):this.setAttribute(r,String(e))}emit(t,e,o={}){return this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,cancelable:!0,detail:e,...o}))}$(t){return this.root.querySelector(t)}#a(){let t=this.constructor,e=[];for(let[o,r]of Object.entries(t.props)){if(r.color)for(let[s,l]of Object.entries(z(this.prop(o))))e.push(`${s}:${l}`);if(r.css){let s=this.prop(o),l=s===null||s===!1?"":k(r.scale??"raw",s);l&&e.push(`${r.css}:${l}`)}}for(let[o,r]of Object.entries(X)){let s=this.getAttribute(o);if(s===null||s==="")continue;let l=k(r.scale,s);for(let d of r.props)e.push(`${d}:${l}`)}e.length===0&&!this.#s||(this.#s||(this.#s=new CSSStyleSheet,this.root.adoptedStyleSheets=[...this.root.adoptedStyleSheets,this.#s]),this.#s.replaceSync(`:host{${e.join(";")}}`))}};function n(i,t){for(let e of Object.keys(t.props))Object.prototype.hasOwnProperty.call(t.prototype,e)||Object.defineProperty(t.prototype,e,{get(){return this.prop(e)},set(o){this.setProp(e,o)},configurable:!0,enumerable:!0});customElements.get(i)||customElements.define(i,t)}var w=a`
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
`,_=a`
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
`;function g(i,t={}){let e=t.labelFor===!1?"div":"label",o=t.labelFor===!1?"":' for="control"';return p`
    <${e} class="label" part="label" id="label"${o} hidden><slot name="label"><span class="label-text"></span></slot><span class="required" aria-hidden="true" hidden>*</span></${e}>
    <div class="description" part="description" id="description" hidden><slot name="description"><span class="description-text"></span></slot></div>
    ${i}
    <div class="error" part="error" id="error" hidden><slot name="error"><span class="error-text"></span></slot></div>
  `}function H(i){return p`
    <div class="field" part="field">
      <div class="section left" part="left-section"><slot name="left-section"></slot></div>
      ${i}
      <div class="section right" part="right-section"><slot name="right-section"></slot></div>
    </div>
  `}var m=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static props={name:{},label:{},description:{},error:{},required:{type:"boolean"},disabled:{type:"boolean"},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"}};internals;#t=!1;constructor(){super(),this.internals=this.attachInternals()}get control(){return this.root.getElementById("control")}get form(){return this.internals.form}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}get willValidate(){return this.internals.willValidate}checkValidity(){return this.internals.checkValidity()}reportValidity(){return this.internals.reportValidity()}get isDisabled(){return this.disabled||this.#t}formDisabledCallback(t){this.#t=t,this.requestUpdate("disabled")}formResetCallback(){}setup(){for(let t of["label","description","error"])this.root.querySelector(`slot[name="${t}"]`)?.addEventListener("slotchange",()=>this.syncWrapper());for(let t of["left","right"]){let e=this.root.querySelector(`slot[name="${t}-section"]`),o=()=>e?.closest(".field")?.classList.toggle(`has-${t}`,(e?.assignedNodes().length??0)>0);e?.addEventListener("slotchange",o),o()}}update(t){(t.has("label")||t.has("description")||t.has("error")||t.has("required")||t.has("disabled"))&&this.syncWrapper()}syncWrapper(){let t=(s,l)=>!!l||!!this.querySelector(`:scope > [slot="${s}"]`),e=[["label",this.label],["description",this.description],["error",this.error]],o=[];for(let[s,l]of e){let d=this.root.getElementById(s);if(!d)continue;let h=d.querySelector(`.${s}-text`);h&&(h.textContent=l??"");let u=t(s,l);d.hidden=!u,u&&s!=="label"&&o.push(s)}this.root.querySelector(".required")?.toggleAttribute("hidden",!this.required);let r=this.control;r&&(o.length?r.setAttribute("aria-describedby",o.join(" ")):r.removeAttribute("aria-describedby"),r.toggleAttribute("aria-invalid",!!this.error),this.error&&r.setAttribute("aria-invalid","true"),"disabled"in r&&(r.disabled=this.isDisabled),"required"in r&&(r.required=this.required)),this.internals.ariaInvalid=this.error?"true":null}setFormValue(t,e){this.internals.setFormValue(t,e??t),this.syncValidity()}syncValidity(){let t=this.control;t&&"validity"in t&&this.internals.setValidity(t.validity,t.validationMessage,t)}focus(t){this.control?.focus(t)}blur(){this.control?.blur()}forwardChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}};var Y="mt-color-scheme",_e=matchMedia("(prefers-color-scheme: dark)");function O(){let i=localStorage.getItem(Y);return i==="light"||i==="dark"?i:"auto"}function D(){let i=O();return i==="auto"?_e.matches?"dark":"light":i}function Z(){let i=D();document.documentElement.setAttribute("data-mt-color-scheme",i),window.dispatchEvent(new CustomEvent("mt-color-scheme-change",{detail:i}))}function F(i){i==="auto"?localStorage.removeItem(Y):localStorage.setItem(Y,i),Z()}function G(){F(D()==="dark"?"light":"dark")}_e.addEventListener("change",()=>{O()==="auto"&&Z()});document.documentElement.hasAttribute("data-mt-color-scheme")||Z();var J=a`
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
`,ke={top:"bottom",bottom:"top",left:"right",right:"left"},I=4;function ze(i){if(getComputedStyle(i).display!=="contents")return i.getBoundingClientRect();let e=(i instanceof HTMLSlotElement?i.assignedElements({flatten:!0}):[...i.children]).map(ze).filter(d=>d.width||d.height);if(e.length===0)return i.getBoundingClientRect();let o=Math.min(...e.map(d=>d.left)),r=Math.min(...e.map(d=>d.top)),s=Math.max(...e.map(d=>d.right)),l=Math.max(...e.map(d=>d.bottom));return new DOMRect(o,r,s-o,l-r)}function Q(i,t,e={}){let{placement:o="bottom",offset:r=8,flip:s=!0,matchWidth:l=!1}=e,d=ze(i);l&&(t.style.width=`${d.width}px`);let h=t.getBoundingClientRect(),u=document.documentElement.clientWidth,f=document.documentElement.clientHeight,[b,y="center"]=o.split("-"),T={bottom:f-d.bottom-r-h.height,top:d.top-r-h.height,right:u-d.right-r-h.width,left:d.left-r-h.width},x=b;s&&T[x]<0&&T[ke[x]]>T[x]&&(x=ke[x]);let C,P;x==="top"||x==="bottom"?(P=x==="bottom"?d.bottom+r:d.top-r-h.height,C=y==="start"?d.left:y==="end"?d.right-h.width:d.left+(d.width-h.width)/2,C=Math.min(Math.max(C,I),u-h.width-I)):(C=x==="right"?d.right+r:d.left-r-h.width,P=y==="start"?d.top:y==="end"?d.bottom-h.height:d.top+(d.height-h.height)/2,P=Math.min(Math.max(P,I),f-h.height-I)),t.style.left=`${Math.round(C)}px`,t.style.top=`${Math.round(P)}px`,t.dataset.placement=y==="center"?x:`${x}-${y}`}function E(i,t,e={}){let o=0,r=()=>{cancelAnimationFrame(o),o=requestAnimationFrame(()=>Q(i,t,e))};Q(i,t,e);let s=new ResizeObserver(r);return s.observe(i),s.observe(t),addEventListener("scroll",r,{capture:!0,passive:!0}),addEventListener("resize",r,{passive:!0}),()=>{cancelAnimationFrame(o),s.disconnect(),removeEventListener("scroll",r,{capture:!0}),removeEventListener("resize",r)}}function A(i,t){let e=r=>{let s=r.composedPath();i.some(l=>s.includes(l))||t("outside")},o=r=>{r.key==="Escape"&&t("escape")};return document.addEventListener("pointerdown",e,!0),document.addEventListener("keydown",o),()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",o)}}var Ee=!1;function R(){Ee||(Ee=!0,document.addEventListener("click",i=>{let t=i.composedPath();for(let e=0;e<t.length;e++){let o=t[e];if(!(o instanceof Element))continue;let r=o.getAttribute("data-mt-open");if(r){document.getElementById(r)?.open?.();return}if(o.hasAttribute("data-mt-close")){let s=o.getAttribute("data-mt-close");if(s)document.getElementById(s)?.close?.();else for(let l=e;l<t.length;l++){let d=t[l];if(d instanceof HTMLElement&&(d.localName==="mt-modal"||d.localName==="mt-drawer")){d.close();break}}return}}}))}var tt={xs:"20rem",sm:"23.75rem",md:"27.5rem",lg:"38.75rem",xl:"48.75rem"};function j(i){return i?tt[i]?tt[i]:i==="auto"?"auto":/^-?\d*\.?\d+$/.test(i)?`${parseFloat(i)/16}rem`:i:tt.md}var S=class extends c{static props={opened:{type:"boolean"},withCloseButton:{type:"boolean",default:!0},closeOnClickOutside:{type:"boolean",default:!0},closeOnEscape:{type:"boolean",default:!0}};#t=null;get dialog(){return this.$("dialog")}setup(){let t=this.dialog;t.addEventListener("cancel",e=>{e.preventDefault(),this.closeOnEscape&&this.close()}),t.addEventListener("click",e=>{if(!this.closeOnClickOutside)return;let o=t.getBoundingClientRect();e.clientX>=o.left&&e.clientX<=o.right&&e.clientY>=o.top&&e.clientY<=o.bottom||this.close()}),t.addEventListener("close",()=>{this.opened&&(this.opened=!1)}),this.$(".close")?.addEventListener("click",()=>this.close())}update(t){t.has("withCloseButton")&&this.$(".close")?.toggleAttribute("hidden",!this.withCloseButton),t.has("opened")&&(this.opened?this.#e():this.#o())}open(){this.opened=!0}close(){this.opened=!1}#e(){let t=this.dialog;t.open||(this.#t=document.activeElement,t.showModal(),this.emit("open"))}#o(){let t=this.dialog;if(!t.open)return;t.classList.add("closing");let e=!1,o=s=>{s.target===t&&r()},r=()=>{e||(e=!0,t.removeEventListener("transitionend",o),t.classList.remove("closing"),t.close(),this.emit("close"),this.#t?.focus(),this.#t=null)};t.addEventListener("transitionend",o),setTimeout(r,200)}};var Ie=a`
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
`,et=class extends S{static styles=[Ie];static props={...S.props,heading:{},size:{default:"md"},centered:{type:"boolean"},fullScreen:{type:"boolean"},padding:{css:"--_padding",scale:"spacing",default:"md"},radius:{css:"--_radius",scale:"radius"},shadow:{css:"--_shadow",scale:"shadow",default:"xl"},yOffset:{css:"--_y",scale:"raw",default:"5dvh"},overlayBlur:{}};template(){return p`
      <dialog class="modal" part="modal" aria-labelledby="title">
        <div class="header" part="header">
          <div class="title" part="title" id="title"><slot name="title"><span class="title-text"></span></slot></div>
          <button class="close" part="close-button" type="button" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="body" part="body"><slot></slot></div>
      </dialog>
    `}setup(){super.setup(),this.$('slot[name="title"]').addEventListener("slotchange",()=>this.#t())}update(t){super.update(t),(t.has("heading")||t.has("withCloseButton"))&&this.#t(),(t.has("size")||t.has("fullScreen"))&&(this.dialog.style.width=this.fullScreen?"":j(this.size)),t.has("overlayBlur")&&this.dialog.style.setProperty("--_blur",this.overlayBlur?`blur(${this.overlayBlur}px)`:"none")}#t(){let t=this.$(".title-text");t&&(t.textContent=this.heading??"");let e=!!this.heading||this.$('slot[name="title"]').assignedNodes().length>0;this.$(".header").toggleAttribute("hidden",!e&&!this.withCloseButton)}};n("mt-modal",et);R();var Re=a`
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
`,ot=class extends S{static styles=[Re];static props={...S.props,heading:{},position:{default:"left"},size:{default:"md"}};template(){return p`
      <dialog class="drawer" part="drawer" aria-labelledby="title">
        <div class="header" part="header">
          <div class="title" part="title" id="title"><slot name="title"><span class="title-text"></span></slot></div>
          <button class="close" part="close-button" type="button" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="body" part="body"><slot></slot></div>
      </dialog>
    `}setup(){super.setup(),this.$('slot[name="title"]').addEventListener("slotchange",()=>this.#t())}update(t){super.update(t),(t.has("heading")||t.has("withCloseButton"))&&this.#t(),t.has("size")&&this.dialog.style.setProperty("--_w",j(this.size))}#t(){let t=this.$(".title-text");t&&(t.textContent=this.heading??"");let e=!!this.heading||this.$('slot[name="title"]').assignedNodes().length>0;this.$(".header").toggleAttribute("hidden",!e&&!this.withCloseButton)}};n("mt-drawer",ot);R();var je=a`
  :host { display: contents; }
  .tooltip {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0.3125rem 0.625rem;
    max-width: var(--_w, 13.75rem);
    width: var(--_w, max-content);
    border: 0;
    border-radius: var(--mt-radius-default);
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
`,it=class extends c{static styles=[je];static props={label:{},position:{default:"top"},offset:{type:"number",default:5},withArrow:{type:"boolean"},arrowSize:{css:"--_arrow",scale:"rem",default:4},color:{},multiline:{type:"boolean"},w:{css:"--_w",scale:"rem"},openDelay:{type:"number",default:0},closeDelay:{type:"number",default:0},disabled:{type:"boolean"},opened:{type:"boolean"}};#t=null;#e=0;#o=v("mt-tt");#i=!1;template(){return p`
      <slot></slot>
      <div class="tooltip" part="tooltip" role="tooltip" popover="manual" id="tip">
        <slot name="label"></slot>
        <div class="arrow" part="arrow"></div>
      </div>
    `}get#s(){return this.querySelector(":scope > :not([slot])")}get#r(){return this.$(".tooltip")}setup(){this.addEventListener("mouseenter",()=>this.#l(!0),!0),this.addEventListener("mouseleave",()=>this.#l(!1),!0),this.addEventListener("focusin",()=>this.#l(!0)),this.addEventListener("focusout",()=>this.#l(!1)),this.$('slot[name="label"]').addEventListener("slotchange",()=>this.#n()),this.$("slot:not([name])").addEventListener("slotchange",()=>this.#a()),this.#a()}update(t){if(t.has("label")&&this.#n(),t.has("color")){let e=this.color?z(this.color):null;this.#r.style.setProperty("--_bg",e?e["--mt-c-filled"]:""),this.#r.style.setProperty("--_fg",e?"var(--mt-white)":"")}t.has("multiline")&&this.#r.style.setProperty("--_ws",this.multiline?"normal":"nowrap"),(t.has("opened")||t.has("disabled"))&&(this.disabled?this.#d():this.hasAttribute("opened")?this.#h():this.#d())}#a(){this.#n(),this.#c()}#n(){let t=this.$('slot[name="label"]'),e=t.assignedNodes().length>0?t.assignedElements().map(o=>o.textContent).join(""):this.label??"";if(t.assignedNodes().length===0){let o=this.$(".label-text");o||(o=document.createElement("span"),o.className="label-text",t.appendChild(o)),o.textContent=e}this.#c()}#c(){let t=this.#s;if(!t)return;let e=this.label??this.$('slot[name="label"]').assignedElements().map(r=>r.textContent).join(""),o=this.querySelector(":scope > [data-mt-tooltip-desc]");if(!e){o?.remove(),t.removeAttribute("aria-describedby");return}o||(o=document.createElement("span"),o.setAttribute("data-mt-tooltip-desc",""),o.setAttribute("slot","mt-tooltip-unused"),o.id=this.#o,o.hidden=!0,this.appendChild(o)),o.textContent=e,t.setAttribute("aria-describedby",this.#o)}#l(t){if(this.hasAttribute("opened")||this.disabled)return;clearTimeout(this.#e);let e=t?this.openDelay:this.closeDelay;this.#e=window.setTimeout(()=>t?this.#h():this.#d(),e)}#h(){if(this.#i||this.disabled)return;let t=this.#s;if(!t)return;this.#i=!0;let e=this.#r;e.showPopover(),this.#t?.(),this.#t=E(t,e,{placement:this.position,offset:this.offset})}#d(){this.#i&&(this.#i=!1,this.#t?.(),this.#t=null,this.#r.hidePopover())}};n("mt-tooltip",it);var qe=a`
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
`,rt=class extends c{static styles=[qe];template(){return p`<div class="dropdown" part="dropdown" popover="manual" role="dialog"><slot></slot><div class="arrow" part="arrow"></div></div>`}get box(){return this.$(".dropdown")}show(){this.box.showPopover()}hide(){this.box.matches(":popover-open")&&this.box.hidePopover()}},Ve=a`
  :host { display: contents; }
`,st=class extends c{static styles=[Ve];static props={position:{default:"bottom"},offset:{type:"number",default:8},withArrow:{type:"boolean"},width:{},disabled:{type:"boolean"},opened:{type:"boolean"},closeOnClickOutside:{type:"boolean",default:!0},closeOnEscape:{type:"boolean",default:!0}};#t=null;#e=null;#o=!1;#i=null;template(){return p`<slot name="target"></slot><slot></slot>`}get#s(){return this.querySelector(':scope > [slot="target"]')}get#r(){return this.querySelector(":scope > mt-popover-dropdown")}#a=()=>{this.disabled||(this.opened=!this.opened)};setup(){this.$('slot[name="target"]').addEventListener("slotchange",()=>this.#n()),this.#n()}#n(){let t=this.#s;t!==this.#i&&(this.#i?.removeEventListener("click",this.#a),t?.addEventListener("click",this.#a),this.#i=t)}update(t){(t.has("opened")||t.has("disabled"))&&(this.opened&&!this.disabled?this.#c():this.#l())}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}#c(){let t=this.#s,e=this.#r;!t||!e||this.#o||(this.#o=!0,e.toggleAttribute("with-arrow",this.withArrow),e.show(),this.width&&this.width!=="target"&&(e.box.style.width=k("rem",this.width)),this.#t=E(t,e.box,{placement:this.position,offset:this.offset,matchWidth:this.width==="target"}),this.#e=A([this,e],o=>{o==="outside"&&!this.closeOnClickOutside||o==="escape"&&!this.closeOnEscape||this.close()}),requestAnimationFrame(()=>{e.querySelector("a[href], button:not([disabled]), input:not([disabled]), [tabindex]")?.focus()}),this.emit("open"))}#l(){this.#o&&(this.#o=!1,this.#t?.(),this.#t=null,this.#e?.(),this.#e=null,this.#r?.hide(),this.emit("close"))}};n("mt-popover-dropdown",rt);n("mt-popover",st);var at=class extends c{static styles=[a`:host { display: contents; }`]},We=a`
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
    opacity: 0;
    transform: scale(0.9);
    transition: opacity var(--mt-transition), transform var(--mt-transition);
  }
  .dropdown:popover-open { opacity: 1; transform: scale(1); }
  .dropdown:not(:popover-open) { display: none; }
`,nt=class extends c{static styles=[We];template(){return p`<div class="dropdown" part="dropdown" popover="manual"><slot></slot></div>`}onConnect(){this.hasAttribute("role")||this.setAttribute("role","menu")}get box(){return this.$(".dropdown")}show(){this.box.showPopover()}hide(){this.box.matches(":popover-open")&&this.box.hidePopover()}},Ue=a`
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
`,lt=class extends c{static styles=[Ue];static shadowOptions={mode:"open",delegatesFocus:!0};static props={color:{},disabled:{type:"boolean"},href:{},target:{}};template(){return p`
      <button class="control" part="control" type="button">
        <span class="section left" part="left-section"><slot name="left-section"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="section right" part="right-section"><slot name="right-section"></slot></span>
      </button>
    `}onConnect(){this.hasAttribute("role")||this.setAttribute("role","menuitem"),this.tabIndex=-1}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.addEventListener("click",t=>{if(this.disabled){t.preventDefault();return}this.closest("mt-menu")?.handleItemClick(this)})}update(t){t.has("href")&&this.#t();let e=this.$(".control");if(e instanceof HTMLButtonElement?e.disabled=this.disabled:e.toggleAttribute("aria-disabled",this.disabled),this.toggleAttribute("aria-disabled",this.disabled),t.has("color")){let o=this.color?z(this.color):null;this.style.setProperty("--_color",o?o["--mt-c-text"]:""),this.style.setProperty("--_hover",o?o["--mt-c-light-hover"]:"")}t.has("target")&&(this.target?e.setAttribute("target",this.target):e.removeAttribute("target"))}get closeMenuOnClickOverride(){if(this.hasAttribute("close-menu-on-click"))return this.getAttribute("close-menu-on-click")!=="false"}focus(t){this.$(".control").focus(t)}#t(){let t=this.$(".control"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let o=document.createElement(e.toLowerCase());o.className=t.className,o.setAttribute("part","control"),e==="BUTTON"?o.setAttribute("type","button"):o.setAttribute("href",this.href??""),o.append(...t.childNodes),t.replaceWith(o)}},Ke=a`
  :host { display: block; padding: 0.25rem var(--mt-spacing-sm); font-size: var(--mt-font-size-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; color: var(--mt-color-dimmed); }
`,dt=class extends c{static styles=[Ke];onConnect(){this.hasAttribute("role")||this.setAttribute("role","presentation")}},Xe=a`
  :host { display: block; margin: calc(var(--mt-spacing-xs) / 2) 0; border-top: 1px solid var(--mt-color-border); }
`,ct=class extends c{static styles=[Xe];onConnect(){this.hasAttribute("role")||this.setAttribute("role","separator")}},Ye=a`
  :host { display: contents; }
`,pt=class extends c{static styles=[Ye];static props={trigger:{default:"click"},position:{default:"bottom"},offset:{type:"number",default:8},width:{},disabled:{type:"boolean"},opened:{type:"boolean"},closeOnItemClick:{type:"boolean",default:!0},loop:{type:"boolean",default:!0}};#t=null;#e=null;#o=!1;#i=null;#s=0;template(){return p`<slot name="target"></slot><slot></slot>`}get#r(){return this.querySelector(':scope > [slot="target"], :scope > mt-menu-target')}get#a(){let t=this.#r;return t?t.tagName==="MT-MENU-TARGET"?t.firstElementChild??t:t:null}get#n(){return this.querySelector(":scope > mt-menu-dropdown")}#c=()=>{this.disabled||this.trigger==="hover"||(this.opened=!this.opened)};#l=()=>{this.disabled||this.trigger==="click"||(clearTimeout(this.#s),this.opened=!0)};#h=t=>{if(this.disabled||this.trigger==="click")return;let e=t.relatedTarget;e&&(this.#a?.contains(e)||this.#n?.contains(e))||(clearTimeout(this.#s),this.#s=window.setTimeout(()=>this.opened=!1,100))};#d=t=>{let e=this.#n;if(!e)return;let o=Array.from(e.querySelectorAll("mt-menu-item"));if(o.length===0&&t.key!=="Escape"&&t.key!=="Tab")return;let r=o.indexOf(document.activeElement);switch(t.key){case"ArrowDown":t.preventDefault(),this.#p(o,r,1);break;case"ArrowUp":t.preventDefault(),this.#p(o,r,-1);break;case"Home":t.preventDefault(),o.find(s=>!s.disabled)?.focus();break;case"End":t.preventDefault(),[...o].reverse().find(s=>!s.disabled)?.focus();break;case"Escape":t.preventDefault(),this.close(),this.#a?.focus();break;case"Tab":this.close();break}};#p(t,e,o){let r=t.length,s=e;for(let l=0;l<r;l++){if(s+=o,s<0&&(s=this.loop?r-1:0),s>=r&&(s=this.loop?0:r-1),!t[s].disabled){t[s].focus();return}if(s===e)return}}setup(){this.$('slot[name="target"]').addEventListener("slotchange",()=>this.#u()),this.#u()}#u(){let t=this.#a;t!==this.#i&&(this.#i?.removeEventListener("click",this.#c),this.#i?.removeEventListener("mouseenter",this.#l),this.#i?.removeEventListener("mouseleave",this.#h),t?.addEventListener("click",this.#c),t?.addEventListener("mouseenter",this.#l),t?.addEventListener("mouseleave",this.#h),t&&(t.setAttribute("aria-haspopup","menu"),t.setAttribute("aria-expanded","false")),this.#i=t)}update(t){(t.has("opened")||t.has("disabled"))&&(this.opened&&!this.disabled?this.#g():this.#m())}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}handleItemClick(t){(t.closeMenuOnClickOverride??this.closeOnItemClick)&&(this.close(),this.#a?.focus())}#g(){let t=this.#a,e=this.#n;!t||!e||this.#o||(this.#o=!0,t.setAttribute("aria-expanded","true"),e.show(),this.width&&this.width!=="target"&&(e.box.style.width=k("rem",this.width)),this.#t=E(t,e.box,{placement:this.position,offset:this.offset,matchWidth:this.width==="target"}),this.#e=A([this,e],o=>{o==="outside"&&this.close()}),document.addEventListener("keydown",this.#d),requestAnimationFrame(()=>{e.querySelector("mt-menu-item:not([disabled])")?.focus()}),this.emit("open"))}#m(){this.#o&&(this.#o=!1,this.#a?.setAttribute("aria-expanded","false"),this.#t?.(),this.#t=null,this.#e?.(),this.#e=null,document.removeEventListener("keydown",this.#d),this.#n?.hide(),this.emit("close"))}};n("mt-menu-target",at);n("mt-menu-dropdown",nt);n("mt-menu-item",lt);n("mt-menu-label",dt);n("mt-menu-divider",ct);n("mt-menu",pt);var Ze=a`
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
    background: var(--_bar, var(--mt-color-gray-4));
  }
  .icon {
    display: none;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--_icon-bg, var(--mt-color-gray-1));
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
`,ht=class extends c{static styles=[Ze];static props={color:{},heading:{},loading:{type:"boolean"},withCloseButton:{type:"boolean",default:!0},withBorder:{type:"boolean"},radius:{css:"--_radius",scale:"radius"}};template(){return p`
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
    `}setup(){this.$(".close").addEventListener("click",()=>this.close()),this.$('slot[name="icon"]').addEventListener("slotchange",()=>this.#t())}update(t){if(t.has("heading")){let e=this.$(".title-text");e&&(e.textContent=this.heading??"")}if(t.has("withCloseButton")&&this.$(".close").toggleAttribute("hidden",!this.withCloseButton),t.has("loading")&&this.#t(),t.has("color")){let e=this.$(".notification");if(this.color){let o=z(this.color);e.style.setProperty("--_bar",o["--mt-c-filled"]),e.style.setProperty("--_icon-bg",o["--mt-c-light"]),e.style.setProperty("--_icon-fg",o["--mt-c-filled"])}else e.style.removeProperty("--_bar"),e.style.removeProperty("--_icon-bg"),e.style.removeProperty("--_icon-fg")}}#t(){let t=this.$('slot[name="icon"]');this.$(".icon").classList.toggle("visible",this.loading||t.assignedNodes().length>0)}close(){if(this.hasAttribute("data-leaving"))return;this.setAttribute("data-leaving","");let t=!1,e=()=>{t||(t=!0,this.removeEventListener("animationend",e),this.emit("close"),this.remove())};this.addEventListener("animationend",e),setTimeout(e,250)}},Ge=a`
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
`,ut=class extends c{static styles=[Ge];static props={position:{default:"bottom-right"},limit:{type:"number",default:5}};#t=new Map;#e=new Map;#o=new Map;template(){return p`<slot></slot>`}show(t){let e=t.id??v("mt-notif"),o=this.querySelector(`mt-notification[data-id="${e}"]`);if(o)return this.#i(o,t),this.#s(e,o,t.autoClose),e;let r=document.createElement("mt-notification");return r.setAttribute("data-id",e),this.#i(r,t),r.addEventListener("close",()=>this.#n(e),{once:!0}),r.addEventListener("mouseenter",()=>this.#a(e)),r.addEventListener("mouseleave",()=>this.#r(e,r)),this.appendChild(r),this.#c(),this.#s(e,r,t.autoClose),e}updateItem(t,e){let o=this.querySelector(`mt-notification[data-id="${t}"]`);o&&(this.#i(o,e),"autoClose"in e&&this.#s(t,o,e.autoClose))}hide(t){this.querySelector(`mt-notification[data-id="${t}"]`)?.close()}clean(){for(let t of Array.from(this.querySelectorAll("mt-notification")))t.close()}#i(t,e){if(e.title!==void 0&&t.setAttribute("heading",e.title),e.color!==void 0&&(e.color?t.setAttribute("color",e.color):t.removeAttribute("color")),e.loading!==void 0&&t.toggleAttribute("loading",!!e.loading),e.withCloseButton!==void 0&&t.setAttribute("with-close-button",e.withCloseButton?"":"false"),e.message!==void 0&&(t.textContent=e.message),e.icon!==void 0){let o=t.querySelector(':scope > [slot="icon"]');e.icon?(o||(o=document.createElement("span"),o.setAttribute("slot","icon"),t.appendChild(o)),o.innerHTML=e.icon):o?.remove()}}#s(t,e,o){clearTimeout(this.#t.get(t)),this.#t.delete(t);let r=o===void 0?4e3:o;if(r===!1){this.#e.delete(t);return}this.#e.set(t,r),this.#r(t,e)}#r(t,e){let o=this.#e.get(t);o!=null&&(this.#o.set(t,Date.now()),this.#t.set(t,window.setTimeout(()=>{this.#n(t),e.close()},o)))}#a(t){let e=this.#t.get(t);if(e==null)return;clearTimeout(e),this.#t.delete(t);let o=this.#o.get(t)??Date.now(),r=this.#e.get(t)??0;this.#e.set(t,Math.max(0,r-(Date.now()-o)))}#n(t){clearTimeout(this.#t.get(t)),this.#t.delete(t),this.#e.delete(t),this.#o.delete(t)}#c(){let t=Array.from(this.querySelectorAll("mt-notification"));for(;t.length>this.limit;)t.shift()?.close()}};function q(){let i=document.querySelector("mt-notifications");return i||(i=document.createElement("mt-notifications"),document.body.appendChild(i)),i}var N={show(i){return q().show(i)},update(i,t){q().updateItem(i,t)},hide(i){q().hide(i)},clean(){q().clean()}};document.addEventListener("mt-notify",i=>{let t=i.detail;t&&!Array.isArray(t)&&"value"in t&&Array.isArray(t.value)&&(t=t.value);for(let e of Array.isArray(t)?t:[t??{}])N.show(e)});n("mt-notification",ht);n("mt-notifications",ut);var Qe=a`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
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
  .root { max-width: var(--_maxw); }
`,mt=class extends c{static styles=[Qe];static props={size:{default:"md"},fluid:{type:"boolean"},centered:{type:"boolean",default:!0}};template(){return'<div class="root" part="root"><slot></slot></div>'}update(t){if(t.has("size")){let e=this.size;this.$(".root").style.maxWidth=e&&!K(e)?k("rem",e):""}}};n("mt-container",mt);var Je=a`
  :host {
    display: block;
    --_gap: var(--mt-spacing-md);
    --_justify: flex-start;
    --_align: center;
  }
  .root {
    display: flex;
    flex-wrap: wrap;
    gap: var(--_gap);
    justify-content: var(--_justify);
    align-items: var(--_align);
  }
  :host([wrap='nowrap']) .root { flex-wrap: nowrap; }
  :host([grow]) ::slotted(*) { flex-grow: 1; flex-basis: 0; min-width: fit-content; }
  :host([grow][prevent-grow-overflow='false']) ::slotted(*) { flex-basis: auto; }
`,ft=class extends c{static styles=[Je];static props={gap:{css:"--_gap",scale:"spacing",default:"md"},justify:{css:"--_justify",default:"flex-start"},align:{css:"--_align",default:"center"},wrap:{default:"wrap"},grow:{type:"boolean"},preventGrowOverflow:{type:"boolean",default:!0}};template(){return'<div class="root" part="root"><slot></slot></div>'}};n("mt-group",ft);var to=a`
  :host {
    display: block;
    --_gap: var(--mt-spacing-md);
    --_align: stretch;
    --_justify: flex-start;
  }
  .root {
    display: flex;
    flex-direction: column;
    row-gap: var(--_gap);
    align-items: var(--_align);
    justify-content: var(--_justify);
  }
`,gt=class extends c{static styles=[to];static props={gap:{css:"--_gap",scale:"spacing",default:"md"},align:{css:"--_align",default:"stretch"},justify:{css:"--_justify",default:"flex-start"}};template(){return'<div class="root" part="root"><slot></slot></div>'}};n("mt-stack",gt);var eo=a`
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
`,vt=class extends c{static styles=[eo];static props={columns:{css:"--_cols",type:"number",default:12},gutter:{css:"--_gutter",scale:"spacing",default:"md"},justify:{css:"--_justify",default:"flex-start"},align:{css:"--_align",default:"stretch"},grow:{type:"boolean"}};template(){return'<div class="inner" part="inner"><slot></slot></div>'}},oo=[["xs","36em"],["sm","48em"],["md","62em"],["lg","75em"],["xl","88em"]],Se=(i,t)=>oo.map(([e,o])=>`@media (min-width: ${o}) { :host([${i}-${e}]) { ${t}: var(--_${i}-${e}); } }`).join(`
`),io=a`
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
  ${Se("span","--_span")}
  ${Se("offset","--_offset")}
`,bt=class extends c{static styles=[io];static props={span:{css:"--_span",default:12},offset:{css:"--_offset",type:"number",default:0},order:{css:"--_order",type:"number",default:0},spanXs:{attr:"span-xs",css:"--_span-xs",type:"number"},spanSm:{attr:"span-sm",css:"--_span-sm",type:"number"},spanMd:{attr:"span-md",css:"--_span-md",type:"number"},spanLg:{attr:"span-lg",css:"--_span-lg",type:"number"},spanXl:{attr:"span-xl",css:"--_span-xl",type:"number"},offsetXs:{attr:"offset-xs",css:"--_offset-xs",type:"number"},offsetSm:{attr:"offset-sm",css:"--_offset-sm",type:"number"},offsetMd:{attr:"offset-md",css:"--_offset-md",type:"number"},offsetLg:{attr:"offset-lg",css:"--_offset-lg",type:"number"},offsetXl:{attr:"offset-xl",css:"--_offset-xl",type:"number"}}};n("mt-grid",vt);n("mt-grid-col",bt);var ro=[["xs","36em"],["sm","48em"],["md","62em"],["lg","75em"],["xl","88em"]],yt=(i,t)=>ro.map(([e,o])=>`@media (min-width: ${o}) { :host([${i}-${e}]) { ${t}: var(--_${i}-${e}); } }`).join(`
`),so=a`
  :host {
    display: block;
    --_cols: 1;
    --_spacing: var(--mt-spacing-md);
    --_vspacing: var(--_spacing);
  }
  .root {
    display: grid;
    grid-template-columns: repeat(var(--_cols), 1fr);
    column-gap: var(--_spacing);
    row-gap: var(--_vspacing);
  }
  ${yt("cols","--_cols")}
  ${yt("spacing","--_spacing")}
  ${yt("vertical-spacing","--_vspacing")}
`,xt=class extends c{static styles=[so];static props={cols:{css:"--_cols",type:"number",default:1},spacing:{css:"--_spacing",scale:"spacing",default:"md"},verticalSpacing:{css:"--_vspacing",scale:"spacing"},colsXs:{attr:"cols-xs",css:"--_cols-xs",type:"number"},colsSm:{attr:"cols-sm",css:"--_cols-sm",type:"number"},colsMd:{attr:"cols-md",css:"--_cols-md",type:"number"},colsLg:{attr:"cols-lg",css:"--_cols-lg",type:"number"},colsXl:{attr:"cols-xl",css:"--_cols-xl",type:"number"},spacingXs:{attr:"spacing-xs",css:"--_spacing-xs",scale:"spacing"},spacingSm:{attr:"spacing-sm",css:"--_spacing-sm",scale:"spacing"},spacingMd:{attr:"spacing-md",css:"--_spacing-md",scale:"spacing"},spacingLg:{attr:"spacing-lg",css:"--_spacing-lg",scale:"spacing"},spacingXl:{attr:"spacing-xl",css:"--_spacing-xl",scale:"spacing"},verticalSpacingXs:{attr:"vertical-spacing-xs",css:"--_vertical-spacing-xs",scale:"spacing"},verticalSpacingSm:{attr:"vertical-spacing-sm",css:"--_vertical-spacing-sm",scale:"spacing"},verticalSpacingMd:{attr:"vertical-spacing-md",css:"--_vertical-spacing-md",scale:"spacing"},verticalSpacingLg:{attr:"vertical-spacing-lg",css:"--_vertical-spacing-lg",scale:"spacing"},verticalSpacingXl:{attr:"vertical-spacing-xl",css:"--_vertical-spacing-xl",scale:"spacing"}};template(){return'<div class="root" part="root"><slot></slot></div>'}};n("mt-simple-grid",xt);var ao=a`
  :host { display: flex; align-items: center; justify-content: center; }
  :host([inline]) { display: inline-flex; }
`,wt=class extends c{static styles=[ao];static props={inline:{type:"boolean"}}};n("mt-center",wt);var no=a`
  :host { display: block; flex-shrink: 0; width: var(--_w, auto); height: var(--_h, auto); }
`,_t=class extends c{static styles=[no];static props={w:{css:"--_w",scale:"spacing"},h:{css:"--_h",scale:"spacing"}}};n("mt-space",_t);var lo=a`
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
`,kt=class extends c{static styles=[lo];static props={orientation:{default:"horizontal"},size:{default:"xs"},color:{css:"--_color",scale:"color"},variant:{default:"solid"},label:{},labelPosition:{attr:"label-position",default:"center"}};template(){return'<div class="root" part="root" role="separator"><div class="line before"></div><span class="label" part="label"><slot name="label"></slot></span><div class="line after"></div></div>'}setup(){this.$('slot[name="label"]').addEventListener("slotchange",()=>this.#t())}update(t){if(t.has("orientation")&&this.setAttribute("aria-orientation",this.orientation),t.has("label")){let e=this.$('slot[name="label"]');e.assignedNodes().length===0&&(e.textContent=this.label??"")}this.#t()}#t(){this.$('slot[name="label"]').assignedNodes().length>0||!!this.label?this.setAttribute("data-has-label",""):this.removeAttribute("data-has-label")}};n("mt-divider",kt);var co=a`
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
`,zt=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[co];static props={variant:{default:"filled"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius"},disabled:{type:"boolean"},loading:{type:"boolean"},type:{default:"button"},href:{},target:{},ariaLabel:{attr:"aria-label"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};internals=this.attachInternals();template(){return p`
      <button class="root" part="root" type="button">
        <span class="inner" part="inner"><slot></slot></span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `}setup(){this.addEventListener("click",t=>{if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}let e=this.internals.form;e&&(this.type==="submit"?e.requestSubmit():this.type==="reset"&&e.reset())})}update(t){t.has("href")&&this.#t();let e=this.$(".root"),o=this.disabled||this.loading;if(e instanceof HTMLButtonElement)e.disabled=o;else{e.setAttribute("href",this.href??"");let r=this.getAttribute("target");r?e.setAttribute("target",r):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",o),e.tabIndex=o?-1:0,this.toggleAttribute("data-disabled",o)}e.toggleAttribute("aria-busy",this.loading),this.ariaLabel?e.setAttribute("aria-label",this.ariaLabel):e.removeAttribute("aria-label")}#t(){let t=this.$(".root"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let o=document.createElement(e.toLowerCase());o.className=t.className,o.setAttribute("part","root"),e==="BUTTON"&&o.setAttribute("type","button"),o.append(...t.childNodes),t.replaceWith(o)}},po=a`
  :host { display: inline-flex; flex-direction: row; }
  :host([orientation='vertical']) { flex-direction: column; }
`,Et=class extends c{static styles=[po];static props={orientation:{default:"horizontal"}};onConnect(){this.#t(),this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t())}update(){this.#t()}#t(){let t=this.getAttribute("orientation")==="vertical",e=[...this.children].filter(o=>o instanceof HTMLElement);e.forEach((o,r)=>{let s=r===0,l=r===e.length-1,d="var(--mt-radius-default)",h=t?`${s?d:0} ${s?d:0} ${l?d:0} ${l?d:0}`:`${s?d:0} ${l?d:0} ${l?d:0} ${s?d:0}`;o.style.setProperty("--_radius",h),o.style.setProperty(t?"margin-top":"margin-left",s?"0":"-1px")})}};n("mt-action-icon",zt);n("mt-action-icon-group",Et);var ho='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="1rem" height="1rem"><path d="M18 6 6 18M6 6l12 12"/></svg>',uo=a`
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
`,St=class extends c{static styles=[uo];static props={variant:{default:"light"},color:{color:!0},heading:{},withCloseButton:{type:"boolean"},closeButtonLabel:{default:"Close alert"}};template(){return p`
      <div class="root" part="root" role="alert">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <div class="body" part="body">
          <p class="heading" part="heading" hidden></p>
          <div class="message" part="message"><slot></slot></div>
        </div>
        <button class="close" part="close-button" type="button" aria-label="Close alert"></button>
      </div>
    `}setup(){let t=this.$(".icon slot"),e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e(),this.$(".close").innerHTML=ho,this.$(".close").addEventListener("click",()=>{this.emit("close")&&(this.hidden=!0)})}update(t){if(t.has("heading")){let e=this.$(".heading");e.textContent=this.heading??"",e.hidden=!this.heading}t.has("closeButtonLabel")&&this.$(".close").setAttribute("aria-label",this.closeButtonLabel)}};n("mt-alert",St);var mo='<svg viewBox="0 0 24 24" fill="currentColor" width="60%" height="60%"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-9 2.2-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.8-4.6-5-9-5Z"/></svg>',fo=a`
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
`;function go(i){let t=i.trim().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}var At=class extends c{static styles=[fo];static props={src:{},alt:{},name:{},color:{color:!0},variant:{default:"light"},size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"1000px"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};#t=!1;template(){return p`
      <span class="root" part="root">
        <img class="image" part="image" hidden alt="" />
        <span class="initials" part="initials" hidden></span>
        <span class="icon" part="icon" aria-hidden="true" hidden><slot name="placeholder">${mo}</slot></span>
      </span>
    `}get#e(){return this.$(".image")}setup(){this.#e.addEventListener("error",()=>{this.#t=!0,this.#o()}),this.#e.addEventListener("load",()=>{this.#t=!1,this.#o()})}update(t){t.has("src")&&(this.#t=!1,this.#e.src=this.src??""),(t.has("alt")||t.has("name"))&&(this.#e.alt=this.alt??this.name??""),this.#o()}#o(){let t=!!this.src&&!this.#t,e=this.name?go(this.name):"",o=this.$(".initials");this.#e.hidden=!t,o.hidden=t||!e,o.textContent=e,this.$(".icon").hidden=t||!!e}},vo=a`
  :host { display: inline-flex; --_overlap: var(--mt-spacing-sm); }
  ::slotted(mt-avatar) {
    margin-inline-start: calc(var(--_overlap) * -1);
    box-shadow: 0 0 0 2px var(--mt-color-body);
  }
  ::slotted(mt-avatar:first-child) { margin-inline-start: 0; }
`,Lt=class extends c{static styles=[vo];static props={spacing:{css:"--_overlap",scale:"spacing",default:"sm"}}};n("mt-avatar",At);n("mt-avatar-group",Lt);var bo=a`
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
`,Mt=class extends c{static styles=[bo];static props={variant:{default:"filled"},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius"},fullWidth:{type:"boolean"},circle:{type:"boolean"},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};template(){return p`
      <span class="root" part="root">
        <span class="dot" part="dot" aria-hidden="true"></span>
        <span class="section left" part="left-section"><slot name="left-section"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="section right" part="right-section"><slot name="right-section"></slot></span>
      </span>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}}};n("mt-badge",Mt);var yo=a`
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
`,Tt=class extends c{static formAssociated=!0;static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[yo];static props={variant:{default:"filled"},color:{color:!0},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"},fullWidth:{type:"boolean"},disabled:{type:"boolean"},loading:{type:"boolean"},justify:{css:"--_justify"},type:{default:"button"},href:{},target:{},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};internals=this.attachInternals();template(){return p`
      <button class="root" part="root" type="button">
        <span class="inner">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="label" part="label"><slot></slot></span>
          <span class="section right" part="right-section"><slot name="right-section"></slot></span>
        </span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.addEventListener("click",t=>{if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}let e=this.internals.form;e&&(this.type==="submit"?e.requestSubmit():this.type==="reset"&&e.reset())})}update(t){t.has("href")&&this.#t();let e=this.$(".root"),o=this.disabled||this.loading;if(e instanceof HTMLButtonElement)e.disabled=o;else{e.setAttribute("href",this.href??"");let r=this.getAttribute("target");r?e.setAttribute("target",r):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",o),e.tabIndex=o?-1:0,this.toggleAttribute("data-disabled",o)}e.toggleAttribute("aria-busy",this.loading)}#t(){let t=this.$(".root"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let o=document.createElement(e.toLowerCase());o.className=t.className,o.setAttribute("part","root"),e==="BUTTON"&&o.setAttribute("type","button"),o.append(...t.childNodes),t.replaceWith(o)}},xo=a`
  :host { display: inline-flex; flex-direction: row; }
  :host([orientation='vertical']) { flex-direction: column; }
`,Ct=class extends c{static styles=[xo];static props={orientation:{default:"horizontal"}};onConnect(){this.#t(),this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t())}update(){this.#t()}#t(){let t=this.getAttribute("orientation")==="vertical",e=[...this.children].filter(o=>o instanceof HTMLElement);e.forEach((o,r)=>{let s=r===0,l=r===e.length-1,d="var(--mt-radius-default)",h=t?`${s?d:0} ${s?d:0} ${l?d:0} ${l?d:0}`:`${s?d:0} ${l?d:0} ${l?d:0} ${s?d:0}`;o.style.setProperty("--_radius",h),o.style.setProperty(t?"margin-top":"margin-left",s?"0":"-1px")})}};n("mt-button",Tt);n("mt-button-group",Ct);var wo=a`
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
`,Pt=class extends c{static styles=[wo];static props={padding:{css:"--_card-padding",scale:"spacing",default:"md"},shadow:{css:"--_shadow",scale:"shadow"},radius:{css:"--_radius",scale:"radius"},withBorder:{type:"boolean"}}},_o=a`
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
`,$t=class extends c{static styles=[_o];static props={withBorder:{type:"boolean"},inheritPadding:{type:"boolean"}}};n("mt-card",Pt);n("mt-card-section",$t);var ko=a`
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
`,Ht=class extends c{static styles=[ko];static props={type:{default:"oval"},color:{css:"--_color",scale:"color"},size:{default:"md"}};template(){return p`
      <span class="oval" part="oval" role="status" aria-label="Loading"></span>
      <span class="bars" part="bars" role="status" aria-label="Loading"><span></span><span></span><span></span></span>
      <span class="dots" part="dots" role="status" aria-label="Loading"><span></span><span></span><span></span></span>
    `}};n("mt-loader",Ht);var zo=a`
  :host {
    display: block;
    --_radius: var(--mt-radius-default);
    background: var(--mt-color-body);
    border-radius: var(--_radius);
  }
  :host([shadow]) { box-shadow: var(--_shadow); }
  :host([with-border]) { border: 1px solid var(--mt-color-border); }
`,Ot=class extends c{static styles=[zo];static props={shadow:{css:"--_shadow",scale:"shadow"},radius:{css:"--_radius",scale:"radius"},withBorder:{type:"boolean"}}};n("mt-paper",Ot);var Eo=a`
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
`,Dt=class extends c{static styles=[Eo];static props={size:{default:"sm"},c:{css:"--_color",scale:"color"},fw:{css:"--_fw",type:"number"},fs:{css:"--_fs"},td:{css:"--_td"},tt:{css:"--_tt"},ta:{css:"--_ta"},truncate:{},lineClamp:{css:"--_clamp",type:"number"},inherit:{type:"boolean"},span:{type:"boolean"},variant:{},gradientFrom:{css:"--_gfrom",scale:"color",default:"blue"},gradientTo:{css:"--_gto",scale:"color",default:"cyan"},gradientDeg:{css:"--_gdeg",type:"number",default:45}};template(){return p`<span class="root" part="root"><slot></slot></span>`}};n("mt-text",Dt);var So=a`
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
`,Ae={h1:"--mt-h1-font-size",h2:"--mt-h2-font-size",h3:"--mt-h3-font-size",h4:"--mt-h4-font-size",h5:"--mt-h5-font-size",h6:"--mt-h6-font-size"},Ao={h1:"--mt-h1-line-height",h2:"--mt-h2-line-height",h3:"--mt-h3-line-height",h4:"--mt-h4-line-height",h5:"--mt-h5-line-height",h6:"--mt-h6-line-height"},Nt=class extends c{static styles=[So];static props={order:{type:"number",default:1},size:{},c:{css:"--_color",scale:"color"},ta:{css:"--_ta"},textWrap:{css:"--_text-wrap"},lineClamp:{css:"--_clamp",type:"number"}};template(){return p`<h1 class="root" part="root"><slot></slot></h1>`}update(t){t.has("order")&&this.#t(),(t.has("size")||t.has("order"))&&this.#e()}#t(){let t=Math.min(6,Math.max(1,Math.round(this.order)||1)),e=this.$(".root"),o=`H${t}`;if(e.tagName===o)return;let r=document.createElement(o.toLowerCase());r.className=e.className,r.setAttribute("part","root"),r.append(...e.childNodes),e.replaceWith(r)}#e(){let t=this.$(".root"),e=this.size;if(!e){t.style.removeProperty("font-size"),t.style.removeProperty("line-height");return}Ae[e]?(t.style.setProperty("font-size",`var(${Ae[e]})`),t.style.setProperty("line-height",`var(${Ao[e]})`)):(t.style.setProperty("font-size",/^-?\d*\.?\d+$/.test(e)?`${parseFloat(e)/16}rem`:e),t.style.removeProperty("line-height"))}};n("mt-title",Nt);var Lo=["placeholder","type","autocomplete","inputmode","pattern","minlength","maxlength","readonly","autofocus"],Bt=class extends m{static styles=[w,_];static props={...m.props,value:{},variant:{default:"default"},placeholder:{},type:{default:"text"},autocomplete:{},inputmode:{},pattern:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"}};template(){return g(H('<input id="control" class="input" part="input">'))}get input(){return this.$("#control")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value)}setup(){super.setup(),this.input.addEventListener("input",()=>this.setFormValue(this.input.value)),this.input.addEventListener("change",()=>this.forwardChange())}update(t){super.update(t);for(let e of Lo){if(!t.has(e))continue;let o=this.getAttribute(e);o===null||o==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,o)}t.has("value")&&(this.value=this.getAttribute("value")??"")}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};n("mt-text-input",Bt);var Mo=["placeholder","autocomplete","minlength","maxlength","readonly","autofocus"],To=a`
  :host([resize='vertical']) .input { resize: vertical; }
  :host([resize='both']) .input { resize: both; }
  :host([autosize]) .input { resize: none; overflow: hidden; }
`,Ft=class extends m{static styles=[w,_,To];static props={...m.props,value:{},variant:{default:"default"},placeholder:{},autocomplete:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"},autosize:{type:"boolean"},minRows:{type:"number",default:2},maxRows:{type:"number"},resize:{default:"none"}};template(){return g(H('<textarea id="control" class="input" part="input" rows="2"></textarea>'))}get input(){return this.$("#control")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value),this.#t()}setup(){super.setup(),this.input.addEventListener("input",()=>{this.setFormValue(this.input.value),this.#t()}),this.input.addEventListener("change",()=>this.forwardChange())}update(t){super.update(t);for(let e of Mo){if(!t.has(e))continue;let o=this.getAttribute(e);o===null||o==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,o)}t.has("value")&&(this.value=this.getAttribute("value")??""),t.has("minRows")&&!this.autosize&&(this.input.rows=this.minRows||2),(t.has("autosize")||t.has("minRows")||t.has("maxRows"))&&this.#t()}#t(){let t=this.input;if(!this.autosize){t.style.height="",t.style.overflowY="";return}t.style.height="auto";let e=getComputedStyle(t),o=parseFloat(e.lineHeight)||20,r=(parseFloat(e.paddingTop)||0)+(parseFloat(e.paddingBottom)||0)+(parseFloat(e.borderTopWidth)||0)+(parseFloat(e.borderBottomWidth)||0),s=this.minRows?o*this.minRows+r:0,l=this.maxRows?o*this.maxRows+r:1/0,d=Math.min(Math.max(t.scrollHeight,s),l);t.style.height=`${d}px`,t.style.overflowY=t.scrollHeight>l?"auto":"hidden"}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};n("mt-textarea",Ft);var Co=["placeholder","autocomplete","minlength","maxlength","readonly","autofocus"],Po='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>',$o='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.3 21.3 0 0 1 5.17-6.17M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.3 21.3 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',Ho=a`
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
`,It=class extends m{static styles=[w,_,Ho];static props={...m.props,value:{},variant:{default:"default"},placeholder:{},autocomplete:{},minlength:{},maxlength:{},readonly:{type:"boolean"},autofocus:{type:"boolean"},visible:{type:"boolean"}};template(){return g(p`
      <div class="field has-right" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="password" autocomplete="current-password" />
        <div class="section right toggle-section" part="right-section">
          <button type="button" class="toggle" part="toggle" tabindex="-1" aria-pressed="false" aria-label="Show password">
            <span class="icon-show" aria-hidden="true">${Po}</span>
            <span class="icon-hide" aria-hidden="true">${$o}</span>
          </button>
        </div>
      </div>
    `)}get input(){return this.$("#control")}get toggle(){return this.$(".toggle")}get value(){return this.input.value}set value(t){this.input.value=t??"",this.setFormValue(this.input.value)}setup(){super.setup(),this.input.addEventListener("input",()=>this.setFormValue(this.input.value)),this.input.addEventListener("change",()=>this.forwardChange()),this.toggle.addEventListener("mousedown",t=>t.preventDefault()),this.toggle.addEventListener("click",()=>{this.isDisabled||this.getAttribute("readonly")!==null||(this.visible=!this.visible,this.emit("visibility-change",{visible:this.visible}))})}update(t){super.update(t);for(let e of Co){if(!t.has(e))continue;let o=this.getAttribute(e);o===null||o==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,o)}if(t.has("value")&&(this.value=this.getAttribute("value")??""),t.has("visible")){let e=this.visible;this.input.type=e?"text":"password",this.toggle.setAttribute("aria-pressed",String(e)),this.toggle.setAttribute("aria-label",e?"Hide password":"Show password")}t.has("disabled")&&this.toggle.toggleAttribute("disabled",this.isDisabled)}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};n("mt-password-input",It);var Oo=["placeholder","readonly","autofocus"],Do='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5 5 1l4 4"/></svg>',No='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>',Bo=a`
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
`,Rt=class extends m{static styles=[w,_,Bo];static props={...m.props,value:{},variant:{default:"default"},placeholder:{},readonly:{type:"boolean"},autofocus:{type:"boolean"},min:{type:"number"},max:{type:"number"},step:{type:"number",default:1},clampBehavior:{default:"blur"},allowDecimal:{type:"boolean",default:!0},decimalScale:{type:"number"},allowNegative:{type:"boolean",default:!0},prefix:{},suffix:{},thousandSeparator:{},hideControls:{type:"boolean"}};#t="";template(){return g(p`
      <div class="field has-right" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" inputmode="decimal" autocomplete="off" />
        <div class="section right controls" part="right-section">
          <div class="stepper" part="controls">
            <button type="button" class="step up" part="control-up" tabindex="-1" aria-label="Increment">${Do}</button>
            <button type="button" class="step down" part="control-down" tabindex="-1" aria-label="Decrement">${No}</button>
          </div>
        </div>
      </div>
    `)}get input(){return this.$("#control")}get value(){return this.#t===""||this.#t==="-"?"":Number(this.#t)}set value(t){this.#t=t==null||t===""?"":String(t),this.#r(),this.setFormValue(this.#t===""?null:this.#t)}setup(){super.setup(),this.input.addEventListener("focus",()=>{this.input.value=this.#t}),this.input.addEventListener("blur",()=>{let o=this.#o(this.input.value);this.clampBehavior!=="none"&&(o=this.#i(o)),this.#t=o,this.#r(),this.setFormValue(this.#t===""?null:this.#t),this.forwardChange()}),this.input.addEventListener("input",()=>{let o=this.#o(this.input.value);this.clampBehavior==="strict"&&(o=this.#i(o)),this.#t=o,this.input.value!==o&&(this.input.value=o),this.setFormValue(this.#t===""?null:this.#t)}),this.input.addEventListener("keydown",o=>{o.key==="ArrowUp"?(o.preventDefault(),this.#a(1)):o.key==="ArrowDown"&&(o.preventDefault(),this.#a(-1))});let t=this.$(".step.up"),e=this.$(".step.down");t.addEventListener("pointerdown",o=>o.preventDefault()),e.addEventListener("pointerdown",o=>o.preventDefault()),t.addEventListener("click",()=>this.#a(1)),e.addEventListener("click",()=>this.#a(-1))}update(t){super.update(t);for(let e of Oo){if(!t.has(e))continue;let o=this.getAttribute(e);o===null||o==="false"?this.input.removeAttribute(e):this.input.setAttribute(e,o)}t.has("value")&&(this.value=this.getAttribute("value")??""),(t.has("prefix")||t.has("suffix")||t.has("thousandSeparator")||t.has("decimalScale"))&&this.root.activeElement!==this.input&&this.#r()}#e(){let t=this.getAttribute("thousand-separator");return t===null||t==="false"?"":t===""?",":t}#o(t){let e=t,o=this.#e();o&&(e=e.split(o).join(""));let r=this.prefix||"",s=this.suffix||"";r&&e.startsWith(r)&&(e=e.slice(r.length)),s&&e.endsWith(s)&&(e=e.slice(0,e.length-s.length));let l=!1;e.startsWith("-")&&(l=!0,e=e.slice(1)),e=e.replace(/[^0-9.]/g,"");let d=e.indexOf("."),h=d===-1?e:e.slice(0,d),u=d===-1?"":e.slice(d+1).replace(/\./g,"");h=h.replace(/^0+(?=\d)/,""),this.decimalScale!=null&&(u=u.slice(0,this.decimalScale));let f=h;return this.allowDecimal&&d!==-1&&(f+="."+u),l&&this.allowNegative&&f!==""&&(f="-"+f),f}#i(t){if(t===""||t==="-")return t;let e=Number(t);return Number.isNaN(e)?t:(this.min!=null&&e<this.min&&(e=this.min),this.max!=null&&e>this.max&&(e=this.max),this.decimalScale!=null?e.toFixed(this.decimalScale):String(e))}#s(t){if(t===""||t==="-")return"";let e=t.startsWith("-"),o=e?t.slice(1):t,[r,s]=o.split("."),l=r||"0",d=this.#e();d&&(l=l.replace(/\B(?=(\d{3})+(?!\d))/g,d));let h=l;return s!==void 0&&(h+="."+s),e&&(h="-"+h),`${this.prefix||""}${h}${this.suffix||""}`}#r(){this.input.value=this.#s(this.#t)}#a(t){if(this.isDisabled||this.getAttribute("readonly")!==null)return;let o=(this.#t===""||this.#t==="-"?0:Number(this.#t))+t*(this.step||1);this.min!=null&&(o=Math.max(o,this.min)),this.max!=null&&(o=Math.min(o,this.max)),this.#t=this.decimalScale!=null?o.toFixed(this.decimalScale):String(o),this.#r(),this.setFormValue(this.#t===""?null:this.#t),this.forwardChange()}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};n("mt-number-input",Rt);var Fo='<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>',Io='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg>',Ro='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg>',jo=a`
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
`,jt=class extends m{static styles=[w,_,J,jo];static props={...m.props,value:{},placeholder:{},variant:{default:"default"},readonly:{type:"boolean"},autofocus:{type:"boolean"},searchable:{type:"boolean"},clearable:{type:"boolean"},nothingFound:{},allowDeselect:{type:"boolean",default:!0},maxDropdownHeight:{css:"--_max-dropdown-height",scale:"rem",default:250}};#t="";#e="";#o=[];#i=[];#s=-1;#r=!1;#a;#n;#c=new MutationObserver(()=>{this.#w(),this.#u(),this.#v()});template(){return g(p`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" role="combobox" aria-haspopup="listbox"
               aria-expanded="false" aria-controls="dropdown" aria-autocomplete="list" autocomplete="off"
               spellcheck="false" readonly />
        <div class="section right" part="right-section">
          <button type="button" class="clear" part="clear-button" aria-label="Clear value" tabindex="-1" hidden>${Io}</button>
          <span class="chevron" part="chevron" aria-hidden="true">${Fo}</span>
        </div>
      </div>
      <div id="dropdown" class="dropdown" part="dropdown" popover="manual" role="listbox"></div>
    `)}get input(){return this.$("#control")}get field(){return this.$(".field")}get dropdown(){return this.$("#dropdown")}get clearBtn(){return this.$(".clear")}get value(){return this.#t}set value(t){this.#t=t??"",this.setFormValue(this.#t===""?null:this.#t),this.#v(),this.#l(),this.#r&&this.#x()}setup(){super.setup(),this.#w(),this.#i=this.#o,this.#c.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value","label","disabled"],characterData:!0}),this.input.addEventListener("focus",()=>{!this.isDisabled&&!this.#r&&this.#d()}),this.input.addEventListener("click",()=>{!this.isDisabled&&!this.#r&&this.#d()}),this.input.addEventListener("blur",()=>this.#p()),this.input.addEventListener("input",()=>{this.searchable&&(this.#e=this.input.value,this.#r?this.#u():this.#d())}),this.input.addEventListener("keydown",t=>this.#h(t)),this.clearBtn.addEventListener("mousedown",t=>t.preventDefault()),this.clearBtn.addEventListener("click",t=>{t.stopPropagation(),!(this.isDisabled||this.getAttribute("readonly")!==null)&&(this.value="",this.emit("change",{value:""}))})}update(t){if(super.update(t),t.has("placeholder")){let e=this.placeholder;e?this.input.setAttribute("placeholder",e):this.input.removeAttribute("placeholder")}if(t.has("autofocus")&&(this.getAttribute("autofocus")!==null?this.input.setAttribute("autofocus",""):this.input.removeAttribute("autofocus")),t.has("readonly")||t.has("searchable")){let e=this.getAttribute("readonly")!==null;this.input.readOnly=e||!this.searchable,e&&this.#p()}t.has("disabled")&&this.isDisabled&&this.#p(),t.has("value")&&(this.value=this.getAttribute("value")??""),(t.has("clearable")||t.has("disabled")||t.has("readonly"))&&this.#l()}#l(){let t=this.getAttribute("readonly")!==null;this.clearBtn.hidden=!(this.clearable&&this.#t!==""&&!this.isDisabled&&!t)}#h(t){if(!(this.isDisabled||this.getAttribute("readonly")!==null))switch(t.key){case"ArrowDown":t.preventDefault(),this.#r?this.#b(1):this.#d();break;case"ArrowUp":t.preventDefault(),this.#r?this.#b(-1):this.#d();break;case"Home":this.#r&&(t.preventDefault(),this.#f(this.#m(1)));break;case"End":this.#r&&(t.preventDefault(),this.#f(this.#m(-1)));break;case"Enter":if(this.#r){t.preventDefault();let e=this.#i[this.#s];e&&this.#y(e)}break;case"Escape":this.#r&&(t.preventDefault(),this.#p());break}}#d(){this.#r||this.isDisabled||this.getAttribute("readonly")!==null||(this.#r=!0,this.toggleAttribute("data-open",!0),this.input.setAttribute("aria-expanded","true"),this.#u(),this.dropdown.showPopover(),this.#a=E(this.field,this.dropdown,{matchWidth:!0,offset:4}),this.#n=A([this],()=>this.#p()))}#p(){this.#r&&(this.#r=!1,this.toggleAttribute("data-open",!1),this.input.setAttribute("aria-expanded","false"),this.input.removeAttribute("aria-activedescendant"),this.dropdown.hidePopover(),this.#a?.(),this.#a=void 0,this.#n?.(),this.#n=void 0,this.#e="",this.#v())}#u(){let t=this.searchable?this.#e.trim().toLowerCase():"";this.#i=t?this.#o.filter(e=>e.label.toLowerCase().includes(t)):this.#o,this.#x(),this.#g()}#g(){let t=this.#i.findIndex(e=>e.value===this.#t);this.#f(t!==-1&&!this.#i[t].disabled?t:this.#m(1))}#m(t){let e=this.#i.length;for(let o=0;o<e;o++){let r=t===1?o:e-1-o;if(!this.#i[r].disabled)return r}return-1}#b(t){let e=this.#i.length;if(!e)return;let o=this.#s;for(let r=0;r<e;r++)if(o=(o+t+e)%e,!this.#i[o].disabled){this.#f(o);return}}#f(t){this.#s=t;for(let o of this.dropdown.querySelectorAll(".option"))o.classList.remove("highlighted");let e=t>=0?this.dropdown.querySelector(`.option[data-index="${t}"]`):null;e?(e.classList.add("highlighted"),this.input.setAttribute("aria-activedescendant",e.id),e.scrollIntoView({block:"nearest"})):this.input.removeAttribute("aria-activedescendant")}#y(t){if(t.disabled)return;let e=this.#t===t.value&&this.allowDeselect?"":t.value;this.value=e,this.emit("change",{value:e}),this.#p(),this.input.focus()}#x(){let t=this.dropdown;if(t.innerHTML="",!this.#i.length){let o=document.createElement("div");o.className="empty",o.textContent=this.nothingFound||"Nothing found",t.append(o);return}let e="\0";this.#i.forEach((o,r)=>{if(o.group!==e&&(e=o.group,o.group)){let h=document.createElement("div");h.className="group-label",h.textContent=o.group,t.append(h)}let s=document.createElement("div");s.id=`opt-${r}`,s.className="option"+(o.disabled?" disabled":""),s.setAttribute("role","option"),s.dataset.index=String(r),s.setAttribute("aria-selected",String(o.value===this.#t)),o.disabled&&s.setAttribute("aria-disabled","true");let l=document.createElement("span");l.className="check",l.setAttribute("aria-hidden","true"),o.value===this.#t&&(l.innerHTML=Ro);let d=document.createElement("span");d.className="option-label",d.textContent=o.label,s.append(l,d),s.addEventListener("mousedown",h=>h.preventDefault()),s.addEventListener("click",()=>this.#y(o)),t.append(s)})}#v(){let t=this.#o.find(e=>e.value===this.#t);this.input.value=t?t.label:""}#w(){let t=[],e=(o,r)=>({value:o.getAttribute("value")??o.textContent?.trim()??"",label:o.textContent?.trim()??"",disabled:o.hasAttribute("disabled"),group:r});for(let o of Array.from(this.children))if(o.tagName==="OPTION")t.push(e(o));else if(o.tagName==="OPTGROUP"){let r=o.getAttribute("label")||"";for(let s of o.querySelectorAll(":scope > option"))t.push(e(s,r))}this.#o=t}formResetCallback(){this.value=this.getAttribute("value")??""}formStateRestoreCallback(t){typeof t=="string"&&(this.value=t)}};n("mt-select",jt);function L(i){return p`
    <label class="root" part="root">
      ${i}
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
  `}var M=a`
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
`,V=a`
  :host { --_size: 1.25rem; --_control-h: var(--_size); --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='xs']) { --_size: 1rem; --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='sm']) { --_size: 1.25rem; --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_size: 1.5rem; --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_size: 1.875rem; --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_size: 2.25rem; --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }
`,W=a`
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
`;var qo='<path d="M1.5 5.2L4 7.8L9 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',Vo='<path d="M1.5 5H8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',Wo=a`
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
`,qt=class extends m{static styles=[M,V,Wo];static props={...m.props,value:{default:"on"},checked:{type:"boolean"},indeterminate:{type:"boolean"},color:{color:!0},iconColor:{css:"--_icon-color",scale:"color"},labelPosition:{attr:"label-position",default:"right"}};template(){return L(p`
      <span class="box" part="box">
        <input type="checkbox" id="control" class="input" part="input" />
        <svg class="icon icon-check" part="icon" viewBox="0 0 10 10" aria-hidden="true">${qo}</svg>
        <svg class="icon icon-indeterminate" part="icon" viewBox="0 0 10 10" aria-hidden="true">${Vo}</svg>
      </span>
    `)}get input(){return this.$("#control")}get checked(){return this.input.checked}set checked(t){this.input.checked=!!t,this.#t()}setup(){super.setup(),this.input.addEventListener("change",()=>{this.removeAttribute("indeterminate"),this.#t(),this.forwardChange()})}update(t){super.update(t),t.has("checked")&&(this.input.checked=this.prop("checked")),t.has("indeterminate")&&(this.input.indeterminate=this.indeterminate),(t.has("checked")||t.has("value"))&&this.#t()}#t(){if(this.closest("mt-checkbox-group")){this.internals.setFormValue(null);return}this.setFormValue(this.input.checked?this.value:null)}formResetCallback(){this.input.checked=this.prop("checked"),this.input.indeterminate=this.indeterminate,this.#t()}formStateRestoreCallback(t){typeof t=="string"&&(this.checked=t===this.value)}},Vt=class extends m{static styles=[W];static props={...m.props,value:{}};#t=null;template(){return g('<div class="items" part="items" role="group"><slot></slot></div>',{labelFor:!1})}get control(){return null}get value(){if(this.#t)return this.#t;let t=this.getAttribute("value");return t?t.split(",").map(e=>e.trim()).filter(Boolean):[]}set value(t){this.#t=Array.isArray(t)?t:typeof t=="string"?t.split(",").map(e=>e.trim()).filter(Boolean):[],this.#o()}setup(){super.setup(),this.internals.role="group",this.addEventListener("change",t=>{t.target===this||t.target?.tagName!=="MT-CHECKBOX"||(this.#t=this.#e().filter(e=>e.checked).map(e=>e.getAttribute("value")??"on"),this.#i())})}onConnect(){this.#o()}update(t){super.update(t),t.has("value")&&(this.#t=null,this.#o()),t.has("label")&&(this.internals.ariaLabel=this.label)}#e(){return Array.from(this.querySelectorAll("mt-checkbox"))}#o(){let t=this.value;for(let e of this.#e())e.checked=t.includes(e.getAttribute("value")??"on");this.#i()}#i(){let t=this.value,e=new FormData;if(this.name)for(let o of t)e.append(this.name,o);this.setFormValue(e),this.internals.setValidity(this.required&&t.length===0?{valueMissing:!0}:{},"Select at least one option",void 0),this.emit("change",{value:t})}formResetCallback(){this.#t=null,this.#o()}};n("mt-checkbox",qt);n("mt-checkbox-group",Vt);var Uo=a`
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
`,Wt=class extends m{static styles=[M,V,Uo];static props={...m.props,value:{default:"on"},checked:{type:"boolean"},color:{color:!0},iconColor:{css:"--_icon-color",scale:"color"},labelPosition:{attr:"label-position",default:"right"}};#t=null;template(){return L(p`<span class="box" part="box"><span class="dot" part="dot"></span></span>`)}get control(){return null}focus(t){HTMLElement.prototype.focus.call(this,t)}blur(){HTMLElement.prototype.blur.call(this)}setup(){super.setup(),this.internals.role="radio",this.addEventListener("click",()=>{this.isDisabled||this.select()}),this.addEventListener("keydown",t=>{(t.key===" "||t.key==="Enter")&&!this.isDisabled&&(t.preventDefault(),this.select())})}onConnect(){this.#t=this.closest("mt-radio-group"),this.#t||(this.tabIndex=this.isDisabled?-1:0)}update(t){super.update(t),t.has("checked")&&(this.internals.ariaChecked=this.hasAttribute("checked")?"true":"false",this.#t||this.setFormValue(this.hasAttribute("checked")?this.value:null)),t.has("disabled")&&!this.#t&&(this.tabIndex=this.isDisabled?-1:0)}select(){if(this.#t){this.#t.selectValue(this.getAttribute("value")??"on");return}let t=this.name;if(t){let e=this.form??document;for(let o of e.querySelectorAll(`mt-radio[name="${CSS.escape(t)}"]`))o!==this&&o.removeAttribute("checked")}this.setAttribute("checked",""),this.forwardChange(),this.emit("change",{value:this.value})}formResetCallback(){this.toggleAttribute("checked",this.getAttribute("checked")!==null)}},Ut=class extends m{static styles=[W];static props={...m.props,value:{}};#t=null;template(){return g('<div class="items" part="items" role="radiogroup"><slot></slot></div>',{labelFor:!1})}get control(){return null}get value(){return this.#t??this.getAttribute("value")??""}set value(t){this.#t=t??"",this.#o()}selectValue(t){this.value=t}setup(){super.setup(),this.internals.role="radiogroup",this.addEventListener("keydown",t=>this.#s(t))}onConnect(){this.#o()}update(t){super.update(t),t.has("value")&&(this.#t=null,this.#o()),t.has("label")&&(this.internals.ariaLabel=this.label)}#e(){return Array.from(this.querySelectorAll("mt-radio"))}#o(){let t=this.value,e=this.#e(),o=!1;for(let r of e){let s=t!==""&&(r.getAttribute("value")??"on")===t;r.toggleAttribute("checked",s),r.tabIndex=s?0:-1,s&&(o=!0)}if(!o){for(let r of e)if(!r.hasAttribute("disabled")){r.tabIndex=0;break}}this.#i()}#i(){let t=this.value;this.setFormValue(this.name&&t?t:null),this.internals.setValidity(this.required&&!t?{valueMissing:!0}:{},"Select an option",void 0),this.emit("change",{value:t})}#s(t){let e=this.#e().filter(s=>!s.hasAttribute("disabled"));if(!e.length)return;let o=e.indexOf(t.target);if(o===-1)return;let r=-1;if(t.key==="ArrowDown"||t.key==="ArrowRight")r=(o+1)%e.length;else if(t.key==="ArrowUp"||t.key==="ArrowLeft")r=(o-1+e.length)%e.length;else return;t.preventDefault(),this.selectValue(e[r].getAttribute("value")??"on"),e[r].focus()}formResetCallback(){this.#t=null,this.#o()}};n("mt-radio",Wt);n("mt-radio-group",Ut);var Ko=a`
  :host { --_w: 2.375rem; --_h: 1.25rem; --_control-h: var(--_h); --_thumb: 1rem; --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='xs']) { --_w: 2rem; --_h: 1rem; --_thumb: 0.75rem; --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='md']) { --_w: 2.75rem; --_h: 1.5rem; --_thumb: 1.25rem; --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_w: 3.25rem; --_h: 1.75rem; --_thumb: 1.5rem; --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_w: 3.75rem; --_h: 2rem; --_thumb: 1.75rem; --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }
`,Xo=a`
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
`,Kt=class extends m{static styles=[M,Ko,Xo];static props={...m.props,radius:{css:"--_radius",scale:"radius",default:"xl"},value:{default:"on"},checked:{type:"boolean"},color:{color:!0},onLabel:{attr:"label-on"},offLabel:{attr:"label-off"},labelPosition:{attr:"label-position",default:"right"}};template(){return L(p`
      <span class="track" part="track">
        <input type="checkbox" role="switch" id="control" class="input" part="input" />
        <span class="thumb" part="thumb"><slot name="thumb-icon"></slot></span>
        <span class="on-label" part="label-on"><slot name="label-on"><span class="on-label-text"></span></slot></span>
        <span class="off-label" part="label-off"><slot name="label-off"><span class="off-label-text"></span></slot></span>
      </span>
    `)}get input(){return this.$("#control")}get checked(){return this.input.checked}set checked(t){this.input.checked=!!t,this.#t()}setup(){super.setup(),this.input.addEventListener("change",()=>{this.#t(),this.forwardChange()})}update(t){super.update(t),t.has("checked")&&(this.input.checked=this.prop("checked")),(t.has("checked")||t.has("value"))&&this.#t(),t.has("onLabel")&&(this.$(".on-label-text").textContent=this.onLabel??""),t.has("offLabel")&&(this.$(".off-label-text").textContent=this.offLabel??"")}#t(){this.setFormValue(this.input.checked?this.value:null)}formResetCallback(){this.input.checked=this.prop("checked"),this.#t()}formStateRestoreCallback(t){typeof t=="string"&&(this.checked=t===this.value)}};n("mt-switch",Kt);var Yo=a`
  :host { display: flex; flex-direction: column; }
  :host([orientation='vertical']) { flex-direction: row; align-items: flex-start; }
  :host([orientation='vertical'][placement='right']) { flex-direction: row-reverse; }
  :host([orientation='vertical']) ::slotted(mt-tabs-panel) { flex: 1; min-width: 0; }
`,Xt=class extends c{static styles=[Yo];static props={value:{},variant:{default:"default"},orientation:{default:"horizontal"},placement:{default:"left"},color:{color:!0},radius:{css:"--_radius",scale:"radius"},inverted:{type:"boolean"},keepMounted:{type:"boolean",default:!0},activateTabWithKeyboard:{type:"boolean",default:!0},allowTabDeactivation:{type:"boolean"}};#t=null;#e=!1;#o=new WeakMap;setup(){this.addEventListener("tabs-activate",t=>{let e=t.detail.value;this.#i(e)})}update(){this.#s()}#i(t){let e=this.#t;if(t===e){this.allowTabDeactivation&&(this.value=null);return}this.value=t}#s(){let t=[...this.querySelectorAll(":scope > mt-tabs-list > mt-tab")],e=[...this.querySelectorAll(":scope > mt-tabs-panel")],o=this.getAttribute("value");o===null&&(o=t.find(d=>!d.hasAttribute("disabled"))?.getAttribute("value")??null);let r=o!==this.#t;this.#t=o;let s=this.querySelector(":scope > mt-tabs-list");s&&(s.setAttribute("data-variant",this.variant),s.setAttribute("data-orientation",this.orientation),s.setAttribute("data-placement",this.placement),s.toggleAttribute("data-inverted",this.inverted),s.setAttribute("aria-orientation",this.orientation));for(let l of t){let d=l.getAttribute("value"),h=d!==null&&d===o,u=e.find(f=>f.getAttribute("value")===d);u&&(u.id||(u.id=v("tabpanel")),l.id||(l.id=v("tab")),l.setAttribute("aria-controls",u.id),u.setAttribute("aria-labelledby",l.id)),l.setAttribute("data-variant",this.variant),l.setAttribute("data-placement",this.placement),l.setAttribute("data-orientation",this.orientation),l.toggleAttribute("active",h)}for(let l of e){let d=l.getAttribute("value"),h=d!==null&&d===o;if(l.hidden=!h,!this.keepMounted){if(!h&&l.childNodes.length&&!this.#o.has(l)){let u=document.createDocumentFragment();u.append(...l.childNodes),this.#o.set(l,u)}else if(h){let u=this.#o.get(l);u&&(l.append(u),this.#o.delete(l))}}}r&&this.#e&&this.emit("change",{value:o}),this.#e=!0}},Zo=a`
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
`,Yt=class extends c{static styles=[Zo];static props={grow:{type:"boolean"},justify:{css:"--_justify"}};setup(){this.setAttribute("role","tablist"),this.addEventListener("keydown",t=>this.#t(t))}#t(t){let e=t.target.closest("mt-tab");if(!e)return;let o=[...this.querySelectorAll(":scope > mt-tab")].filter(f=>!f.hasAttribute("disabled")),r=o.indexOf(e);if(r<0)return;let s=this.getAttribute("data-orientation")==="vertical",l=s?"ArrowDown":"ArrowRight",d=s?"ArrowUp":"ArrowLeft",h=null;if(t.key===l?h=o[(r+1)%o.length]:t.key===d?h=o[(r-1+o.length)%o.length]:t.key==="Home"?h=o[0]:t.key==="End"&&(h=o[o.length-1]),!h)return;t.preventDefault(),h.focus(),this.closest("mt-tabs")?.activateTabWithKeyboard!==!1&&h.dispatchEvent(new CustomEvent("tabs-activate",{bubbles:!0,composed:!0,detail:{value:h.getAttribute("value")}}))}},Go=a`
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
`,Zt=class extends c{static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[Go];static props={value:{},disabled:{type:"boolean"},active:{type:"boolean"},color:{color:!0},href:{},target:{}};template(){return p`
      <button class="tab" part="tab" type="button">
        <span class="section left"><slot name="left-section"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="section right"><slot name="right-section"></slot></span>
      </button>
    `}setup(){for(let t of this.root.querySelectorAll(".section slot")){let e=()=>t.parentElement.classList.toggle("filled",t.assignedNodes().length>0);t.addEventListener("slotchange",e),e()}this.setAttribute("role","tab"),this.addEventListener("click",t=>{if(this.disabled){t.preventDefault();return}this.href||this.dispatchEvent(new CustomEvent("tabs-activate",{bubbles:!0,composed:!0,detail:{value:this.value}}))})}update(t){t.has("href")&&this.#t(),this.setAttribute("aria-selected",this.active?"true":"false"),this.tabIndex=this.active?0:-1,this.toggleAttribute("aria-disabled",this.disabled);let e=this.$(".tab");e instanceof HTMLButtonElement?e.disabled=this.disabled:(this.href&&e.setAttribute("href",this.href),this.target?e.setAttribute("target",this.target):e.removeAttribute("target"),e.toggleAttribute("aria-disabled",this.disabled))}#t(){let t=this.$(".tab"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let o=document.createElement(e.toLowerCase());o.className=t.className,o.setAttribute("part","tab"),e==="BUTTON"&&o.setAttribute("type","button"),o.append(...t.childNodes),t.replaceWith(o)}},Qo=a`
  :host { display: block; }
  .panel { padding-top: var(--mt-spacing-md); }
  :host([data-orientation='vertical']) .panel { padding-top: 0; padding-left: var(--mt-spacing-md); }
`,Gt=class extends c{static styles=[Qo];static props={value:{}};template(){return'<div class="panel" part="panel"><slot></slot></div>'}setup(){this.setAttribute("role","tabpanel"),this.tabIndex=0}};n("mt-tabs",Xt);n("mt-tabs-list",Yt);n("mt-tab",Zt);n("mt-tabs-panel",Gt);var Jo='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',ti=a`
  :host { display: block; }
`,Qt=class extends c{static styles=[ti];static props={value:{},multiple:{type:"boolean"},variant:{default:"default"},chevronPosition:{default:"right"},disableChevronRotation:{type:"boolean"},radius:{css:"--_radius",scale:"radius"},transitionDuration:{type:"number",default:200}};setup(){this.addEventListener("keydown",t=>this.#o(t))}update(t){t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),this.#e()}toggle(t){if(t===null)return;let e=this.#t();this.multiple?(e.has(t)?e.delete(t):e.add(t),this.value=[...e].join(",")||null):this.value=e.has(t)?null:t,this.emit("change",{value:this.value})}#t(){let t=this.getAttribute("value");return t?this.multiple?new Set(t.split(",").filter(Boolean)):new Set([t]):new Set}#e(){let t=this.#t();for(let e of this.querySelectorAll(":scope > mt-accordion-item")){let o=e.getAttribute("value");e.setAttribute("data-variant",this.variant),e.toggleAttribute("opened",o!==null&&t.has(o));let r=e.querySelector(":scope > mt-accordion-control");r?.setAttribute("data-chevron-position",this.chevronPosition),r?.toggleAttribute("data-disable-rotation",this.disableChevronRotation)}}#o(t){let e=t.target.closest("mt-accordion-control");if(!e)return;let o=[...this.querySelectorAll("mt-accordion-control")].filter(l=>l.getAttribute("aria-disabled")!=="true"),r=o.indexOf(e);if(r<0)return;let s=null;t.key==="ArrowDown"?s=o[(r+1)%o.length]:t.key==="ArrowUp"?s=o[(r-1+o.length)%o.length]:t.key==="Home"?s=o[0]:t.key==="End"&&(s=o[o.length-1]),s&&(t.preventDefault(),s.focus())}},ei=a`
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
`,Jt=class extends c{static styles=[ei];static props={value:{},disabled:{type:"boolean"},opened:{type:"boolean"}};template(){return'<div class="item" part="item"><slot></slot></div>'}setup(){this.root.querySelector("slot").addEventListener("slotchange",()=>this.#t()),this.#t()}update(t){(t.has("opened")||t.has("disabled"))&&this.#t()}#t(){let t=this.querySelector(":scope > mt-accordion-control"),e=this.querySelector(":scope > mt-accordion-panel");t&&(t.id||(t.id=v("accctrl")),t.setAttribute("aria-expanded",String(this.opened)),t.setAttribute("aria-disabled",String(this.disabled)),t.toggleAttribute("disabled",this.disabled)),e&&(e.id||(e.id=v("accpanel")),t&&(e.setAttribute("aria-labelledby",t.id),t.setAttribute("aria-controls",e.id)),e.toggleAttribute("opened",this.opened))}},oi=a`
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
`,te=class extends c{static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[oi];static props={disabled:{type:"boolean"}};template(){return p`
      <button type="button" class="control" part="control">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="chevron" part="chevron" aria-hidden="true">${Jo}</span>
      </button>
    `}setup(){this.setAttribute("role","button");let t=this.root.querySelector('slot[name="icon"]'),e=()=>this.toggleAttribute("data-has-icon",(t?.assignedNodes().length??0)>0);t?.addEventListener("slotchange",e),e(),this.addEventListener("click",()=>{if(this.disabled)return;let o=this.closest("mt-accordion-item"),r=this.closest("mt-accordion");!o||!r||r.toggle(o.getAttribute("value"))})}update(){this.$(".control").disabled=this.disabled,this.tabIndex=this.disabled?-1:0}},ii=a`
  :host { display: block; }
  .box { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--_duration, 200ms) ease; }
  :host([opened]) .box { grid-template-rows: 1fr; }
  .content { overflow: hidden; min-height: 0; }
  .inner { padding: 0 var(--mt-spacing-md) var(--mt-spacing-md); }
`,ee=class extends c{static styles=[ii];static props={opened:{type:"boolean"}};template(){return'<div class="box" part="box"><div class="content" part="content"><div class="inner"><slot></slot></div></div></div>'}setup(){this.setAttribute("role","region")}update(){this.$(".content").toggleAttribute("inert",!this.opened)}};n("mt-accordion",Qt);n("mt-accordion-item",Jt);n("mt-accordion-control",te);n("mt-accordion-panel",ee);var ri='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',si=a`
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
`,oe=class extends c{static shadowOptions={mode:"open",delegatesFocus:!0};static styles=[si];static props={label:{},description:{},active:{type:"boolean"},variant:{default:"light"},color:{color:!0},href:{},target:{},disabled:{type:"boolean"},noWrap:{type:"boolean"},opened:{type:"boolean"},childrenOffset:{css:"--_children-offset",scale:"spacing",default:"lg"}};#t=!1;template(){return p`
      <div class="root" part="root">
        <a class="control" part="control" id="control">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="body" part="body">
            <span class="label" part="label"><slot name="label"><span class="label-text"></span></slot></span>
            <span class="description" part="description" hidden><slot name="description"><span class="description-text"></span></slot></span>
          </span>
          <span class="section right" part="right-section">
            <slot name="right-section"><span class="chevron" part="chevron" aria-hidden="true">${ri}</span></slot>
          </span>
        </a>
        <div class="children" part="children"><div class="children-inner"><slot></slot></div></div>
      </div>
    `}setup(){let t=this.root.querySelector('slot[name="left-section"]'),e=()=>t?.parentElement?.classList.toggle("show",(t?.assignedNodes().length??0)>0);t?.addEventListener("slotchange",e),e(),this.root.querySelector('slot[name="right-section"]')?.addEventListener("slotchange",()=>this.#i());for(let r of["label","description"])this.root.querySelector(`slot[name="${r}"]`)?.addEventListener("slotchange",()=>this.#e());this.root.querySelector(".children slot").addEventListener("slotchange",()=>this.#o()),this.#e(),this.#o(),this.addEventListener("click",r=>{if(this.disabled){r.preventDefault();return}this.#t&&(this.opened=!this.opened,this.emit("change",{opened:this.opened}))})}update(t){t.has("href")&&this.#s();let e=this.$(".control");e instanceof HTMLAnchorElement&&(this.href&&e.setAttribute("href",this.href),this.target?e.setAttribute("target",this.target):e.removeAttribute("target")),e.toggleAttribute("aria-disabled",this.disabled),e.tabIndex=this.disabled?-1:0,(t.has("label")||t.has("description"))&&this.#e(),t.has("opened")&&this.#t&&this.setAttribute("aria-expanded",String(this.opened)),this.#i()}#e(){let t=(s,l)=>!!l||!!this.querySelector(`:scope > [slot="${s}"]`),e=this.$(".label-text");e&&(e.textContent=this.label??"");let o=this.$(".description-text");o&&(o.textContent=this.description??"");let r=this.$(".description");r.hidden=!t("description",this.description)}#o(){this.#t=[...this.children].some(t=>t.tagName==="MT-NAV-LINK"),this.#t||(this.opened=!1),this.#t?this.setAttribute("aria-expanded",String(this.opened)):this.removeAttribute("aria-expanded"),this.#i()}#i(){let t=this.root.querySelector('slot[name="right-section"]'),e=(t?.assignedNodes().length??0)>0;t?.parentElement?.classList.toggle("show",e||this.#t)}#s(){let t=this.$(".control"),e=this.href?"A":"BUTTON";if(t.tagName===e)return;let o=document.createElement(e.toLowerCase());o.className=t.className,o.id="control",o.setAttribute("part","control"),e==="BUTTON"&&o.setAttribute("type","button"),o.append(...t.childNodes),t.replaceWith(o)}};n("mt-nav-link",oe);var ai=a`
  :host { display: flex; align-items: center; flex-wrap: wrap; }
  .root { display: flex; align-items: center; flex-wrap: wrap; }
  .item { display: flex; align-items: center; }
  .separator { display: flex; align-items: center; margin-inline: var(--_sep-margin, var(--mt-spacing-xs)); color: var(--mt-color-dimmed); }
  ::slotted(a) { color: var(--mt-color-anchor); text-decoration: none; font-size: var(--mt-font-size-sm); }
  ::slotted(a:hover) { text-decoration: underline; }
  ::slotted(*) { font-size: var(--mt-font-size-sm); }
`,ie=class extends c{static styles=[ai];static props={separator:{default:"/"},separatorMargin:{css:"--_sep-margin",scale:"spacing",default:"xs"}};#t;template(){return'<div class="root" part="root"></div>'}setup(){this.setAttribute("role","navigation"),this.setAttribute("aria-label","breadcrumb"),this.#t=new MutationObserver(()=>this.#e()),this.#t.observe(this,{childList:!0}),this.#e()}update(t){t.has("separator")&&this.#e()}onDisconnect(){this.#t?.disconnect()}#e(){let t=this.$(".root");t.innerHTML="";let e=this.querySelector(':scope > [slot="separator"]'),o=[...this.children].filter(r=>r.getAttribute("slot")!=="separator");o.forEach((r,s)=>{r.getAttribute("slot")||r.setAttribute("slot",v("bc"));let l=document.createElement("span");l.className="item";let d=document.createElement("slot");if(d.name=r.getAttribute("slot"),l.append(d),t.append(l),s<o.length-1){let h=document.createElement("span");h.className="separator",h.setAttribute("aria-hidden","true"),e?h.append(e.cloneNode(!0)):h.textContent=this.separator,t.append(h)}})}};n("mt-breadcrumbs",ie);function ni(i,t,e,o){if(t*2+3+e*2>=i)return Array.from({length:i},(f,b)=>b+1);let s=Math.max(o-t,e+1),l=Math.min(o+t,i-e),d=s>e+2,h=l<i-e-1,u=(f,b)=>Array.from({length:b-f+1},(y,T)=>f+T);if(!d&&h){let f=t*2+e+2;return[...u(1,f),"dots",...u(i-e+1,i)]}if(d&&!h){let f=t*2+e+2;return[...u(1,e),"dots",...u(i-f+1,i)]}return[...u(1,e),"dots",...u(s,l),"dots",...u(i-e+1,i)]}var li=a`
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
`,re=class extends c{static styles=[li];static props={total:{type:"number",default:0},value:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},withEdges:{type:"boolean"},withControls:{type:"boolean",default:!0},size:{default:"sm"},radius:{css:"--_radius",scale:"radius"},color:{color:!0},gap:{css:"--_gap",scale:"rem",default:8},disabled:{type:"boolean"},hrefTemplate:{attr:"href-template"}};template(){return'<div class="root" part="root"></div>'}setup(){this.setAttribute("role","navigation"),this.setAttribute("aria-label","Pagination")}update(){this.#e()}#t(t,e,o,r){let s=!!this.hrefTemplate,l=document.createElement(s?"a":"button");l.className="control",l.textContent=t,l.setAttribute("aria-label",r.ariaLabel),e===o&&l.setAttribute("aria-current","page");let h=this.disabled||r.disabled;return l instanceof HTMLAnchorElement?h?l.setAttribute("aria-disabled","true"):l.href=this.hrefTemplate.replace("{page}",String(e)):(l.type="button",l.disabled=h,l.addEventListener("click",()=>{this.value=e,this.emit("change",{value:e})})),l}#e(){let t=this.$(".root");t.innerHTML="";let e=Math.max(0,Math.trunc(this.total));if(!e)return;let o=Math.min(Math.max(1,Math.trunc(this.value)||1),e),r=ni(e,this.siblings,this.boundaries,o);this.withEdges&&t.append(this.#t("«",1,o,{ariaLabel:"First page",disabled:o<=1})),this.withControls&&t.append(this.#t("‹",o-1,o,{ariaLabel:"Previous page",disabled:o<=1}));for(let s of r){if(s==="dots"){let l=document.createElement("span");l.className="dots",l.textContent="…",l.setAttribute("aria-hidden","true"),t.append(l);continue}t.append(this.#t(String(s),s,o,{ariaLabel:`Page ${s}`,disabled:!1}))}this.withControls&&t.append(this.#t("›",o+1,o,{ariaLabel:"Next page",disabled:o>=e})),this.withEdges&&t.append(this.#t("»",e,o,{ariaLabel:"Last page",disabled:o>=e}))}};n("mt-pagination",re);function Le(i){let t=getComputedStyle(document.documentElement).getPropertyValue(`--mt-breakpoint-${i}`).trim();if(!t){let o=parseFloat(i);return Number.isNaN(o)?0:o}let e=parseFloat(t);return Number.isNaN(e)?0:t.endsWith("px")?e:e*16}var di=a`
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
`,se=class extends c{static styles=[di];static props={headerHeight:{css:"--app-shell-header-height",scale:"rem",default:60},navbarWidth:{css:"--app-shell-navbar-width",scale:"rem",default:300},navbarBreakpoint:{default:"sm"},navbarCollapsedMobile:{type:"boolean",default:!0},navbarCollapsedDesktop:{type:"boolean"},asideWidth:{css:"--app-shell-aside-width",scale:"rem",default:300},asideBreakpoint:{default:"md"},asideCollapsedMobile:{type:"boolean",default:!0},asideCollapsedDesktop:{type:"boolean"},footerHeight:{css:"--app-shell-footer-height",scale:"rem"},padding:{css:"--app-shell-padding",scale:"spacing",default:"md"},layout:{default:"default"},withBorder:{type:"boolean",default:!0},zIndex:{css:"--app-shell-z-index",type:"number",default:200},navbarOpened:{type:"boolean"}};#t=null;#e=null;#o=null;#i=()=>this.#a();#s=t=>{let e=t.target;!e||e.tagName!=="MT-BURGER"||(this.navbarOpened=!!t.detail?.opened)};template(){return p`<div class="backdrop" part="backdrop"></div><slot></slot>`}setup(){this.$(".backdrop").addEventListener("click",()=>{this.navbarOpened=!1}),this.addEventListener("toggle",this.#s),this.#o=new MutationObserver(()=>this.#a()),this.#o.observe(this,{childList:!0})}onConnect(){this.#t?.removeEventListener("change",this.#i),this.#e?.removeEventListener("change",this.#i),this.#t=matchMedia(`(max-width: ${Le(this.navbarBreakpoint)}px)`),this.#e=matchMedia(`(max-width: ${Le(this.asideBreakpoint)}px)`),this.#t.addEventListener("change",this.#i),this.#e.addEventListener("change",this.#i),this.#a()}onDisconnect(){this.#t?.removeEventListener("change",this.#i),this.#e?.removeEventListener("change",this.#i),this.#o?.disconnect()}update(t){if(t.has("navbarBreakpoint")||t.has("asideBreakpoint")){this.onConnect();return}this.#a()}#r(){for(let t of this.querySelectorAll("mt-burger"))t.toggleAttribute("opened",this.navbarOpened)}#a(){let t=this.querySelector(":scope > mt-app-shell-header"),e=this.querySelector(":scope > mt-app-shell-footer"),o=this.querySelector(":scope > mt-app-shell-navbar"),r=this.querySelector(":scope > mt-app-shell-aside"),s=this.#t?.matches??!1,l=this.#e?.matches??!1,d=!!o&&!s&&!this.navbarCollapsedDesktop,h=!!o&&s&&(this.navbarOpened||!this.navbarCollapsedMobile),u=!!r&&!l&&!this.asideCollapsedDesktop,f=!!r&&l&&!this.asideCollapsedMobile;this.toggleAttribute("data-has-header",!!t),this.toggleAttribute("data-has-footer",!!e),this.toggleAttribute("data-navbar-visible",d),this.toggleAttribute("data-aside-visible",u),this.toggleAttribute("data-navbar-mobile-open",s&&h);let b=this.layout==="alt",y=!this.withBorder;t&&(t.toggleAttribute("data-no-border",y),t.toggleAttribute("data-offset-left",b&&d),t.toggleAttribute("data-offset-right",b&&u)),e&&(e.toggleAttribute("data-no-border",y),e.toggleAttribute("data-offset-left",b&&d),e.toggleAttribute("data-offset-right",b&&u)),o&&(o.setAttribute("data-mode",s?"mobile":"desktop"),o.setAttribute("data-layout",b?"alt":"default"),o.toggleAttribute("data-hidden",s?!h:!d),o.toggleAttribute("data-no-border",y)),r&&(r.setAttribute("data-mode",l?"mobile":"desktop"),r.setAttribute("data-layout",b?"alt":"default"),r.toggleAttribute("data-hidden",l?!f:!u),r.toggleAttribute("data-no-border",y)),this.#r()}},Me=i=>a`
  :host {
    display: block;
    position: fixed;
    top: var(--app-shell-header-offset, 0);
    bottom: var(--app-shell-footer-offset, 0);
    ${i==="left"?"left":"right"}: 0;
    width: var(--app-shell-${i==="left"?"navbar":"aside"}-width, 300px);
    overflow-y: auto;
    background: var(--mt-color-body);
    border-${i}: 1px solid var(--mt-color-border);
    z-index: var(--app-shell-z-index, 200);
    padding: var(--mt-spacing-md);
    transition: transform var(--mt-transition);
  }
  :host([data-layout='alt']) { top: 0; bottom: 0; }
  :host([data-no-border]) { border-${i}-color: transparent; }
  :host([data-mode='mobile']) { width: min(100%, var(--app-shell-${i==="left"?"navbar":"aside"}-width, 300px)); box-shadow: var(--mt-shadow-md); }
  :host([data-hidden]) { transform: translateX(${i==="left"?"-100%":"100%"}); }
`,ae=class extends c{static styles=[Me("left")]},ne=class extends c{static styles=[Me("right")]},Te=i=>a`
  :host {
    display: block;
    position: fixed;
    ${i}: 0;
    left: 0;
    right: 0;
    height: var(--app-shell-${i==="top"?"header":"footer"}-offset, ${i==="top"?"60px":"0px"});
    z-index: var(--app-shell-z-index, 200);
    background: var(--mt-color-body);
    border-${i==="top"?"bottom":"top"}: 1px solid var(--mt-color-border);
  }
  :host([data-no-border]) { border-${i==="top"?"bottom":"top"}-color: transparent; }
  :host([data-offset-left]) { left: var(--app-shell-navbar-offset, 0); }
  :host([data-offset-right]) { right: var(--app-shell-aside-offset, 0); }
  .inner {
    display: flex;
    align-items: center;
    height: 100%;
    gap: var(--mt-spacing-sm);
    padding-inline: var(--mt-spacing-md);
  }
`,le=class extends c{static styles=[Te("top")];template(){return p`<div class="inner" part="inner"><slot></slot></div>`}},de=class extends c{static styles=[Te("bottom")];template(){return p`<div class="inner" part="inner"><slot></slot></div>`}},ci=a`
  :host {
    display: block;
    padding-top: var(--app-shell-header-offset, 0);
    padding-bottom: var(--app-shell-footer-offset, 0);
    padding-left: var(--app-shell-navbar-offset, 0);
    padding-right: var(--app-shell-aside-offset, 0);
  }
  .inner { padding: var(--app-shell-padding, 0); }
`,ce=class extends c{static styles=[ci];template(){return p`<div class="inner" part="inner"><slot></slot></div>`}};n("mt-app-shell",se);n("mt-app-shell-header",le);n("mt-app-shell-navbar",ae);n("mt-app-shell-aside",ne);n("mt-app-shell-main",ce);n("mt-app-shell-footer",de);var pi=a`
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
`,pe=class extends c{static styles=[pi];static props={opened:{type:"boolean"},size:{default:"md"},color:{css:"--_color",scale:"color"},lineSize:{css:"--_line-size",scale:"rem"},transitionDuration:{type:"number",default:300},ariaLabel:{attr:"aria-label",default:"Toggle navigation"}};template(){return p`
      <button class="root" part="root" type="button">
        <span class="box" part="box" aria-hidden="true">
          <span class="line line-top"></span>
          <span class="line line-mid"></span>
          <span class="line line-bot"></span>
        </span>
      </button>
    `}setup(){this.$(".root").addEventListener("click",()=>{this.opened=!this.opened,this.emit("toggle",{opened:this.opened})})}update(t){let e=this.$(".root");t.has("opened")&&e.setAttribute("aria-expanded",String(this.opened)),t.has("ariaLabel")&&e.setAttribute("aria-label",this.ariaLabel),t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`)}};n("mt-burger",pe);var Ce=!1;function hi(){if(Ce)return;Ce=!0;let i=new CSSStyleSheet;i.replaceSync(`
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
  `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,i]}var ui=a`
  :host { display: block; overflow-x: auto; }
`,he=class extends c{static styles=[ui];static props={striped:{},highlightOnHover:{type:"boolean"},withTableBorder:{type:"boolean"},withColumnBorders:{type:"boolean"},withRowBorders:{type:"boolean",default:!0},verticalSpacing:{css:"--_vspace",scale:"spacing"},horizontalSpacing:{css:"--_hspace",scale:"spacing"},captionSide:{default:"bottom"},stickyHeader:{type:"boolean"},stickyHeaderOffset:{css:"--_sticky-offset",scale:"rem"},layout:{default:"auto"},stripedColor:{css:"--_striped",scale:"color"},highlightOnHoverColor:{css:"--_hover",scale:"color"},borderColor:{css:"--_border",scale:"color"}};constructor(){super(),hi()}},mi=a`
  :host {
    display: block;
    overflow: auto;
    min-width: var(--_min-w, auto);
    max-width: 100%;
    max-height: var(--_max-h, none);
  }
`,ue=class extends c{static styles=[mi];static props={minWidth:{css:"--_min-w",scale:"rem"},maxHeight:{css:"--_max-h",scale:"rem"}}};n("mt-table",he);n("mt-table-scroll-container",ue);function Pe(i){return Math.min(100,Math.max(0,i))}var $e=a`
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
`,fi=a`
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
    background: var(--mt-color-gray-1);
    border-radius: var(--_radius, var(--mt-radius-xl));
    overflow: hidden;
  }
  .bar {
    height: 100%;
    width: var(--_value, 0%);
    background: var(--mt-c-filled);
    transition: width var(--_duration, 100ms) ease;
  }
`,me=class extends c{static styles=[fi,$e];static props={value:{type:"number",default:0},color:{color:!0},size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"xl"},striped:{type:"boolean"},animated:{type:"boolean"},transitionDuration:{type:"number",default:100}};template(){return p`<div class="track" part="track"><div class="bar" part="bar"></div></div>`}setup(){this.setAttribute("role","progressbar"),this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100")}update(t){let e=this.$(".bar");if(t.has("value")){let o=Pe(this.value);e.style.setProperty("--_value",`${o}%`),this.setAttribute("aria-valuenow",String(o))}t.has("transitionDuration")&&this.style.setProperty("--_duration",`${this.transitionDuration}ms`),t.has("striped")&&e.toggleAttribute("data-striped",this.striped),t.has("animated")&&e.toggleAttribute("data-animated",this.animated)}},gi=a`
  :host {
    display: flex;
    width: 100%;
    --_size: 0.5rem;
    height: var(--_size);
    border-radius: var(--_radius, var(--mt-radius-xl));
    background: var(--mt-color-gray-1);
    overflow: hidden;
  }
  :host([size='xs']) { --_size: 0.1875rem; }
  :host([size='sm']) { --_size: 0.3125rem; }
  :host([size='md']) { --_size: 0.5rem; }
  :host([size='lg']) { --_size: 0.75rem; }
  :host([size='xl']) { --_size: 1rem; }
`,fe=class extends c{static styles=[gi];static props={size:{default:"md"},radius:{css:"--_radius",scale:"radius",default:"xl"}}},vi=a`
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
`,ge=class extends c{static styles=[vi,$e];static props={value:{type:"number",default:0},color:{color:!0},striped:{type:"boolean"},animated:{type:"boolean"}};template(){return p`<div class="bar" part="bar"><span class="label" part="label"><slot></slot></span></div>`}setup(){this.setAttribute("role","progressbar"),this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100")}update(t){if(t.has("value")){let o=Pe(this.value);this.style.setProperty("--_value",`${o}%`),this.setAttribute("aria-valuenow",String(o))}let e=this.$(".bar");t.has("striped")&&e.toggleAttribute("data-striped",this.striped),t.has("animated")&&e.toggleAttribute("data-animated",this.animated)}};n("mt-progress",me);n("mt-progress-root",fe);n("mt-progress-section",ge);window.manatee={setColorScheme:F,getColorScheme:O,resolvedColorScheme:D,toggleColorScheme:G,notifications:N};export{c as MtElement,m as MtFormElement,ve as PALETTE,E as autoPosition,z as colorVars,a as css,n as define,Ne as escapeHtml,H as fieldTemplate,J as floatingStyles,O as getColorScheme,p as html,_ as inputStyles,K as isToken,$ as kebab,N as notifications,A as onDismiss,Q as position,xe as rem,k as resolve,U as resolveColor,D as resolvedColorScheme,F as setColorScheme,G as toggleColorScheme,v as uid,w as wrapperStyles,g as wrapperTemplate};
