import { css, define, MtElement } from '../../core';

const styles = css`
  :host {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

/**
 * <mt-visually-hidden>
 * Hides content visually while keeping it available to assistive tech.
 * Slot: default.
 */
export class MtVisuallyHidden extends MtElement {
  static styles = [styles];
}

define('mt-visually-hidden', MtVisuallyHidden);
