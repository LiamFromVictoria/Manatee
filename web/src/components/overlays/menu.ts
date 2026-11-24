import { autoPosition, colorVars, css, define, html, MtElement, onDismiss, type Placement, type Props, rem, resolve } from '../../core';
import { ARROW_PROPS, floatingArrowStyles, floatingTransitionStyles, MtFloatingPanel, resolveTarget, TRANSITION_PROPS } from './floating-panel';

/** <mt-menu-target>: optional wrapper marking the trigger when it isn't a single element with slot="target". */
export class MtMenuTarget extends MtElement {
  static styles = [css`:host { display: contents; }`];
}

const dropdownStyles = css`
  :host { display: contents; }
  .dropdown {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: calc(var(--mt-spacing-xs) / 2);
    min-width: 10rem;
    border: 1px solid var(--mt-color-border);
    border-radius: var(--mt-radius-default);
    background: var(--mt-color-dropdown);
    color: var(--mt-color-text);
    box-shadow: var(--mt-shadow-md);
    z-index: var(--mt-z-dropdown);
  }
  .init-focus { position: fixed; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
`;

/** <mt-menu-dropdown role="menu">: the floating panel for <mt-menu>. */
export class MtMenuDropdown extends MtFloatingPanel {
  static styles = [dropdownStyles, floatingArrowStyles, floatingTransitionStyles];

  protected template(): string {
    return html`<div class="dropdown" part="dropdown" popover="manual"><div class="init-focus" tabindex="-1"></div><slot></slot><div class="arrow" part="arrow"></div></div>`;
  }

  protected onConnect(): void {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'menu');
  }

  /** Mirrors Mantine's `withInitialFocusPlaceholder`: focused when the menu
   * opens so the first real item only gets a visible focus ring once the
   * user actually navigates with the keyboard. */
  focusInitial(): void {
    this.$<HTMLElement>('.init-focus').focus();
  }
}

const itemStyles = css`
  :host { display: block; }
  :host([hidden]) { display: none; }
  .control {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--mt-spacing-sm);
    padding: 0.5rem var(--mt-spacing-sm);
    border: 0;
    border-radius: calc(var(--mt-radius-default) - 0.0625rem);
    background: transparent;
    color: var(--_color, var(--mt-color-text));
    font: inherit;
    font-size: var(--mt-font-size-sm);
    text-align: start;
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .control:hover, :host(:focus-within) .control { background: var(--_hover, var(--mt-color-hover)); }
  :host([disabled]) .control { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .section { display: flex; align-items: center; flex: 0 0 auto; }
  .section:not(.filled) { display: none; }
  .label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

/**
 * <mt-menu-item role="menuitem" color disabled href target close-menu-on-click>
 * Slots: default (label), left-section, right-section.
 */
export class MtMenuItem extends MtElement {
  static styles = [itemStyles];
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static props: Props = {
    color: {},
    disabled: { type: 'boolean' },
    href: {},
    target: {},
  };

  declare color: string | null;
  declare disabled: boolean;
  declare href: string | null;
  declare target: string | null;

  protected template(): string {
    return html`
      <button class="control" part="control" type="button">
        <span class="section left" part="left-section"><slot name="left-section"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="section right" part="right-section"><slot name="right-section"></slot></span>
      </button>
    `;
  }

  protected onConnect(): void {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitem');
    this.tabIndex = -1;
  }

  protected setup(): void {
    for (const slot of this.root.querySelectorAll<HTMLSlotElement>('.section slot')) {
      const sync = () => slot.parentElement!.classList.toggle('filled', slot.assignedNodes().length > 0);
      slot.addEventListener('slotchange', sync);
      sync();
    }
    this.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      this.closest<MtMenu>('mt-menu')?.handleItemClick(this);
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('href')) this.#syncTag();
    const control = this.$<HTMLButtonElement | HTMLAnchorElement>('.control');
    if (control instanceof HTMLButtonElement) control.disabled = this.disabled;
    else control.toggleAttribute('aria-disabled', this.disabled);
    this.toggleAttribute('aria-disabled', this.disabled);
    if (changed.has('color')) {
      const vars = this.color ? colorVars(this.color) : null;
      this.style.setProperty('--_color', vars ? vars['--mt-c-text'] : '');
      this.style.setProperty('--_hover', vars ? vars['--mt-c-light-hover'] : '');
    }
    if (changed.has('target')) {
      if (this.target) control.setAttribute('target', this.target);
      else control.removeAttribute('target');
    }
  }

  /** Whether this item overrides the menu's close-on-item-click setting. */
  get closeMenuOnClickOverride(): boolean | undefined {
    if (!this.hasAttribute('close-menu-on-click')) return undefined;
    return this.getAttribute('close-menu-on-click') !== 'false';
  }

  focus(options?: FocusOptions): void {
    this.$<HTMLElement>('.control').focus(options);
  }

  /** Swap the inner control between <button> and <a> depending on href. */
  #syncTag(): void {
    const current = this.$('.control');
    const want = this.href ? 'A' : 'BUTTON';
    if (current.tagName === want) return;
    const next = document.createElement(want.toLowerCase());
    next.className = current.className;
    next.setAttribute('part', 'control');
    if (want === 'BUTTON') next.setAttribute('type', 'button');
    else next.setAttribute('href', this.href ?? '');
    next.append(...current.childNodes);
    current.replaceWith(next);
  }
}

const labelStyles = css`
  :host { display: block; padding: calc(var(--mt-spacing-xs) / 2) var(--mt-spacing-sm); font-size: var(--mt-font-size-xs); font-weight: 600; color: var(--mt-color-dimmed); }
`;

/** <mt-menu-label>: non-interactive section heading inside a menu dropdown. */
export class MtMenuLabel extends MtElement {
  static styles = [labelStyles];
  protected onConnect(): void {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'presentation');
  }
}

const dividerStyles = css`
  :host { display: block; margin: calc(var(--mt-spacing-xs) / 2) 0; border-top: 1px solid var(--mt-color-border); }
`;

/** <mt-menu-divider>: horizontal rule between menu items/groups. */
export class MtMenuDivider extends MtElement {
  static styles = [dividerStyles];
  protected onConnect(): void {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'separator');
  }
}

const menuStyles = css`
  :host { display: contents; }
`;

/**
 * <mt-menu trigger="click|hover|click-hover" position offset width disabled
 *          opened close-on-item-click loop>
 * Children: [slot="target"] or <mt-menu-target>, then <mt-menu-dropdown>
 * holding <mt-menu-item>/<mt-menu-label>/<mt-menu-divider>.
 * Keyboard: ArrowUp/Down, Home/End, Escape (closes + refocuses target).
 * Events: open, close.
 */
export class MtMenu extends MtElement {
  static styles = [menuStyles];
  static props: Props = {
    trigger: { default: 'click' },
    position: { default: 'bottom' },
    offset: { type: 'number', default: 8 },
    width: {},
    disabled: { type: 'boolean' },
    opened: { type: 'boolean' },
    closeOnItemClick: { type: 'boolean', default: true },
    loop: { type: 'boolean', default: true },
    ...ARROW_PROPS,
    ...TRANSITION_PROPS,
  };

  declare trigger: string;
  declare position: Placement;
  declare offset: number;
  declare width: string | null;
  declare disabled: boolean;
  declare opened: boolean;
  declare closeOnItemClick: boolean;
  declare loop: boolean;
  declare withArrow: boolean;
  declare arrowSize: number;
  declare arrowOffset: number;
  declare arrowPosition: string;
  declare transition: string;
  declare transitionDuration: number;

  #cleanup: (() => void) | null = null;
  #dismiss: (() => void) | null = null;
  #visible = false;
  #boundTarget: HTMLElement | null = null;
  #closeTimer = 0;

  protected template(): string {
    return html`<slot name="target"></slot><slot></slot>`;
  }

  get #target(): HTMLElement | null {
    return resolveTarget(this.querySelector<HTMLElement>(':scope > [slot="target"], :scope > mt-menu-target'));
  }
  get #dropdown(): MtMenuDropdown | null {
    return this.querySelector<MtMenuDropdown>(':scope > mt-menu-dropdown');
  }

  #onTargetClick = (): void => {
    if (this.disabled || this.trigger === 'hover') return;
    this.opened = !this.opened;
  };
  #onTargetEnter = (): void => {
    if (this.disabled || this.trigger === 'click') return;
    clearTimeout(this.#closeTimer);
    this.opened = true;
  };
  #onLeave = (e: MouseEvent): void => {
    if (this.disabled || this.trigger === 'click') return;
    const to = e.relatedTarget as Node | null;
    if (to && (this.#target?.contains(to) || this.#dropdown?.contains(to))) return;
    clearTimeout(this.#closeTimer);
    this.#closeTimer = window.setTimeout(() => (this.opened = false), 100);
  };

  #onDocKeydown = (e: KeyboardEvent): void => {
    const dropdown = this.#dropdown;
    if (!dropdown) return;
    const items = Array.from(dropdown.querySelectorAll<MtMenuItem>('mt-menu-item'));
    if (items.length === 0 && e.key !== 'Escape' && e.key !== 'Tab') return;
    const current = items.indexOf(document.activeElement as MtMenuItem);
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.#move(items, current, 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.#move(items, current, -1);
        break;
      case 'Home':
        e.preventDefault();
        items.find((it) => !it.disabled)?.focus();
        break;
      case 'End':
        e.preventDefault();
        [...items].reverse().find((it) => !it.disabled)?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        this.#target?.focus();
        break;
      case 'Tab':
        this.close();
        break;
    }
  };

  #move(items: MtMenuItem[], current: number, dir: 1 | -1): void {
    const n = items.length;
    let idx = current;
    for (let step = 0; step < n; step++) {
      idx += dir;
      if (idx < 0) idx = this.loop ? n - 1 : 0;
      if (idx >= n) idx = this.loop ? 0 : n - 1;
      if (!items[idx].disabled) {
        items[idx].focus();
        return;
      }
      if (idx === current) return;
    }
  }

  protected setup(): void {
    this.$<HTMLSlotElement>('slot[name="target"]').addEventListener('slotchange', () => this.#bindTarget());
    this.#bindTarget();
  }

  #bindTarget(): void {
    const target = this.#target;
    if (target === this.#boundTarget) return;
    this.#boundTarget?.removeEventListener('click', this.#onTargetClick);
    this.#boundTarget?.removeEventListener('mouseenter', this.#onTargetEnter);
    this.#boundTarget?.removeEventListener('mouseleave', this.#onLeave);
    target?.addEventListener('click', this.#onTargetClick);
    target?.addEventListener('mouseenter', this.#onTargetEnter);
    target?.addEventListener('mouseleave', this.#onLeave);
    if (target) {
      target.setAttribute('aria-haspopup', 'menu');
      target.setAttribute('aria-expanded', 'false');
    }
    this.#boundTarget = target;
  }

  protected update(changed: Set<string>): void {
    if (changed.has('opened') || changed.has('disabled')) {
      if (this.opened && !this.disabled) this.#show();
      else this.#hide();
    }
  }

  open(): void {
    this.opened = true;
  }
  close(): void {
    this.opened = false;
  }
  toggle(): void {
    this.opened = !this.opened;
  }

  /** Called by <mt-menu-item> on activation; closes unless overridden. */
  handleItemClick(item: MtMenuItem): void {
    const shouldClose = item.closeMenuOnClickOverride ?? this.closeOnItemClick;
    if (shouldClose) {
      this.close();
      this.#target?.focus();
    }
  }

  #show(): void {
    const target = this.#target;
    const dropdown = this.#dropdown;
    if (!target || !dropdown || this.#visible) return;
    this.#visible = true;
    target.setAttribute('aria-expanded', 'true');
    dropdown.toggleAttribute('with-arrow', this.withArrow);
    dropdown.setAttribute('arrow-position', this.arrowPosition);
    dropdown.setAttribute('transition', this.transition);
    dropdown.box.style.setProperty('--_arrow', rem(this.arrowSize));
    dropdown.box.style.setProperty('--_arrow-offset', rem(this.arrowOffset));
    dropdown.box.style.setProperty('--_dur', `${this.transitionDuration}ms`);
    dropdown.show();
    if (this.width && this.width !== 'target') dropdown.box.style.width = resolve('rem', this.width);
    this.#cleanup = autoPosition(target, dropdown.box, { placement: this.position, offset: this.offset, matchWidth: this.width === 'target' });
    this.#dismiss = onDismiss([this, dropdown], (reason) => {
      if (reason === 'outside') this.close();
    });
    document.addEventListener('keydown', this.#onDocKeydown);
    requestAnimationFrame(() => {
      dropdown.focusInitial();
    });
    this.emit('open');
  }

  #hide(): void {
    if (!this.#visible) return;
    this.#visible = false;
    this.#target?.setAttribute('aria-expanded', 'false');
    this.#cleanup?.();
    this.#cleanup = null;
    this.#dismiss?.();
    this.#dismiss = null;
    document.removeEventListener('keydown', this.#onDocKeydown);
    this.#dropdown?.hide();
    this.emit('close');
  }
}

define('mt-menu-target', MtMenuTarget);
define('mt-menu-dropdown', MtMenuDropdown);
define('mt-menu-item', MtMenuItem);
define('mt-menu-label', MtMenuLabel);
define('mt-menu-divider', MtMenuDivider);
define('mt-menu', MtMenu);
