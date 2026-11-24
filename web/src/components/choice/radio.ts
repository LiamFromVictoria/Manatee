import { css, define, html, MtFormElement, wrapperTemplate, type Props } from '../../core';
import { controlSizeStyles, controlWrapperTemplate, groupStyles, rootStyles } from './shared';

const styles = css`
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
`;

/**
 * <mt-radio label description error value checked name color size
 *           label-position="right|left" icon-color required disabled>
 * Role=radio on the host. Works standalone (own `name`, mutually exclusive
 * with siblings sharing that name in the same form) or nested inside
 * `mt-radio-group`, which then owns selection/name/value. Emits `change`
 * with detail `{ value }` when it becomes checked.
 */
export class MtRadio extends MtFormElement {
  static styles = [rootStyles, controlSizeStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: { default: 'on' },
    checked: { type: 'boolean' },
    color: { color: true },
    iconColor: { css: '--_icon-color', scale: 'color' },
    labelPosition: { attr: 'label-position', default: 'right' },
  };

  declare value: string;
  declare checked: boolean;
  declare color: string | null;
  declare iconColor: string | null;
  declare labelPosition: string;

  #group: MtRadioGroup | null = null;

  protected template(): string {
    return controlWrapperTemplate(html`<span class="box" part="box"><span class="dot" part="dot"></span></span>`);
  }

  get control(): HTMLElement | null {
    return null;
  }

  /** The host itself is the focusable/interactive radio (no internal control). */
  focus(options?: FocusOptions): void {
    HTMLElement.prototype.focus.call(this, options);
  }
  blur(): void {
    HTMLElement.prototype.blur.call(this);
  }

  protected setup(): void {
    super.setup();
    this.internals.role = 'radio';
    this.addEventListener('click', () => {
      if (!this.isDisabled) this.select();
    });
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') && !this.isDisabled) {
        e.preventDefault();
        this.select();
      }
    });
  }

  protected onConnect(): void {
    this.#group = this.closest<MtRadioGroup>('mt-radio-group');
    if (!this.#group) this.tabIndex = this.isDisabled ? -1 : 0;
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('checked')) {
      this.internals.ariaChecked = this.hasAttribute('checked') ? 'true' : 'false';
      if (!this.#group) this.setFormValue(this.hasAttribute('checked') ? this.value : null);
    }
    if (changed.has('disabled') && !this.#group) this.tabIndex = this.isDisabled ? -1 : 0;
  }

  /** Select this radio: delegates to the owning group, or handles standalone exclusivity. */
  select(): void {
    if (this.#group) {
      this.#group.selectValue(this.getAttribute('value') ?? 'on');
      return;
    }
    const name = this.name;
    if (name) {
      const scope: ParentNode = this.form ?? document;
      for (const el of scope.querySelectorAll(`mt-radio[name="${CSS.escape(name)}"]`)) {
        if (el !== this) el.removeAttribute('checked');
      }
    }
    this.setAttribute('checked', '');
    this.forwardChange();
    this.emit('change', { value: this.value });
  }

  formResetCallback(): void {
    this.toggleAttribute('checked', this.getAttribute('checked') !== null);
  }
}

/**
 * <mt-radio-group name value label description error required disabled size>
 * Owns name/value/selection for slotted `mt-radio` children (default
 * vertical stack); the form-associated element. role=radiogroup on the
 * host, aria-label mirrors `label`. Arrow keys move + select (roving
 * tabindex); Space selects. `required` sets a valueMissing validation error
 * when nothing is selected. Emits `change` with detail `{ value }`.
 */
export class MtRadioGroup extends MtFormElement {
  static styles = [groupStyles];
  static props: Props = { ...MtFormElement.props, value: {} };

  #value: string | null = null;

  protected template(): string {
    return wrapperTemplate('<div class="items" part="items" role="radiogroup"><slot></slot></div>', { labelFor: false });
  }

  get control(): HTMLElement | null {
    return null;
  }

  get value(): string {
    return this.#value ?? this.getAttribute('value') ?? '';
  }
  set value(v: string | null) {
    this.#value = v ?? '';
    this.#applyValue();
  }

  /** Select a value (used by child radios); updates children and form state. */
  selectValue(value: string): void {
    this.value = value;
  }

  protected setup(): void {
    super.setup();
    this.internals.role = 'radiogroup';
    this.addEventListener('keydown', (e: KeyboardEvent) => this.#onKeydown(e));
  }

  protected onConnect(): void {
    this.#applyValue();
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('value')) {
      this.#value = null;
      this.#applyValue();
    }
    if (changed.has('label')) this.internals.ariaLabel = this.label;
  }

  #radios(): MtRadio[] {
    return Array.from(this.querySelectorAll<MtRadio>('mt-radio'));
  }

  #applyValue(): void {
    const value = this.value;
    const radios = this.#radios();
    let tabbable = false;
    for (const r of radios) {
      const checked = value !== '' && (r.getAttribute('value') ?? 'on') === value;
      r.toggleAttribute('checked', checked);
      r.tabIndex = checked ? 0 : -1;
      if (checked) tabbable = true;
    }
    if (!tabbable) for (const r of radios) if (!r.hasAttribute('disabled')) { r.tabIndex = 0; break; }
    this.#sync();
  }

  #sync(): void {
    const value = this.value;
    this.setFormValue(this.name && value ? value : null);
    this.internals.setValidity(this.required && !value ? { valueMissing: true } : {}, 'Select an option', undefined);
    this.emit('change', { value });
  }

  #onKeydown(e: KeyboardEvent): void {
    const radios = this.#radios().filter((r) => !r.hasAttribute('disabled'));
    if (!radios.length) return;
    const idx = radios.indexOf(e.target as MtRadio);
    if (idx === -1) return;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % radios.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + radios.length) % radios.length;
    else return;
    e.preventDefault();
    this.selectValue(radios[next].getAttribute('value') ?? 'on');
    radios[next].focus();
  }

  formResetCallback(): void {
    this.#value = null;
    this.#applyValue();
  }
}

define('mt-radio', MtRadio);
define('mt-radio-group', MtRadioGroup);
