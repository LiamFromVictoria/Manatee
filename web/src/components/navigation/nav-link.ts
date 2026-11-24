import { css, define, html, MtElement, type Props } from '../../core';

const CHEVRON_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

/**
 * <mt-nav-link label description active variant="light|filled|subtle" color
 *              href target disabled no-wrap opened children-offset>
 * Slots: label, description, left-section, right-section, default (nested mt-nav-link children).
 * Right-section falls back to an auto chevron when the link has nested mt-nav-link children.
 * Events: `change` { opened } when the nested children area is toggled.
 */
const styles = css`
  :host { display: block; --_children-offset: var(--mt-spacing-lg); }
  .control {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--mt-spacing-sm);
    padding: var(--mt-spacing-xs) var(--mt-spacing-sm);
    border-radius: var(--mt-radius-default);
    color: var(--mt-color-text);
    text-decoration: none;
    font: inherit;
    font-size: var(--mt-font-size-sm);
    background: transparent;
    border: 0;
    text-align: start;
    cursor: pointer;
  }
  .control:hover { background: var(--mt-color-hover); }
  .control:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; }
  :host([active]) .control { background: var(--mt-c-light); color: var(--mt-c-light-color); }
  :host([active]) .control:hover { background: var(--mt-c-light-hover); }
  :host([variant='filled'][active]) .control { background: var(--mt-c-filled); color: var(--mt-white); }
  :host([variant='filled'][active]) .control:hover { background: var(--mt-c-filled-hover); }
  :host([variant='subtle'][active]) .control { background: transparent; color: var(--mt-c-text); }
  :host([disabled]) .control { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  :host([disabled]) .control:hover { background: transparent; }

  .section { display: none; align-items: center; color: var(--mt-color-dimmed); }
  .section.show { display: flex; }
  :host([active]) .section.left { color: inherit; }

  .body { flex: 1; min-width: 0; }
  .label { display: block; font-weight: 500; }
  :host([no-wrap]) .label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .description { display: block; font-size: var(--mt-font-size-xs); color: var(--mt-color-dimmed); }
  .description[hidden] { display: none; }

  .chevron svg { display: block; transition: transform var(--mt-transition); }
  :host([opened]) .chevron svg { transform: rotate(90deg); }

  .children { padding-inline-start: var(--_children-offset); display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--mt-transition); }
  :host([opened]) .children { grid-template-rows: 1fr; }
  .children-inner { overflow: hidden; min-height: 0; }
`;

export class MtNavLink extends MtElement {
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [styles];
  static props: Props = {
    label: {},
    description: {},
    active: { type: 'boolean' },
    variant: { default: 'light' },
    color: { color: true },
    href: {},
    target: {},
    disabled: { type: 'boolean' },
    noWrap: { type: 'boolean' },
    opened: { type: 'boolean' },
    childrenOffset: { css: '--_children-offset', scale: 'spacing', default: 'lg' },
  };

  declare label: string | null;
  declare description: string | null;
  declare active: boolean;
  declare variant: string;
  declare color: string | null;
  declare href: string | null;
  declare target: string | null;
  declare disabled: boolean;
  declare noWrap: boolean;
  declare opened: boolean;

  #hasChildren = false;

  protected template(): string {
    return html`
      <div class="root" part="root">
        <a class="control" part="control" id="control">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="body" part="body">
            <span class="label" part="label"><slot name="label"><span class="label-text"></span></slot></span>
            <span class="description" part="description" hidden><slot name="description"><span class="description-text"></span></slot></span>
          </span>
          <span class="section right" part="right-section">
            <slot name="right-section"><span class="chevron" part="chevron" aria-hidden="true">${CHEVRON_SVG}</span></slot>
          </span>
        </a>
        <div class="children" part="children"><div class="children-inner"><slot></slot></div></div>
      </div>
    `;
  }

  protected setup(): void {
    const leftSlot = this.root.querySelector<HTMLSlotElement>('slot[name="left-section"]');
    const syncLeft = () => leftSlot?.parentElement?.classList.toggle('show', (leftSlot?.assignedNodes().length ?? 0) > 0);
    leftSlot?.addEventListener('slotchange', syncLeft);
    syncLeft();
    const rightSlot = this.root.querySelector<HTMLSlotElement>('slot[name="right-section"]');
    rightSlot?.addEventListener('slotchange', () => this.#syncRightVisibility());

    for (const name of ['label', 'description']) {
      const slot = this.root.querySelector<HTMLSlotElement>(`slot[name="${name}"]`);
      slot?.addEventListener('slotchange', () => this.#syncText());
    }
    this.root.querySelector('.children slot')!.addEventListener('slotchange', () => this.#syncChildren());
    this.#syncText();
    this.#syncChildren();

    this.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      if (this.#hasChildren) {
        this.opened = !this.opened;
        this.emit('change', { opened: this.opened });
      }
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('href')) this.#syncTag();
    const control = this.$('.control');
    if (control instanceof HTMLAnchorElement) {
      if (this.href) control.setAttribute('href', this.href);
      if (this.target) control.setAttribute('target', this.target);
      else control.removeAttribute('target');
    }
    control.toggleAttribute('aria-disabled', this.disabled);
    control.tabIndex = this.disabled ? -1 : 0;
    if (changed.has('label') || changed.has('description')) this.#syncText();
    if (changed.has('opened') && this.#hasChildren) this.setAttribute('aria-expanded', String(this.opened));
    this.#syncRightVisibility();
  }

  #syncText(): void {
    const has = (slot: string, value: string | null) => !!value || !!this.querySelector(`:scope > [slot="${slot}"]`);
    const labelText = this.$('.label-text');
    if (labelText) labelText.textContent = this.label ?? '';
    const descText = this.$('.description-text');
    if (descText) descText.textContent = this.description ?? '';
    const descWrap = this.$('.description');
    descWrap.hidden = !has('description', this.description);
  }

  #syncChildren(): void {
    this.#hasChildren = [...this.children].some((c) => c.tagName === 'MT-NAV-LINK');
    if (!this.#hasChildren) this.opened = false;
    if (this.#hasChildren) this.setAttribute('aria-expanded', String(this.opened));
    else this.removeAttribute('aria-expanded');
    this.#syncRightVisibility();
  }

  #syncRightVisibility(): void {
    const rightSlot = this.root.querySelector<HTMLSlotElement>('slot[name="right-section"]');
    const filled = (rightSlot?.assignedNodes().length ?? 0) > 0;
    rightSlot?.parentElement?.classList.toggle('show', filled || this.#hasChildren);
  }

  #syncTag(): void {
    const current = this.$('.control');
    const want = this.href ? 'A' : 'BUTTON';
    if (current.tagName === want) return;
    const next = document.createElement(want.toLowerCase());
    next.className = current.className;
    next.id = 'control';
    next.setAttribute('part', 'control');
    if (want === 'BUTTON') next.setAttribute('type', 'button');
    next.append(...current.childNodes);
    current.replaceWith(next);
  }
}

define('mt-nav-link', MtNavLink);
