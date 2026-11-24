import { css, define, html, MtElement, type Props } from '../../core';

let sheetInstalled = false;

/** Items are arbitrary light-DOM elements (tr, li, div, ...); shadow CSS cannot
 * reach them, so install one shared document-level sheet, same technique as
 * mt-table. */
function installSheet(): void {
  if (sheetInstalled) return;
  sheetInstalled = true;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
    mt-sortable [data-sortable-item] { touch-action: none; }
    mt-sortable [data-sortable-handle] { cursor: grab; touch-action: none; }
    mt-sortable [data-sortable-item].mt-sortable-dragging {
      position: relative;
      z-index: 2;
      cursor: grabbing;
      background: var(--mt-color-body);
      box-shadow: var(--mt-shadow-md);
    }
    mt-sortable [data-sortable-item][data-sortable-lifted] {
      outline: 2px solid var(--mt-color-primary-filled);
      outline-offset: -2px;
      background: var(--mt-color-hover);
    }
  `);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

const styles = css`
  :host { display: contents; }
  .live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
`;

/**
 * <mt-sortable items="CSS selector" handle="CSS selector" orientation="vertical|horizontal" disabled name>
 * Wraps a list/table of plain elements (the `items` selector, relative to this
 * host, picks them out, e.g. `tbody > tr`). Pointer drag and keyboard (focus +
 * Space/Enter to lift, arrows to move, Space/Enter to drop, Escape to cancel)
 * reorder the matched elements in place.
 * Events: reorder { from, to, order }, where order is each item's data-value
 * (or its index) in the new order.
 * Form-associated: with `name`, submits the order as repeated values.
 */
export class MtSortable extends MtElement {
  static formAssociated = true;
  static styles = [styles];
  static props: Props = {
    items: { default: ':scope > *' },
    handle: {},
    orientation: { default: 'vertical' },
    disabled: { type: 'boolean' },
    name: {},
  };

  declare items: string;
  declare handle: string | null;
  declare orientation: string;
  declare disabled: boolean;
  declare name: string | null;

  readonly internals = this.attachInternals();
  #wired = new WeakSet<Element>();
  #observer!: MutationObserver;
  #lifted: HTMLElement | null = null;
  #liftedOrigIndex = -1;

  protected template(): string {
    return html`<span class="live" part="live" role="status" aria-live="assertive"></span><slot></slot>`;
  }

  protected setup(): void {
    installSheet();
    this.#observer = new MutationObserver(() => this.#bind());
    this.#observer.observe(this, { childList: true, subtree: true });
    this.#bind();
    this.#syncFormValue();
  }

  protected onDisconnect(): void {
    this.#observer?.disconnect();
  }

  #currentItems(): HTMLElement[] {
    return Array.from(this.querySelectorAll<HTMLElement>(this.items));
  }

  #bind(): void {
    for (const item of this.#currentItems()) {
      if (this.#wired.has(item)) continue;
      this.#wired.add(item);
      item.setAttribute('data-sortable-item', '');
      const handle = this.handle ? (item.querySelector<HTMLElement>(this.handle) ?? item) : item;
      if (!handle.hasAttribute('tabindex')) handle.setAttribute('tabindex', '0');
      handle.addEventListener('pointerdown', (e) => this.#onPointerDown(e, item, handle));
      handle.addEventListener('keydown', (e) => this.#onKeyDown(e, item));
    }
  }

  #announce(msg: string): void {
    this.$<HTMLElement>('.live').textContent = msg;
  }

  #onKeyDown(e: KeyboardEvent, item: HTMLElement): void {
    if (this.disabled) return;
    const items = this.#currentItems();
    const idx = items.indexOf(item);
    if (idx < 0) return;
    const horizontal = this.orientation === 'horizontal';
    const forward = horizontal ? 'ArrowRight' : 'ArrowDown';
    const backward = horizontal ? 'ArrowLeft' : 'ArrowUp';

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (this.#lifted === item) this.#commitLift();
      else this.#startLift(item, idx, items.length);
      return;
    }
    if (e.key === 'Escape' && this.#lifted === item) {
      e.preventDefault();
      this.#cancelLift();
      return;
    }
    if (this.#lifted !== item) return;
    if (e.key !== forward && e.key !== backward) return;
    e.preventDefault();
    const newIdx = idx + (e.key === forward ? 1 : -1);
    if (newIdx < 0 || newIdx >= items.length) return;
    this.#placeAt(item, newIdx);
    (this.handle ? (item.querySelector<HTMLElement>(this.handle) ?? item) : item).focus();
    this.#announce(`Item moved to position ${newIdx + 1} of ${items.length}.`);
  }

  #startLift(item: HTMLElement, idx: number, total: number): void {
    this.#lifted = item;
    this.#liftedOrigIndex = idx;
    item.setAttribute('data-sortable-lifted', '');
    this.#announce(`Picked up item at position ${idx + 1} of ${total}. Use arrow keys to move, space or enter to drop, escape to cancel.`);
  }

  #commitLift(): void {
    const item = this.#lifted;
    if (!item) return;
    item.removeAttribute('data-sortable-lifted');
    const items = this.#currentItems();
    const newIdx = items.indexOf(item);
    this.#lifted = null;
    if (newIdx !== this.#liftedOrigIndex) this.#emitReorder(this.#liftedOrigIndex, newIdx);
    this.#announce('Item dropped.');
  }

  #cancelLift(): void {
    const item = this.#lifted;
    if (!item) return;
    this.#placeAt(item, this.#liftedOrigIndex);
    item.removeAttribute('data-sortable-lifted');
    this.#lifted = null;
    this.#announce('Reorder cancelled.');
  }

  /** Move `item` so it ends up at `targetIndex` among the current items. */
  #placeAt(item: HTMLElement, targetIndex: number): void {
    const siblings = this.#currentItems().filter((it) => it !== item);
    if (targetIndex >= siblings.length) siblings[siblings.length - 1]?.after(item);
    else siblings[targetIndex].before(item);
  }

  #emitReorder(from: number, to: number): void {
    const items = this.#currentItems();
    const order = items.map((it, i) => it.getAttribute('data-value') ?? String(i));
    this.#syncFormValue(order);
    this.emit('reorder', { from, to, order });
  }

  #syncFormValue(order?: string[]): void {
    if (!this.name) return;
    const ord = order ?? this.#currentItems().map((it, i) => it.getAttribute('data-value') ?? String(i));
    const fd = new FormData();
    for (const v of ord) fd.append(this.name, v);
    this.internals.setFormValue(fd);
  }

  #onPointerDown(e: PointerEvent, item: HTMLElement, handle: HTMLElement): void {
    if (this.disabled || e.button !== 0 || this.#lifted) return;
    const items = this.#currentItems();
    const startIndex = items.indexOf(item);
    if (startIndex < 0) return;
    e.preventDefault();
    try { handle.setPointerCapture(e.pointerId); } catch { /* noop */ }

    const axis = this.orientation === 'horizontal' ? 'x' : 'y';
    const rects = items.map((it) => it.getBoundingClientRect());
    const starts = rects.map((r) => (axis === 'x' ? r.left : r.top));
    const sizes = rects.map((r) => (axis === 'x' ? r.width : r.height));
    const startPos = axis === 'x' ? e.clientX : e.clientY;
    let current = startIndex;

    item.classList.add('mt-sortable-dragging');
    for (const it of items) if (it !== item) it.style.transition = 'transform 150ms ease';

    const applyShifts = (): void => {
      for (let i = 0; i < items.length; i++) {
        if (i === startIndex) continue;
        let shift = 0;
        if (current >= startIndex && i > startIndex && i <= current) shift = starts[i - 1] - starts[i];
        else if (current <= startIndex && i < startIndex && i >= current) shift = starts[i + 1] - starts[i];
        items[i].style.transform = shift ? (axis === 'x' ? `translateX(${shift}px)` : `translateY(${shift}px)`) : '';
      }
    };

    const move = (ev: PointerEvent): void => {
      const pos = axis === 'x' ? ev.clientX : ev.clientY;
      const delta = pos - startPos;
      item.style.transform = axis === 'x' ? `translateX(${delta}px)` : `translateY(${delta}px)`;
      const draggedCenter = starts[startIndex] + delta + sizes[startIndex] / 2;
      let best = Infinity;
      let newIndex = current;
      for (let i = 0; i < items.length; i++) {
        const d = Math.abs(draggedCenter - (starts[i] + sizes[i] / 2));
        if (d < best) { best = d; newIndex = i; }
      }
      if (newIndex !== current) {
        current = newIndex;
        applyShifts();
      }
    };

    const up = (ev: PointerEvent): void => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
      try { handle.releasePointerCapture(ev.pointerId); } catch { /* noop */ }
      item.classList.remove('mt-sortable-dragging');
      for (const it of items) { it.style.transition = ''; it.style.transform = ''; }
      if (current !== startIndex) {
        this.#placeAt(item, current);
        this.#emitReorder(startIndex, current);
      }
    };

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
  }
}

define('mt-sortable', MtSortable);
