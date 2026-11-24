import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: inline;
    --_fz: inherit;
    --_lh: inherit;
  }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_lh: var(--mt-line-height-xs); }
  :host([size='sm']) { --_fz: var(--mt-font-size-sm); --_lh: var(--mt-line-height-sm); }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_lh: var(--mt-line-height-md); }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_lh: var(--mt-line-height-lg); }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_lh: var(--mt-line-height-xl); }
  :host([inherit]) { --_fz: inherit; --_lh: inherit; }

  .root {
    display: inline;
    font-size: var(--_fz);
    line-height: var(--_lh);
    font-weight: var(--_fw, inherit);
    color: var(--_color, var(--mt-color-anchor));
    text-decoration: none;
    cursor: pointer;
  }
  :host(:not([underline])) .root:hover,
  :host([underline='hover']) .root:hover,
  :host([underline='always']) .root,
  :host([underline='not-hover']) .root {
    text-decoration: underline;
  }
  :host([underline='not-hover']) .root:hover,
  :host([underline='never']) .root:hover {
    text-decoration: none;
  }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; border-radius: 2px; }

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
`;

/**
 * <mt-anchor href target rel underline="hover|always|never|not-hover" c size fw
 *            inherit truncate="end|start" line-clamp>
 * Slot: default.
 */
export class MtAnchor extends MtElement {
  static styles = [styles];
  static props: Props = {
    href: {},
    target: {},
    rel: {},
    underline: { default: 'hover' },
    c: { css: '--_color', scale: 'color' },
    size: {},
    fw: { css: '--_fw', type: 'number' },
    inherit: { type: 'boolean' },
    truncate: {},
    lineClamp: { css: '--_clamp', type: 'number' },
  };

  declare href: string | null;
  declare target: string | null;
  declare rel: string | null;

  protected template(): string {
    return html`<a class="root" part="root"><slot></slot></a>`;
  }

  protected update(): void {
    const root = this.$<HTMLAnchorElement>('.root');
    if (this.href) root.setAttribute('href', this.href);
    else root.removeAttribute('href');
    if (this.target) root.setAttribute('target', this.target);
    else root.removeAttribute('target');
    if (this.rel) root.setAttribute('rel', this.rel);
    else root.removeAttribute('rel');
  }
}

define('mt-anchor', MtAnchor);
