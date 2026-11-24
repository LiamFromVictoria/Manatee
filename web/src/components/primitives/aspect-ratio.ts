import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    position: relative;
    --_ratio: 1;
    aspect-ratio: var(--_ratio);
  }
  ::slotted(*) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`;

/**
 * <mt-aspect-ratio ratio>
 * `ratio` is a number (16/9 = "1.7777") or a "w/h" string ("16/9").
 * Slot: default (img, iframe, mt-image, ...), stretched to fill the box.
 */
export class MtAspectRatio extends MtElement {
  static styles = [styles];
  static props: Props = {
    ratio: { css: '--_ratio', scale: 'raw', default: '1' },
  };
}

define('mt-aspect-ratio', MtAspectRatio);
