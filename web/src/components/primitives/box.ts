import { css, define, MtElement } from '../../core';

const styles = css`
  :host { display: block; }
`;

/**
 * <mt-box>
 * Plain block container. Only the shared Mantine style props (m, p, w, ...)
 * and free-form CSS via `style`/`class` apply; no component-specific props.
 * Slot: default.
 */
export class MtBox extends MtElement {
  static styles = [styles];
}

define('mt-box', MtBox);
