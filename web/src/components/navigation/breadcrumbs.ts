import { css, define, uid, MtElement, type Props } from '../../core';

/**
 * <mt-breadcrumbs separator="/" separator-margin="xs">
 * Children: anchors or plain text, each rendered with a separator in between.
 * A child with slot="separator" overrides the default text separator for every gap.
 */
const styles = css`
  :host { display: flex; align-items: center; flex-wrap: wrap; }
  .root { display: flex; align-items: center; flex-wrap: wrap; }
  .item { display: flex; align-items: center; }
  .separator { display: flex; align-items: center; margin-inline: var(--_sep-margin, var(--mt-spacing-xs)); color: var(--mt-color-dimmed); }
  ::slotted(a) { color: var(--mt-color-anchor); text-decoration: none; font-size: var(--mt-font-size-sm); }
  ::slotted(a:hover) { text-decoration: underline; }
  ::slotted(*) { font-size: var(--mt-font-size-sm); }
`;

export class MtBreadcrumbs extends MtElement {
  static styles = [styles];
  static props: Props = {
    separator: { default: '/' },
    separatorMargin: { css: '--_sep-margin', scale: 'spacing', default: 'xs' },
  };

  declare separator: string;
  declare separatorMargin: string | null;

  #observer!: MutationObserver;

  protected template(): string {
    return '<div class="root" part="root"></div>';
  }

  protected setup(): void {
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'breadcrumb');
    this.#observer = new MutationObserver(() => this.#sync());
    this.#observer.observe(this, { childList: true });
    this.#sync();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('separator')) this.#sync();
  }

  protected onDisconnect(): void {
    this.#observer?.disconnect();
  }

  #sync(): void {
    const root = this.$('.root');
    root.innerHTML = '';
    const customSeparator = this.querySelector(':scope > [slot="separator"]');
    const items = [...this.children].filter((c) => c.getAttribute('slot') !== 'separator');
    items.forEach((child, i) => {
      if (!child.getAttribute('slot')) child.setAttribute('slot', uid('bc'));
      const wrap = document.createElement('span');
      wrap.className = 'item';
      const slot = document.createElement('slot');
      slot.name = child.getAttribute('slot')!;
      wrap.append(slot);
      root.append(wrap);
      if (i < items.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'separator';
        sep.setAttribute('aria-hidden', 'true');
        if (customSeparator) sep.append(customSeparator.cloneNode(true));
        else sep.textContent = this.separator;
        root.append(sep);
      }
    });
  }
}

define('mt-breadcrumbs', MtBreadcrumbs);
