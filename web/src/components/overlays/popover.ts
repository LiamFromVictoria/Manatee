import { autoPosition, css, define, html, MtElement, onDismiss, type Placement, type Props, rem, resolve } from '../../core';
import { ARROW_PROPS, floatingArrowStyles, floatingTransitionStyles, MtFloatingPanel, resolveTarget, TRANSITION_PROPS } from './floating-panel';

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
  }
`;

/** <mt-popover-dropdown>: the floating panel shown by an ancestor-managed <mt-popover>. */
export class MtPopoverDropdown extends MtFloatingPanel {
  static styles = [dropdownStyles, floatingArrowStyles, floatingTransitionStyles];

  protected template(): string {
    return html`<div class="dropdown" part="dropdown" popover="manual" role="dialog"><slot></slot><div class="arrow" part="arrow"></div></div>`;
  }
}

const styles = css`
  :host { display: contents; }
`;

/**
 * <mt-popover position offset width="target|<css>" disabled opened
 *             close-on-click-outside close-on-escape
 *             with-arrow arrow-size arrow-offset arrow-position="side|center"
 *             transition="fade|pop|scale-y|slide-down" transition-duration>
 * Children: one element with slot="target" (the trigger) and one
 * <mt-popover-dropdown> (the panel). Click toggles; events open/close.
 */
export class MtPopover extends MtElement {
  static styles = [styles];
  static props: Props = {
    position: { default: 'bottom' },
    offset: { type: 'number', default: 8 },
    width: {},
    disabled: { type: 'boolean' },
    opened: { type: 'boolean' },
    closeOnClickOutside: { type: 'boolean', default: true },
    closeOnEscape: { type: 'boolean', default: true },
    ...ARROW_PROPS,
    ...TRANSITION_PROPS,
  };

  declare position: Placement;
  declare offset: number;
  declare width: string | null;
  declare disabled: boolean;
  declare opened: boolean;
  declare closeOnClickOutside: boolean;
  declare closeOnEscape: boolean;
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

  protected template(): string {
    return html`<slot name="target"></slot><slot></slot>`;
  }

  get #target(): HTMLElement | null {
    return resolveTarget(this.querySelector<HTMLElement>(':scope > [slot="target"]'));
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
    dropdown.setAttribute('arrow-position', this.arrowPosition);
    dropdown.setAttribute('transition', this.transition);
    dropdown.box.style.setProperty('--_arrow', rem(this.arrowSize));
    dropdown.box.style.setProperty('--_arrow-offset', rem(this.arrowOffset));
    dropdown.box.style.setProperty('--_dur', `${this.transitionDuration}ms`);
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
