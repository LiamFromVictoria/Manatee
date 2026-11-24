import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_fz: var(--mt-h1-font-size);
    --_lh: var(--mt-h1-line-height);
    font-family: var(--mt-font-family-headings);
    font-weight: var(--mt-heading-font-weight);
    color: var(--mt-color-text);
  }
  :host([order='2']) { --_fz: var(--mt-h2-font-size); --_lh: var(--mt-h2-line-height); }
  :host([order='3']) { --_fz: var(--mt-h3-font-size); --_lh: var(--mt-h3-line-height); }
  :host([order='4']) { --_fz: var(--mt-h4-font-size); --_lh: var(--mt-h4-line-height); }
  :host([order='5']) { --_fz: var(--mt-h5-font-size); --_lh: var(--mt-h5-line-height); }
  :host([order='6']) { --_fz: var(--mt-h6-font-size); --_lh: var(--mt-h6-line-height); }

  .root {
    margin: 0;
    font: inherit;
    font-size: var(--_fz);
    line-height: var(--_lh);
    color: var(--_color, inherit);
    text-align: var(--_ta, inherit);
    text-wrap: var(--_text-wrap, balance);
  }
  :host([line-clamp]) .root {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--_clamp, 3);
    overflow: hidden;
  }
`;

const SIZE_VAR: Record<string, string> = {
  h1: '--mt-h1-font-size',
  h2: '--mt-h2-font-size',
  h3: '--mt-h3-font-size',
  h4: '--mt-h4-font-size',
  h5: '--mt-h5-font-size',
  h6: '--mt-h6-font-size',
};
const LH_VAR: Record<string, string> = {
  h1: '--mt-h1-line-height',
  h2: '--mt-h2-line-height',
  h3: '--mt-h3-line-height',
  h4: '--mt-h4-line-height',
  h5: '--mt-h5-line-height',
  h6: '--mt-h6-line-height',
};

/**
 * <mt-title order="1..6" size c ta text-wrap line-clamp>
 * Renders a real h1..h6 in the shadow DOM. `size` overrides the visual size
 * independently of the semantic `order` (accepts h1..h6 or a raw CSS length).
 * Slot: default.
 */
export class MtTitle extends MtElement {
  static styles = [styles];
  static props: Props = {
    order: { type: 'number', default: 1 },
    size: {},
    c: { css: '--_color', scale: 'color' },
    ta: { css: '--_ta' },
    textWrap: { css: '--_text-wrap' },
    lineClamp: { css: '--_clamp', type: 'number' },
  };

  declare order: number;
  declare size: string | null;

  protected template(): string {
    return html`<h1 class="root" part="root"><slot></slot></h1>`;
  }

  protected update(changed: Set<string>): void {
    if (changed.has('order')) this.#syncTag();
    if (changed.has('size') || changed.has('order')) this.#syncSize();
  }

  #syncTag(): void {
    const n = Math.min(6, Math.max(1, Math.round(this.order) || 1));
    const current = this.$('.root');
    const want = `H${n}`;
    if (current.tagName === want) return;
    const next = document.createElement(want.toLowerCase());
    next.className = current.className;
    next.setAttribute('part', 'root');
    next.append(...current.childNodes);
    current.replaceWith(next);
  }

  #syncSize(): void {
    const root = this.$<HTMLElement>('.root');
    const size = this.size;
    if (!size) {
      root.style.removeProperty('font-size');
      root.style.removeProperty('line-height');
      return;
    }
    if (SIZE_VAR[size]) {
      root.style.setProperty('font-size', `var(${SIZE_VAR[size]})`);
      root.style.setProperty('line-height', `var(${LH_VAR[size]})`);
    } else {
      root.style.setProperty('font-size', /^-?\d*\.?\d+$/.test(size) ? `${parseFloat(size) / 16}rem` : size);
      root.style.removeProperty('line-height');
    }
  }
}

define('mt-title', MtTitle);
