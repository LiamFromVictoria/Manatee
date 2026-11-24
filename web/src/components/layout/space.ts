import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: block; flex-shrink: 0; width: var(--_w, auto); height: var(--_h, auto); }
`;

/**
 * <mt-space w h>
 * `w`/`h` resolve on the spacing scale (xs..xl tokens or raw px/rem numbers),
 * unlike the generic style-prop `w`/`h` (rem scale) shared by every element.
 */
export class MtSpace extends MtElement {
  static styles = [styles];
  static props: Props = {
    w: { css: '--_w', scale: 'spacing' },
    h: { css: '--_h', scale: 'spacing' },
  };
}

define('mt-space', MtSpace);
