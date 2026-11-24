import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_fz: var(--mt-font-size-sm);
    --_lh: var(--mt-line-height-sm);
    --_spacing: 0;
    font-size: var(--_fz);
    line-height: var(--_lh);
    color: var(--mt-color-text);
  }
  :host([size='xs']) { --_fz: var(--mt-font-size-xs); --_lh: var(--mt-line-height-xs); }
  :host([size='md']) { --_fz: var(--mt-font-size-md); --_lh: var(--mt-line-height-md); }
  :host([size='lg']) { --_fz: var(--mt-font-size-lg); --_lh: var(--mt-line-height-lg); }
  :host([size='xl']) { --_fz: var(--mt-font-size-xl); --_lh: var(--mt-line-height-xl); }

  .root {
    margin: 0;
    padding-inline-start: 1.25rem;
    list-style-type: disc;
  }
  :host([type='ordered']) .root { list-style-type: decimal; }
  :host([with-padding]) .root { padding-inline-start: 2rem; }
  :host([list-style-type]) .root { list-style-type: var(--_list-style); }
  :host([center]) .root { list-style: none; padding-inline-start: 0; }

  ::slotted(mt-list-item) { margin-block-start: var(--_spacing); }
  ::slotted(mt-list-item:first-child) { margin-block-start: 0; }
`;

/**
 * <mt-list type="unordered|ordered" size spacing center with-padding list-style-type>
 * Content: mt-list-item children. An `<span slot="icon">` child on the list
 * supplies the default icon cloned into every item that has none of its own.
 * Slots: default (mt-list-item children), icon (default icon for items).
 */
export class MtList extends MtElement {
  static styles = [styles];
  static props: Props = {
    type: { default: 'unordered' },
    size: { default: 'sm' },
    spacing: { css: '--_spacing', scale: 'spacing' },
    center: { type: 'boolean' },
    withPadding: { type: 'boolean' },
    listStyleType: { css: '--_list-style', scale: 'raw' },
  };

  declare type: string;

  protected template(): string {
    return html`
      <ul class="root" part="root">
        <slot name="icon" hidden></slot>
        <slot></slot>
      </ul>
    `;
  }

  protected setup(): void {
    this.setAttribute('role', 'list');
    this.$<HTMLSlotElement>('slot[name="icon"]').addEventListener('slotchange', () => this.#syncIcons());
    this.$<HTMLSlotElement>('slot:not([name])').addEventListener('slotchange', () => this.#syncIcons());
  }

  protected onConnect(): void {
    this.#syncIcons();
  }

  protected update(changed: Set<string>): void {
    if (!changed.has('type')) return;
    const want = this.type === 'ordered' ? 'OL' : 'UL';
    const current = this.$('.root');
    if (current.tagName === want) return;
    const next = document.createElement(want.toLowerCase());
    next.className = current.className;
    next.setAttribute('part', 'root');
    next.append(...current.childNodes);
    current.replaceWith(next);
  }

  #syncIcons(): void {
    const iconNodes = this.$<HTMLSlotElement>('slot[name="icon"]').assignedElements();
    const hasIcon = iconNodes.length > 0;
    for (const item of this.querySelectorAll(':scope > mt-list-item')) {
      item.querySelector(':scope > [data-cloned-icon]')?.remove();
      const ownIcon = item.querySelector(':scope > [slot="icon"]:not([data-cloned-icon])') !== null;
      item.toggleAttribute('data-has-icon', hasIcon || ownIcon);
      if (hasIcon && !ownIcon) {
        const clone = iconNodes[0]!.cloneNode(true) as HTMLElement;
        clone.setAttribute('slot', 'icon');
        clone.setAttribute('data-cloned-icon', '');
        item.insertBefore(clone, item.firstChild);
      }
    }
  }
}

const itemStyles = css`
  :host {
    display: list-item;
  }
  :host([data-has-icon]) {
    display: flex;
    align-items: flex-start;
    gap: var(--mt-spacing-xs);
    list-style: none;
  }
  .icon { display: none; flex: 0 0 auto; align-items: center; margin-top: 0.1em; }
  :host([data-has-icon]) .icon { display: flex; }
  .content { flex: 1; min-width: 0; }
`;

/**
 * <mt-list-item>
 * Slots: default (content), icon (overrides the list's default icon).
 */
export class MtListItem extends MtElement {
  static styles = [itemStyles];

  protected setup(): void {
    this.setAttribute('role', 'listitem');
  }

  protected template(): string {
    return html`
      <span class="icon" part="icon"><slot name="icon"></slot></span>
      <span class="content" part="content"><slot></slot></span>
    `;
  }
}

define('mt-list', MtList);
define('mt-list-item', MtListItem);
