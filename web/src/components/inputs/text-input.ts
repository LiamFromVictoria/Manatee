import { define, fieldTemplate, inputStyles, MtFormElement, wrapperStyles, wrapperTemplate, type Props } from '../../core';

/** Attributes forwarded verbatim from host to the inner <input>. */
const FORWARDED = ['placeholder', 'type', 'autocomplete', 'inputmode', 'pattern', 'minlength', 'maxlength', 'readonly', 'autofocus'];

/**
 * <mt-text-input label description error placeholder value name type
 *                required disabled readonly size radius variant="default|filled|unstyled">
 * Slots: label, description, error, left-section, right-section.
 * Events: native `input` (composed) and `change` (re-dispatched from host).
 */
export class MtTextInput extends MtFormElement {
  static styles = [wrapperStyles, inputStyles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    variant: { default: 'default' },
    placeholder: {},
    type: { default: 'text' },
    autocomplete: {},
    inputmode: {},
    pattern: {},
    minlength: {},
    maxlength: {},
    readonly: { type: 'boolean' },
    autofocus: { type: 'boolean' },
  };

  protected template(): string {
    return wrapperTemplate(fieldTemplate('<input id="control" class="input" part="input">'));
  }

  get input(): HTMLInputElement {
    return this.$<HTMLInputElement>('#control');
  }

  get value(): string {
    return this.input.value;
  }
  set value(v: string) {
    this.input.value = v ?? '';
    this.setFormValue(this.input.value);
  }

  protected setup(): void {
    super.setup();
    this.input.addEventListener('input', () => this.setFormValue(this.input.value));
    this.input.addEventListener('change', () => this.forwardChange());
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
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-text-input', MtTextInput);
