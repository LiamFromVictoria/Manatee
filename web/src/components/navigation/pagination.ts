import { css, define, MtElement, type Props } from '../../core';

function pageRange(total: number, siblings: number, boundaries: number, page: number): Array<number | 'dots'> {
  const totalNumbers = siblings * 2 + 3 + boundaries * 2;
  if (totalNumbers >= total) return Array.from({ length: total }, (_, i) => i + 1);

  const leftSibling = Math.max(page - siblings, boundaries + 1);
  const rightSibling = Math.min(page + siblings, total - boundaries);
  const showLeftDots = leftSibling > boundaries + 2;
  const showRightDots = rightSibling < total - boundaries - 1;

  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (!showLeftDots && showRightDots) {
    const leftCount = siblings * 2 + boundaries + 2;
    return [...range(1, leftCount), 'dots', ...range(total - boundaries + 1, total)];
  }
  if (showLeftDots && !showRightDots) {
    const rightCount = siblings * 2 + boundaries + 2;
    return [...range(1, boundaries), 'dots', ...range(total - rightCount + 1, total)];
  }
  return [...range(1, boundaries), 'dots', ...range(leftSibling, rightSibling), 'dots', ...range(total - boundaries + 1, total)];
}

/**
 * <mt-pagination total value siblings boundaries with-edges with-controls
 *                size radius color gap disabled href-template>
 * Renders buttons and emits `change` { value }, or anchors (`href-template`,
 * e.g. "/items?page={page}") for server-side paging.
 */
const styles = css`
  :host { display: inline-flex; --_height: 2rem; }
  :host([size='xs']) { --_height: 1.625rem; }
  :host([size='md']) { --_height: 2.25rem; }
  :host([size='lg']) { --_height: 2.5rem; }
  :host([size='xl']) { --_height: 2.75rem; }
  .root { display: flex; align-items: center; gap: var(--_gap, 0.5rem); }
  .control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--_height);
    height: var(--_height);
    padding-inline: 0.375rem;
    border: 1px solid var(--mt-color-default-border);
    border-radius: var(--_radius, var(--mt-radius-default));
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    font-size: var(--mt-font-size-sm);
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
  .control:hover:not(:disabled):not([aria-current='page']):not([aria-disabled='true']) { background: var(--mt-color-hover); }
  .control[aria-current='page'] { background: var(--mt-c-filled); border-color: var(--mt-c-filled); color: var(--mt-white); }
  .control:disabled, .control[aria-disabled='true'] { opacity: 0.5; cursor: not-allowed; }
  .dots {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--_height);
    height: var(--_height);
    color: var(--mt-color-dimmed);
  }
`;

interface ControlOptions {
  ariaLabel: string;
  disabled: boolean;
}

export class MtPagination extends MtElement {
  static styles = [styles];
  static props: Props = {
    total: { type: 'number', default: 0 },
    value: { type: 'number', default: 1 },
    siblings: { type: 'number', default: 1 },
    boundaries: { type: 'number', default: 1 },
    withEdges: { type: 'boolean' },
    withControls: { type: 'boolean', default: true },
    size: { default: 'sm' },
    radius: { css: '--_radius', scale: 'radius' },
    color: { color: true },
    gap: { css: '--_gap', scale: 'rem', default: 8 },
    disabled: { type: 'boolean' },
    hrefTemplate: { attr: 'href-template' },
  };

  declare total: number;
  declare value: number;
  declare siblings: number;
  declare boundaries: number;
  declare withEdges: boolean;
  declare withControls: boolean;
  declare size: string;
  declare color: string | null;
  declare disabled: boolean;
  declare hrefTemplate: string | null;

  protected template(): string {
    return '<div class="root" part="root"></div>';
  }

  protected setup(): void {
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Pagination');
  }

  protected update(): void {
    this.#render();
  }

  #makeControl(label: string, page: number, current: number, opts: ControlOptions): HTMLElement {
    const isAnchor = !!this.hrefTemplate;
    const el = document.createElement(isAnchor ? 'a' : 'button');
    el.className = 'control';
    el.textContent = label;
    el.setAttribute('aria-label', opts.ariaLabel);
    const active = page === current;
    if (active) el.setAttribute('aria-current', 'page');
    const disabled = this.disabled || opts.disabled;
    if (el instanceof HTMLAnchorElement) {
      if (disabled) el.setAttribute('aria-disabled', 'true');
      else el.href = this.hrefTemplate!.replace('{page}', String(page));
    } else {
      el.type = 'button';
      el.disabled = disabled;
      el.addEventListener('click', () => {
        this.value = page;
        this.emit('change', { value: page });
      });
    }
    return el;
  }

  #render(): void {
    const root = this.$('.root');
    root.innerHTML = '';
    const total = Math.max(0, Math.trunc(this.total));
    if (!total) return;
    const current = Math.min(Math.max(1, Math.trunc(this.value) || 1), total);
    const items = pageRange(total, this.siblings, this.boundaries, current);

    if (this.withEdges) root.append(this.#makeControl('\u00ab', 1, current, { ariaLabel: 'First page', disabled: current <= 1 }));
    if (this.withControls) root.append(this.#makeControl('\u2039', current - 1, current, { ariaLabel: 'Previous page', disabled: current <= 1 }));
    for (const item of items) {
      if (item === 'dots') {
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = '\u2026';
        dots.setAttribute('aria-hidden', 'true');
        root.append(dots);
        continue;
      }
      root.append(this.#makeControl(String(item), item, current, { ariaLabel: `Page ${item}`, disabled: false }));
    }
    if (this.withControls) root.append(this.#makeControl('\u203a', current + 1, current, { ariaLabel: 'Next page', disabled: current >= total }));
    if (this.withEdges) root.append(this.#makeControl('\u00bb', total, current, { ariaLabel: 'Last page', disabled: current >= total }));
  }
}

define('mt-pagination', MtPagination);
