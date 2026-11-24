import { css, define, html, MtElement, uid, type Props } from '../../core';

/**
 * <mt-tabs value variant="default|outline|pills" orientation="horizontal|vertical"
 *          placement="left|right" color radius inverted keep-mounted
 *          activate-tab-with-keyboard allow-tab-deactivation>
 * Children: <mt-tabs-list> of <mt-tab>, followed by <mt-tabs-panel> elements.
 * Events: `change` { value } when the active tab changes.
 */
const tabsStyles = css`
  :host { display: flex; flex-direction: column; }
  :host([orientation='vertical']) { flex-direction: row; align-items: flex-start; }
  :host([orientation='vertical'][placement='right']) { flex-direction: row-reverse; }
  :host([orientation='vertical']) ::slotted(mt-tabs-panel) { flex: 1; min-width: 0; }
`;

export class MtTabs extends MtElement {
  static styles = [tabsStyles];
  static props: Props = {
    value: {},
    variant: { default: 'default' },
    orientation: { default: 'horizontal' },
    placement: { default: 'left' },
    color: { color: true },
    radius: { css: '--_radius', scale: 'radius' },
    inverted: { type: 'boolean' },
    keepMounted: { type: 'boolean', default: true },
    activateTabWithKeyboard: { type: 'boolean', default: true },
    allowTabDeactivation: { type: 'boolean' },
  };

  declare value: string | null;
  declare variant: string;
  declare orientation: string;
  declare placement: string;
  declare color: string | null;
  declare inverted: boolean;
  declare keepMounted: boolean;
  declare activateTabWithKeyboard: boolean;
  declare allowTabDeactivation: boolean;

  #resolved: string | null = null;
  #hasSynced = false;
  #detached = new WeakMap<Element, DocumentFragment>();

  protected setup(): void {
    this.addEventListener('tabs-activate', (e) => {
      const value = (e as CustomEvent<{ value: string | null }>).detail.value;
      this.#select(value);
    });
  }

  protected update(): void {
    this.#sync();
  }

  #select(value: string | null): void {
    const active = this.#resolved;
    if (value === active) {
      if (this.allowTabDeactivation) this.value = null;
      return;
    }
    this.value = value;
  }

  #sync(): void {
    const tabs = [...this.querySelectorAll<MtTab>(':scope > mt-tabs-list > mt-tab')];
    const panels = [...this.querySelectorAll<MtTabsPanel>(':scope > mt-tabs-panel')];

    let current = this.getAttribute('value');
    if (current === null) {
      const first = tabs.find((t) => !t.hasAttribute('disabled'));
      current = first?.getAttribute('value') ?? null;
    }
    const changed = current !== this.#resolved;
    this.#resolved = current;

    const list = this.querySelector(':scope > mt-tabs-list');
    if (list) {
      list.setAttribute('data-variant', this.variant);
      list.setAttribute('data-orientation', this.orientation);
      list.setAttribute('data-placement', this.placement);
      list.toggleAttribute('data-inverted', this.inverted);
      list.setAttribute('aria-orientation', this.orientation);
    }

    for (const tab of tabs) {
      const value = tab.getAttribute('value');
      const active = value !== null && value === current;
      const panel = panels.find((p) => p.getAttribute('value') === value);
      if (panel) {
        if (!panel.id) panel.id = uid('tabpanel');
        if (!tab.id) tab.id = uid('tab');
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('data-variant', this.variant);
      tab.setAttribute('data-placement', this.placement);
      tab.setAttribute('data-orientation', this.orientation);
      tab.toggleAttribute('active', active);
    }

    for (const panel of panels) {
      const value = panel.getAttribute('value');
      const active = value !== null && value === current;
      panel.hidden = !active;
      if (!this.keepMounted) {
        if (!active && panel.childNodes.length && !this.#detached.has(panel)) {
          const frag = document.createDocumentFragment();
          frag.append(...panel.childNodes);
          this.#detached.set(panel, frag);
        } else if (active) {
          const frag = this.#detached.get(panel);
          if (frag) {
            panel.append(frag);
            this.#detached.delete(panel);
          }
        }
      }
    }

    if (changed && this.#hasSynced) this.emit('change', { value: current });
    this.#hasSynced = true;
  }
}

const listStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: 0;
    border-bottom: 1px solid var(--mt-color-border);
    justify-content: var(--_justify, flex-start);
  }
  :host([data-orientation='vertical']) {
    flex-direction: column;
    border-bottom: 0;
    border-right: 1px solid var(--mt-color-border);
    align-self: stretch;
  }
  :host([data-orientation='vertical'][data-placement='right']) { border-right: 0; border-left: 1px solid var(--mt-color-border); }
  :host([data-variant='pills']) { border: 0; gap: var(--mt-spacing-xs); }
  :host([data-inverted]:not([data-orientation='vertical'])) { border-bottom: 0; border-top: 1px solid var(--mt-color-border); }
  ::slotted(mt-tab) { flex: 0 0 auto; }
  :host([grow]) ::slotted(mt-tab) { flex: 1; }
`;

export class MtTabsList extends MtElement {
  static styles = [listStyles];
  static props: Props = {
    grow: { type: 'boolean' },
    justify: { css: '--_justify' },
  };

  declare grow: boolean;
  declare justify: string | null;

  protected setup(): void {
    this.setAttribute('role', 'tablist');
    this.addEventListener('keydown', (e) => this.#onKeydown(e));
  }

  #onKeydown(e: KeyboardEvent): void {
    const target = (e.target as HTMLElement).closest('mt-tab');
    if (!target) return;
    const tabs = [...this.querySelectorAll(':scope > mt-tab')].filter((t) => !t.hasAttribute('disabled'));
    const idx = tabs.indexOf(target);
    if (idx < 0) return;
    const vertical = this.getAttribute('data-orientation') === 'vertical';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    let next: Element | null = null;
    if (e.key === nextKey) next = tabs[(idx + 1) % tabs.length];
    else if (e.key === prevKey) next = tabs[(idx - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;
    e.preventDefault();
    (next as HTMLElement).focus();
    const tabsEl = this.closest<MtTabs>('mt-tabs');
    if (tabsEl?.activateTabWithKeyboard !== false) {
      next.dispatchEvent(new CustomEvent('tabs-activate', { bubbles: true, composed: true, detail: { value: next.getAttribute('value') } }));
    }
  }
}

const tabStyles = css`
  :host { display: inline-flex; }
  :host([data-orientation='vertical']) { display: flex; width: 100%; }
  .tab {
    display: flex;
    align-items: center;
    gap: var(--mt-spacing-xs);
    width: 100%;
    height: 2.25rem;
    padding-inline: var(--mt-spacing-md);
    font: inherit;
    font-size: var(--mt-font-size-sm);
    font-weight: 500;
    color: var(--mt-color-text);
    background: transparent;
    border: 0;
    border-radius: var(--_radius, var(--mt-radius-default));
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
  }
  .tab:hover { background: var(--mt-color-hover); }
  .tab:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; }
  :host([data-variant='default']) .tab { border-radius: 0; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  :host([data-variant='default'][active]) .tab { border-color: var(--mt-c-filled); color: var(--mt-c-filled); }
  :host([data-variant='default'][data-orientation='vertical']) .tab { border-bottom: 0; border-right: 2px solid transparent; margin-bottom: 0; margin-right: -1px; }
  :host([data-variant='default'][data-orientation='vertical'][data-placement='right']) .tab { border-right: 0; border-left: 2px solid transparent; margin-right: 0; margin-left: -1px; }
  :host([data-variant='outline']) .tab { border: 1px solid transparent; border-bottom: 0; border-radius: var(--_radius, var(--mt-radius-default)) var(--_radius, var(--mt-radius-default)) 0 0; margin-bottom: -1px; }
  :host([data-variant='outline'][active]) .tab { border-color: var(--mt-color-border); background: var(--mt-color-body); }
  :host([data-variant='outline'][data-orientation='vertical']) .tab { border-radius: var(--_radius, var(--mt-radius-default)) 0 0 var(--_radius, var(--mt-radius-default)); border-bottom: 1px solid transparent; border-right: 0; margin-bottom: 0; margin-right: -1px; }
  :host([data-variant='outline'][data-orientation='vertical'][active]) .tab { border-right-color: var(--mt-color-body); }
  :host([data-variant='outline'][data-orientation='vertical'][data-placement='right']) .tab { border-radius: 0 var(--_radius, var(--mt-radius-default)) var(--_radius, var(--mt-radius-default)) 0; border-left: 0; margin-right: 0; margin-left: -1px; }
  :host([data-variant='outline'][data-orientation='vertical'][data-placement='right'][active]) .tab { border-left-color: var(--mt-color-body); border-right-color: var(--mt-color-border); }
  :host([data-variant='pills']) .tab { border-radius: var(--_radius, var(--mt-radius-default)); }
  :host([data-variant='pills'][active]) .tab { background: var(--mt-c-filled); color: var(--mt-white); }
  :host([disabled]) .tab { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .section { display: flex; align-items: center; }
  .section:not(.filled) { display: none; }
`;

export class MtTab extends MtElement {
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [tabStyles];
  static props: Props = {
    value: {},
    disabled: { type: 'boolean' },
    active: { type: 'boolean' },
    color: { color: true },
    href: {},
    target: {},
  };

  declare value: string | null;
  declare disabled: boolean;
  declare active: boolean;
  declare color: string | null;
  declare href: string | null;
  declare target: string | null;

  protected template(): string {
    return html`
      <button class="tab" part="tab" type="button">
        <span class="section left"><slot name="left-section"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="section right"><slot name="right-section"></slot></span>
      </button>
    `;
  }

  protected setup(): void {
    for (const slot of this.root.querySelectorAll<HTMLSlotElement>('.section slot')) {
      const sync = () => slot.parentElement!.classList.toggle('filled', slot.assignedNodes().length > 0);
      slot.addEventListener('slotchange', sync);
      sync();
    }
    this.setAttribute('role', 'tab');
    this.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      if (this.href) return;
      this.dispatchEvent(new CustomEvent('tabs-activate', { bubbles: true, composed: true, detail: { value: this.value } }));
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('href')) this.#syncTag();
    this.setAttribute('aria-selected', this.active ? 'true' : 'false');
    this.tabIndex = this.active ? 0 : -1;
    this.toggleAttribute('aria-disabled', this.disabled);
    const el = this.$('.tab');
    if (el instanceof HTMLButtonElement) {
      el.disabled = this.disabled;
    } else {
      if (this.href) el.setAttribute('href', this.href);
      if (this.target) el.setAttribute('target', this.target);
      else el.removeAttribute('target');
      el.toggleAttribute('aria-disabled', this.disabled);
    }
  }

  #syncTag(): void {
    const current = this.$('.tab');
    const want = this.href ? 'A' : 'BUTTON';
    if (current.tagName === want) return;
    const next = document.createElement(want.toLowerCase());
    next.className = current.className;
    next.setAttribute('part', 'tab');
    if (want === 'BUTTON') next.setAttribute('type', 'button');
    next.append(...current.childNodes);
    current.replaceWith(next);
  }
}

const panelStyles = css`
  :host { display: block; }
  .panel { padding-top: var(--mt-spacing-md); }
  :host([data-orientation='vertical']) .panel { padding-top: 0; padding-left: var(--mt-spacing-md); }
`;

export class MtTabsPanel extends MtElement {
  static styles = [panelStyles];
  static props: Props = { value: {} };

  declare value: string | null;

  protected template(): string {
    return '<div class="panel" part="panel"><slot></slot></div>';
  }

  protected setup(): void {
    this.setAttribute('role', 'tabpanel');
    this.tabIndex = 0;
  }
}

define('mt-tabs', MtTabs);
define('mt-tabs-list', MtTabsList);
define('mt-tab', MtTab);
define('mt-tabs-panel', MtTabsPanel);
