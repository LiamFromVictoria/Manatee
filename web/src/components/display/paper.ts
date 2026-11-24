import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_radius: var(--mt-radius-default);
    background: var(--mt-color-body);
    border-radius: var(--_radius);
  }
  :host([shadow]) { box-shadow: var(--_shadow); }
  :host([with-border]) { border: 1px solid var(--mt-color-border); }
`;

/**
 * <mt-paper shadow radius with-border p>
 * Plain surface container. Slot: default.
 */
export class MtPaper extends MtElement {
  static styles = [styles];
  static props: Props = {
    shadow: { css: '--_shadow', scale: 'shadow' },
    radius: { css: '--_radius', scale: 'radius' },
    withBorder: { type: 'boolean' },
  };
}

define('mt-paper', MtPaper);
