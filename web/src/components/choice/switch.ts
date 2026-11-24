import { css, define, html, MtFormElement, type Props } from '../../core';
import { controlWrapperTemplate, rootStyles } from './shared';

const sizeStyles = css`
  :host { --_w: 2.375rem; --_h: 1.25rem; --_control-h: var(--_h); --_thumb: 1rem; --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='xs']) { --_w: 2rem; --_h: 1rem; --_thumb: 0.75rem; --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='md']) { --_w: 2.75rem; --_h: 1.5rem; --_thumb: 1.25rem; --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_w: 3.25rem; --_h: 1.75rem; --_thumb: 1.5rem; --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_w: 3.75rem; --_h: 2rem; --_thumb: 1.75rem; --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }
`;

const styles = css`
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
`;

/**
 * <mt-switch label description error value checked name color size radius
 *            label-position="right|left" label-on label-off>
 * Slots: label, description, error, thumb-icon, label-on, label-off.
 * Mantine's onLabel/offLabel are `label-on`/`label-off`: templ treats every
 * `on*` attribute as an event handler and refuses plain string values.
 * Submits `value` (default "on") when checked. `checked` is a live property;
 * emits `change`. Default radius is "xl" (pill).
 */
export class MtSwitch extends MtFormElement {
  static styles = [rootStyles, sizeStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    radius: { css: '--_radius', scale: 'radius', default: 'xl' },
    value: { default: 'on' },
    checked: { type: 'boolean' },
    color: { color: true },
    onLabel: { attr: 'label-on' },
    offLabel: { attr: 'label-off' },
    labelPosition: { attr: 'label-position', default: 'right' },
  };

  declare value: string;
  declare color: string | null;
  declare onLabel: string | null;
  declare offLabel: string | null;
  declare labelPosition: string;

  protected template(): string {
    return controlWrapperTemplate(html`
      <span class="track" part="track">
        <input type="checkbox" role="switch" id="control" class="input" part="input" />
        <span class="thumb" part="thumb"><slot name="thumb-icon"></slot></span>
        <span class="on-label" part="label-on"><slot name="label-on"><span class="on-label-text"></span></slot></span>
        <span class="off-label" part="label-off"><slot name="label-off"><span class="off-label-text"></span></slot></span>
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
      this.#syncFormValue();
      this.forwardChange();
    });
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('checked')) this.input.checked = this.prop('checked') as boolean;
    if (changed.has('checked') || changed.has('value')) this.#syncFormValue();
    if (changed.has('onLabel')) this.$('.on-label-text').textContent = this.onLabel ?? '';
    if (changed.has('offLabel')) this.$('.off-label-text').textContent = this.offLabel ?? '';
  }

  #syncFormValue(): void {
    this.setFormValue(this.input.checked ? this.value : null);
  }

  formResetCallback(): void {
    this.input.checked = this.prop('checked') as boolean;
    this.#syncFormValue();
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.checked = state === this.value;
  }
}

define('mt-switch', MtSwitch);
