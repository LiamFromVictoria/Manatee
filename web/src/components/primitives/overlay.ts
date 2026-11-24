import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    position: absolute;
    inset: 0;
    display: block;
    --_bg: color-mix(in srgb, #000 60%, transparent);
    --_z: 200;
    --_radius: 0;
  }
  :host([fixed]) { position: fixed; }

  .root {
    position: absolute;
    inset: 0;
    background: var(--_gradient, var(--_bg));
    border-radius: var(--_radius);
    z-index: var(--_z);
  }
  :host([blur]) .root { backdrop-filter: var(--_filter, none); }
  :host([center]) .root { display: flex; align-items: center; justify-content: center; }
`;

/**
 * <mt-overlay color background-opacity blur gradient radius z-index center fixed>
 * Absolutely positioned (or `fixed`) layer that covers its positioned ancestor.
 * Slot: default, centered when `center` is set.
 */
export class MtOverlay extends MtElement {
  static styles = [styles];
  static props: Props = {
    color: { default: '#000' },
    backgroundOpacity: { type: 'number', default: 0.6 },
    backdropBlur: { attr: 'blur', type: 'number' },
    gradient: {},
    radius: { css: '--_radius', scale: 'radius' },
    zIndex: { css: '--_z', scale: 'raw', type: 'number', default: 200 },
    center: { type: 'boolean' },
    fixed: { type: 'boolean' },
  };

  declare color: string | null;
  declare backgroundOpacity: number | null;
  declare backdropBlur: number | null;
  declare gradient: string | null;

  protected template(): string {
    return html`<div class="root" part="root"><slot></slot></div>`;
  }

  protected update(changed: Set<string>): void {
    if (changed.has('color') || changed.has('backgroundOpacity')) {
      const pct = (this.backgroundOpacity ?? 0.6) * 100;
      this.style.setProperty('--_bg', `color-mix(in srgb, ${this.color ?? '#000'} ${pct}%, transparent)`);
    }
    if (changed.has('gradient')) {
      if (this.gradient) this.style.setProperty('--_gradient', this.gradient);
      else this.style.removeProperty('--_gradient');
    }
    if (changed.has('backdropBlur')) {
      if (this.backdropBlur) this.style.setProperty('--_filter', `blur(${this.backdropBlur / 16}rem)`);
      else this.style.removeProperty('--_filter');
    }
  }
}

define('mt-overlay', MtOverlay);
