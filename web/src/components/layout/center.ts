import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: flex; align-items: center; justify-content: center; }
  :host([inline]) { display: inline-flex; }
`;

/**
 * <mt-center inline>
 * Slots: default.
 */
export class MtCenter extends MtElement {
  static styles = [styles];
  static props: Props = {
    inline: { type: 'boolean' },
  };
}

define('mt-center', MtCenter);
