import { css, define, fieldTemplate, inputStyles, MtFormElement, wrapperStyles, wrapperTemplate, type Props } from '../../core';

/** Attributes forwarded verbatim from host to the inner <textarea>. */
const FORWARDED = ['placeholder', 'autocomplete', 'minlength', 'maxlength', 'readonly', 'autofocus'];

const styles = css`
  :host([resize='vertical']) .input { resize: vertical; }
  :host([resize='both']) .input { resize: both; }
  :host([autosize]) .input { resize: none; overflow: hidden; }
`;

/**
 * <mt-textarea label description error placeholder value name
 *              required disabled readonly size radius variant="default|filled|unstyled"
 *              autosize min-rows max-rows resize="none|vertical|both">
 * Slots: label, description, error, left-section, right-section.
 * Events: native `input` (composed) and `change` (re-dispatched from host).
 */
export class MtTextarea extends MtFormElement {
  static styles = [wrapperStyles, inputStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    variant: { default: 'default' },
    placeholder: {},
    autocomplete: {},
    minlength: {},
    maxlength: {},
    readonly: { type: 'boolean' },
    autofocus: { type: 'boolean' },
    autosize: { type: 'boolean' },
    minRows: { type: 'number', default: 2 },
    maxRows: { type: 'number' },
    resize: { default: 'none' },
  };

  declare autosize: boolean;
  declare minRows: number;
  declare maxRows: number | null;

  protected template(): string {
    return wrapperTemplate(fieldTemplate('<textarea id="control" class="input" part="input" rows="2"></textarea>'));
  }

  get input(): HTMLTextAreaElement {
    return this.$<HTMLTextAreaElement>('#control');
  }

  get value(): string {
    return this.input.value;
  }
  set value(v: string) {
    this.input.value = v ?? '';
    this.setFormValue(this.input.value);
    this.#resize();
  }

  protected setup(): void {
    super.setup();
    this.input.addEventListener('input', () => {
      this.setFormValue(this.input.value);
      this.#resize();
    });
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
    if (changed.has('autosize') || changed.has('minRows') || changed.has('maxRows')) this.#resize();
  }

  /** Grow/shrink the textarea height to fit content, within min/max rows. */
  #resize(): void {
    const ta = this.input;
    if (!this.autosize) {
      ta.style.height = '';
      ta.style.overflowY = '';
      return;
    }
    ta.style.height = 'auto';
    const style = getComputedStyle(ta);
    const lineHeight = parseFloat(style.lineHeight) || 20;
    const extra =
      (parseFloat(style.paddingTop) || 0) +
      (parseFloat(style.paddingBottom) || 0) +
      (parseFloat(style.borderTopWidth) || 0) +
      (parseFloat(style.borderBottomWidth) || 0);
    const minH = this.minRows ? lineHeight * this.minRows + extra : 0;
    const maxH = this.maxRows ? lineHeight * this.maxRows + extra : Infinity;
    const h = Math.min(Math.max(ta.scrollHeight, minH), maxH);
    ta.style.height = `${h}px`;
    ta.style.overflowY = ta.scrollHeight > maxH ? 'auto' : 'hidden';
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-textarea', MtTextarea);
