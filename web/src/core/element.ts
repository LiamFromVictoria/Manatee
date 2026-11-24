import { colorVars } from './color';
import { resolve, type Scale } from './scale';

/**
 * Attribute-backed property declaration. Attributes are the source of truth so
 * server-rendered markup (Go/templ, HTMX swaps) and JS property access agree.
 */
export interface PropDef {
  /** Value type; default 'string'. Booleans are presence-based; the literal "false" also means false. */
  type?: 'string' | 'number' | 'boolean';
  default?: string | number | boolean;
  /** Attribute name; defaults to the kebab-case prop name. */
  attr?: string;
  /** Host custom property written from the resolved value (e.g. '--_gap'). */
  css?: string;
  /** Scale used to resolve the value written to `css`; default 'raw'. */
  scale?: Scale;
  /** Prop is a theme color: writes the --mt-c-* variable set (see color.ts). */
  color?: boolean;
}

export type Props = Record<string, PropDef>;
export type PropValue = string | number | boolean | null;

/**
 * Mantine style props, available on every element. Applied to :host, so
 * outer author CSS still wins.
 */
const STYLE_PROPS: Record<string, { props: string[]; scale: Scale }> = {
  m: { props: ['margin'], scale: 'spacing' },
  mt: { props: ['margin-top'], scale: 'spacing' },
  mb: { props: ['margin-bottom'], scale: 'spacing' },
  ml: { props: ['margin-left'], scale: 'spacing' },
  mr: { props: ['margin-right'], scale: 'spacing' },
  mx: { props: ['margin-left', 'margin-right'], scale: 'spacing' },
  my: { props: ['margin-top', 'margin-bottom'], scale: 'spacing' },
  p: { props: ['padding'], scale: 'spacing' },
  pt: { props: ['padding-top'], scale: 'spacing' },
  pb: { props: ['padding-bottom'], scale: 'spacing' },
  pl: { props: ['padding-left'], scale: 'spacing' },
  pr: { props: ['padding-right'], scale: 'spacing' },
  px: { props: ['padding-left', 'padding-right'], scale: 'spacing' },
  py: { props: ['padding-top', 'padding-bottom'], scale: 'spacing' },
  w: { props: ['width'], scale: 'rem' },
  h: { props: ['height'], scale: 'rem' },
  miw: { props: ['min-width'], scale: 'rem' },
  maw: { props: ['max-width'], scale: 'rem' },
  mih: { props: ['min-height'], scale: 'rem' },
  mah: { props: ['max-height'], scale: 'rem' },
  fz: { props: ['font-size'], scale: 'font-size' },
  lh: { props: ['line-height'], scale: 'line-height' },
};

const sheetCache = new Map<string, CSSStyleSheet>();

/** Tagged template producing a cached constructable stylesheet. */
export function css(strings: TemplateStringsArray, ...values: Array<string | number>): CSSStyleSheet {
  const text = String.raw({ raw: strings }, ...values);
  let sheet = sheetCache.get(text);
  if (!sheet) {
    sheet = new CSSStyleSheet();
    sheet.replaceSync(text);
    sheetCache.set(text, sheet);
  }
  return sheet;
}

/** Identity tag so editors highlight HTML templates; does no escaping. */
export const html = (strings: TemplateStringsArray, ...values: Array<string | number>): string =>
  String.raw({ raw: strings }, ...values);

export function kebab(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

let uidCounter = 0;
export function uid(prefix = 'mt'): string {
  return `${prefix}-${(++uidCounter).toString(36)}`;
}

const baseSheet = css`
  :host { box-sizing: border-box; }
  :host([hidden]) { display: none !important; }
  *, *::before, *::after { box-sizing: border-box; }
`;

/**
 * Base class for all Manatee elements.
 *
 * Lifecycle:
 *  - constructor: shadow root created and `template()` rendered once. Templates
 *    are static and must not read instance fields (subclass fields are not yet
 *    initialized); anything attribute-dependent belongs in `update()`.
 *  - `setup()`: once, on first connect, before `onConnect()`. Wire shadow listeners here.
 *  - `update(changed)`: after first connect (all props) and after attribute
 *    changes (batched per microtask). Only runs while connected.
 *  - `onConnect()` / `onDisconnect()`: light-DOM / document wiring.
 */
export class MtElement extends HTMLElement {
  static props: Props = {};
  static styles: CSSStyleSheet[] = [];
  static shadowOptions: ShadowRootInit = { mode: 'open' };

  static get observedAttributes(): string[] {
    return [...Object.entries(this.props).map(([k, d]) => d.attr ?? kebab(k)), ...Object.keys(STYLE_PROPS)];
  }

  readonly root: ShadowRoot;
  #attrToProp: Record<string, string>;
  #pending = new Set<string>();
  #queued = false;
  #initialized = false;
  #hostSheet: CSSStyleSheet | null = null;

  constructor() {
    super();
    const ctor = this.constructor as typeof MtElement;
    this.#attrToProp = {};
    for (const [k, d] of Object.entries(ctor.props)) this.#attrToProp[d.attr ?? kebab(k)] = k;
    this.root = this.attachShadow(ctor.shadowOptions);
    this.root.adoptedStyleSheets = [baseSheet, ...ctor.styles];
    this.root.innerHTML = this.template();
  }

  /** Static shadow markup. */
  protected template(): string {
    return '<slot></slot>';
  }

  /** One-time wiring of shadow-internal listeners. */
  protected setup(): void {}

  /** Sync shadow DOM to props. `changed` holds prop names (style props use their attr name). */
  protected update(_changed: Set<string>): void {}

  protected onConnect(): void {}
  protected onDisconnect(): void {}

  connectedCallback(): void {
    if (!this.#initialized) {
      this.#initialized = true;
      const ctor = this.constructor as typeof MtElement;
      // Properties set before the element was defined become own properties
      // that shadow the prototype accessors; remove and re-apply them.
      for (const k of Object.keys(ctor.props)) {
        if (!Object.prototype.hasOwnProperty.call(this, k)) continue;
        const v = (this as Record<string, unknown>)[k];
        delete (this as Record<string, unknown>)[k];
        (this as Record<string, unknown>)[k] = v;
      }
      for (const k of Object.keys(ctor.props)) this.#pending.add(k);
      for (const k of Object.keys(STYLE_PROPS)) if (this.hasAttribute(k)) this.#pending.add(k);
      this.setup();
    }
    this.onConnect();
    this.#flush();
  }

  disconnectedCallback(): void {
    this.onDisconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;
    this.#pending.add(this.#attrToProp[name] ?? name);
    this.requestUpdate();
  }

  /** Schedule a microtask update (no-op if one is pending). */
  requestUpdate(prop?: string): void {
    if (prop) this.#pending.add(prop);
    if (this.#queued) return;
    this.#queued = true;
    queueMicrotask(() => {
      this.#queued = false;
      this.#flush();
    });
  }

  #flush(): void {
    if (!this.isConnected || !this.#initialized || this.#pending.size === 0) return;
    const changed = this.#pending;
    this.#pending = new Set();
    this.#applyHostStyles();
    this.update(changed);
  }

  /** Read a declared prop from its attribute, applying type and default. */
  prop(name: string): PropValue {
    const def = (this.constructor as typeof MtElement).props[name];
    if (!def) return null;
    const raw = this.getAttribute(def.attr ?? kebab(name));
    switch (def.type ?? 'string') {
      case 'boolean':
        if (raw === null) return (def.default as boolean | undefined) ?? false;
        return raw !== 'false';
      case 'number': {
        const n = raw === null || raw === '' ? NaN : Number(raw);
        return Number.isNaN(n) ? ((def.default as number | undefined) ?? null) : n;
      }
      default:
        return raw ?? (def.default as string | undefined) ?? null;
    }
  }

  /** Write a declared prop to its attribute (null/undefined/false removes it). */
  setProp(name: string, value: PropValue | undefined): void {
    const def = (this.constructor as typeof MtElement).props[name];
    if (!def) return;
    const attr = def.attr ?? kebab(name);
    if (def.type === 'boolean') {
      if (value === true) this.setAttribute(attr, '');
      else if (def.default === true && value === false) this.setAttribute(attr, 'false');
      else this.removeAttribute(attr);
      return;
    }
    if (value == null || value === false) this.removeAttribute(attr);
    else this.setAttribute(attr, String(value));
  }

  /** Dispatch a bubbling, composed, cancelable CustomEvent. Returns false if prevented. */
  emit<T>(name: string, detail?: T, init: Omit<CustomEventInit<T>, 'detail'> = {}): boolean {
    return this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, cancelable: true, detail, ...init }));
  }

  /** Query inside the shadow root. */
  protected $<E extends Element = HTMLElement>(selector: string): E {
    return this.root.querySelector(selector) as E;
  }

  #applyHostStyles(): void {
    const ctor = this.constructor as typeof MtElement;
    const decls: string[] = [];
    for (const [name, def] of Object.entries(ctor.props)) {
      if (def.color) {
        for (const [k, v] of Object.entries(colorVars(this.prop(name) as string | null))) decls.push(`${k}:${v}`);
      }
      if (def.css) {
        const v = this.prop(name);
        const resolved = v === null || v === false ? '' : resolve(def.scale ?? 'raw', v);
        if (resolved) decls.push(`${def.css}:${resolved}`);
      }
    }
    for (const [attr, sp] of Object.entries(STYLE_PROPS)) {
      const v = this.getAttribute(attr);
      if (v === null || v === '') continue;
      const resolved = resolve(sp.scale, v);
      for (const p of sp.props) decls.push(`${p}:${resolved}`);
    }
    if (decls.length === 0 && !this.#hostSheet) return;
    if (!this.#hostSheet) {
      this.#hostSheet = new CSSStyleSheet();
      this.root.adoptedStyleSheets = [...this.root.adoptedStyleSheets, this.#hostSheet];
    }
    this.#hostSheet.replaceSync(`:host{${decls.join(';')}}`);
  }
}

/**
 * Register an element, generating property accessors for every declared prop
 * not already defined on the prototype. Subclasses get types via `declare`:
 *
 *   class MtBadge extends MtElement { declare variant: string; static props = {...} }
 */
export function define(tag: string, cls: typeof MtElement): void {
  for (const name of Object.keys(cls.props)) {
    if (Object.prototype.hasOwnProperty.call(cls.prototype, name)) continue;
    Object.defineProperty(cls.prototype, name, {
      get(this: MtElement) {
        return this.prop(name);
      },
      set(this: MtElement, v: PropValue) {
        this.setProp(name, v);
      },
      configurable: true,
      enumerable: true,
    });
  }
  if (!customElements.get(tag)) customElements.define(tag, cls);
}
