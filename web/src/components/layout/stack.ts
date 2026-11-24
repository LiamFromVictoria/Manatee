import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_gap: var(--mt-spacing-md);
    --_align: stretch;
    --_justify: flex-start;
  }
  .root {
    display: flex;
    flex-direction: column;
    row-gap: var(--_gap);
    align-items: var(--_align);
    justify-content: var(--_justify);
  }
`;

/**
 * <mt-stack gap align justify>
 * Slots: default.
 */
export class MtStack extends MtElement {
  static styles = [styles];
  static props: Props = {
    gap: { css: '--_gap', scale: 'spacing', default: 'md' },
    align: { css: '--_align', default: 'stretch' },
    justify: { css: '--_justify', default: 'flex-start' },
  };

  protected template(): string {
    return '<div class="root" part="root"><slot></slot></div>';
  }
}

define('mt-stack', MtStack);
