import { define, html, MtElement, type Props } from '../../core';
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

/**
 * <mt-slider-mark value label>
 * Data-only light-DOM child of <mt-slider>/<mt-range-slider>; never renders
 * visible content itself (the parent draws dots from its attributes).
 */
export class MtSliderMark extends MtElement {
  static props: Props = {
    value: { type: 'number', default: 0 },
    label: {},
  };

  declare value: number;
  declare label: string | null;

  protected onConnect(): void {
    this.style.display = 'none';
  }

  protected update(): void {
    this.emit('mark-change');
  }
}

/**
 * <mt-slider value min="0" max="100" step="1" precision color size="xs..xl"
 *            radius thumb-size thumb-label label label-format label-always-on
 *            show-label-on-hover restrict-to-marks inverted disabled name marks>
 * Slots: thumb-children. Light-DOM children: <mt-slider-mark value label>.
 * Events: `input` while dragging/stepping, `change` on commit. Form-associated.
 */
export class MtSlider extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [trackSizeStyles, sliderStyles];
  static props: Props = {
    value: { type: 'number' },
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

  readonly internals = this.attachInternals();
  #value = 0;
  #marksData: Mark[] = [];
  #formDisabled = false;

  protected template(): string {
    return html`
      <div class="root" part="root">
        <div class="track-container" part="track-container">
          <div class="track" part="track">
            <div class="bar" part="bar"></div>
            <div class="marks" part="marks"></div>
            <div class="thumb" part="thumb" role="slider" tabindex="0">
              <slot name="thumb-children"></slot>
              <div class="label" part="label"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  get value(): number {
    return this.#value;
  }
  set value(v: number) {
    this.#setValue(Number(v), false);
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
    const attr = this.getAttribute('value');
    this.#setValue(attr !== null ? Number(attr) : this.min, false);
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (typeof state === 'string') this.#setValue(Number(state), false);
  }

  protected setup(): void {
    const attr = this.getAttribute('value');
    this.#value = clamp(attr !== null && attr !== '' && !Number.isNaN(Number(attr)) ? Number(attr) : this.min, this.min, this.max);

    this.addEventListener('mark-change', () => this.#syncMarks());
    this.$<HTMLElement>('.track-container').addEventListener('pointerdown', (e) => this.#onPointerDown(e as PointerEvent));
    this.$<HTMLElement>('.thumb').addEventListener('keydown', (e) => this.#onKeyDown(e as KeyboardEvent));

    this.internals.setFormValue(String(this.#value));
    this.#syncMarks();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('marks') || changed.has('min') || changed.has('max')) this.#syncMarks();
    if (changed.has('value')) {
      const attr = this.getAttribute('value');
      if (attr !== null && attr !== '') {
        const n = Number(attr);
        if (!Number.isNaN(n)) this.#setValue(n, false);
      }
    }
    const thumb = this.$<HTMLElement>('.thumb');
    if (changed.has('disabled')) {
      thumb.tabIndex = this.isDisabled ? -1 : 0;
      this.toggleAttribute('aria-disabled', this.isDisabled);
    }
    if (changed.has('thumbLabel') && this.thumbLabel) thumb.setAttribute('aria-label', this.thumbLabel);
    if (changed.has('showLabelOnHover')) thumb.classList.toggle('hover-label', this.showLabelOnHover);
    this.#render();
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
      const filled = this.inverted ? v >= this.#value : v <= this.#value;
      el.toggleAttribute('data-filled', filled);
    }
  }

  #render(): void {
    const pos = getPosition(this.#value, this.min, this.max);
    const bar = this.$<HTMLElement>('.bar');
    const thumb = this.$<HTMLElement>('.thumb');
    if (this.inverted) {
      bar.style.left = `${pos}%`;
      bar.style.width = `${100 - pos}%`;
    } else {
      bar.style.left = '0%';
      bar.style.width = `${pos}%`;
    }
    thumb.style.left = `${pos}%`;
    thumb.setAttribute('aria-valuenow', String(this.#value));
    thumb.setAttribute('aria-valuemin', String(this.min));
    thumb.setAttribute('aria-valuemax', String(this.max));
    thumb.setAttribute('aria-orientation', 'horizontal');
    const text = formatLabel(this.labelFormat, this.#value);
    thumb.setAttribute('aria-valuetext', text);
    const label = this.$<HTMLElement>('.label');
    label.textContent = text;
    label.hidden = !this.label;
    thumb.classList.toggle('always-on', this.labelAlwaysOn && this.label);
    this.#updateMarksFilled();
  }

  #setValue(value: number, emitInput: boolean): void {
    const v = Number(clamp(value, this.min, this.max).toFixed(this.#precisionOf()));
    if (v === this.#value) return;
    this.#value = v;
    this.internals.setFormValue(String(this.#value));
    this.#render();
    if (emitInput) this.emit('input', { value: v });
  }

  #emitChange(): void {
    this.emit('change', { value: this.#value });
  }

  #onPointerDown(e: PointerEvent): void {
    if (this.isDisabled) return;
    e.preventDefault();
    const thumb = this.$<HTMLElement>('.thumb');
    const track = this.$<HTMLElement>('.track');
    thumb.focus();
    thumb.classList.add('dragging');

    const apply = (ev: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      const pct = rect.width === 0 ? 0 : (ev.clientX - rect.left) / rect.width;
      let value = getChangeValue({ pct, min: this.min, max: this.max, step: this.step, precision: this.#precisionOf() });
      if (this.restrictToMarks && this.#marksData.length) value = findClosestValue(value, this.#marksData.map((m) => m.value));
      this.#setValue(value, true);
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

  #stepValue(delta: number): number {
    if (this.restrictToMarks && this.#marksData.length) {
      const values = [...new Set(this.#marksData.map((m) => m.value))].sort((a, b) => a - b);
      let idx = values.indexOf(this.#value);
      if (idx === -1) idx = values.findIndex((v) => v >= this.#value);
      if (idx === -1) idx = delta > 0 ? -1 : values.length;
      const nextIdx = clamp(idx + (delta > 0 ? 1 : -1), 0, values.length - 1);
      return values[nextIdx];
    }
    return Number(clamp(this.#value + delta, this.min, this.max).toFixed(this.#precisionOf()));
  }

  #onKeyDown(e: KeyboardEvent): void {
    if (this.isDisabled) return;
    const step = this.step || 1;
    let next: number | null = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = this.#stepValue(step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = this.#stepValue(-step);
        break;
      case 'PageUp':
        next = this.#stepValue(step * 10);
        break;
      case 'PageDown':
        next = this.#stepValue(-step * 10);
        break;
      case 'Home':
        next = this.restrictToMarks && this.#marksData.length ? Math.min(...this.#marksData.map((m) => m.value)) : this.min;
        break;
      case 'End':
        next = this.restrictToMarks && this.#marksData.length ? Math.max(...this.#marksData.map((m) => m.value)) : this.max;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.#setValue(next, true);
    this.#emitChange();
  }
}

define('mt-slider', MtSlider);
define('mt-slider-mark', MtSliderMark);
