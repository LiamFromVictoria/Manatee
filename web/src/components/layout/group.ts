import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_gap: var(--mt-spacing-md);
    --_justify: flex-start;
    --_align: center;
  }
  .root {
    display: flex;
    flex-wrap: wrap;
    gap: var(--_gap);
    justify-content: var(--_justify);
    align-items: var(--_align);
  }
  :host([wrap='nowrap']) .root { flex-wrap: nowrap; }
  :host([grow]) ::slotted(*) { flex-grow: 1; flex-basis: 0; min-width: fit-content; }
  :host([grow][prevent-grow-overflow='false']) ::slotted(*) { flex-basis: auto; }
`;

/**
 * <mt-group gap justify align wrap="wrap|nowrap" grow prevent-grow-overflow>
 * Slots: default.
 */
export class MtGroup extends MtElement {
  static styles = [styles];
  static props: Props = {
    gap: { css: '--_gap', scale: 'spacing', default: 'md' },
    justify: { css: '--_justify', default: 'flex-start' },
    align: { css: '--_align', default: 'center' },
    wrap: { default: 'wrap' },
    grow: { type: 'boolean' },
    preventGrowOverflow: { type: 'boolean', default: true },
  };

  protected template(): string {
    return '<div class="root" part="root"><slot></slot></div>';
  }
}

define('mt-group', MtGroup);
