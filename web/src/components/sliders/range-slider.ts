import { css, define, html, MtElement, type Props } from '../../core';
import {
  clamp,
  findClosestValue,
  formatLabel,
  getChangeValue,
  getPosition,
  getPrecision,
  type Mark,
  parseMarks,
  renderMarks,
  sliderStyles,
  trackSizeStyles,
} from './shared';

const rangeStyles = css`
  .bar.inverted-a, .bar.inverted-b { display: none; }
  :host([inverted]) .bar.range { display: none; }
  :host([inverted]) .bar.inverted-a, :host([inverted]) .bar.inverted-b { display: block; }
`;

type Index = 0 | 1;

/**
 * <mt-range-slider value="20,80" min="0" max="100" step="1" precision color
 *                  size="xs..xl" radius thumb-size thumb-label label label-format
 *                  label-always-on show-label-on-hover restrict-to-marks inverted
 *                  disabled name marks min-range="10" max-range push-on-overlap>
 * Slots: thumb-children (applies to both thumbs). Light-DOM children: <mt-slider-mark value label>.
 * Events: `input` while dragging/stepping, `change` on commit. Form-associated:
 * submits two FormData entries under `name` (from, then to).
 */
export class MtRangeSlider extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [trackSizeStyles, sliderStyles, rangeStyles];
  static props: Props = {
    value: {},
    min: { type: 'number', default: 0 },
    max: { type: 'number', default: 100 },
    step: { type: 'number', default: 1 },
    precision: { type: 'number' },
    color: { color: true },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius', default: 'xl' },
    thumbSize: { css: '--_thumb-size', scale: 'rem' },
    thumbLabel: {},
    label: { type: 'boolean', default: true },
    labelFormat: { default: '{value}' },
    labelAlwaysOn: { type: 'boolean' },
    showLabelOnHover: { type: 'boolean', default: true },
    marks: {},
    restrictToMarks: { type: 'boolean' },
    inverted: { type: 'boolean' },
    disabled: { type: 'boolean' },
    name: {},
    minRange: { type: 'number', default: 10 },
    maxRange: { type: 'number' },
    pushOnOverlap: { type: 'boolean', default: true },
  };

  declare min: number;
  declare max: number;
  declare step: number;
  declare precision: number | null;
  declare thumbLabel: string | null;
  declare label: boolean;
  declare labelFormat: string | null;
  declare labelAlwaysOn: boolean;
  declare showLabelOnHover: boolean;
  declare restrictToMarks: boolean;
  declare inverted: boolean;
  declare disabled: boolean;
  declare minRange: number;
  declare maxRange: number | null;
  declare pushOnOverlap: boolean;

  readonly internals = this.attachInternals();
  #from = 20;
  #to = 80;
  #formDisabled = false;
  #marksData: Mark[] = [];

  protected template(): string {
    return html`
      <div class="root" part="root">
        <div class="track-container" part="track-container">
          <div class="track" part="track">
            <div class="bar range" part="bar"></div>
            <div class="bar inverted-a" part="bar"></div>
            <div class="bar inverted-b" part="bar"></div>
            <div class="marks" part="marks"></div>
            <div class="thumb from" part="thumb-from" role="slider" tabindex="0">
              <slot name="thumb-children"></slot>
              <div class="label" part="label"></div>
            </div>
            <div class="thumb to" part="thumb-to" role="slider" tabindex="0">
              <slot name="thumb-children"></slot>
              <div class="label" part="label"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  get value(): [number, number] {
    return [this.#from, this.#to];
  }
  set value(v: [number, number]) {
    this.#from = clamp(Math.min(v[0], v[1]), this.min, this.max);
    this.#to = clamp(Math.max(v[0], v[1]), this.min, this.max);
    this.#commitFormValue();
    this.#render();
    this.#emitChange();
  }

  get isDisabled(): boolean {
    return this.disabled || this.#formDisabled;
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.requestUpdate('disabled');
  }

  formResetCallback(): void {
    const [from, to] = this.#parseValueAttr();
    this.#from = from;
    this.#to = to;
    this.#commitFormValue();
    this.#render();
  }

  protected setup(): void {
    const [from, to] = this.#parseValueAttr();
    this.#from = from;
    this.#to = to;

    this.addEventListener('mark-change', () => this.#syncMarks());
    this.$<HTMLElement>('.track-container').addEventListener('pointerdown', (e) => this.#onPointerDown(e as PointerEvent));
    this.$<HTMLElement>('.thumb.from').addEventListener('keydown', (e) => this.#onKeyDown(e as KeyboardEvent, 0));
    this.$<HTMLElement>('.thumb.to').addEventListener('keydown', (e) => this.#onKeyDown(e as KeyboardEvent, 1));

    this.#commitFormValue();
    this.#syncMarks();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('marks') || changed.has('min') || changed.has('max')) this.#syncMarks();
    if (changed.has('value')) {
      const [from, to] = this.#parseValueAttr();
      this.#from = from;
      this.#to = to;
    }
    if (changed.has('disabled')) {
      for (const thumb of this.root.querySelectorAll<HTMLElement>('.thumb')) {
        thumb.tabIndex = this.isDisabled ? -1 : 0;
      }
      this.toggleAttribute('aria-disabled', this.isDisabled);
    }
    if (changed.has('thumbLabel') && this.thumbLabel) {
      this.$('.thumb.from').setAttribute('aria-label', `${this.thumbLabel} (from)`);
      this.$('.thumb.to').setAttribute('aria-label', `${this.thumbLabel} (to)`);
    }
    if (changed.has('showLabelOnHover')) {
      for (const thumb of this.root.querySelectorAll<HTMLElement>('.thumb')) thumb.classList.toggle('hover-label', this.showLabelOnHover);
    }
    this.#render();
  }

  #parseValueAttr(): [number, number] {
    const raw = this.getAttribute('value');
    if (!raw) return [this.min, this.max];
    const [a, b] = raw.split(',').map(Number);
    if (Number.isNaN(a) || Number.isNaN(b)) return [this.min, this.max];
    return [clamp(a, this.min, this.max), clamp(b, this.min, this.max)];
  }

  #precisionOf(): number {
    return this.precision ?? getPrecision(this.step);
  }

  #syncMarks(): void {
    const raw = this.getAttribute('marks');
    if (raw) {
      this.#marksData = parseMarks(raw);
    } else {
      this.#marksData = Array.from(this.querySelectorAll(':scope > mt-slider-mark')).map((el) => ({
        value: Number(el.getAttribute('value') ?? '0'),
        label: el.getAttribute('label') ?? (el.textContent?.trim() || undefined),
      }));
    }
    this.$<HTMLElement>('.marks').innerHTML = renderMarks(this.#marksData, this.min, this.max);
    this.#updateMarksFilled();
  }

  #updateMarksFilled(): void {
    for (const el of this.root.querySelectorAll<HTMLElement>('.mark')) {
      const v = Number(el.dataset.value);
      el.toggleAttribute('data-filled', v >= this.#from && v <= this.#to);
    }
  }

  #applyThumbValue(index: Index, raw: number): void {
    const maxRange = this.maxRange ?? Infinity;
    let from = this.#from;
    let to = this.#to;
    const precision = this.#precisionOf();
    const val = Number(clamp(raw, this.min, this.max).toFixed(precision));
    if (index === 0) {
      from = Math.min(val, this.max);
      if (to - from < this.minRange) {
        if (this.pushOnOverlap) to = clamp(from + this.minRange, this.min, this.max);
        else from = clamp(to - this.minRange, this.min, this.max);
      }
      if (to - from > maxRange) {
        if (this.pushOnOverlap) to = clamp(from + maxRange, this.min, this.max);
      }
    } else {
      to = Math.max(val, this.min);
      if (to - from < this.minRange) {
        if (this.pushOnOverlap) from = clamp(to - this.minRange, this.min, this.max);
        else to = clamp(from + this.minRange, this.min, this.max);
      }
      if (to - from > maxRange) {
        if (this.pushOnOverlap) from = clamp(to - maxRange, this.min, this.max);
      }
    }
    if (from > to) {
      if (index === 0) to = from;
      else from = to;
    }
    const changed = from !== this.#from || to !== this.#to;
    this.#from = from;
    this.#to = to;
    if (changed) {
      this.internals.setFormValue(this.#formData());
      this.#render();
    }
  }

  #formData(): FormData {
    const fd = new FormData();
    const name = this.getAttribute('name');
    if (name) {
      fd.append(name, String(this.#from));
      fd.append(name, String(this.#to));
    }
    return fd;
  }

  #commitFormValue(): void {
    this.internals.setFormValue(this.#formData());
  }

  #emitChange(): void {
    this.emit('change', { value: [this.#from, this.#to] });
  }

  #render(): void {
    const posFrom = getPosition(this.#from, this.min, this.max);
    const posTo = getPosition(this.#to, this.min, this.max);
    const range = this.$<HTMLElement>('.bar.range');
    range.style.left = `${posFrom}%`;
    range.style.width = `${posTo - posFrom}%`;
    const invA = this.$<HTMLElement>('.bar.inverted-a');
    invA.style.left = '0%';
    invA.style.width = `${posFrom}%`;
    const invB = this.$<HTMLElement>('.bar.inverted-b');
    invB.style.left = `${posTo}%`;
    invB.style.width = `${100 - posTo}%`;

    const fromThumb = this.$<HTMLElement>('.thumb.from');
    const toThumb = this.$<HTMLElement>('.thumb.to');
    fromThumb.style.left = `${posFrom}%`;
    toThumb.style.left = `${posTo}%`;

    const fromText = formatLabel(this.labelFormat, this.#from);
    const toText = formatLabel(this.labelFormat, this.#to);
    for (const [thumb, value, text] of [
      [fromThumb, this.#from, fromText],
      [toThumb, this.#to, toText],
    ] as const) {
      thumb.setAttribute('aria-valuenow', String(value));
      thumb.setAttribute('aria-valuemin', String(this.min));
      thumb.setAttribute('aria-valuemax', String(this.max));
      thumb.setAttribute('aria-orientation', 'horizontal');
      thumb.setAttribute('aria-valuetext', text);
      const label = thumb.querySelector<HTMLElement>('.label')!;
      label.textContent = text;
      label.hidden = !this.label;
      thumb.classList.toggle('always-on', this.labelAlwaysOn && this.label);
    }
    this.#updateMarksFilled();
  }

  #onPointerDown(e: PointerEvent): void {
    if (this.isDisabled) return;
    e.preventDefault();
    const track = this.$<HTMLElement>('.track');
    const rect0 = track.getBoundingClientRect();
    const pct0 = rect0.width === 0 ? 0 : (e.clientX - rect0.left) / rect0.width;
    const target = getChangeValue({ pct: pct0, min: this.min, max: this.max, step: this.step, precision: this.#precisionOf() });
    const index: Index = Math.abs(target - this.#from) <= Math.abs(target - this.#to) ? 0 : 1;
    const thumb = this.$<HTMLElement>(index === 0 ? '.thumb.from' : '.thumb.to');
    thumb.focus();
    thumb.classList.add('dragging');

    const apply = (ev: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      const pct = rect.width === 0 ? 0 : (ev.clientX - rect.left) / rect.width;
      let value = getChangeValue({ pct, min: this.min, max: this.max, step: this.step, precision: this.#precisionOf() });
      if (this.restrictToMarks && this.#marksData.length) value = findClosestValue(value, this.#marksData.map((m) => m.value));
      this.#applyThumbValue(index, value);
      this.emit('input', { value: [this.#from, this.#to] });
    };

    const move = (ev: PointerEvent) => apply(ev);
    const up = (ev: PointerEvent) => {
      apply(ev);
      thumb.classList.remove('dragging');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      this.#emitChange();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
    apply(e);
  }

  #stepValue(index: Index, delta: number): number {
    const current = index === 0 ? this.#from : this.#to;
    if (this.restrictToMarks && this.#marksData.length) {
      const values = [...new Set(this.#marksData.map((m) => m.value))].sort((a, b) => a - b);
      let idx = values.indexOf(current);
      if (idx === -1) idx = values.findIndex((v) => v >= current);
      if (idx === -1) idx = delta > 0 ? -1 : values.length;
      const nextIdx = clamp(idx + (delta > 0 ? 1 : -1), 0, values.length - 1);
      return values[nextIdx];
    }
    return Number(clamp(current + delta, this.min, this.max).toFixed(this.#precisionOf()));
  }

  #onKeyDown(e: KeyboardEvent, index: Index): void {
    if (this.isDisabled) return;
    const step = this.step || 1;
    let next: number | null = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = this.#stepValue(index, step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = this.#stepValue(index, -step);
        break;
      case 'PageUp':
        next = this.#stepValue(index, step * 10);
        break;
      case 'PageDown':
        next = this.#stepValue(index, -step * 10);
        break;
      case 'Home':
        next = this.min;
        break;
      case 'End':
        next = this.max;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.#applyThumbValue(index, next);
    this.emit('input', { value: [this.#from, this.#to] });
    this.#emitChange();
  }
}

define('mt-range-slider', MtRangeSlider);
