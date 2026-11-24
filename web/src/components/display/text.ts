import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_fz: var(--mt-font-size-sm);
    --_lh: var(--mt-line-height-sm);
    font-size: var(--_fz);
    line-height: var(--_lh);
    color: var(--mt-color-text);
  }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_lh: var(--mt-line-height-xs); }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_lh: var(--mt-line-height-md); }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_lh: var(--mt-line-height-lg); }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_lh: var(--mt-line-height-xl); }
  :host([span]) { display: inline; }
  :host([inherit]) { font-size: inherit; line-height: inherit; font-family: inherit; font-weight: inherit; }

  .root {
    display: block;
    color: var(--_color, inherit);
    font-weight: var(--_fw, inherit);
    font-style: var(--_fs, inherit);
    text-decoration: var(--_td, inherit);
    text-transform: var(--_tt, inherit);
    text-align: var(--_ta, inherit);
  }
  :host([span]) .root { display: inline; }

  :host([truncate]) .root, :host([truncate='end']) .root {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :host([truncate='start']) .root {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
    text-align: left;
  }
  :host([line-clamp]) .root {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--_clamp, 3);
    overflow: hidden;
  }

  :host([variant='gradient']) .root {
    background: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

/**
 * <mt-text size c fw fs td tt ta truncate="end|start" line-clamp inherit span
 *          variant="gradient" gradient-from gradient-to gradient-deg>
 * Slot: default.
 */
export class MtText extends MtElement {
  static styles = [styles];
  static props: Props = {
    size: { default: 'sm' },
    c: { css: '--_color', scale: 'color' },
    fw: { css: '--_fw', type: 'number' },
    fs: { css: '--_fs' },
    td: { css: '--_td' },
    tt: { css: '--_tt' },
    ta: { css: '--_ta' },
    truncate: {},
    lineClamp: { css: '--_clamp', type: 'number' },
    inherit: { type: 'boolean' },
    span: { type: 'boolean' },
    variant: {},
    gradientFrom: { css: '--_gfrom', scale: 'color', default: 'blue' },
    gradientTo: { css: '--_gto', scale: 'color', default: 'cyan' },
    gradientDeg: { css: '--_gdeg', type: 'number', default: 45 },
  };

  protected template(): string {
    return html`<span class="root" part="root"><slot></slot></span>`;
  }
}

define('mt-text', MtText);
