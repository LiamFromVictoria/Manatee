/**
 * Color scheme management. The resolved scheme is written to
 * <html data-mt-color-scheme="light|dark">; the user preference
 * ('light' | 'dark' | 'auto') is persisted in localStorage.
 * mt.Head() inlines an equivalent pre-paint snippet to avoid a flash.
 */
export type ColorScheme = 'light' | 'dark' | 'auto';

const KEY = 'mt-color-scheme';
const media = matchMedia('(prefers-color-scheme: dark)');

export function getColorScheme(): ColorScheme {
  const v = localStorage.getItem(KEY);
  return v === 'light' || v === 'dark' ? v : 'auto';
}

export function resolvedColorScheme(): 'light' | 'dark' {
  const s = getColorScheme();
  return s === 'auto' ? (media.matches ? 'dark' : 'light') : s;
}

function apply(): void {
  const resolved = resolvedColorScheme();
  document.documentElement.setAttribute('data-mt-color-scheme', resolved);
  window.dispatchEvent(new CustomEvent('mt-color-scheme-change', { detail: resolved }));
}

export function setColorScheme(scheme: ColorScheme): void {
  if (scheme === 'auto') localStorage.removeItem(KEY);
  else localStorage.setItem(KEY, scheme);
  apply();
}

export function toggleColorScheme(): void {
  setColorScheme(resolvedColorScheme() === 'dark' ? 'light' : 'dark');
}

media.addEventListener('change', () => {
  if (getColorScheme() === 'auto') apply();
});
if (!document.documentElement.hasAttribute('data-mt-color-scheme')) apply();
