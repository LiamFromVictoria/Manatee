import { css, define, html, MtElement, type Props } from '../../core';

const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="1rem" height="1rem"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

const styles = css`
  :host {
    display: block;
    --_bg: var(--mt-c-light);
    --_color: var(--mt-c-light-color);
    --_bd: transparent;
  }
  :host([variant='filled']) { --_bg: var(--mt-c-filled); --_color: var(--mt-white); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='default']) { --_bg: var(--mt-color-body); --_color: var(--mt-color-text); --_bd: var(--mt-color-border); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }

  .root {
    position: relative;
    display: flex;
    gap: var(--mt-spacing-sm);
    padding: var(--mt-spacing-md);
    background: var(--_bg);
    color: var(--_color);
    border: 1px solid var(--_bd);
    border-radius: var(--mt-radius-default);
  }
  .icon { display: none; flex: 0 0 auto; width: 1.25rem; height: 1.25rem; }
  .icon.filled { display: flex; align-items: center; }
  .body { flex: 1; min-width: 0; }
  .heading { margin: 0 0 0.25rem; font-weight: 700; font-size: var(--mt-font-size-md); line-height: 1.4; }
  .heading[hidden] { display: none; }
  .message { font-size: var(--mt-font-size-sm); line-height: var(--mt-line-height-sm); }
  .close {
    flex: 0 0 auto;
    display: none;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    margin-inline-start: auto;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: var(--mt-radius-default);
    cursor: pointer;
  }
  .close:hover { background: color-mix(in srgb, currentColor 12%, transparent); }
  .close:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([with-close-button]) .close { display: flex; }
`;

/**
 * <mt-alert variant="light|filled|outline|default|transparent|white" color heading
 *           with-close-button close-button-label>
 * Slots: default (message), icon.
 * Events: `close` (cancelable) before the alert self-hides.
 */
export class MtAlert extends MtElement {
  static styles = [styles];
  static props: Props = {
    variant: { default: 'light' },
    color: { color: true },
    heading: {},
    withCloseButton: { type: 'boolean' },
    closeButtonLabel: { default: 'Close alert' },
  };

  declare heading: string | null;
  declare closeButtonLabel: string;

  protected template(): string {
    return html`
      <div class="root" part="root" role="alert">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <div class="body" part="body">
          <p class="heading" part="heading" hidden></p>
          <div class="message" part="message"><slot></slot></div>
        </div>
        <button class="close" part="close-button" type="button" aria-label="Close alert"></button>
      </div>
    `;
  }

  protected setup(): void {
    const iconSlot = this.$<HTMLSlotElement>('.icon slot');
    const sync = () => iconSlot.parentElement!.classList.toggle('filled', iconSlot.assignedNodes().length > 0);
    iconSlot.addEventListener('slotchange', sync);
    sync();
    this.$<HTMLButtonElement>('.close').innerHTML = closeIcon;
    this.$<HTMLButtonElement>('.close').addEventListener('click', () => {
      if (this.emit('close')) this.hidden = true;
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('heading')) {
      const el = this.$<HTMLElement>('.heading');
      el.textContent = this.heading ?? '';
      el.hidden = !this.heading;
    }
    if (changed.has('closeButtonLabel')) {
      this.$<HTMLButtonElement>('.close').setAttribute('aria-label', this.closeButtonLabel);
    }
  }
}

define('mt-alert', MtAlert);
