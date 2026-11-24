import { define, MtElement, type Props } from '../../core';

let typographySheetInstalled = false;

/**
 * Shadow CSS cannot reach descendants of slotted light-DOM content
 * (::slotted only matches top-level slotted nodes), so the prose look lives
 * in one document-level stylesheet, scoped by the mt-typography tag.
 * Installed once, lazily, on first use.
 */
function installTypographySheet(): void {
  if (typographySheetInstalled) return;
  typographySheetInstalled = true;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
    mt-typography {
      display: block;
      font-size: var(--mt-font-size-sm);
      line-height: var(--mt-line-height-md);
      color: var(--mt-color-text);
    }
    mt-typography[size='xs'] { font-size: var(--mt-font-size-xs); }
    mt-typography[size='md'] { font-size: var(--mt-font-size-md); }
    mt-typography[size='lg'] { font-size: var(--mt-font-size-lg); }
    mt-typography[size='xl'] { font-size: var(--mt-font-size-xl); }
    mt-typography > :first-child { margin-top: 0; }
    mt-typography > :last-child { margin-bottom: 0; }

    mt-typography p { margin: var(--mt-spacing-sm) 0; }

    mt-typography h1, mt-typography h2, mt-typography h3,
    mt-typography h4, mt-typography h5, mt-typography h6 {
      font-family: var(--mt-font-family-headings);
      font-weight: var(--mt-heading-font-weight);
      color: var(--mt-color-text);
      margin: var(--mt-spacing-xl) 0 var(--mt-spacing-sm);
    }
    mt-typography h1 { font-size: var(--mt-h1-font-size); line-height: var(--mt-h1-line-height); }
    mt-typography h2 { font-size: var(--mt-h2-font-size); line-height: var(--mt-h2-line-height); }
    mt-typography h3 { font-size: var(--mt-h3-font-size); line-height: var(--mt-h3-line-height); }
    mt-typography h4 { font-size: var(--mt-h4-font-size); line-height: var(--mt-h4-line-height); }
    mt-typography h5 { font-size: var(--mt-h5-font-size); line-height: var(--mt-h5-line-height); }
    mt-typography h6 { font-size: var(--mt-h6-font-size); line-height: var(--mt-h6-line-height); }

    mt-typography a {
      color: var(--mt-color-anchor);
      text-decoration: underline;
    }
    mt-typography a:hover { text-decoration: none; }

    mt-typography ul, mt-typography ol {
      margin: var(--mt-spacing-sm) 0;
      padding-inline-start: 2rem;
    }
    mt-typography li { margin-block: 0.25rem; }
    mt-typography li::marker { color: var(--mt-color-dimmed); }

    mt-typography blockquote {
      margin: var(--mt-spacing-md) 0;
      padding: var(--mt-spacing-sm) var(--mt-spacing-md);
      border-inline-start: 3px solid var(--mt-color-border);
      color: var(--mt-color-dimmed);
      background: var(--mt-color-hover);
    }

    mt-typography code {
      font-family: var(--mt-font-family-monospace);
      font-size: 0.85em;
      background: var(--mt-color-code-bg);
      border-radius: var(--mt-radius-sm);
      padding: 0.1em 0.4em;
    }
    mt-typography pre {
      margin: var(--mt-spacing-md) 0;
      padding: var(--mt-spacing-sm);
      background: var(--mt-color-code-bg);
      border-radius: var(--mt-radius-sm);
      overflow-x: auto;
      white-space: pre;
    }
    mt-typography pre code { background: none; padding: 0; }

    mt-typography img { max-width: 100%; border-radius: var(--mt-radius-sm); }

    mt-typography hr {
      margin: var(--mt-spacing-lg) 0;
      border: 0;
      border-top: 1px solid var(--mt-color-border);
    }

    mt-typography table {
      width: 100%;
      margin: var(--mt-spacing-md) 0;
      font-size: var(--mt-font-size-sm);
      border-collapse: collapse;
    }
    mt-typography th, mt-typography td {
      padding: var(--mt-spacing-xs) var(--mt-spacing-sm);
      border: 1px solid var(--mt-color-border);
      text-align: start;
    }
    mt-typography th { font-weight: 700; }

    mt-typography kbd {
      font-family: var(--mt-font-family-monospace);
      font-size: 0.85em;
      padding: 0.1em 0.4em;
      background: light-dark(var(--mt-color-gray-0), var(--mt-color-dark-6));
      border: 1px solid var(--mt-color-border);
      border-bottom-width: 2px;
      border-radius: var(--mt-radius-sm);
    }
  `);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

/**
 * <mt-typography size="xs|sm|md|lg|xl">
 * Styles arbitrary rich HTML light-DOM content (p, h1-h6, a, ul/ol, li,
 * blockquote, code, pre, img, hr, table, kbd) like Mantine's
 * TypographyStylesProvider. Content: plain light-DOM markup; shadow root is
 * a plain `<slot>`.
 */
export class MtTypography extends MtElement {
  static props: Props = {
    size: { default: 'sm' },
  };

  constructor() {
    super();
    installTypographySheet();
  }
}

define('mt-typography', MtTypography);
