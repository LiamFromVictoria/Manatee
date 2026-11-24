import { css, define, html, MtFormElement, uid, type Props } from '../../core';

interface Item {
  value: string;
  label: string;
  disabled: boolean;
}

const styles = css`
  :host { display: inline-block; --_fz: var(--mt-font-size-sm); --_pad-y: 0.375rem; --_pad-x: 0.75rem; }
  :host([full-width]) { display: block; }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_pad-y: 0.25rem; --_pad-x: 0.5rem; }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_pad-y: 0.5rem; --_pad-x: 1rem; }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_pad-y: 0.625rem; --_pad-x: 1.25rem; }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_pad-y: 0.75rem; --_pad-x: 1.5rem; }

  .root {
    position: relative;
    display: inline-flex;
    gap: 0.125rem;
    padding: 0.25rem;
    background: var(--mt-color-hover);
    border-radius: var(--_radius, var(--mt-radius-default));
  }
  :host([full-width]) .root { display: flex; width: 100%; }
  :host([orientation='vertical']) .root { flex-direction: column; }
  :host([disabled]) .root { opacity: 0.6; }

  .indicator {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: var(--mt-color-body);
    border-radius: calc(var(--_radius, var(--mt-radius-default)) - 0.125rem);
    box-shadow: var(--mt-shadow-xs);
    opacity: 0;
    transition: transform var(--_duration, 200ms) var(--_easing, ease), width var(--_duration, 200ms) var(--_easing, ease), height var(--_duration, 200ms) var(--_easing, ease), opacity 150ms ease;
  }
  :host([data-color]) .indicator { background: var(--mt-c-filled); box-shadow: none; }

  .segment { position: relative; z-index: 1; display: flex; }
  :host([full-width]) .segment { flex: 1; }
  .radio {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: var(--_pad-y) var(--_pad-x);
    font-size: var(--_fz);
    line-height: 1.2;
    color: var(--mt-color-dimmed);
    border-radius: calc(var(--_radius, var(--mt-radius-default)) - 0.125rem);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: color 150ms ease;
  }
  .label:hover { color: var(--mt-color-text); }
  .radio:checked + .label { color: var(--mt-color-text); }
  :host([data-color]) .radio:checked + .label { color: var(--mt-white); }
  .radio:disabled + .label { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .radio:disabled + .label:hover { color: var(--mt-color-disabled-color); }
  :host([disabled]) .label, :host([readonly]) .label { cursor: not-allowed; }
  .radio:focus-visible + .label { outline: 2px solid var(--mt-color-primary-filled); outline-offset: 2px; }
`;

/**
 * <mt-segmented-control name value color size radius full-width readonly
 *                       orientation="horizontal|vertical" transition-duration
 *                       transition-timing-function disabled required>
 * Children: light-DOM <option value disabled> (label = text content) describe
 * the segments, like a native <select>.
 * Events: `change` ({value}) on the host.
 */
export class MtSegmentedControl extends MtFormElement {
  static styles = [styles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    color: { color: true },
    readonly: { type: 'boolean' },
    orientation: { default: 'horizontal' },
    fullWidth: { type: 'boolean' },
    transitionDuration: { type: 'number', default: 200 },
    transitionTimingFunction: { default: 'ease' },
  };

  declare orientation: string;
  declare fullWidth: boolean;
  declare transitionDuration: number;
  declare transitionTimingFunction: string;

  #name = uid('mt-sc');
  #items: Item[] = [];
  #value = '';
  #ro = new ResizeObserver(() => this.#updateIndicator(false));
  #observer = new MutationObserver(() => {
    this.#readOptions();
    this.#render();
  });

  protected template(): string {
    return html`<div id="control" class="root" part="root" role="radiogroup" tabindex="-1"><div class="indicator" part="indicator"></div></div>`;
  }

  get #root(): HTMLElement {
    return this.$('.root');
  }

  get value(): string {
    return this.#value;
  }
  set value(v: string | null) {
    this.#value = v ?? '';
    this.setFormValue(this.#value === '' ? null : this.#value);
    this.#applySelection();
  }

  protected setup(): void {
    super.setup();
    this.#readOptions();
    this.toggleAttribute('data-color', !!this.getAttribute('color'));
    this.#render();
    this.#ro.observe(this.#root);
    this.#observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['value', 'disabled'], characterData: true });
    this.addEventListener('keydown', (e) => this.#onKeydown(e));
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('color')) this.toggleAttribute('data-color', !!this.getAttribute('color'));
    if (changed.has('transitionDuration')) this.style.setProperty('--_duration', `${this.transitionDuration}ms`);
    if (changed.has('transitionTimingFunction')) this.style.setProperty('--_easing', this.transitionTimingFunction);
    if (changed.has('value') && this.hasAttribute('value')) this.value = this.getAttribute('value');
    if (changed.has('disabled') || changed.has('readonly')) this.#syncDisabled();
  }

  #readOptions(): void {
    this.#items = Array.from(this.children)
      .filter((el) => el.tagName === 'OPTION')
      .map((el) => ({
        value: el.getAttribute('value') ?? el.textContent?.trim() ?? '',
        label: el.textContent?.trim() ?? '',
        disabled: el.hasAttribute('disabled'),
      }));
  }

  #render(): void {
    const root = this.#root;
    root.querySelectorAll('.segment').forEach((el) => el.remove());
    if (!this.#value && this.#items.length) this.#value = this.#items.find((i) => !i.disabled)?.value ?? '';
    for (const item of this.#items) {
      const wrap = document.createElement('label');
      wrap.className = 'segment';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.className = 'radio';
      radio.name = this.#name;
      radio.value = item.value;
      radio.disabled = item.disabled || this.isDisabled;
      radio.checked = item.value === this.#value;
      radio.addEventListener('change', () => {
        if (this.getAttribute('readonly') !== null) return;
        this.#value = item.value;
        this.setFormValue(this.#value === '' ? null : this.#value);
        this.#updateIndicator(true);
        this.emit('change', { value: this.#value });
      });
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = item.label;
      wrap.append(radio, label);
      root.append(wrap);
    }
    this.#syncDisabled();
    requestAnimationFrame(() => this.#updateIndicator(false));
  }

  #applySelection(): void {
    for (const radio of this.root.querySelectorAll<HTMLInputElement>('.radio')) radio.checked = radio.value === this.#value;
    this.#updateIndicator(true);
  }

  #syncDisabled(): void {
    const readonly = this.getAttribute('readonly') !== null;
    for (const radio of this.root.querySelectorAll<HTMLInputElement>('.radio')) {
      const item = this.#items.find((i) => i.value === radio.value);
      radio.disabled = (item?.disabled ?? false) || this.isDisabled || readonly;
    }
  }

  #updateIndicator(animate: boolean): void {
    const indicator = this.$<HTMLElement>('.indicator');
    const checked = this.root.querySelector<HTMLInputElement>('.radio:checked');
    // .segment is the nearest positioned ancestor of its own children (it has
    // position:relative for z-index stacking), so the checked radio's label
    // sibling reports offsetLeft/offsetTop relative to itself (~0), not to
    // .root. The .segment wrapper itself is positioned directly against
    // .root (root is the next positioned ancestor up), so measure that.
    const segment = checked?.parentElement as HTMLElement | null;
    if (!checked || !segment) {
      indicator.style.opacity = '0';
      return;
    }
    if (!animate) indicator.style.transition = 'none';
    indicator.style.opacity = '1';
    indicator.style.width = `${segment.offsetWidth}px`;
    indicator.style.height = `${segment.offsetHeight}px`;
    indicator.style.transform = `translate(${segment.offsetLeft}px, ${segment.offsetTop}px)`;
    if (!animate) {
      indicator.getBoundingClientRect();
      indicator.style.transition = '';
    }
  }

  #onKeydown(e: KeyboardEvent): void {
    if (this.isDisabled || this.getAttribute('readonly') !== null) return;
    const forward = this.orientation === 'vertical' ? e.key === 'ArrowDown' : e.key === 'ArrowRight';
    const backward = this.orientation === 'vertical' ? e.key === 'ArrowUp' : e.key === 'ArrowLeft';
    if (!forward && !backward) return;
    e.preventDefault();
    const enabled = this.#items.filter((i) => !i.disabled);
    if (!enabled.length) return;
    const idx = enabled.findIndex((i) => i.value === this.#value);
    const next = enabled[(idx + (forward ? 1 : -1) + enabled.length) % enabled.length];
    this.#value = next.value;
    this.setFormValue(this.#value === '' ? null : this.#value);
    this.#applySelection();
    this.root.querySelector<HTMLInputElement>(`.radio[value="${CSS.escape(next.value)}"]`)?.focus();
    this.emit('change', { value: this.#value });
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? this.#items.find((i) => !i.disabled)?.value ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-segmented-control', MtSegmentedControl);
