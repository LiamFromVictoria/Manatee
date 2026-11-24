import {
  autoPosition,
  css,
  define,
  floatingStyles,
  html,
  inputStyles,
  MtFormElement,
  onDismiss,
  wrapperStyles,
  wrapperTemplate,
  type Props,
} from '../../core';

interface Item {
  value: string;
  label: string;
  disabled: boolean;
  group?: string;
}

const ICON_CHEVRON =
  '<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>';
const ICON_CLEAR =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg>';
const ICON_CHECK =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg>';

const styles = css`
  :host { position: relative; }
  .input { cursor: default; caret-color: transparent; padding-inline-end: calc(var(--_height) * 1.1); }
  :host([searchable]) .input { cursor: text; caret-color: auto; }
  :host([readonly]) .input, :host([disabled]) .input { cursor: not-allowed; }
  :host([clearable]) .input { padding-inline-end: calc(var(--_height) * 1.7); }

  .section.right { width: auto; min-width: var(--_height); justify-content: flex-end; padding-inline-end: 0.5rem; gap: 0.25rem; }
  .chevron { display: flex; align-items: center; justify-content: center; width: 0.75rem; height: 0.75rem; color: var(--mt-color-dimmed); transition: transform var(--mt-transition); flex: none; }
  .chevron svg { width: 100%; height: 100%; }
  :host([data-open]) .chevron { transform: rotate(180deg); }

  .clear {
    all: unset;
    pointer-events: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    flex: none;
  }
  .clear:hover { background: var(--mt-color-hover); color: var(--mt-color-text); }
  .clear svg { width: 0.625rem; height: 0.625rem; }
  .clear[hidden] { display: none; }

  .dropdown {
    box-sizing: border-box;
    max-height: var(--_max-dropdown-height, 15.625rem);
    overflow-y: auto;
    background: var(--mt-color-dropdown);
    border: 1px solid var(--mt-color-border);
    border-radius: var(--_radius);
    box-shadow: var(--mt-shadow-md);
    padding: 0.25rem;
  }
  .dropdown:not(:popover-open) { display: none; }
  .option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--mt-radius-sm);
    font-size: var(--_fz);
    color: var(--mt-color-text);
    cursor: pointer;
    user-select: none;
  }
  .option.highlighted, .option:hover:not(.disabled) { background: var(--mt-color-hover); }
  .option[aria-selected='true'] { font-weight: 500; }
  .option.disabled { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .check { display: flex; width: 1rem; height: 1rem; flex: none; color: var(--mt-color-primary-filled); }
  .check svg { width: 100%; height: 100%; }
  .option-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .group-label { padding: 0.375rem 0.5rem 0.125rem; font-size: var(--mt-font-size-xs); font-weight: 600; color: var(--mt-color-dimmed); text-transform: uppercase; }
  .empty { padding: 0.5rem; font-size: var(--_fz); color: var(--mt-color-dimmed); text-align: center; }
`;

/**
 * <mt-select label description error placeholder value name
 *            required disabled readonly size radius variant="default|filled|unstyled"
 *            searchable clearable nothing-found allow-deselect max-dropdown-height>
 * Children: light-DOM <option value> (and <optgroup label>) describe the choices,
 * like a native <select>; re-read on mutation.
 * Slots: label, description, error, left-section.
 * Events: `change` ({value}) on the host.
 */
export class MtSelect extends MtFormElement {
  static styles = [wrapperStyles, inputStyles, floatingStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    placeholder: {},
    variant: { default: 'default' },
    readonly: { type: 'boolean' },
    autofocus: { type: 'boolean' },
    searchable: { type: 'boolean' },
    clearable: { type: 'boolean' },
    nothingFound: {},
    allowDeselect: { type: 'boolean', default: true },
    maxDropdownHeight: { css: '--_max-dropdown-height', scale: 'rem', default: 250 },
  };

  declare placeholder: string | null;
  declare searchable: boolean;
  declare clearable: boolean;
  declare nothingFound: string | null;
  declare allowDeselect: boolean;

  #value = '';
  #query = '';
  #items: Item[] = [];
  #filtered: Item[] = [];
  #highlighted = -1;
  #isOpen = false;
  #cleanupPosition?: () => void;
  #cleanupDismiss?: () => void;
  #observer = new MutationObserver(() => {
    this.#readOptions();
    this.#refreshFiltered();
    this.#syncInputText();
  });

  protected template(): string {
    return wrapperTemplate(html`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" role="combobox" aria-haspopup="listbox"
               aria-expanded="false" aria-controls="dropdown" aria-autocomplete="list" autocomplete="off"
               spellcheck="false" readonly />
        <div class="section right" part="right-section">
          <button type="button" class="clear" part="clear-button" aria-label="Clear value" tabindex="-1" hidden>${ICON_CLEAR}</button>
          <span class="chevron" part="chevron" aria-hidden="true">${ICON_CHEVRON}</span>
        </div>
      </div>
      <div id="dropdown" class="dropdown" part="dropdown" popover="manual" role="listbox"></div>
    `);
  }

  get input(): HTMLInputElement {
    return this.$<HTMLInputElement>('#control');
  }
  get field(): HTMLElement {
    return this.$('.field');
  }
  get dropdown(): HTMLElement {
    return this.$('#dropdown');
  }
  get clearBtn(): HTMLButtonElement {
    return this.$<HTMLButtonElement>('.clear');
  }

  get value(): string {
    return this.#value;
  }
  set value(v: string | null) {
    this.#value = v ?? '';
    this.setFormValue(this.#value === '' ? null : this.#value);
    this.#syncInputText();
    this.#syncClear();
    if (this.#isOpen) this.#renderDropdown();
  }

  protected setup(): void {
    super.setup();
    this.#readOptions();
    this.#filtered = this.#items;

    this.#observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['value', 'label', 'disabled'],
      characterData: true,
    });

    this.input.addEventListener('focus', () => {
      if (!this.isDisabled && !this.#isOpen) this.#openDropdown();
    });
    this.input.addEventListener('click', () => {
      if (!this.isDisabled && !this.#isOpen) this.#openDropdown();
    });
    this.input.addEventListener('blur', () => this.#closeDropdown());
    this.input.addEventListener('input', () => {
      if (!this.searchable) return;
      this.#query = this.input.value;
      if (!this.#isOpen) this.#openDropdown();
      else this.#refreshFiltered();
    });
    this.input.addEventListener('keydown', (e) => this.#onKeydown(e));

    this.clearBtn.addEventListener('mousedown', (e) => e.preventDefault());
    this.clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.isDisabled || this.getAttribute('readonly') !== null) return;
      this.value = '';
      this.emit('change', { value: '' });
    });
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('placeholder')) {
      const ph = this.placeholder;
      if (ph) this.input.setAttribute('placeholder', ph);
      else this.input.removeAttribute('placeholder');
    }
    if (changed.has('autofocus')) {
      if (this.getAttribute('autofocus') !== null) this.input.setAttribute('autofocus', '');
      else this.input.removeAttribute('autofocus');
    }
    if (changed.has('readonly') || changed.has('searchable')) {
      const readonly = this.getAttribute('readonly') !== null;
      this.input.readOnly = readonly || !this.searchable;
      if (readonly) this.#closeDropdown();
    }
    if (changed.has('disabled') && this.isDisabled) this.#closeDropdown();
    if (changed.has('value')) this.value = this.getAttribute('value') ?? '';
    if (changed.has('clearable') || changed.has('disabled') || changed.has('readonly')) this.#syncClear();
  }

  #syncClear(): void {
    const readonly = this.getAttribute('readonly') !== null;
    this.clearBtn.hidden = !(this.clearable && this.#value !== '' && !this.isDisabled && !readonly);
  }

  #onKeydown(e: KeyboardEvent): void {
    if (this.isDisabled || this.getAttribute('readonly') !== null) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.#isOpen) this.#openDropdown();
        else this.#moveHighlight(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.#isOpen) this.#openDropdown();
        else this.#moveHighlight(-1);
        break;
      case 'Home':
        if (this.#isOpen) {
          e.preventDefault();
          this.#highlightAt(this.#edgeIndex(1));
        }
        break;
      case 'End':
        if (this.#isOpen) {
          e.preventDefault();
          this.#highlightAt(this.#edgeIndex(-1));
        }
        break;
      case 'Enter':
        if (this.#isOpen) {
          e.preventDefault();
          const item = this.#filtered[this.#highlighted];
          if (item) this.#selectItem(item);
        }
        break;
      case 'Escape':
        if (this.#isOpen) {
          e.preventDefault();
          this.#closeDropdown();
        }
        break;
    }
  }

  #openDropdown(): void {
    if (this.#isOpen || this.isDisabled || this.getAttribute('readonly') !== null) return;
    this.#isOpen = true;
    this.toggleAttribute('data-open', true);
    this.input.setAttribute('aria-expanded', 'true');
    this.#refreshFiltered();
    this.dropdown.showPopover();
    this.#cleanupPosition = autoPosition(this.field, this.dropdown, { matchWidth: true, offset: 4 });
    this.#cleanupDismiss = onDismiss([this], () => this.#closeDropdown());
  }

  #closeDropdown(): void {
    if (!this.#isOpen) return;
    this.#isOpen = false;
    this.toggleAttribute('data-open', false);
    this.input.setAttribute('aria-expanded', 'false');
    this.input.removeAttribute('aria-activedescendant');
    this.dropdown.hidePopover();
    this.#cleanupPosition?.();
    this.#cleanupPosition = undefined;
    this.#cleanupDismiss?.();
    this.#cleanupDismiss = undefined;
    this.#query = '';
    this.#syncInputText();
  }

  #refreshFiltered(): void {
    const q = this.searchable ? this.#query.trim().toLowerCase() : '';
    this.#filtered = q ? this.#items.filter((i) => i.label.toLowerCase().includes(q)) : this.#items;
    this.#renderDropdown();
    this.#highlightSelectedOrFirst();
  }

  #highlightSelectedOrFirst(): void {
    const idx = this.#filtered.findIndex((i) => i.value === this.#value);
    this.#highlightAt(idx !== -1 && !this.#filtered[idx].disabled ? idx : this.#edgeIndex(1));
  }

  #edgeIndex(dir: 1 | -1): number {
    const n = this.#filtered.length;
    for (let step = 0; step < n; step++) {
      const i = dir === 1 ? step : n - 1 - step;
      if (!this.#filtered[i].disabled) return i;
    }
    return -1;
  }

  #moveHighlight(dir: number): void {
    const n = this.#filtered.length;
    if (!n) return;
    let i = this.#highlighted;
    for (let step = 0; step < n; step++) {
      i = (i + dir + n) % n;
      if (!this.#filtered[i].disabled) {
        this.#highlightAt(i);
        return;
      }
    }
  }

  #highlightAt(i: number): void {
    this.#highlighted = i;
    for (const el of this.dropdown.querySelectorAll('.option')) el.classList.remove('highlighted');
    const el = i >= 0 ? this.dropdown.querySelector<HTMLElement>(`.option[data-index="${i}"]`) : null;
    if (el) {
      el.classList.add('highlighted');
      this.input.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    } else {
      this.input.removeAttribute('aria-activedescendant');
    }
  }

  #selectItem(item: Item): void {
    if (item.disabled) return;
    const next = this.#value === item.value && this.allowDeselect ? '' : item.value;
    this.value = next;
    this.emit('change', { value: next });
    this.#closeDropdown();
    this.input.focus();
  }

  #renderDropdown(): void {
    const dd = this.dropdown;
    dd.innerHTML = '';
    if (!this.#filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = this.nothingFound || 'Nothing found';
      dd.append(empty);
      return;
    }
    let lastGroup: string | undefined = '\u0000';
    this.#filtered.forEach((item, index) => {
      if (item.group !== lastGroup) {
        lastGroup = item.group;
        if (item.group) {
          const label = document.createElement('div');
          label.className = 'group-label';
          label.textContent = item.group;
          dd.append(label);
        }
      }
      const opt = document.createElement('div');
      opt.id = `opt-${index}`;
      opt.className = 'option' + (item.disabled ? ' disabled' : '');
      opt.setAttribute('role', 'option');
      opt.dataset.index = String(index);
      opt.setAttribute('aria-selected', String(item.value === this.#value));
      if (item.disabled) opt.setAttribute('aria-disabled', 'true');
      const check = document.createElement('span');
      check.className = 'check';
      check.setAttribute('aria-hidden', 'true');
      if (item.value === this.#value) check.innerHTML = ICON_CHECK;
      const label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = item.label;
      opt.append(check, label);
      opt.addEventListener('mousedown', (e) => e.preventDefault());
      opt.addEventListener('click', () => this.#selectItem(item));
      dd.append(opt);
    });
  }

  #syncInputText(): void {
    const item = this.#items.find((i) => i.value === this.#value);
    this.input.value = item ? item.label : '';
  }

  #readOptions(): void {
    const items: Item[] = [];
    const toItem = (opt: Element, group?: string): Item => ({
      value: opt.getAttribute('value') ?? opt.textContent?.trim() ?? '',
      label: opt.textContent?.trim() ?? '',
      disabled: opt.hasAttribute('disabled'),
      group,
    });
    for (const el of Array.from(this.children)) {
      if (el.tagName === 'OPTION') {
        items.push(toItem(el));
      } else if (el.tagName === 'OPTGROUP') {
        const group = el.getAttribute('label') || '';
        for (const opt of el.querySelectorAll(':scope > option')) items.push(toItem(opt, group));
      }
    }
    this.#items = items;
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.value = state;
  }
}

define('mt-select', MtSelect);
