import { resolveColor } from './color';

/**
 * Token scales. Values "xs".."xl" resolve to theme variables; bare numbers are
 * treated as px and converted to rem (Mantine semantics); 'color' resolves
 * palette names/shades (see color.ts); anything else passes through as raw CSS.
 */
export type Scale =
  | 'spacing'
  | 'radius'
  | 'font-size'
  | 'line-height'
  | 'shadow'
  | 'breakpoint'
  | 'rem'
  | 'color'
  | 'raw';

const TOKENS: Record<string, true> = { xs: true, sm: true, md: true, lg: true, xl: true };
const TOKEN_SCALES: Partial<Record<Scale, true>> = {
  spacing: true, radius: true, 'font-size': true, 'line-height': true, shadow: true, breakpoint: true,
};
const NUMERIC = /^-?\d*\.?\d+$/;

export function isToken(v: string): boolean {
  return TOKENS[v] === true;
}

export function resolve(scale: Scale, value: unknown): string {
  if (value == null || value === '' || value === false) return '';
  const s = String(value).trim();
  if (scale === 'raw') return s;
  if (scale === 'color') return resolveColor(s);
  if (TOKEN_SCALES[scale] && TOKENS[s]) return `var(--mt-${scale}-${s})`;
  if (NUMERIC.test(s)) {
    if (scale === 'line-height') return s;
    return rem(parseFloat(s));
  }
  return s;
}

export function rem(px: number): string {
  return px === 0 ? '0' : `${px / 16}rem`;
}
