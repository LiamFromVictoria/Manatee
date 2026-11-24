import { css, define, html, inputStyles, MtFormElement, wrapperStyles, wrapperTemplate, type Props } from '../../core';

/** Attributes forwarded verbatim from host to the inner <input>. */
const FORWARDED = ['placeholder', 'autocomplete', 'minlength', 'maxlength', 'readonly', 'autofocus'];

const ICON_EYE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>';
const ICON_EYE_OFF =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.3 21.3 0 0 1 5.17-6.17M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.3 21.3 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

const styles = css`
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
`;

/**
 * <mt-password-input label description error placeholder value name
 *                     required disabled readonly size radius variant="default|filled|unstyled" visible>
 * Slots: label, description, error, left-section.
 * Events: native `input` (composed), `change` (re-dispatched from host), `visibility-change` ({visible}).
 */
export class MtPasswordInput extends MtFormElement {
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
    visible: { type: 'boolean' },
  };

  declare visible: boolean;

  protected template(): string {
    return wrapperTemplate(html`
      <div class="field has-right" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="password" autocomplete="current-password" />
        <div class="section right toggle-section" part="right-section">
          <button type="button" class="toggle" part="toggle" tabindex="-1" aria-pressed="false" aria-label="Show password">
            <span class="icon-show" aria-hidden="true">${ICON_EYE}</span>
            <span class="icon-hide" aria-hidden="true">${ICON_EYE_OFF}</span>
          </button>
        </div>
      </div>
    `);
  }

  get input(): HTMLInputElement {
    return this.$<HTMLInputElement>('#control');
  }
  get toggle(): HTMLButtonElement {
    return this.$<HTMLButtonElement>('.toggle');
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
    this.toggle.addEventListener('mousedown', (e) => e.preventDefault());
    this.toggle.addEventListener('click', () => {
      if (this.isDisabled || this.getAttribute('readonly') !== null) return;
      this.visible = !this.visible;
      this.emit('visibility-change', { visible: this.visible });
    });
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
    if (changed.has('visible')) {
      const show = this.visible;
      this.input.type = show ? 'text' : 'password';
      this.toggle.setAttribute('aria-pressed', String(show));
      this.toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    }
    if (changed.has('disabled')) this.toggle.toggleAttribute('disabled', this.isDisabled);
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-password-input', MtPasswordInput);
