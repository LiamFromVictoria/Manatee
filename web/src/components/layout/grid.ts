import { css, define, MtElement, type Props } from '../../core';

const gridStyles = css`
  :host {
    display: block;
    --_cols: 12;
    --_gutter: var(--mt-spacing-md);
    --_justify: flex-start;
    --_align: stretch;
    --_colgrow: 0;
  }
  :host([grow]) { --_colgrow: 1; }
  .inner {
    display: flex;
    flex-wrap: wrap;
    margin: calc(var(--_gutter) / -2);
    justify-content: var(--_justify);
    align-items: var(--_align);
  }
`;

/**
 * <mt-grid columns="12" gutter justify align grow>
 * Flex-based column grid; columns are `<mt-grid-col>` children.
 * Slots: default.
 */
export class MtGrid extends MtElement {
  static styles = [gridStyles];
  static props: Props = {
    columns: { css: '--_cols', type: 'number', default: 12 },
    gutter: { css: '--_gutter', scale: 'spacing', default: 'md' },
    justify: { css: '--_justify', default: 'flex-start' },
    align: { css: '--_align', default: 'stretch' },
    grow: { type: 'boolean' },
  };

  protected template(): string {
    return '<div class="inner" part="inner"><slot></slot></div>';
  }
}

// Breakpoints match web/tokens.css --mt-breakpoint-*.
const BREAKPOINTS: Array<[string, string]> = [
  ['xs', '36em'],
  ['sm', '48em'],
  ['md', '62em'],
  ['lg', '75em'],
  ['xl', '88em'],
];

const responsiveVars = (prop: string, target: string): string =>
  BREAKPOINTS.map(
    ([bp, em]) =>
      `@media (min-width: ${em}) { :host([${prop}-${bp}]) { ${target}: var(--_${prop}-${bp}); } }`,
  ).join('\n');

const colStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    --_span: 12;
    --_offset: 0;
    --_order: 0;
    width: calc(100% / var(--_cols, 12) * var(--_span));
    padding: calc(var(--_gutter, var(--mt-spacing-md)) / 2);
    margin-inline-start: calc(100% / var(--_cols, 12) * var(--_offset));
    order: var(--_order);
    flex-grow: var(--_colgrow, 0);
    flex-shrink: 0;
  }
  :host([span='auto']), :host([span='content']) { width: auto; flex: 0 0 auto; }
  :host([span='content']) { white-space: nowrap; }
  ${responsiveVars('span', '--_span')}
  ${responsiveVars('offset', '--_offset')}
`;

/**
 * <mt-grid-col span="12|auto|content" offset order
 *              span-xs..span-xl offset-xs..offset-xl (numeric)>
 * Slots: default.
 */
export class MtGridCol extends MtElement {
  static styles = [colStyles];
  static props: Props = {
    span: { css: '--_span', default: 12 },
    offset: { css: '--_offset', type: 'number', default: 0 },
    order: { css: '--_order', type: 'number', default: 0 },
    spanXs: { attr: 'span-xs', css: '--_span-xs', type: 'number' },
    spanSm: { attr: 'span-sm', css: '--_span-sm', type: 'number' },
    spanMd: { attr: 'span-md', css: '--_span-md', type: 'number' },
    spanLg: { attr: 'span-lg', css: '--_span-lg', type: 'number' },
    spanXl: { attr: 'span-xl', css: '--_span-xl', type: 'number' },
    offsetXs: { attr: 'offset-xs', css: '--_offset-xs', type: 'number' },
    offsetSm: { attr: 'offset-sm', css: '--_offset-sm', type: 'number' },
    offsetMd: { attr: 'offset-md', css: '--_offset-md', type: 'number' },
    offsetLg: { attr: 'offset-lg', css: '--_offset-lg', type: 'number' },
    offsetXl: { attr: 'offset-xl', css: '--_offset-xl', type: 'number' },
  };
}

define('mt-grid', MtGrid);
define('mt-grid-col', MtGridCol);
