import { define, html, inputStyles, MtFormElement, wrapperStyles, wrapperTemplate, type Props } from '../../core';

const ICON_CHEVRON =
  '<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>';

const styles = inputStyles;

/**
 * <mt-native-select label description error value name
 *                    required disabled size radius variant="default|filled|unstyled">
 * Children: light-DOM <option>/<optgroup>, cloned into the shadow <select> on
 * every mutation, like a progressively-enhanced native <select>.
 * Slots: label, description, error, left-section.
 * Events: native `input`/`change` (re-dispatched from host).
 */
export class MtNativeSelect extends MtFormElement {
  static styles = [wrapperStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    variant: { default: 'default' },
  };

  #observer = new MutationObserver(() => this.#syncOptions());

  protected template(): string {
    return wrapperTemplate(html`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <select id="control" class="input" part="input" style="padding-inline-end:var(--_height)"></select>
        <div class="section right" part="right-section" aria-hidden="true">${ICON_CHEVRON}</div>
      </div>
    `);
  }

  get select(): HTMLSelectElement {
    return this.$<HTMLSelectElement>('#control');
  }

  get value(): string {
    return this.select.value;
  }
  set value(v: string | null) {
    this.select.value = v ?? '';
    this.setFormValue(this.select.value);
  }

  protected setup(): void {
    super.setup();
    this.#syncOptions();
    this.#observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['value', 'disabled', 'selected', 'label'], characterData: true });
    this.select.addEventListener('input', () => this.setFormValue(this.select.value));
    this.select.addEventListener('change', () => this.forwardChange());
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('value') && this.hasAttribute('value')) this.value = this.getAttribute('value');
  }

  #syncOptions(): void {
    const explicit = this.getAttribute('value');
    const current = this.select.selectedOptions[0]?.value;
    this.select.innerHTML = '';
    for (const el of Array.from(this.children)) {
      if (el.tagName === 'OPTION' || el.tagName === 'OPTGROUP') this.select.append(el.cloneNode(true));
    }
    const wanted = explicit ?? current;
    if (wanted != null && [...this.select.options].some((o) => o.value === wanted)) this.select.value = wanted;
    this.setFormValue(this.select.value);
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? this.select.options[0]?.value ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-native-select', MtNativeSelect);
