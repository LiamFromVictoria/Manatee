import { autoPosition, css, define, html, MtElement, onDismiss, type Placement, type Props, resolve } from '../../core';

const dropdownStyles = css`
  :host { display: contents; }
  .dropdown {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: var(--mt-spacing-md);
    border: 1px solid var(--mt-color-border);
    border-radius: var(--mt-radius-default);
    background: var(--mt-color-dropdown);
    color: var(--mt-color-text);
    box-shadow: var(--mt-shadow-md);
    z-index: var(--mt-z-popover);
    opacity: 0;
    transform: scale(0.9);
    transition: opacity var(--mt-transition), transform var(--mt-transition);
  }
  .dropdown:popover-open { opacity: 1; transform: scale(1); }
  .dropdown:not(:popover-open) { display: none; }

  .arrow { display: none; position: absolute; width: 0.625rem; height: 0.625rem; background: inherit; border: inherit; transform: rotate(45deg); }
  :host([with-arrow]) .arrow { display: block; }
  .dropdown[data-placement^='top'] .arrow { bottom: -0.3125rem; left: calc(50% - 0.3125rem); border-top: 0; border-left: 0; }
  .dropdown[data-placement^='bottom'] .arrow { top: -0.3125rem; left: calc(50% - 0.3125rem); border-bottom: 0; border-right: 0; }
  .dropdown[data-placement^='left'] .arrow { right: -0.3125rem; top: calc(50% - 0.3125rem); border-bottom: 0; border-left: 0; }
  .dropdown[data-placement^='right'] .arrow { left: -0.3125rem; top: calc(50% - 0.3125rem); border-top: 0; border-right: 0; }
`;

/** <mt-popover-dropdown>: the floating panel shown by an ancestor-managed <mt-popover>. */
export class MtPopoverDropdown extends MtElement {
  static styles = [dropdownStyles];

  protected template(): string {
    return html`<div class="dropdown" part="dropdown" popover="manual" role="dialog"><slot></slot><div class="arrow" part="arrow"></div></div>`;
  }

  /** The positioned floating box; used by <mt-popover> for autoPosition(). */
  get box(): HTMLElement {
    return this.$<HTMLElement>('.dropdown');
  }

  show(): void {
    this.box.showPopover();
  }
  hide(): void {
    if (this.box.matches(':popover-open')) this.box.hidePopover();
  }
}

const styles = css`
  :host { display: contents; }
`;

/**
 * <mt-popover position offset with-arrow width="target|<css>" disabled opened
 *             close-on-click-outside close-on-escape>
 * Children: one element with slot="target" (the trigger) and one
 * <mt-popover-dropdown> (the panel). Click toggles; events open/close.
 */
export class MtPopover extends MtElement {
  static styles = [styles];
  static props: Props = {
    position: { default: 'bottom' },
    offset: { type: 'number', default: 8 },
    withArrow: { type: 'boolean' },
    width: {},
    disabled: { type: 'boolean' },
    opened: { type: 'boolean' },
    closeOnClickOutside: { type: 'boolean', default: true },
    closeOnEscape: { type: 'boolean', default: true },
  };

  declare position: Placement;
  declare offset: number;
  declare withArrow: boolean;
  declare width: string | null;
  declare disabled: boolean;
  declare opened: boolean;
  declare closeOnClickOutside: boolean;
  declare closeOnEscape: boolean;

  #cleanup: (() => void) | null = null;
  #dismiss: (() => void) | null = null;
  #visible = false;
  #boundTarget: HTMLElement | null = null;

  protected template(): string {
    return html`<slot name="target"></slot><slot></slot>`;
  }

  get #target(): HTMLElement | null {
    return this.querySelector<HTMLElement>(':scope > [slot="target"]');
  }
  get #dropdown(): MtPopoverDropdown | null {
    return this.querySelector<MtPopoverDropdown>(':scope > mt-popover-dropdown');
  }

  #onTargetClick = (): void => {
    if (this.disabled) return;
    this.opened = !this.opened;
  };

  protected setup(): void {
    this.$<HTMLSlotElement>('slot[name="target"]').addEventListener('slotchange', () => this.#bindTarget());
    this.#bindTarget();
  }

  #bindTarget(): void {
    const target = this.#target;
    if (target === this.#boundTarget) return;
    this.#boundTarget?.removeEventListener('click', this.#onTargetClick);
    target?.addEventListener('click', this.#onTargetClick);
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

  #show(): void {
    const target = this.#target;
    const dropdown = this.#dropdown;
    if (!target || !dropdown || this.#visible) return;
    this.#visible = true;
    dropdown.toggleAttribute('with-arrow', this.withArrow);
    dropdown.show();
    if (this.width && this.width !== 'target') dropdown.box.style.width = resolve('rem', this.width);
    this.#cleanup = autoPosition(target, dropdown.box, { placement: this.position, offset: this.offset, matchWidth: this.width === 'target' });
    this.#dismiss = onDismiss([this, dropdown], (reason) => {
      if (reason === 'outside' && !this.closeOnClickOutside) return;
      if (reason === 'escape' && !this.closeOnEscape) return;
      this.close();
    });
    requestAnimationFrame(() => {
      dropdown.querySelector<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]')?.focus();
    });
    this.emit('open');
  }

  #hide(): void {
    if (!this.#visible) return;
    this.#visible = false;
    this.#cleanup?.();
    this.#cleanup = null;
    this.#dismiss?.();
    this.#dismiss = null;
    this.#dropdown?.hide();
    this.emit('close');
  }
}

define('mt-popover-dropdown', MtPopoverDropdown);
define('mt-popover', MtPopover);
