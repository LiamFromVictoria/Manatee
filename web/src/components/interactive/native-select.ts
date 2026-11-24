import { css, define, html, inputStyles, MtFormElement, wrapperStyles, wrapperTemplate, type Props } from '../../core';

const ICON_CHEVRON =
  '<svg viewBox="0 0 15 15" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"/></svg>';

const styles = inputStyles;
const chevronStyles = css`
  .section.right svg { width: var(--_chevron-size); height: var(--_chevron-size); }
`;

/**
 * <mt-native-select label description error value name
 *                    required disabled size radius variant="default|filled|unstyled">
 * Children: light-DOM <option>/<optgroup>, cloned into the shadow <select> on
 * every mutation, like a progressively-enhanced native <select>.
 * Slots: label, description, error, left-section.
 * Events: native `input`/`change` (re-dispatched from host).
 */
export class MtNativeSelect extends MtFormElement {
  static styles = [wrapperStyles, styles, chevronStyles];
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
