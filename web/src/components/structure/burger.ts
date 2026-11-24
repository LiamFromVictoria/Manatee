import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --_size: 1.5rem;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  :host([size='xs']) { --_size: 0.75rem; }
  :host([size='sm']) { --_size: 1.125rem; }
  :host([size='md']) { --_size: 1.5rem; }
  :host([size='lg']) { --_size: 2.125rem; }
  :host([size='xl']) { --_size: 2.625rem; }

  .root {
    all: unset;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    padding: 0.5rem;
    border-radius: var(--mt-radius-default);
    cursor: pointer;
  }
  .root:hover { background: var(--mt-color-hover); }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }

  .box { position: relative; width: var(--_size); height: var(--_size); }
  .line {
    position: absolute;
    left: 0;
    right: 0;
    height: var(--_line-size, 0.125rem);
    background: var(--_color, var(--mt-color-text));
    border-radius: 1px;
    transition: transform var(--_duration, 300ms) ease, opacity var(--_duration, 300ms) ease, background var(--mt-transition);
  }
  .line-top { top: 15%; }
  .line-mid { top: 50%; transform: translateY(-50%); }
  .line-bot { bottom: 15%; }
  :host([opened]) .line-top { top: 50%; transform: translateY(-50%) rotate(45deg); }
  :host([opened]) .line-mid { opacity: 0; }
  :host([opened]) .line-bot { bottom: auto; top: 50%; transform: translateY(-50%) rotate(-45deg); }
`;

/**
 * <mt-burger opened size="xs|sm|md|lg|xl" color line-size transition-duration aria-label>
 * Toggles its own `opened` state on click and emits a bubbling `toggle` { opened }
 * CustomEvent. mt-app-shell listens for it to drive the mobile navbar drawer.
 */
export class MtBurger extends MtElement {
  static styles = [styles];
  static props: Props = {
    opened: { type: 'boolean' },
    size: { default: 'md' },
    color: { css: '--_color', scale: 'color' },
    lineSize: { css: '--_line-size', scale: 'rem' },
    transitionDuration: { type: 'number', default: 300 },
    ariaLabel: { attr: 'aria-label', default: 'Toggle navigation' },
  };

  declare opened: boolean;
  declare size: string;
  declare color: string | null;
  declare lineSize: string | null;
  declare transitionDuration: number;
  declare ariaLabel: string;

  protected template(): string {
    return html`
      <button class="root" part="root" type="button">
        <span class="box" part="box" aria-hidden="true">
          <span class="line line-top"></span>
          <span class="line line-mid"></span>
          <span class="line line-bot"></span>
        </span>
      </button>
    `;
  }

  protected setup(): void {
    this.$<HTMLButtonElement>('.root').addEventListener('click', () => {
      this.opened = !this.opened;
      this.emit('toggle', { opened: this.opened });
    });
  }

  protected update(changed: Set<string>): void {
    const button = this.$<HTMLButtonElement>('.root');
    if (changed.has('opened')) button.setAttribute('aria-expanded', String(this.opened));
    if (changed.has('ariaLabel')) button.setAttribute('aria-label', this.ariaLabel);
    if (changed.has('transitionDuration')) this.style.setProperty('--_duration', `${this.transitionDuration}ms`);
  }
}

define('mt-burger', MtBurger);
