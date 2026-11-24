import { css, define, html, MtElement, type Props } from '../../core';

const BREAKPOINTS: Array<[string, string]> = [
  ['xs', '36em'],
  ['sm', '48em'],
  ['md', '62em'],
  ['lg', '75em'],
  ['xl', '88em'],
];

const responsiveVars = (prop: string, target: string): string =>
  BREAKPOINTS.map(
    ([bp, em]) => `@media (min-width: ${em}) { :host([${prop}-${bp}]) { ${target}: var(--_${prop}-${bp}); } }`,
  ).join('\n');

const chevron =
  '<svg viewBox="0 0 24 24" width="40%" height="40%" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

const styles = css`
  :host {
    display: block;
    position: relative;
    --_slide-size: 100%;
    --_slide-gap: 0px;
    --_slides-to-scroll: 1;
    --_align: center;
    --_controls-offset: var(--mt-spacing-sm);
    --_control-size: 1.625rem;
    --_height: auto;
    --_indicator-w: 1.875rem;
    --_indicator-active-w: 2.5rem;
  }
  ${responsiveVars('slide-size', '--_slide-size')}
  ${responsiveVars('slide-gap', '--_slide-gap')}
  ${responsiveVars('slides-to-scroll', '--_slides-to-scroll')}

  .viewport {
    position: relative;
    overflow: hidden;
    border-radius: var(--_radius, 0);
  }
  .container {
    display: flex;
    height: var(--_height);
    gap: var(--_slide-gap);
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    outline: none;
    touch-action: pan-y;
  }
  .container::-webkit-scrollbar { display: none; }
  .container.dragging { scroll-snap-type: none; scroll-behavior: auto; cursor: grabbing; user-select: none; }
  :host([drag-free]) .container { scroll-snap-type: none; }

  :host([orientation='vertical']) .container {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    touch-action: pan-x;
  }
  :host([orientation='vertical'][drag-free]) .container { scroll-snap-type: none; }

  .control {
    position: absolute;
    z-index: 2;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--_control-size);
    height: var(--_control-size);
    transform: translateY(-50%);
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    box-shadow: var(--mt-shadow-md);
    cursor: pointer;
    opacity: 1;
    transition: opacity var(--mt-transition), background-color var(--mt-transition);
  }
  .control:hover:not(:disabled) { background: var(--mt-color-hover); }
  .control:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .control:disabled { opacity: 0.4; cursor: not-allowed; }
  .control.prev { inset-inline-start: var(--_controls-offset); }
  .control.next { inset-inline-end: var(--_controls-offset); }
  :host([with-controls='false']) .control { display: none; }

  :host([orientation='vertical']) .control {
    top: auto;
    inset-inline-start: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
  :host([orientation='vertical']) .control.prev { top: var(--_controls-offset); inset-inline-end: auto; }
  :host([orientation='vertical']) .control.next { bottom: var(--_controls-offset); top: auto; inset-inline-end: auto; }

  .indicators {
    display: none;
    position: absolute;
    z-index: 2;
    bottom: var(--_controls-offset);
    inset-inline-start: 0;
    inset-inline-end: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    pointer-events: none;
  }
  :host([with-indicators]) .indicators { display: flex; }
  :host([orientation='vertical']) .indicators {
    bottom: 0;
    top: 0;
    inset-inline-start: auto;
    inset-inline-end: var(--_controls-offset);
    flex-direction: column;
    width: auto;
  }
  .indicator {
    pointer-events: all;
    width: var(--_indicator-w);
    height: 0.25rem;
    padding: 0;
    border: none;
    border-radius: var(--mt-radius-xl);
    background: var(--mt-white);
    opacity: 0.6;
    cursor: pointer;
    transition: opacity var(--mt-transition), width var(--mt-transition);
  }
  .indicator[data-active] { opacity: 1; --_indicator-w: var(--_indicator-active-w); }
  :host([orientation='vertical']) .indicator { width: 0.25rem; height: var(--_indicator-w); }
`;

/**
 * <mt-carousel orientation="horizontal|vertical" slide-size slide-gap align="start|center|end"
 *              slide-size-xs..slide-size-xl slide-gap-xs..slide-gap-xl
 *              slides-to-scroll slides-to-scroll-xs..slides-to-scroll-xl loop drag-free
 *              with-controls with-indicators controls-offset control-size height initial-slide>
 * Slot: default, a run of <mt-carousel-slide> children.
 * Events: slide-change { index }.
 * Methods: next(), prev(), scrollToSlide(index, { smooth? }).
 */
export class MtCarousel extends MtElement {
  static styles = [styles];
  static props: Props = {
    orientation: { default: 'horizontal' },
    slideSize: { attr: 'slide-size', css: '--_slide-size', default: '100%' },
    slideGap: { attr: 'slide-gap', css: '--_slide-gap', scale: 'spacing', default: 0 },
    slideSizeXs: { attr: 'slide-size-xs', css: '--_slide-size-xs' },
    slideSizeSm: { attr: 'slide-size-sm', css: '--_slide-size-sm' },
    slideSizeMd: { attr: 'slide-size-md', css: '--_slide-size-md' },
    slideSizeLg: { attr: 'slide-size-lg', css: '--_slide-size-lg' },
    slideSizeXl: { attr: 'slide-size-xl', css: '--_slide-size-xl' },
    slideGapXs: { attr: 'slide-gap-xs', css: '--_slide-gap-xs', scale: 'spacing' },
    slideGapSm: { attr: 'slide-gap-sm', css: '--_slide-gap-sm', scale: 'spacing' },
    slideGapMd: { attr: 'slide-gap-md', css: '--_slide-gap-md', scale: 'spacing' },
    slideGapLg: { attr: 'slide-gap-lg', css: '--_slide-gap-lg', scale: 'spacing' },
    slideGapXl: { attr: 'slide-gap-xl', css: '--_slide-gap-xl', scale: 'spacing' },
    slidesToScroll: { attr: 'slides-to-scroll', css: '--_slides-to-scroll', type: 'number', default: 1 },
    slidesToScrollXs: { attr: 'slides-to-scroll-xs', css: '--_slides-to-scroll-xs', type: 'number' },
    slidesToScrollSm: { attr: 'slides-to-scroll-sm', css: '--_slides-to-scroll-sm', type: 'number' },
    slidesToScrollMd: { attr: 'slides-to-scroll-md', css: '--_slides-to-scroll-md', type: 'number' },
    slidesToScrollLg: { attr: 'slides-to-scroll-lg', css: '--_slides-to-scroll-lg', type: 'number' },
    slidesToScrollXl: { attr: 'slides-to-scroll-xl', css: '--_slides-to-scroll-xl', type: 'number' },
    align: { css: '--_align', default: 'center' },
    loop: { type: 'boolean' },
    dragFree: { attr: 'drag-free', type: 'boolean' },
    withControls: { attr: 'with-controls', type: 'boolean', default: true },
    withIndicators: { attr: 'with-indicators', type: 'boolean' },
    controlsOffset: { attr: 'controls-offset', css: '--_controls-offset', scale: 'spacing', default: 'sm' },
    controlSize: { attr: 'control-size', css: '--_control-size', scale: 'rem', default: 26 },
    height: { css: '--_height', scale: 'rem' },
    radius: { css: '--_radius', scale: 'radius' },
    initialSlide: { attr: 'initial-slide', type: 'number', default: 0 },
  };

  declare orientation: string;
  declare align: string;
  declare loop: boolean;
  declare dragFree: boolean;
  declare withControls: boolean;
  declare withIndicators: boolean;
  declare initialSlide: number;

  #index = 0;
  #dragging = false;
  #dragMoved = false;
  #dragStart = 0;
  #dragScrollStart = 0;
  #slotEl!: HTMLSlotElement;
  #container!: HTMLDivElement;

  protected template(): string {
    return html`
      <div class="viewport" part="viewport">
        <div class="container" part="container" tabindex="0" role="group" aria-roledescription="carousel"><slot></slot></div>
      </div>
      <button class="control prev" part="control-prev" type="button" aria-label="Previous slide">${chevron.replace('M9 6l6 6-6 6', 'M15 6l-6 6 6 6')}</button>
      <button class="control next" part="control-next" type="button" aria-label="Next slide">${chevron}</button>
      <div class="indicators" part="indicators" role="tablist"></div>
    `;
  }

  protected setup(): void {
    this.#container = this.$('.container');
    this.#slotEl = this.$('slot');
    this.$<HTMLButtonElement>('.control.prev').addEventListener('click', () => this.prev());
    this.$<HTMLButtonElement>('.control.next').addEventListener('click', () => this.next());

    this.#container.addEventListener('keydown', (e) => {
      const horiz = this.orientation !== 'vertical';
      if (horiz && e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
      else if (horiz && e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
      else if (!horiz && e.key === 'ArrowUp') { e.preventDefault(); this.prev(); }
      else if (!horiz && e.key === 'ArrowDown') { e.preventDefault(); this.next(); }
    });

    this.#container.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || (e.target as Element).closest('a,button,input,textarea,select')) return;
      this.#dragging = true;
      this.#dragMoved = false;
      this.#dragStart = this.orientation === 'vertical' ? e.clientY : e.clientX;
      this.#dragScrollStart = this.orientation === 'vertical' ? this.#container.scrollTop : this.#container.scrollLeft;
      this.#container.setPointerCapture(e.pointerId);
      this.#container.classList.add('dragging');
    });
    this.#container.addEventListener('pointermove', (e) => {
      if (!this.#dragging) return;
      const pos = this.orientation === 'vertical' ? e.clientY : e.clientX;
      const delta = pos - this.#dragStart;
      if (Math.abs(delta) > 3) this.#dragMoved = true;
      if (this.orientation === 'vertical') this.#container.scrollTop = this.#dragScrollStart - delta;
      else this.#container.scrollLeft = this.#dragScrollStart - delta;
    });
    const endDrag = (e: PointerEvent): void => {
      if (!this.#dragging) return;
      this.#dragging = false;
      this.#container.classList.remove('dragging');
      try { this.#container.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      if (!this.dragFree) requestAnimationFrame(() => this.scrollToSlide(this.#nearestIndex()));
      else this.#syncIndexFromScroll();
    };
    this.#container.addEventListener('pointerup', endDrag);
    this.#container.addEventListener('pointercancel', endDrag);
    this.#container.addEventListener(
      'click',
      (e) => {
        if (this.#dragMoved) { e.preventDefault(); e.stopPropagation(); this.#dragMoved = false; }
      },
      true,
    );

    this.#container.addEventListener('scrollend', () => this.#syncIndexFromScroll());
    let scrollTimer: number | undefined;
    this.#container.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => this.#syncIndexFromScroll(), 120);
    });

    this.#slotEl.addEventListener('slotchange', () => {
      this.#rebuildIndicators();
      this.#syncControls();
    });
  }

  protected onConnect(): void {
    requestAnimationFrame(() => {
      this.#rebuildIndicators();
      this.scrollToSlide(this.initialSlide, { smooth: false });
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('withIndicators')) this.#rebuildIndicators();
    if (changed.has('loop') || changed.has('withControls')) this.#syncControls();
  }

  /** Light-DOM <mt-carousel-slide> children in document order. */
  get slides(): HTMLElement[] {
    return Array.from(this.children).filter((el) => el.tagName === 'MT-CAROUSEL-SLIDE') as HTMLElement[];
  }

  next(): void {
    const slides = this.slides;
    if (!slides.length) return;
    const step = this.#slidesToScrollCount();
    let i = this.#index + step;
    if (i >= slides.length) {
      if (!this.loop) i = slides.length - 1;
      else i %= slides.length;
    }
    if (i === this.#index) return;
    this.scrollToSlide(i);
  }

  prev(): void {
    const slides = this.slides;
    if (!slides.length) return;
    const step = this.#slidesToScrollCount();
    let i = this.#index - step;
    if (i < 0) {
      if (!this.loop) i = 0;
      else i = ((i % slides.length) + slides.length) % slides.length;
    }
    if (i === this.#index) return;
    this.scrollToSlide(i);
  }

  /** Effective slides-to-scroll at the current breakpoint (resolved through the CSS cascade). */
  #slidesToScrollCount(): number {
    const v = parseInt(getComputedStyle(this).getPropertyValue('--_slides-to-scroll'), 10);
    return Number.isFinite(v) && v > 0 ? v : 1;
  }

  scrollToSlide(index: number, opts: { smooth?: boolean } = {}): void {
    const slides = this.slides;
    if (!slides.length) return;
    const i = Math.max(0, Math.min(index, slides.length - 1));
    const target = this.#targetScroll(slides[i]);
    const smooth = opts.smooth !== false;
    if (this.orientation === 'vertical') this.#container.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'instant' });
    else this.#container.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'instant' });
    this.#setIndex(i);
  }

  #targetScroll(slide: HTMLElement): number {
    const vertical = this.orientation === 'vertical';
    const cRect = this.#container.getBoundingClientRect();
    const sRect = slide.getBoundingClientRect();
    const containerSize = vertical ? this.#container.clientHeight : this.#container.clientWidth;
    const slideSize = vertical ? sRect.height : sRect.width;
    const slideStart = (vertical ? sRect.top - cRect.top : sRect.left - cRect.left) + (vertical ? this.#container.scrollTop : this.#container.scrollLeft);
    let target = slideStart;
    if (this.align === 'center') target = slideStart - (containerSize - slideSize) / 2;
    else if (this.align === 'end') target = slideStart - (containerSize - slideSize);
    const max = vertical ? this.#container.scrollHeight - containerSize : this.#container.scrollWidth - containerSize;
    return Math.max(0, Math.min(target, max));
  }

  #nearestIndex(): number {
    const slides = this.slides;
    if (!slides.length) return 0;
    const vertical = this.orientation === 'vertical';
    const pos = vertical ? this.#container.scrollTop : this.#container.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const d = Math.abs(this.#targetScroll(slide) - pos);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  #syncIndexFromScroll(): void {
    if (this.#dragging) return;
    this.#setIndex(this.#nearestIndex());
  }

  #setIndex(i: number): void {
    if (i === this.#index) { this.#syncControls(); return; }
    this.#index = i;
    this.#syncControls();
    this.emit('slide-change', { index: i });
  }

  #syncControls(): void {
    const slides = this.slides;
    const prevBtn = this.$<HTMLButtonElement>('.control.prev');
    const nextBtn = this.$<HTMLButtonElement>('.control.next');
    prevBtn.disabled = !this.loop && this.#index <= 0;
    nextBtn.disabled = !this.loop && this.#index >= slides.length - 1;
    this.root.querySelectorAll<HTMLButtonElement>('.indicator').forEach((el, i) => {
      const active = i === this.#index;
      el.toggleAttribute('data-active', active);
      el.setAttribute('part', active ? 'indicator indicator-active' : 'indicator');
      el.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  #rebuildIndicators(): void {
    const wrap = this.$<HTMLDivElement>('.indicators');
    const slides = this.slides;
    wrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'indicator';
      b.setAttribute('part', 'indicator');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Slide ${i + 1}`);
      b.addEventListener('click', () => this.scrollToSlide(i));
      wrap.append(b);
    });
    this.#syncControls();
  }
}

const slideStyles = css`
  :host {
    display: block;
    flex: 0 0 var(--_slide-size, 100%);
    min-width: 0;
    min-height: 0;
    scroll-snap-align: var(--_align, center);
    scroll-snap-stop: always;
  }
`;

/** <mt-carousel-slide>: one slide of an <mt-carousel>. Slot: default. */
export class MtCarouselSlide extends MtElement {
  static styles = [slideStyles];

  protected template(): string {
    return '<slot></slot>';
  }
}

define('mt-carousel', MtCarousel);
define('mt-carousel-slide', MtCarouselSlide);
