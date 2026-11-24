import { css, escapeHtml } from '../../core';

export interface Mark {
  value: number;
  label?: string;
  /** Serialized rich content (cloned light-DOM children), takes priority over `label`. */
  labelHtml?: string;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/** Significant decimal digits implied by `step` (e.g. 0.1 -> 1). */
export function getPrecision(step: number): number {
  if (!step) return 0;
  const parts = String(step).split('.');
  return parts.length > 1 ? parts[1].length : 0;
}

/** Percent position (0..100) of `value` along [min, max]. */
export function getPosition(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

/** Pointer fraction (0..1) along the track -> stepped, clamped, precision-rounded value. */
export function getChangeValue(opts: { pct: number; min: number; max: number; step: number; precision?: number }): number {
  const { pct, min, max, step, precision } = opts;
  const dx = clamp(pct, 0, 1) * (max - min);
  const stepped = step ? Math.round(dx / step) * step : dx;
  const next = clamp(stepped + min, min, max);
  const p = precision ?? getPrecision(step);
  return Number(next.toFixed(p));
}

/** Parse the `marks` JSON attribute: `[{"value":20,"label":"20%"}, ...]`. */
export function parseMarks(raw: string | null): Mark[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: Mark[] = [];
    for (const m of parsed) {
      if (typeof m === 'number') out.push({ value: m });
      else if (m && typeof m === 'object' && typeof m.value === 'number') out.push({ value: m.value, label: m.label });
    }
    return out;
  } catch {
    return [];
  }
}

export function findClosestValue(value: number, values: number[]): number {
  if (!values.length) return value;
  return values.reduce((closest, v) => (Math.abs(v - value) < Math.abs(closest - value) ? v : closest), values[0]);
}

/** Clone `el`'s light-DOM children into a detached container and serialize them, for use as a mark's rich label. */
export function richMarkContent(el: Element): string | undefined {
  if (el.childNodes.length === 0) return undefined;
  const container = document.createElement('div');
  for (const node of Array.from(el.childNodes)) container.appendChild(node.cloneNode(true));
  return container.innerHTML.trim() ? container.innerHTML : undefined;
}

export function formatLabel(format: string | null, value: number): string {
  return (format ?? '{value}').replace('{value}', String(value));
}

export function renderMarks(marks: Mark[], min: number, max: number): string {
  return marks
    .map((m) => {
      const pos = getPosition(m.value, min, max);
      const label = m.labelHtml
        ? `<span class="mark-label" part="mark-label">${m.labelHtml}</span>`
        : m.label
          ? `<span class="mark-label" part="mark-label">${escapeHtml(m.label)}</span>`
          : '';
      return `<span class="mark" part="mark" data-value="${m.value}" style="left:${pos}%">${label}</span>`;
    })
    .join('');
}

/** Track size scale shared by Slider and RangeSlider: xs 4px, sm 6px, md 8px, lg 10px, xl 12px. */
export const trackSizeStyles = css`
  :host { display: block; width: 100%; --_size: 0.5rem; --_thumb-size: calc(var(--_size) * 2); --_radius: var(--mt-radius-xl); }
  :host([size='xs']) { --_size: 0.25rem; }
  :host([size='sm']) { --_size: 0.375rem; }
  :host([size='lg']) { --_size: 0.625rem; }
  :host([size='xl']) { --_size: 0.75rem; }
`;

/** Track, bar, thumb, label and mark visuals shared by Slider and RangeSlider. */
export const sliderStyles = css`
  .root { position: relative; padding-block: calc(var(--_thumb-size) / 2); outline: none; -webkit-tap-highlight-color: transparent; touch-action: none; }
  .track-container { position: relative; width: 100%; }
  .track { position: relative; height: var(--_size); border-radius: var(--_radius); background: light-dark(var(--mt-color-gray-2), var(--mt-color-dark-4)); cursor: pointer; }
  :host([disabled]) .track { cursor: not-allowed; }

  .bar { position: absolute; top: 0; bottom: 0; background: var(--mt-c-filled); border-radius: var(--_radius); }
  :host([disabled]) .bar { background: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); }

  .thumb {
    position: absolute;
    top: 50%;
    width: var(--_thumb-size);
    height: var(--_thumb-size);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--mt-color-body);
    border: 2px solid var(--mt-c-filled);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    outline: none;
    box-shadow: var(--mt-shadow-sm);
    z-index: 2;
  }
  .thumb:active { cursor: grabbing; }
  .thumb:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([disabled]) .thumb { background: light-dark(var(--mt-color-gray-1), var(--mt-color-dark-5)); border-color: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); cursor: not-allowed; box-shadow: none; }

  .label {
    position: absolute;
    bottom: calc(100% + 0.625rem);
    left: 50%;
    transform: translate(-50%, 4px) scale(0.4);
    padding: 0.125rem 0.5rem;
    border-radius: var(--mt-radius-sm);
    background: var(--mt-c-filled);
    color: var(--mt-white);
    font-size: var(--mt-font-size-xs);
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: transform 100ms ease, opacity 100ms ease;
  }
  .thumb.hover-label:hover .label,
  .thumb.dragging .label,
  .thumb.always-on .label { opacity: 1; transform: translate(-50%, 0) scale(1); }
  .label[hidden] { display: none !important; }

  .marks { position: absolute; inset: 0; }
  .mark {
    position: absolute;
    top: 50%;
    width: var(--_size);
    height: var(--_size);
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3));
    border: 2px solid var(--mt-color-body);
    pointer-events: none;
  }
  .mark[data-filled] { background: var(--mt-c-filled); border-color: var(--mt-c-filled); }
  :host([disabled]) .mark[data-filled] { background: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); border-color: light-dark(var(--mt-color-gray-4), var(--mt-color-dark-3)); }
  .mark-label {
    position: absolute;
    top: calc(100% + var(--mt-spacing-xs));
    left: 50%;
    transform: translate(-50%, 0);
    font-size: var(--mt-font-size-xs);
    color: var(--mt-color-dimmed);
    white-space: nowrap;
  }
`;
