import { css, define, html, MtFormElement, wrapperTemplate, type Props } from '../../core';
import { controlSizeStyles, controlWrapperTemplate, groupStyles, rootStyles } from './shared';

const iconCheck = `<path d="M1.5 5.2L4 7.8L9 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
const iconIndeterminate = `<path d="M1.5 5H8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`;

const styles = css`
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
`;

/**
 * <mt-checkbox label description error value checked indeterminate name
 *              color size radius label-position="right|left" icon-color
 *              required disabled>
 * Slots: label, description, error.
 * Submits `value` (default "on") when checked. `checked`/`indeterminate` are
 * live properties; emits `change`.
 */
export class MtCheckbox extends MtFormElement {
  static styles = [rootStyles, controlSizeStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: { default: 'on' },
    checked: { type: 'boolean' },
    indeterminate: { type: 'boolean' },
    color: { color: true },
    iconColor: { css: '--_icon-color', scale: 'color' },
    labelPosition: { attr: 'label-position', default: 'right' },
  };

  declare color: string | null;
  declare iconColor: string | null;
  declare labelPosition: string;

  declare value: string;
  declare indeterminate: boolean;

  protected template(): string {
    return controlWrapperTemplate(html`
      <span class="box" part="box">
        <input type="checkbox" id="control" class="input" part="input" />
        <svg class="icon icon-check" part="icon" viewBox="0 0 10 10" aria-hidden="true">${iconCheck}</svg>
        <svg class="icon icon-indeterminate" part="icon" viewBox="0 0 10 10" aria-hidden="true">${iconIndeterminate}</svg>
      </span>
    `);
  }

  get input(): HTMLInputElement {
    return this.$<HTMLInputElement>('#control');
  }

  get checked(): boolean {
    return this.input.checked;
  }
  set checked(v: boolean) {
    this.input.checked = !!v;
    this.#syncFormValue();
  }

  protected setup(): void {
    super.setup();
    this.input.addEventListener('change', () => {
      this.removeAttribute('indeterminate');
      this.#syncFormValue();
      this.forwardChange();
    });
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('checked')) this.input.checked = this.prop('checked') as boolean;
    if (changed.has('indeterminate')) this.input.indeterminate = this.indeterminate;
    if (changed.has('checked') || changed.has('value')) this.#syncFormValue();
  }

  #syncFormValue(): void {
    if (this.closest('mt-checkbox-group')) {
      this.internals.setFormValue(null);
      return;
    }
    this.setFormValue(this.input.checked ? this.value : null);
  }

  formResetCallback(): void {
    this.input.checked = this.prop('checked') as boolean;
    this.input.indeterminate = this.indeterminate;
    this.#syncFormValue();
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.checked = state === this.value;
  }
}

/**
 * <mt-checkbox-group name value label description error required disabled size>
 * Wraps slotted `mt-checkbox` children (default vertical stack). `value` is a
 * comma-separated list of checked values; aggregates into FormData with one
 * entry per checked child. Children should not have a `name` of their own.
 * Emits `change` with detail `{ value: string[] }`.
 */
export class MtCheckboxGroup extends MtFormElement {
  static styles = [groupStyles];
  static props: Props = { ...MtFormElement.props, value: {} };

  #value: string[] | null = null;

  protected template(): string {
    return wrapperTemplate('<div class="items" part="items" role="group"><slot></slot></div>', { labelFor: false });
  }

  get control(): HTMLElement | null {
    return null;
  }

  get value(): string[] {
    if (this.#value) return this.#value;
    const attr = this.getAttribute('value');
    return attr ? attr.split(',').map((s) => s.trim()).filter(Boolean) : [];
  }
  set value(v: string[] | string | null) {
    this.#value = Array.isArray(v) ? v : typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : [];
    this.#applyValue();
  }

  protected setup(): void {
    super.setup();
    this.internals.role = 'group';
    this.addEventListener('change', (e) => {
      if (e.target === this || (e.target as HTMLElement)?.tagName !== 'MT-CHECKBOX') return;
      this.#value = this.#items()
        .filter((i) => i.checked)
        .map((i) => i.getAttribute('value') ?? 'on');
      this.#sync();
    });
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

  #items(): MtCheckbox[] {
    return Array.from(this.querySelectorAll<MtCheckbox>('mt-checkbox'));
  }

  #applyValue(): void {
    const values = this.value;
    for (const item of this.#items()) item.checked = values.includes(item.getAttribute('value') ?? 'on');
    this.#sync();
  }

  #sync(): void {
    const values = this.value;
    const fd = new FormData();
    if (this.name) for (const v of values) fd.append(this.name, v);
    this.setFormValue(fd);
    this.internals.setValidity(this.required && values.length === 0 ? { valueMissing: true } : {}, 'Select at least one option', undefined);
    this.emit('change', { value: values });
  }

  formResetCallback(): void {
    this.#value = null;
    this.#applyValue();
  }
}

define('mt-checkbox', MtCheckbox);
define('mt-checkbox-group', MtCheckboxGroup);

