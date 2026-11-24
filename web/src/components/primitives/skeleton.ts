import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_h: auto;
    --_w: 100%;
    --_radius: var(--mt-radius-default);
    position: relative;
  }
  .wrap { position: relative; display: block; height: var(--_h); width: var(--_w); }
  ::slotted(*) { visibility: visible; }
  :host(:not([visible='false'])) ::slotted(*) { visibility: hidden; }

  .skeleton { display: none; }
  :host(:not([visible='false'])) .skeleton {
    display: block;
    position: absolute;
    inset: 0;
    border-radius: var(--_radius);
    background: var(--mt-color-disabled);
    overflow: hidden;
  }
  :host([circle]) .skeleton { border-radius: 50%; }

  .skeleton::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mt-color-text) 12%, transparent), transparent);
    transform: translateX(-100%);
  }
  :host(:not([animate='false'])) .skeleton::after {
    animation: mt-skeleton-wave 1.5s ease-in-out infinite;
  }
  @keyframes mt-skeleton-wave {
    to { transform: translateX(100%); }
  }
`;

/**
 * <mt-skeleton height width circle radius animate visible>
 * `animate` and `visible` default to true; set `animate="false"` to freeze
 * the shimmer and `visible="false"` to render the slotted children as-is.
 * Slot: default (the real content, shown once `visible="false"`).
 */
export class MtSkeleton extends MtElement {
  static styles = [styles];
  static props: Props = {
    height: { css: '--_h', scale: 'rem' },
    width: { css: '--_w', scale: 'rem', default: '100%' },
    circle: { type: 'boolean' },
    radius: { css: '--_radius', scale: 'radius' },
    animate: { type: 'boolean', default: true },
    visible: { type: 'boolean', default: true },
  };

  protected template(): string {
    return html`
      <span class="wrap" part="wrap">
        <slot></slot>
        <span class="skeleton" part="skeleton" aria-hidden="true"></span>
      </span>
    `;
  }
}

define('mt-skeleton', MtSkeleton);
