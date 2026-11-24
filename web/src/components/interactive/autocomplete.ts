import {
  autoPosition,
  css,
  define,
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
  group?: string;
}

const ICON_CLEAR =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg>';

const styles = css`
  :host { position: relative; }
  :host([clearable]) .input { padding-inline-end: calc(var(--_height) * 1.1); }
  :host([loading]) .input { padding-inline-end: calc(var(--_height) * 1.1); }
  :host([clearable][loading]) .input { padding-inline-end: calc(var(--_height) * 1.7); }

  .section.right { width: auto; min-width: var(--_height); justify-content: flex-end; padding-inline-end: 0.5rem; gap: 0.25rem; }
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

  .loader { width: 1rem; height: 1rem; flex: none; border-radius: 50%; border: 0.125rem solid var(--mt-color-border); border-top-color: var(--mt-color-primary-filled); animation: mt-ac-spin 0.6s linear infinite; }
  .loader[hidden] { display: none; }
  @keyframes mt-ac-spin { to { transform: rotate(360deg); } }

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
    padding: 0.5rem;
    border-radius: var(--mt-radius-sm);
    font-size: var(--_fz);
    color: var(--mt-color-text);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .option.highlighted { background: var(--mt-color-hover); }
  .group-label { padding: 0.375rem 0.5rem 0.125rem; font-size: var(--mt-font-size-xs); font-weight: 600; color: var(--mt-color-dimmed); text-transform: uppercase; }
`;

/**
 * <mt-autocomplete label description error placeholder value name
 *                   required disabled readonly size radius variant="default|filled|unstyled"
 *                   limit max-dropdown-height clearable loading>
 * Children: light-DOM <option value> (and <optgroup label>), like a native
 * <select>, describe the suggestions; re-read on mutation. The input value is
 * free text and is not restricted to a suggestion.
 * Slots: label, description, error, left-section.
 * Events: native `input`, `option-submit` ({value}) on the host.
 */
export class MtAutocomplete extends MtFormElement {
  static styles = [wrapperStyles, inputStyles, styles];
  static props: Props = {
    ...MtFormElement.props,
    value: {},
    placeholder: {},
    variant: { default: 'default' },
    readonly: { type: 'boolean' },
    autofocus: { type: 'boolean' },
    clearable: { type: 'boolean' },
    loading: { type: 'boolean' },
    limit: { type: 'number' },
    maxDropdownHeight: { css: '--_max-dropdown-height', scale: 'rem', default: 250 },
  };

  declare clearable: boolean;
  declare loading: boolean;
  declare limit: number | null;

  #items: Item[] = [];
  #filtered: Item[] = [];
  #highlighted = -1;
  #isOpen = false;
  #cleanupPosition?: () => void;
  #cleanupDismiss?: () => void;
  #observer = new MutationObserver(() => {
    this.#readOptions();
    this.#refreshFiltered();
  });

  protected template(): string {
    return wrapperTemplate(html`
      <div class="field" part="field">
        <div class="section left" part="left-section"><slot name="left-section"></slot></div>
        <input id="control" class="input" part="input" type="text" role="combobox" aria-haspopup="listbox"
               aria-expanded="false" aria-controls="dropdown" aria-autocomplete="list" autocomplete="off" spellcheck="false" />
        <div class="section right" part="right-section">
          <span class="loader" part="loader" aria-hidden="true" hidden></span>
          <button type="button" class="clear" part="clear-button" aria-label="Clear value" tabindex="-1" hidden>${ICON_CLEAR}</button>
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
    return this.input.value;
  }
  set value(v: string | null) {
    this.input.value = v ?? '';
    this.setFormValue(this.input.value === '' ? null : this.input.value);
    this.#syncClear();
  }

  protected setup(): void {
    super.setup();
    this.#readOptions();
    this.#filtered = this.#items;

    this.#observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['value', 'label'], characterData: true });

    this.input.addEventListener('focus', () => this.#openDropdown());
    this.input.addEventListener('click', () => this.#openDropdown());
    this.input.addEventListener('blur', () => this.#closeDropdown());
    this.input.addEventListener('input', () => {
      this.setFormValue(this.input.value === '' ? null : this.input.value);
      this.#syncClear();
      if (!this.#isOpen) this.#openDropdown();
      else this.#refreshFiltered();
    });
    this.input.addEventListener('keydown', (e) => this.#onKeydown(e));

    this.clearBtn.addEventListener('mousedown', (e) => e.preventDefault());
    this.clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.isDisabled || this.getAttribute('readonly') !== null) return;
      this.value = '';
      this.input.focus();
      this.#refreshFiltered();
    });
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('placeholder')) {
      const ph = this.getAttribute('placeholder');
      if (ph) this.input.setAttribute('placeholder', ph);
      else this.input.removeAttribute('placeholder');
    }
    if (changed.has('autofocus')) this.input.toggleAttribute('autofocus', this.getAttribute('autofocus') !== null);
    if (changed.has('readonly')) {
      const readonly = this.getAttribute('readonly') !== null;
      this.input.readOnly = readonly;
      if (readonly) this.#closeDropdown();
    }
    if (changed.has('disabled') && this.isDisabled) this.#closeDropdown();
    if (changed.has('value')) this.value = this.getAttribute('value') ?? '';
    if (changed.has('loading')) this.$<HTMLElement>('.loader').hidden = !this.loading;
    if (changed.has('clearable') || changed.has('disabled') || changed.has('readonly')) this.#syncClear();
    if (changed.has('limit') && this.#isOpen) this.#refreshFiltered();
  }

  #syncClear(): void {
    const readonly = this.getAttribute('readonly') !== null;
    this.clearBtn.hidden = !(this.clearable && this.input.value !== '' && !this.isDisabled && !readonly);
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
      case 'Enter':
        if (this.#isOpen) {
          const item = this.#filtered[this.#highlighted];
          if (item) {
            e.preventDefault();
            this.#selectItem(item);
          }
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
    this.input.setAttribute('aria-expanded', 'true');
    this.#refreshFiltered();
    this.#cleanupDismiss = onDismiss([this], () => this.#closeDropdown());
  }

  #closeDropdown(): void {
    if (!this.#isOpen) return;
    this.#isOpen = false;
    this.input.setAttribute('aria-expanded', 'false');
    this.input.removeAttribute('aria-activedescendant');
    this.dropdown.hidePopover();
    this.#cleanupPosition?.();
    this.#cleanupPosition = undefined;
    this.#cleanupDismiss?.();
    this.#cleanupDismiss = undefined;
  }

  #refreshFiltered(): void {
    const q = this.input.value.trim().toLowerCase();
    let matches = q ? this.#items.filter((i) => i.label.toLowerCase().includes(q)) : this.#items;
    if (this.limit) matches = matches.slice(0, this.limit);
    this.#filtered = matches;
    if (!this.#filtered.length) {
      this.#closeDropdown();
      return;
    }
    if (!this.dropdown.matches(':popover-open')) {
      this.dropdown.showPopover();
      this.#cleanupPosition = autoPosition(this.field, this.dropdown, { matchWidth: true, offset: 4 });
    }
    this.#renderDropdown();
    this.#highlighted = -1;
  }

  #moveHighlight(dir: number): void {
    const n = this.#filtered.length;
    if (!n) return;
    this.#highlightAt((this.#highlighted + dir + n) % n);
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
    this.value = item.value;
    this.emit('option-submit', { value: item.value });
    this.#closeDropdown();
    this.input.focus();
  }

  #renderDropdown(): void {
    const dd = this.dropdown;
    dd.innerHTML = '';
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
      opt.id = `ac-opt-${index}`;
      opt.className = 'option';
      opt.setAttribute('role', 'option');
      opt.dataset.index = String(index);
      opt.textContent = item.label;
      opt.addEventListener('mousedown', (e) => e.preventDefault());
      opt.addEventListener('click', () => this.#selectItem(item));
      dd.append(opt);
    });
  }

  #readOptions(): void {
    const items: Item[] = [];
    const toItem = (opt: Element, group?: string): Item => {
      const value = opt.getAttribute('value') ?? opt.textContent?.trim() ?? '';
      return { value, label: opt.textContent?.trim() || value, group };
    };
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

define('mt-autocomplete', MtAutocomplete);
