import { css, define, MtElement, type Props } from '../../core';

const SIZE: Record<string, number> = { xs: 22, sm: 28, md: 34, lg: 44, xl: 60 };

const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex: 0 0 auto;
    --_size: 2.125rem;
    width: var(--_size);
    height: var(--_size);
    --_radius: var(--mt-radius-default);
    --_bg: var(--mt-c-filled);
    --_color: var(--mt-white);
    --_bd: transparent;
    color: var(--_color);
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
  }

  :host([variant='light']) { --_bg: var(--mt-c-light); --_color: var(--mt-c-light-color); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='default']) { --_bg: var(--mt-color-default); --_color: var(--mt-color-default-color); --_bd: var(--mt-color-default-border); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_color: var(--mt-white); }

  ::slotted(*) { width: 60%; height: 60%; }
`;

/**
 * <mt-theme-icon variant="filled|light|outline|default|white|transparent|gradient"
 *                color size radius gradient-from gradient-to gradient-deg>
 * `size` accepts xs..xl (22/28/34/44/60) or a raw number (px).
 * Slot: default (icon), centered.
 */
export class MtThemeIcon extends MtElement {
  static styles = [styles];
  static props: Props = {
    variant: { default: 'filled' },
    color: { color: true },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius' },
    gradientFrom: { css: '--_gfrom', scale: 'color', default: 'blue' },
    gradientTo: { css: '--_gto', scale: 'color', default: 'cyan' },
    gradientDeg: { css: '--_gdeg', type: 'number', default: 45 },
  };

  declare size: string;

  protected update(changed: Set<string>): void {
    if (!changed.has('size')) return;
    const px = SIZE[this.size] ?? (/^-?\d*\.?\d+$/.test(this.size) ? parseFloat(this.size) : SIZE.md!);
    this.style.setProperty('--_size', `${px / 16}rem`);
  }
}

define('mt-theme-icon', MtThemeIcon);
