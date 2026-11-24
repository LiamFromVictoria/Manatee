import { css, define, html, inputStyles, MtFormElement, wrapperStyles, wrapperTemplate, type Props } from '../../core';

/** Attributes forwarded verbatim from host to the inner <input>. */
const FORWARDED = ['placeholder', 'readonly', 'autofocus'];

const ICON_UP = '<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5 5 1l4 4"/></svg>';
const ICON_DOWN = '<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>';

const styles = css`
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
`;

/**
 * <mt-number-input label description error placeholder value name
 *                   required disabled readonly size radius variant="default|filled|unstyled"
 *                   min max step clamp-behavior="blur|strict|none" allow-decimal allow-negative
 *                   decimal-scale prefix suffix thousand-separator hide-controls>
 * Slots: label, description, error, left-section.
 * Events: native `input` (composed), `change` (re-dispatched from host).
 * `value` returns number | '' and the form value is the plain unformatted number string.
 */
export class MtNumberInput extends MtFormElement {
  static styles = [wrapperStyles, inputStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    variant: { default: 'default' },
    placeholder: {},
    readonly: { type: 'boolean' },
    autofocus: { type: 'boolean' },
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number', default: 1 },
    clampBehavior: { default: 'blur' },
    allowDecimal: { type: 'boolean', default: true },
    decimalScale: { type: 'number' },
    allowNegative: { type: 'boolean', default: true },
    prefix: {},
    suffix: {},
    thousandSeparator: {},
    hideControls: { type: 'boolean' },
  };

  declare min: number | null;
  declare max: number | null;
  declare step: number;
  declare clampBehavior: string;
  declare allowDecimal: boolean;
  declare decimalScale: number | null;
  declare allowNegative: boolean;
  declare prefix: string | null;
  declare suffix: string | null;

  #raw = '';

  protected template(): string {
    return wrapperTemplate(html`
      <div class="field has-right" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" inputmode="decimal" autocomplete="off" />
        <div class="section right controls" part="right-section">
          <div class="stepper" part="controls">
            <button type="button" class="step up" part="control-up" tabindex="-1" aria-label="Increment">${ICON_UP}</button>
            <button type="button" class="step down" part="control-down" tabindex="-1" aria-label="Decrement">${ICON_DOWN}</button>
          </div>
        </div>
      </div>
    `);
  }

  get input(): HTMLInputElement {
    return this.$<HTMLInputElement>('#control');
  }

  get value(): number | '' {
    return this.#raw === '' || this.#raw === '-' ? '' : Number(this.#raw);
  }
  set value(v: number | string | null) {
    this.#raw = v == null || v === '' ? '' : String(v);
    this.#syncDisplay();
    this.setFormValue(this.#raw === '' ? null : this.#raw);
  }

  protected setup(): void {
    super.setup();
    this.input.addEventListener('focus', () => {
      this.input.value = this.#raw;
    });
    this.input.addEventListener('blur', () => {
      let raw = this.#sanitize(this.input.value);
      if (this.clampBehavior !== 'none') raw = this.#clamp(raw);
      this.#raw = raw;
      this.#syncDisplay();
      this.setFormValue(this.#raw === '' ? null : this.#raw);
      this.forwardChange();
    });
    this.input.addEventListener('input', () => {
      let raw = this.#sanitize(this.input.value);
      if (this.clampBehavior === 'strict') raw = this.#clamp(raw);
      this.#raw = raw;
      if (this.input.value !== raw) this.input.value = raw;
      this.setFormValue(this.#raw === '' ? null : this.#raw);
    });
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.#step(1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.#step(-1);
      }
    });
    const up = this.$<HTMLButtonElement>('.step.up');
    const down = this.$<HTMLButtonElement>('.step.down');
    up.addEventListener('pointerdown', (e) => e.preventDefault());
    down.addEventListener('pointerdown', (e) => e.preventDefault());
    up.addEventListener('click', () => this.#step(1));
    down.addEventListener('click', () => this.#step(-1));
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    for (const attr of FORWARDED) {
      if (!changed.has(attr)) continue;
      const v = this.getAttribute(attr);
      if (v === null || v === 'false') this.input.removeAttribute(attr);
      else this.input.setAttribute(attr, v);
    }
    if (changed.has('value')) this.value = this.getAttribute('value') ?? '';
    if (
      (changed.has('prefix') || changed.has('suffix') || changed.has('thousandSeparator') || changed.has('decimalScale')) &&
      this.root.activeElement !== this.input
    ) {
      this.#syncDisplay();
    }
  }

  #separator(): string {
    const t = this.getAttribute('thousand-separator');
    if (t === null || t === 'false') return '';
    return t === '' ? ',' : t;
  }

  /** Strip prefix/suffix/separators from raw text and keep only a valid numeric string. */
  #sanitize(text: string): string {
    let s = text;
    const sep = this.#separator();
    if (sep) s = s.split(sep).join('');
    const prefix = this.prefix || '';
    const suffix = this.suffix || '';
    if (prefix && s.startsWith(prefix)) s = s.slice(prefix.length);
    if (suffix && s.endsWith(suffix)) s = s.slice(0, s.length - suffix.length);
    let neg = false;
    if (s.startsWith('-')) {
      neg = true;
      s = s.slice(1);
    }
    s = s.replace(/[^0-9.]/g, '');
    const dot = s.indexOf('.');
    let intPart = dot === -1 ? s : s.slice(0, dot);
    let decPart = dot === -1 ? '' : s.slice(dot + 1).replace(/\./g, '');
    intPart = intPart.replace(/^0+(?=\d)/, '');
    if (this.decimalScale != null) decPart = decPart.slice(0, this.decimalScale);
    let out = intPart;
    if (this.allowDecimal && dot !== -1) out += '.' + decPart;
    if (neg && this.allowNegative && out !== '') out = '-' + out;
    return out;
  }

  #clamp(raw: string): string {
    if (raw === '' || raw === '-') return raw;
    let n = Number(raw);
    if (Number.isNaN(n)) return raw;
    if (this.min != null && n < this.min) n = this.min;
    if (this.max != null && n > this.max) n = this.max;
    return this.decimalScale != null ? n.toFixed(this.decimalScale) : String(n);
  }

  #format(raw: string): string {
    if (raw === '' || raw === '-') return '';
    const neg = raw.startsWith('-');
    const unsigned = neg ? raw.slice(1) : raw;
    const [intRaw, decPart] = unsigned.split('.');
    let intPart = intRaw || '0';
    const sep = this.#separator();
    if (sep) intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    let out = intPart;
    if (decPart !== undefined) out += '.' + decPart;
    if (neg) out = '-' + out;
    return `${this.prefix || ''}${out}${this.suffix || ''}`;
  }

  #syncDisplay(): void {
    this.input.value = this.#format(this.#raw);
  }

  #step(dir: number): void {
    if (this.isDisabled || this.getAttribute('readonly') !== null) return;
    const current = this.#raw === '' || this.#raw === '-' ? 0 : Number(this.#raw);
    let next = current + dir * (this.step || 1);
    if (this.min != null) next = Math.max(next, this.min);
    if (this.max != null) next = Math.min(next, this.max);
    this.#raw = this.decimalScale != null ? next.toFixed(this.decimalScale) : String(next);
    this.#syncDisplay();
    this.setFormValue(this.#raw === '' ? null : this.#raw);
    this.forwardChange();
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-number-input', MtNumberInput);
