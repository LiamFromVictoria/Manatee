import { autoPosition, colorVars, css, define, html, MtElement, type Placement, type Props, uid } from '../../core';

const styles = css`
  :host { display: contents; }
  .tooltip {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0.3125rem 0.625rem;
    max-width: var(--_w, 13.75rem);
    width: var(--_w, max-content);
    border: 0;
    border-radius: var(--mt-radius-default);
    background: var(--_bg, var(--mt-color-tooltip));
    color: var(--_fg, var(--mt-color-tooltip-color));
    font-size: var(--mt-font-size-xs);
    line-height: 1.4;
    white-space: var(--_ws, nowrap);
    word-break: break-word;
    pointer-events: none;
    z-index: var(--mt-z-tooltip);
  }
  .tooltip:not(:popover-open) { display: none; }

  .arrow {
    display: none;
    position: absolute;
    width: var(--_arrow, 0.625rem);
    height: var(--_arrow, 0.625rem);
    background: inherit;
    transform: rotate(45deg);
  }
  :host([with-arrow]) .arrow { display: block; }
  .tooltip[data-placement^='top'] .arrow { bottom: calc(var(--_arrow, 0.625rem) / -2); left: calc(50% - var(--_arrow, 0.625rem) / 2); }
  .tooltip[data-placement^='bottom'] .arrow { top: calc(var(--_arrow, 0.625rem) / -2); left: calc(50% - var(--_arrow, 0.625rem) / 2); }
  .tooltip[data-placement^='left'] .arrow { right: calc(var(--_arrow, 0.625rem) / -2); top: calc(50% - var(--_arrow, 0.625rem) / 2); }
  .tooltip[data-placement^='right'] .arrow { left: calc(var(--_arrow, 0.625rem) / -2); top: calc(50% - var(--_arrow, 0.625rem) / 2); }
`;

/**
 * <mt-tooltip label position offset with-arrow arrow-size color multiline w
 *             open-delay close-delay disabled opened>
 * Wraps its (single) light-DOM child, which is the hover/focus target.
 * Slots: default (target), label (overrides `label` attribute).
 */
export class MtTooltip extends MtElement {
  static styles = [styles];
  static props: Props = {
    label: {},
    position: { default: 'top' },
    offset: { type: 'number', default: 5 },
    withArrow: { type: 'boolean' },
    arrowSize: { css: '--_arrow', scale: 'rem', default: 4 },
    color: {},
    multiline: { type: 'boolean' },
    w: { css: '--_w', scale: 'rem' },
    openDelay: { type: 'number', default: 0 },
    closeDelay: { type: 'number', default: 0 },
    disabled: { type: 'boolean' },
    opened: { type: 'boolean' },
  };

  declare label: string | null;
  declare position: Placement;
  declare offset: number;
  declare withArrow: boolean;
  declare arrowSize: number;
  declare color: string | null;
  declare multiline: boolean;
  declare w: string | null;
  declare openDelay: number;
  declare closeDelay: number;
  declare disabled: boolean;
  declare opened: boolean;

  #cleanup: (() => void) | null = null;
  #timer = 0;
  #descId = uid('mt-tt');
  #visible = false;

  protected template(): string {
    return html`
      <slot></slot>
      <div class="tooltip" part="tooltip" role="tooltip" popover="manual" id="tip">
        <slot name="label"></slot>
        <div class="arrow" part="arrow"></div>
      </div>
    `;
  }

  get #target(): HTMLElement | null {
    return this.querySelector<HTMLElement>(':scope > :not([slot])');
  }

  get #tooltip(): HTMLElement {
    return this.$<HTMLElement>('.tooltip');
  }

  protected setup(): void {
    this.addEventListener('mouseenter', () => this.#schedule(true), true);
    this.addEventListener('mouseleave', () => this.#schedule(false), true);
    this.addEventListener('focusin', () => this.#schedule(true));
    this.addEventListener('focusout', () => this.#schedule(false));
    this.$<HTMLSlotElement>('slot[name="label"]').addEventListener('slotchange', () => this.#syncLabel());
    this.$<HTMLSlotElement>('slot:not([name])').addEventListener('slotchange', () => this.#syncTarget());
    this.#syncTarget();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('label')) this.#syncLabel();
    if (changed.has('color')) {
      const vars = this.color ? colorVars(this.color) : null;
      this.#tooltip.style.setProperty('--_bg', vars ? vars['--mt-c-filled'] : '');
      this.#tooltip.style.setProperty('--_fg', vars ? 'var(--mt-white)' : '');
    }
    if (changed.has('multiline')) this.#tooltip.style.setProperty('--_ws', this.multiline ? 'normal' : 'nowrap');
    if (changed.has('opened') || changed.has('disabled')) {
      if (this.disabled) this.#hide();
      else if (this.hasAttribute('opened')) this.#show();
      else this.#hide();
    }
  }

  #syncTarget(): void {
    this.#syncLabel();
    this.#syncDescription();
  }

  #syncLabel(): void {
    const slot = this.$<HTMLSlotElement>('slot[name="label"]');
    const text = slot.assignedNodes().length > 0 ? slot.assignedElements().map((n) => n.textContent).join('') : this.label ?? '';
    if (slot.assignedNodes().length === 0) {
      let span = this.$<HTMLElement>('.label-text');
      if (!span) {
        span = document.createElement('span');
        span.className = 'label-text';
        slot.appendChild(span);
      }
      span.textContent = text;
    }
    this.#syncDescription();
  }

  #syncDescription(): void {
    const target = this.#target;
    if (!target) return;
    const text = this.label ?? this.$<HTMLSlotElement>('slot[name="label"]').assignedElements().map((n) => n.textContent).join('');
    let desc = this.querySelector<HTMLElement>(':scope > [data-mt-tooltip-desc]');
    if (!text) {
      desc?.remove();
      target.removeAttribute('aria-describedby');
      return;
    }
    if (!desc) {
      desc = document.createElement('span');
      desc.setAttribute('data-mt-tooltip-desc', '');
      desc.setAttribute('slot', 'mt-tooltip-unused');
      desc.id = this.#descId;
      desc.hidden = true;
      this.appendChild(desc);
    }
    desc.textContent = text;
    target.setAttribute('aria-describedby', this.#descId);
  }

  #schedule(show: boolean): void {
    if (this.hasAttribute('opened') || this.disabled) return;
    clearTimeout(this.#timer);
    const delay = show ? this.openDelay : this.closeDelay;
    this.#timer = window.setTimeout(() => (show ? this.#show() : this.#hide()), delay);
  }

  #show(): void {
    if (this.#visible || this.disabled) return;
    const target = this.#target;
    if (!target) return;
    this.#visible = true;
    const tooltip = this.#tooltip;
    tooltip.showPopover();
    this.#cleanup?.();
    this.#cleanup = autoPosition(target, tooltip, { placement: this.position, offset: this.offset });
  }

  #hide(): void {
    if (!this.#visible) return;
    this.#visible = false;
    this.#cleanup?.();
    this.#cleanup = null;
    this.#tooltip.hidePopover();
  }
}
define('mt-tooltip', MtTooltip);
