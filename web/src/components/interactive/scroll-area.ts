import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: block; position: relative; overflow: hidden; }
  .viewport {
    width: 100%;
    height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }
  .viewport::-webkit-scrollbar { display: none; }
  :host([offset-scrollbars='true']) .viewport,
  :host([offset-scrollbars='']) .viewport { padding-inline-end: var(--_sb-size, 0.5rem); padding-block-end: var(--_sb-size, 0.5rem); }
  :host([offset-scrollbars='x']) .viewport { padding-inline-end: var(--_sb-size, 0.5rem); }
  :host([offset-scrollbars='y']) .viewport { padding-block-end: var(--_sb-size, 0.5rem); }

  .scrollbar {
    position: absolute;
    display: none;
    z-index: 2;
    opacity: 0;
    transition: opacity 150ms ease;
    pointer-events: none;
    touch-action: none;
  }
  .scrollbar[data-visible] { opacity: 1; pointer-events: auto; }
  :host([type='always']) .scrollbar, :host([type='auto']) .scrollbar { opacity: 1; pointer-events: auto; }
  :host([type='never']) .scrollbar { display: none !important; }

  :host([data-overflow-x]) .scrollbar-x { display: block; }
  :host([data-overflow-y]) .scrollbar-y { display: block; }
  :host([scrollbars='x']) .scrollbar-y { display: none !important; }
  :host([scrollbars='y']) .scrollbar-x { display: none !important; }

  .scrollbar-x { left: 0; right: 0; bottom: 0; height: var(--_sb-size, 0.5rem); }
  :host([data-overflow-y]:not([scrollbars='x'])) .scrollbar-x { right: var(--_sb-size, 0.5rem); }
  .scrollbar-y { top: 0; bottom: 0; right: 0; width: var(--_sb-size, 0.5rem); }
  :host([data-overflow-x]:not([scrollbars='y'])) .scrollbar-y { bottom: var(--_sb-size, 0.5rem); }

  .thumb {
    position: absolute;
    background: var(--mt-color-dimmed);
    opacity: 0.5;
    border-radius: 999px;
    cursor: pointer;
  }
  .thumb:hover, .thumb:active { opacity: 0.7; }
  .scrollbar-x .thumb { top: 0; bottom: 0; }
  .scrollbar-y .thumb { left: 0; right: 0; }

  .corner {
    position: absolute;
    right: 0;
    bottom: 0;
    width: var(--_sb-size, 0.5rem);
    height: var(--_sb-size, 0.5rem);
    display: none;
  }
  :host([data-overflow-x][data-overflow-y]:not([scrollbars='x']):not([scrollbars='y'])) .corner { display: block; }
`;

/**
 * <mt-scroll-area type="hover|scroll|always|auto|never" scrollbar-size
 *                 scroll-hide-delay offset-scrollbars scrollbars="x|y|xy">
 * Height/width come from the regular `h`/`mah`/`w` style props. A native
 * scrolling viewport (native keyboard/wheel/touch scrolling) is paired with
 * custom overlay scrollbars (thumb drag, track click), whose visibility is
 * driven by `type`.
 * Events: `scroll-position-change` ({x, y}) on every scroll.
 */
export class MtScrollArea extends MtElement {
  static styles = [styles];
  static props: Props = {
    type: { default: 'hover' },
    scrollbarSize: { css: '--_sb-size', scale: 'rem', default: 8 },
    scrollHideDelay: { type: 'number', default: 1000 },
    offsetScrollbars: {},
    scrollbars: { default: 'xy' },
  };

  declare type: string;
  declare scrollHideDelay: number;

  #hovering = false;
  #hideTimer = 0;
  #ro = new ResizeObserver(() => this.#updateThumbs());

  protected template(): string {
    return html`
      <div class="viewport" part="viewport" tabindex="0"><slot></slot></div>
      <div class="scrollbar scrollbar-x" part="scrollbar" data-orientation="horizontal"><div class="thumb" part="thumb"></div></div>
      <div class="scrollbar scrollbar-y" part="scrollbar" data-orientation="vertical"><div class="thumb" part="thumb"></div></div>
      <div class="corner" part="corner"></div>
    `;
  }

  get viewport(): HTMLElement {
    return this.$('.viewport');
  }
  get #trackX(): HTMLElement {
    return this.$('.scrollbar-x');
  }
  get #trackY(): HTMLElement {
    return this.$('.scrollbar-y');
  }
  get #thumbX(): HTMLElement {
    return this.$('.scrollbar-x .thumb');
  }
  get #thumbY(): HTMLElement {
    return this.$('.scrollbar-y .thumb');
  }

  protected setup(): void {
    const vp = this.viewport;
    vp.addEventListener('scroll', () => {
      this.#updateThumbs();
      this.emit('scroll-position-change', { x: vp.scrollLeft, y: vp.scrollTop });
      if (this.type === 'hover' || this.type === 'scroll') this.#flash();
    });
    this.addEventListener('mouseenter', () => {
      this.#hovering = true;
      if (this.type === 'hover') this.#setVisible(true);
    });
    this.addEventListener('mouseleave', () => {
      this.#hovering = false;
      if (this.type === 'hover') this.#scheduleHide();
    });
    this.#thumbX.addEventListener('pointerdown', (e) => this.#dragThumb(e, 'x'));
    this.#thumbY.addEventListener('pointerdown', (e) => this.#dragThumb(e, 'y'));
    this.#trackX.addEventListener('pointerdown', (e) => this.#trackClick(e, 'x'));
    this.#trackY.addEventListener('pointerdown', (e) => this.#trackClick(e, 'y'));
    const slot = this.root.querySelector('slot')!;
    const syncObserved = () => {
      this.#ro.disconnect();
      this.#ro.observe(vp);
      for (const el of slot.assignedElements()) this.#ro.observe(el);
      this.#updateThumbs();
    };
    slot.addEventListener('slotchange', syncObserved);
    syncObserved();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('type') && (this.type === 'always' || this.type === 'auto')) this.#updateThumbs();
  }

  #setVisible(v: boolean): void {
    this.#thumbX.parentElement!.toggleAttribute('data-visible', v);
    this.#thumbY.parentElement!.toggleAttribute('data-visible', v);
  }

  #flash(): void {
    clearTimeout(this.#hideTimer);
    this.#setVisible(true);
    this.#scheduleHide();
  }

  #scheduleHide(): void {
    clearTimeout(this.#hideTimer);
    if (this.type === 'always' || this.type === 'auto' || this.type === 'never') return;
    this.#hideTimer = window.setTimeout(() => {
      if (this.type === 'hover' && this.#hovering) return;
      this.#setVisible(false);
    }, this.scrollHideDelay);
  }

  #updateThumbs(): void {
    const vp = this.viewport;
    const cw = vp.clientWidth;
    const sw = vp.scrollWidth;
    const ch = vp.clientHeight;
    const sh = vp.scrollHeight;
    const overflowX = sw > cw + 1;
    const overflowY = sh > ch + 1;
    this.toggleAttribute('data-overflow-x', overflowX);
    this.toggleAttribute('data-overflow-y', overflowY);
    this.#trackX.toggleAttribute('data-overflow', overflowX);
    this.#trackY.toggleAttribute('data-overflow', overflowY);

    if (overflowX) {
      const trackW = this.#trackX.clientWidth;
      const thumbW = Math.max(20, (trackW * cw) / sw);
      const maxTravel = Math.max(0, trackW - thumbW);
      const ratio = sw - cw > 0 ? vp.scrollLeft / (sw - cw) : 0;
      this.#thumbX.style.width = `${thumbW}px`;
      this.#thumbX.style.transform = `translateX(${ratio * maxTravel}px)`;
    }
    if (overflowY) {
      const trackH = this.#trackY.clientHeight;
      const thumbH = Math.max(20, (trackH * ch) / sh);
      const maxTravel = Math.max(0, trackH - thumbH);
      const ratio = sh - ch > 0 ? vp.scrollTop / (sh - ch) : 0;
      this.#thumbY.style.height = `${thumbH}px`;
      this.#thumbY.style.transform = `translateY(${ratio * maxTravel}px)`;
    }
  }

  #dragThumb(e: PointerEvent, axis: 'x' | 'y'): void {
    e.preventDefault();
    e.stopPropagation();
    const vp = this.viewport;
    const thumb = axis === 'x' ? this.#thumbX : this.#thumbY;
    const track = axis === 'x' ? this.#trackX : this.#trackY;
    thumb.setPointerCapture(e.pointerId);
    const trackSize = axis === 'x' ? track.clientWidth : track.clientHeight;
    const thumbSize = axis === 'x' ? thumb.offsetWidth : thumb.offsetHeight;
    const contentSize = axis === 'x' ? vp.scrollWidth : vp.scrollHeight;
    const viewSize = axis === 'x' ? vp.clientWidth : vp.clientHeight;
    const startPos = axis === 'x' ? e.clientX : e.clientY;
    const startScroll = axis === 'x' ? vp.scrollLeft : vp.scrollTop;
    const maxThumbTravel = trackSize - thumbSize;
    const maxScroll = contentSize - viewSize;
    this.#setVisible(true);
    const onMove = (ev: PointerEvent) => {
      const pos = axis === 'x' ? ev.clientX : ev.clientY;
      const scrollDelta = maxThumbTravel > 0 ? ((pos - startPos) / maxThumbTravel) * maxScroll : 0;
      if (axis === 'x') vp.scrollLeft = startScroll + scrollDelta;
      else vp.scrollTop = startScroll + scrollDelta;
    };
    const onUp = (ev: PointerEvent) => {
      thumb.releasePointerCapture(ev.pointerId);
      thumb.removeEventListener('pointermove', onMove);
      thumb.removeEventListener('pointerup', onUp);
      if (this.type === 'hover' || this.type === 'scroll') this.#scheduleHide();
    };
    thumb.addEventListener('pointermove', onMove);
    thumb.addEventListener('pointerup', onUp);
  }

  #trackClick(e: PointerEvent, axis: 'x' | 'y'): void {
    if (e.target !== (axis === 'x' ? this.#trackX : this.#trackY)) return;
    const vp = this.viewport;
    const track = axis === 'x' ? this.#trackX : this.#trackY;
    const thumb = axis === 'x' ? this.#thumbX : this.#thumbY;
    const rect = track.getBoundingClientRect();
    const trackSize = axis === 'x' ? rect.width : rect.height;
    const thumbSize = axis === 'x' ? thumb.offsetWidth : thumb.offsetHeight;
    const contentSize = axis === 'x' ? vp.scrollWidth : vp.scrollHeight;
    const viewSize = axis === 'x' ? vp.clientWidth : vp.clientHeight;
    const clickPos = (axis === 'x' ? e.clientX - rect.left : e.clientY - rect.top) - thumbSize / 2;
    const maxTravel = trackSize - thumbSize;
    const ratio = maxTravel > 0 ? Math.min(1, Math.max(0, clickPos / maxTravel)) : 0;
    const target = ratio * (contentSize - viewSize);
    if (axis === 'x') vp.scrollTo({ left: target, behavior: 'smooth' });
    else vp.scrollTo({ top: target, behavior: 'smooth' });
  }
}

const autosizeStyles = css`
  .viewport { height: auto; max-height: inherit; }
`;

/**
 * <mt-scroll-area-autosize ...>: same as <mt-scroll-area>, but the viewport
 * grows with its content instead of filling a fixed host height; set `mah`
 * to cap the height before scrolling kicks in.
 */
export class MtScrollAreaAutosize extends MtScrollArea {
  static styles = [...MtScrollArea.styles, autosizeStyles];
}

define('mt-scroll-area', MtScrollArea);
define('mt-scroll-area-autosize', MtScrollAreaAutosize);
