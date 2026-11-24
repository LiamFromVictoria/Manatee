import { css, define, MtElement, type Props } from '../../core';

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

const styles = css`
  :host {
    --_cols: 1;
    --_spacing: var(--mt-spacing-md);
    --_vspacing: var(--_spacing);
    display: grid;
    grid-template-columns: repeat(var(--_cols), minmax(0, 1fr));
    column-gap: var(--_spacing);
    row-gap: var(--_vspacing);
  }
  ${responsiveVars('cols', '--_cols')}
  ${responsiveVars('spacing', '--_spacing')}
  ${responsiveVars('vertical-spacing', '--_vspacing')}
`;

/**
 * <mt-simple-grid cols spacing vertical-spacing
 *                 cols-xs..cols-xl spacing-xs..spacing-xl vertical-spacing-xs..vertical-spacing-xl>
 * Slots: default.
 */
export class MtSimpleGrid extends MtElement {
  static styles = [styles];
  static props: Props = {
    cols: { css: '--_cols', type: 'number', default: 1 },
    spacing: { css: '--_spacing', scale: 'spacing', default: 'md' },
    verticalSpacing: { css: '--_vspacing', scale: 'spacing' },
    colsXs: { attr: 'cols-xs', css: '--_cols-xs', type: 'number' },
    colsSm: { attr: 'cols-sm', css: '--_cols-sm', type: 'number' },
    colsMd: { attr: 'cols-md', css: '--_cols-md', type: 'number' },
    colsLg: { attr: 'cols-lg', css: '--_cols-lg', type: 'number' },
    colsXl: { attr: 'cols-xl', css: '--_cols-xl', type: 'number' },
    spacingXs: { attr: 'spacing-xs', css: '--_spacing-xs', scale: 'spacing' },
    spacingSm: { attr: 'spacing-sm', css: '--_spacing-sm', scale: 'spacing' },
    spacingMd: { attr: 'spacing-md', css: '--_spacing-md', scale: 'spacing' },
    spacingLg: { attr: 'spacing-lg', css: '--_spacing-lg', scale: 'spacing' },
    spacingXl: { attr: 'spacing-xl', css: '--_spacing-xl', scale: 'spacing' },
    verticalSpacingXs: { attr: 'vertical-spacing-xs', css: '--_vertical-spacing-xs', scale: 'spacing' },
    verticalSpacingSm: { attr: 'vertical-spacing-sm', css: '--_vertical-spacing-sm', scale: 'spacing' },
    verticalSpacingMd: { attr: 'vertical-spacing-md', css: '--_vertical-spacing-md', scale: 'spacing' },
    verticalSpacingLg: { attr: 'vertical-spacing-lg', css: '--_vertical-spacing-lg', scale: 'spacing' },
    verticalSpacingXl: { attr: 'vertical-spacing-xl', css: '--_vertical-spacing-xl', scale: 'spacing' },
  };
}

define('mt-simple-grid', MtSimpleGrid);
