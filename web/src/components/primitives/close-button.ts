import { css, define, html, MtElement, type Props } from '../../core';

const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="60%" height="60%"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

const styles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --_size: 2.125rem;
    --_radius: var(--mt-radius-default);
    --_hover: var(--mt-c-light-hover);
    --_color: var(--mt-c-light-color);
  }
  :host([size='xs']) { --_size: 1.375rem; }
  :host([size='sm']) { --_size: 1.75rem; }
  :host([size='md']) { --_size: 2.125rem; }
  :host([size='lg']) { --_size: 2.75rem; }
  :host([size='xl']) { --_size: 3.75rem; }
  :host([variant='transparent']) { --_hover: transparent; }

  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    flex: 0 0 auto;
    padding: 0;
    color: var(--_color);
    background: transparent;
    border: 0;
    border-radius: var(--_radius);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .root:hover:not(:disabled) { background: var(--_hover); }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .root:disabled {
    color: var(--mt-color-disabled-color);
    cursor: not-allowed;
  }
`;

/**
 * <mt-close-button variant="subtle|transparent" color size radius disabled aria-label>
 * `aria-label` defaults to "Close".
 * Slot: default (replaces the X icon).
 */
export class MtCloseButton extends MtElement {
  static styles = [styles];
  static props: Props = {
    variant: { default: 'subtle' },
    color: { color: true, default: 'gray' },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius' },
    disabled: { type: 'boolean' },
    ariaLabel: { attr: 'aria-label' },
  };

  declare disabled: boolean;
  declare ariaLabel: string | null;

  protected template(): string {
    return html`<button class="root" part="root" type="button"><slot>${closeIcon}</slot></button>`;
  }

  protected update(): void {
    const root = this.$<HTMLButtonElement>('.root');
    root.disabled = this.disabled;
    root.setAttribute('aria-label', this.ariaLabel ?? 'Close');
  }
}

define('mt-close-button', MtCloseButton);
