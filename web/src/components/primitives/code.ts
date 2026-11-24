import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: inline; }
  :host([block]) { display: block; }

  .root {
    display: inline;
    font-family: var(--mt-font-family-monospace);
    font-size: var(--mt-font-size-xs);
    background: var(--mt-color-code-bg);
    color: inherit;
    border-radius: var(--mt-radius-sm);
    padding: 0.125em 0.4em;
  }
  :host([color]) .root { background: var(--mt-c-light); color: var(--mt-c-light-color); }

  :host([block]) .root {
    display: block;
    padding: var(--mt-spacing-sm);
    overflow-x: auto;
    white-space: pre;
    border-radius: var(--mt-radius-sm);
  }
`;

/**
 * <mt-code color block>
 * Inline by default; `block` renders a scrollable block of code.
 * Slot: default.
 */
export class MtCode extends MtElement {
  static styles = [styles];
  static props: Props = {
    color: { color: true },
    block: { type: 'boolean' },
  };

  protected template(): string {
    return html`<code class="root" part="root"><slot></slot></code>`;
  }
}

define('mt-code', MtCode);
