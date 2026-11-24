import { css, html, MtElement, type Props } from './element';

/**
 * Shared input chrome (label / description / error) and size scale, used by
 * every form control. Size is set on the host: xs | sm (default) | md | lg | xl.
 */
export const wrapperStyles = css`
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
`;

/** Text-like control box: border, variants, left/right sections. */
export const inputStyles = css`
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
`;

/** Label + description wrapper around a control. The control should use id="control". */
export function wrapperTemplate(control: string, opts: { labelFor?: boolean } = {}): string {
  const tag = opts.labelFor === false ? 'div' : 'label';
  const forAttr = opts.labelFor === false ? '' : ' for="control"';
  return html`
    <${tag} class="label" part="label" id="label"${forAttr} hidden><slot name="label"><span class="label-text"></span></slot><span class="required" aria-hidden="true" hidden>*</span></${tag}>
    <div class="description" part="description" id="description" hidden><slot name="description"><span class="description-text"></span></slot></div>
    ${control}
    <div class="error" part="error" id="error" hidden><slot name="error"><span class="error-text"></span></slot></div>
  `;
}

/** Field box with optional sections, for text-like inputs. */
export function fieldTemplate(control: string): string {
  return html`
    <div class="field" part="field">
      <div class="section left" part="left-section"><slot name="left-section"></slot></div>
      ${control}
      <div class="section right" part="right-section"><slot name="right-section"></slot></div>
    </div>
  `;
}

/**
 * Base for form-associated controls. Provides name/label/description/error/
 * required/disabled/size props, wrapper syncing, ElementInternals plumbing, and
 * native-validity mirroring.
 *
 * Subclasses: render `wrapperTemplate(...)`, implement `get control()` (the
 * inner native element, if any), call `setFormValue()` whenever the value
 * changes, and override `formResetCallback()`.
 */
export class MtFormElement extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static props: Props = {
    name: {},
    label: {},
    description: {},
    error: {},
    required: { type: 'boolean' },
    disabled: { type: 'boolean' },
    size: { default: 'sm' },
    radius: { css: '--_radius', scale: 'radius' },
    leftSectionWidth: { css: '--_ls-w', scale: 'rem' },
    rightSectionWidth: { css: '--_rs-w', scale: 'rem' },
  };

  declare name: string | null;
  declare label: string | null;
  declare description: string | null;
  declare error: string | null;
  declare required: boolean;
  declare disabled: boolean;
  declare size: string;

  readonly internals: ElementInternals;
  #formDisabled = false;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  /** Inner native control used for focus, aria wiring and validity mirroring. */
  get control(): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLElement | null {
    return this.root.getElementById('control');
  }

  get form(): HTMLFormElement | null {
    return this.internals.form;
  }
  get validity(): ValidityState {
    return this.internals.validity;
  }
  get validationMessage(): string {
    return this.internals.validationMessage;
  }
  get willValidate(): boolean {
    return this.internals.willValidate;
  }
  checkValidity(): boolean {
    return this.internals.checkValidity();
  }
  reportValidity(): boolean {
    return this.internals.reportValidity();
  }

  /** True when disabled directly or via an ancestor <fieldset disabled>. */
  get isDisabled(): boolean {
    return this.disabled || this.#formDisabled;
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.requestUpdate('disabled');
  }

  formResetCallback(): void {}

  protected setup(): void {
    for (const name of ['label', 'description', 'error']) {
      this.root.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)?.addEventListener('slotchange', () => this.syncWrapper());
    }
    for (const side of ['left', 'right']) {
      const slot = this.root.querySelector<HTMLSlotElement>(`slot[name="${side}-section"]`);
      const sync = () => slot?.closest('.field')?.classList.toggle(`has-${side}`, (slot?.assignedNodes().length ?? 0) > 0);
      slot?.addEventListener('slotchange', sync);
      sync();
    }
  }

  protected update(changed: Set<string>): void {
    if (changed.has('label') || changed.has('description') || changed.has('error') || changed.has('required') || changed.has('disabled')) {
      this.syncWrapper();
    }
  }

  /** Update label/description/error text, visibility and aria wiring. */
  protected syncWrapper(): void {
    const has = (slot: string, value: string | null) => !!value || !!this.querySelector(`:scope > [slot="${slot}"]`);
    const parts: Array<[string, string | null]> = [['label', this.label], ['description', this.description], ['error', this.error]];
    const describedBy: string[] = [];
    for (const [part, value] of parts) {
      const el = this.root.getElementById(part);
      if (!el) continue;
      const text = el.querySelector(`.${part}-text`);
      if (text) text.textContent = value ?? '';
      const visible = has(part, value);
      el.hidden = !visible;
      if (visible && part !== 'label') describedBy.push(part);
    }
    this.root.querySelector<HTMLElement>('.required')?.toggleAttribute('hidden', !this.required);

    const control = this.control;
    if (control) {
      if (describedBy.length) control.setAttribute('aria-describedby', describedBy.join(' '));
      else control.removeAttribute('aria-describedby');
      control.toggleAttribute('aria-invalid', !!this.error);
      if (this.error) control.setAttribute('aria-invalid', 'true');
      if ('disabled' in control) (control as HTMLInputElement).disabled = this.isDisabled;
      if ('required' in control) (control as HTMLInputElement).required = this.required;
    }
    this.internals.ariaInvalid = this.error ? 'true' : null;
  }

  /** Push a value to the owning form and mirror the inner control's validity. */
  protected setFormValue(value: string | FormData | null, state?: string | FormData | null): void {
    this.internals.setFormValue(value, state ?? value);
    this.syncValidity();
  }

  /** Mirror native validity of `control` (if it is a native form control) onto the host. */
  protected syncValidity(): void {
    const c = this.control as HTMLInputElement | null;
    if (c && 'validity' in c) this.internals.setValidity(c.validity, c.validationMessage, c);
  }

  focus(options?: FocusOptions): void {
    (this.control as HTMLElement | null)?.focus(options);
  }
  blur(): void {
    (this.control as HTMLElement | null)?.blur();
  }

  /** Re-dispatch a non-composed native `change` from the host. */
  protected forwardChange(): void {
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
