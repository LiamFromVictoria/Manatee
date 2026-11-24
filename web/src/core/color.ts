/**
 * Theme color resolution. Every color-aware component reads these host vars:
 *
 *   --mt-c-filled, --mt-c-filled-hover   solid background + hover
 *   --mt-c-light, --mt-c-light-hover     tinted background + hover
 *   --mt-c-light-color                   text on tinted background
 *   --mt-c-outline, --mt-c-outline-hover border/text for outline + hover bg
 *   --mt-c-text                          plain colored text (anchors, icons)
 *
 * Accepted values: a palette name ("teal"), "primary", a palette shade
 * ("red.4" / "red-4"), or any CSS color ("#ff00aa", "rgb(...)").
 */
export const PALETTE = [
  'dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo',
  'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange',
] as const;

export const VARIANT_SUFFIXES = [
  'filled', 'filled-hover', 'light', 'light-hover', 'light-color', 'outline', 'outline-hover', 'text',
] as const;

const NAMED: Record<string, true> = Object.fromEntries([...PALETTE, 'primary'].map((n) => [n, true]));
const SHADE = /^([a-z]+)[.-]([0-9])$/;

export function colorVars(color: string | null | undefined): Record<string, string> {
  const c = (color || 'primary').trim();
  const out: Record<string, string> = {};
  if (NAMED[c]) {
    for (const s of VARIANT_SUFFIXES) out[`--mt-c-${s}`] = `var(--mt-color-${c}-${s})`;
    return out;
  }
  const m = SHADE.exec(c);
  const base = m && NAMED[m[1]] ? `var(--mt-color-${m[1]}-${m[2]})` : c;
  const mix = (pct: number, other = 'transparent') => `color-mix(in srgb, ${base} ${pct}%, ${other})`;
  out['--mt-c-filled'] = base;
  out['--mt-c-filled-hover'] = mix(90, 'black');
  out['--mt-c-light'] = mix(10);
  out['--mt-c-light-hover'] = mix(12);
  out['--mt-c-light-color'] = base;
  out['--mt-c-outline'] = base;
  out['--mt-c-outline-hover'] = mix(5);
  out['--mt-c-text'] = base;
  return out;
}

/** Resolve a single color value (palette name, shade, or CSS color) to a CSS color. */
export function resolveColor(color: string | null | undefined, fallback = 'inherit'): string {
  if (!color) return fallback;
  const c = color.trim();
  if (c === 'dimmed') return 'var(--mt-color-dimmed)';
  if (c === 'bright') return 'var(--mt-color-bright)';
  if (c === 'white') return 'var(--mt-white)';
  if (c === 'black') return 'var(--mt-black)';
  if (NAMED[c]) return `var(--mt-color-${c}-text)`;
  const m = SHADE.exec(c);
  if (m && NAMED[m[1]]) return `var(--mt-color-${m[1]}-${m[2]})`;
  return c;
}
