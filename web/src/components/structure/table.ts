import { css, define, MtElement, type Props } from '../../core';

let tableSheetInstalled = false;

/**
 * Shadow CSS cannot style a table's slotted thead/tbody/tfoot (::slotted only
 * matches top-level slotted nodes, not their descendants), so the shared look
 * lives in one document-level stylesheet, scoped by the mt-table tag and its
 * attributes. Installed once, lazily, on first use.
 */
function installTableSheet(): void {
  if (tableSheetInstalled) return;
  tableSheetInstalled = true;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
    mt-table > table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--mt-font-size-sm);
      color: var(--mt-color-text);
      caption-side: bottom;
    }
    mt-table[caption-side='top'] > table { caption-side: top; }
    mt-table > table > caption {
      margin-top: var(--mt-spacing-xs);
      font-size: var(--mt-font-size-xs);
      color: var(--mt-color-dimmed);
    }
    mt-table > table thead th {
      text-align: start;
      font-weight: 700;
      border-bottom: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table > table th, mt-table > table td {
      padding-block: var(--_vspace, var(--mt-spacing-xs));
      padding-inline: var(--_hspace, var(--mt-spacing-xs));
    }
    mt-table[with-table-border] > table {
      border: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table[with-column-borders] > table :is(th, td) + :is(th, td) {
      border-inline-start: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table:not([with-row-borders='false']) > table tbody tr:not(:last-child) > :is(th, td) {
      border-bottom: 1px solid var(--_border, var(--mt-color-border));
    }
    mt-table[striped] > table tbody tr:nth-child(odd),
    mt-table[striped='odd'] > table tbody tr:nth-child(odd) {
      background: var(--_striped, var(--mt-color-striped));
    }
    mt-table[striped='even'] > table tbody tr:nth-child(even) {
      background: var(--_striped, var(--mt-color-striped));
    }
    mt-table[highlight-on-hover] > table tbody tr:hover {
      background: var(--_hover, var(--mt-color-hover));
    }
    mt-table[sticky-header] > table thead th {
      position: sticky;
      top: var(--_sticky-offset, 0);
      z-index: 1;
      background: var(--mt-color-body);
    }
    mt-table[layout='fixed'] > table { table-layout: fixed; }
  `);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

const hostStyles = css`
  :host { display: block; overflow-x: auto; }
`;

/**
 * <mt-table striped="odd|even" highlight-on-hover with-table-border with-column-borders
 *           with-row-borders vertical-spacing horizontal-spacing caption-side="top|bottom"
 *           sticky-header sticky-header-offset layout="auto|fixed"
 *           striped-color highlight-on-hover-color border-color>
 * Content: a direct light-DOM <table> child (server-rendered markup needs a real
 * <table> ancestor for thead/tbody/tr/td to parse correctly; the HTML parser drops
 * those tags outside a table context). Shadow root is a plain <slot>.
 */
export class MtTable extends MtElement {
  static styles = [hostStyles];
  static props: Props = {
    striped: {},
    highlightOnHover: { type: 'boolean' },
    withTableBorder: { type: 'boolean' },
    withColumnBorders: { type: 'boolean' },
    withRowBorders: { type: 'boolean', default: true },
    verticalSpacing: { css: '--_vspace', scale: 'spacing' },
    horizontalSpacing: { css: '--_hspace', scale: 'spacing' },
    captionSide: { default: 'bottom' },
    stickyHeader: { type: 'boolean' },
    stickyHeaderOffset: { css: '--_sticky-offset', scale: 'rem' },
    layout: { default: 'auto' },
    stripedColor: { css: '--_striped', scale: 'color' },
    highlightOnHoverColor: { css: '--_hover', scale: 'color' },
    borderColor: { css: '--_border', scale: 'color' },
  };

  constructor() {
    super();
    installTableSheet();
  }
}

const scrollStyles = css`
  :host {
    display: block;
    overflow: auto;
    min-width: var(--_min-w, auto);
    max-width: 100%;
    max-height: var(--_max-h, none);
  }
`;

/** <mt-table-scroll-container min-width max-height> Wraps an mt-table for horizontal/vertical scrolling. */
export class MtTableScrollContainer extends MtElement {
  static styles = [scrollStyles];
  static props: Props = {
    minWidth: { css: '--_min-w', scale: 'rem' },
    maxHeight: { css: '--_max-h', scale: 'rem' },
  };
}

define('mt-table', MtTable);
define('mt-table-scroll-container', MtTableScrollContainer);
