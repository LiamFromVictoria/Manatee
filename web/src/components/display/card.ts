import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_card-padding: var(--mt-spacing-md);
    --_radius: var(--mt-radius-default);
    padding: var(--_card-padding);
    background: var(--mt-color-body);
    border-radius: var(--_radius);
    overflow: hidden;
  }
  :host([shadow]) { box-shadow: var(--_shadow); }
  :host([with-border]) { border: 1px solid var(--mt-color-border); }
`;

/**
 * <mt-card padding shadow radius with-border>
 * Slot: default. Compose with <mt-card-section> for edge-to-edge content.
 */
export class MtCard extends MtElement {
  static styles = [styles];
  static props: Props = {
    padding: { css: '--_card-padding', scale: 'spacing', default: 'md' },
    shadow: { css: '--_shadow', scale: 'shadow' },
    radius: { css: '--_radius', scale: 'radius' },
    withBorder: { type: 'boolean' },
  };
}

const sectionStyles = css`
  :host {
    display: block;
    margin-inline: calc(var(--_card-padding, 0px) * -1);
  }
  :host(:first-child) { margin-top: calc(var(--_card-padding, 0px) * -1); }
  :host(:last-child) { margin-bottom: calc(var(--_card-padding, 0px) * -1); }
  :host([with-border]) {
    border-top: 1px solid var(--mt-color-border);
    border-bottom: 1px solid var(--mt-color-border);
  }
  :host([inherit-padding]) { padding-inline: var(--_card-padding, 0px); }
`;

/** <mt-card-section with-border inherit-padding> Spans the parent card edge to edge. */
export class MtCardSection extends MtElement {
  static styles = [sectionStyles];
  static props: Props = {
    withBorder: { type: 'boolean' },
    inheritPadding: { type: 'boolean' },
  };
}

define('mt-card', MtCard);
define('mt-card-section', MtCardSection);
