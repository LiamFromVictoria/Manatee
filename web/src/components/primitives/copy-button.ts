import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: contents; }
`;

/**
 * <mt-copy-button value timeout>
 * Wraps any child button; clicking it copies `value` to the clipboard, sets
 * the `copied` attribute for `timeout` ms (default 1000) and emits `copy`.
 * Slots: default (normal state), copied (shown only while `copied`).
 */
export class MtCopyButton extends MtElement {
  static styles = [styles];
  static props: Props = {
    value: {},
    timeout: { type: 'number', default: 1000 },
  };

  declare value: string | null;
  declare timeout: number;

  #timer: number | undefined;

  protected template(): string {
    return html`<slot></slot><slot name="copied" hidden></slot>`;
  }

  protected setup(): void {
    this.addEventListener('click', () => this.#copy());
  }

  protected onDisconnect(): void {
    window.clearTimeout(this.#timer);
  }

  #copy(): void {
    if (!this.value || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(this.value)
      .then(() => {
        this.#setCopied(true);
        this.emit('copy', { value: this.value });
        window.clearTimeout(this.#timer);
        this.#timer = window.setTimeout(() => this.#setCopied(false), this.timeout || 1000);
      })
      .catch(() => {});
  }

  #setCopied(copied: boolean): void {
    this.toggleAttribute('copied', copied);
    this.$<HTMLSlotElement>('slot:not([name])').hidden = copied;
    this.$<HTMLSlotElement>('slot[name="copied"]').hidden = !copied;
  }
}

define('mt-copy-button', MtCopyButton);
