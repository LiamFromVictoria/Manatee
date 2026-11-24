import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    max-width: 100%;
    --_h: 1.25rem;
    --_fz: var(--mt-font-size-xs);
    --_px: 0.6875rem;
    --_radius: var(--mt-radius-xl);
    --_bg: var(--mt-c-filled);
    --_color: var(--mt-white);
    --_bd: transparent;
  }
  :host([size='xs']) { --_h: 1rem; --_fz: 0.5625rem; --_px: 0.4375rem; }
  :host([size='sm']) { --_h: 1.125rem; --_fz: 0.625rem; --_px: 0.5rem; }
  :host([size='md']) { --_h: 1.25rem; --_fz: 0.6875rem; --_px: 0.6875rem; }
  :host([size='lg']) { --_h: 1.625rem; --_fz: 0.8125rem; --_px: 0.875rem; }
  :host([size='xl']) { --_h: 2rem; --_fz: 1rem; --_px: 1.0625rem; }
  :host([full-width]) { display: flex; }
  :host([circle]) { --_px: 0; border-radius: 50%; }

  :host([variant='light']) { --_bg: var(--mt-c-light); --_color: var(--mt-c-light-color); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='default']) { --_bg: var(--mt-color-default); --_color: var(--mt-color-default-color); --_bd: var(--mt-color-default-border); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }
  :host([variant='dot']) { --_bg: transparent; --_color: var(--mt-color-text); --_bd: var(--mt-color-border); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_color: var(--mt-white); }

  .root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--_h);
    padding-inline: var(--_px);
    font-size: var(--_fz);
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    white-space: nowrap;
    color: var(--_color);
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
    overflow: hidden;
  }
  :host([circle]) .root { width: var(--_h); padding: 0; border-radius: 50%; }

  .label { overflow: hidden; text-overflow: ellipsis; }
  .dot { display: none; flex: 0 0 auto; width: 0.5em; height: 0.5em; margin-inline-end: 0.4em; border-radius: 50%; background: var(--mt-c-filled); }
  :host([variant='dot']) .dot { display: block; }

  .section { display: flex; align-items: center; }
  .section:not(.filled) { display: none; }
  .section.left { margin-inline-end: 0.25rem; }
  .section.right { margin-inline-start: 0.25rem; }
`;

/**
 * <mt-badge variant="filled|light|outline|dot|transparent|white|default|gradient"
 *           color size radius full-width circle
 *           gradient-from gradient-to gradient-deg>
 * Slots: default (label), left-section, right-section.
 */
export class MtBadge extends MtElement {
  static styles = [styles];
  static props: Props = {
    variant: { default: 'filled' },
    color: { color: true },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius' },
    fullWidth: { type: 'boolean' },
    circle: { type: 'boolean' },
    gradientFrom: { css: '--_gfrom', scale: 'color', default: 'blue' },
    gradientTo: { css: '--_gto', scale: 'color', default: 'cyan' },
    gradientDeg: { css: '--_gdeg', type: 'number', default: 45 },
  };

  protected template(): string {
    return html`
      <span class="root" part="root">
        <span class="dot" part="dot" aria-hidden="true"></span>
        <span class="section left" part="left-section"><slot name="left-section"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="section right" part="right-section"><slot name="right-section"></slot></span>
      </span>
    `;
  }

  protected setup(): void {
    for (const slot of this.root.querySelectorAll<HTMLSlotElement>('.section slot')) {
      const sync = () => slot.parentElement!.classList.toggle('filled', slot.assignedNodes().length > 0);
      slot.addEventListener('slotchange', sync);
      sync();
    }
  }
}

define('mt-badge', MtBadge);
