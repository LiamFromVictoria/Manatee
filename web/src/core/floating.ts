/**
 * Floating element positioning (dropdowns, menus, tooltips, popovers).
 *
 * The floating element should carry popover="manual" so it renders in the top
 * layer (no z-index or overflow clipping), and be shown with showPopover().
 * `floatingStyles` resets the UA popover box; adopt it in the component.
 */
import { css } from './element';

export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Placement = Side | `${Side}-start` | `${Side}-end`;

export interface FloatingOptions {
  placement?: Placement;
  /** Gap between reference and floating element, px. Default 8. */
  offset?: number;
  /** Flip to the opposite side when there is not enough room. Default true. */
  flip?: boolean;
  /** Set the floating element's width to the reference width (Select/Combobox). */
  matchWidth?: boolean;
}

export const floatingStyles = css`
  [popover] {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    overflow: visible;
  }
`;

const OPPOSITE: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
const EDGE = 4;

/** Position `floating` relative to `reference` once. Sets left/top and data-placement. */
export function position(reference: Element, floating: HTMLElement, opts: FloatingOptions = {}): void {
  const { placement = 'bottom', offset = 8, flip = true, matchWidth = false } = opts;
  const r = reference.getBoundingClientRect();
  if (matchWidth) floating.style.width = `${r.width}px`;
  const f = floating.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const [requested, align = 'center'] = placement.split('-') as [Side, string?];

  const room: Record<Side, number> = {
    bottom: vh - r.bottom - offset - f.height,
    top: r.top - offset - f.height,
    right: vw - r.right - offset - f.width,
    left: r.left - offset - f.width,
  };
  let side = requested;
  if (flip && room[side] < 0 && room[OPPOSITE[side]] > room[side]) side = OPPOSITE[side];

  let x: number;
  let y: number;
  if (side === 'top' || side === 'bottom') {
    y = side === 'bottom' ? r.bottom + offset : r.top - offset - f.height;
    x = align === 'start' ? r.left : align === 'end' ? r.right - f.width : r.left + (r.width - f.width) / 2;
    x = Math.min(Math.max(x, EDGE), vw - f.width - EDGE);
  } else {
    x = side === 'right' ? r.right + offset : r.left - offset - f.width;
    y = align === 'start' ? r.top : align === 'end' ? r.bottom - f.height : r.top + (r.height - f.height) / 2;
    y = Math.min(Math.max(y, EDGE), vh - f.height - EDGE);
  }
  floating.style.left = `${Math.round(x)}px`;
  floating.style.top = `${Math.round(y)}px`;
  floating.dataset.placement = align === 'center' ? side : `${side}-${align}`;
}

/**
 * Keep `floating` positioned while open: repositions on scroll (any ancestor),
 * resize and size changes of either element. Returns a cleanup function.
 */
export function autoPosition(reference: Element, floating: HTMLElement, opts: FloatingOptions = {}): () => void {
  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => position(reference, floating, opts));
  };
  position(reference, floating, opts);
  const ro = new ResizeObserver(schedule);
  ro.observe(reference);
  ro.observe(floating);
  addEventListener('scroll', schedule, { capture: true, passive: true });
  addEventListener('resize', schedule, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    removeEventListener('scroll', schedule, { capture: true });
    removeEventListener('resize', schedule);
  };
}

/**
 * Call `onDismiss` on pointerdown outside every element in `inside` (composed
 * path aware, so shadow content counts) or on Escape. Returns a cleanup function.
 */
export function onDismiss(inside: Element[], onDismiss: (reason: 'outside' | 'escape') => void): () => void {
  const pointer = (e: PointerEvent) => {
    const path = e.composedPath();
    if (!inside.some((el) => path.includes(el))) onDismiss('outside');
  };
  const key = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onDismiss('escape');
  };
  document.addEventListener('pointerdown', pointer, true);
  document.addEventListener('keydown', key);
  return () => {
    document.removeEventListener('pointerdown', pointer, true);
    document.removeEventListener('keydown', key);
  };
}
