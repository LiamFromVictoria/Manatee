import { css, define, html, MtElement, rem, type Props } from '../../core';

const styles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --_size: 2.125rem;
    --_radius: var(--mt-radius-default);
    --_bg: var(--mt-c-filled);
    --_hover: var(--mt-c-filled-hover);
    --_color: var(--mt-white);
    --_bd: transparent;
  }
  :host([size='xs']) { --_size: 1.375rem; }
  :host([size='sm']) { --_size: 1.75rem; }
  :host([size='md']) { --_size: 2.125rem; }
  :host([size='lg']) { --_size: 2.75rem; }
  :host([size='xl']) { --_size: 3.75rem; }
  :host([size='input-xs']) { --_size: 1.875rem; }
  :host([size='input-sm']) { --_size: 2.25rem; }
  :host([size='input-md']) { --_size: 2.625rem; }
  :host([size='input-lg']) { --_size: 3.125rem; }
  :host([size='input-xl']) { --_size: 3.75rem; }

  :host([variant='light']) { --_bg: var(--mt-c-light); --_hover: var(--mt-c-light-hover); --_color: var(--mt-c-light-color); }
  :host([variant='outline']) { --_bg: transparent; --_hover: var(--mt-c-outline-hover); --_color: var(--mt-c-outline); --_bd: var(--mt-c-outline); }
  :host([variant='subtle']) { --_bg: transparent; --_hover: var(--mt-c-light-hover); --_color: var(--mt-c-light-color); }
  :host([variant='transparent']) { --_bg: transparent; --_hover: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='default']) { --_bg: var(--mt-color-default); --_hover: var(--mt-color-default-hover); --_color: var(--mt-color-default-color); --_bd: var(--mt-color-default-border); }
  :host([variant='white']) { --_bg: var(--mt-white); --_hover: var(--mt-color-gray-0); --_color: var(--mt-c-filled); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_hover: var(--_bg); }

  .root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    flex: 0 0 auto;
    padding: 0;
    font: inherit;
    color: var(--_color);
    text-decoration: none;
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .root:hover:not(:disabled) { background: var(--_hover); }
  .root:active:not(:disabled) { transform: translateY(1px); }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .root:disabled, :host([data-disabled]) .root {
    background: var(--mt-color-disabled);
    color: var(--mt-color-disabled-color);
    border-color: transparent;
    cursor: not-allowed;
    transform: none;
  }
  :host([loading]) .root:disabled { background: var(--_bg); color: var(--_color); opacity: 0.6; cursor: default; }

  .inner { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
  ::slotted(*) { width: 60%; height: 60%; }
  :host([loading]) .inner { opacity: 0; }

  .loader {
    display: none;
    position: absolute;
    inset: 0;
    margin: auto;
    width: calc(var(--_size) / 2);
    height: calc(var(--_size) / 2);
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  :host([loading]) .loader { display: block; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

/**
 * <mt-action-icon variant="filled|light|outline|subtle|default|transparent|white|gradient"
 *                  color size radius disabled loading
 *                  type="button|submit|reset" href target
 *                  gradient-from gradient-to gradient-deg>
 * Requires an `aria-label` on the host, forwarded to the inner button/anchor.
 * Slot: default (icon).
 */
export class MtActionIcon extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [styles];
  static props: Props = {
    variant: { default: 'filled' },
    color: { color: true },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius' },
    disabled: { type: 'boolean' },
    loading: { type: 'boolean' },
    type: { default: 'button' },
    href: {},
    target: {},
    ariaLabel: { attr: 'aria-label' },
    gradientFrom: { css: '--_gfrom', scale: 'color', default: 'blue' },
    gradientTo: { css: '--_gto', scale: 'color', default: 'cyan' },
    gradientDeg: { css: '--_gdeg', type: 'number', default: 45 },
  };

  declare variant: string;
  declare color: string | null;
  declare size: string;
  declare disabled: boolean;
  declare loading: boolean;
  declare type: string;
  declare href: string | null;
  declare ariaLabel: string | null;

  readonly internals = this.attachInternals();

  protected template(): string {
    return html`
      <button class="root" part="root" type="button">
        <span class="inner" part="inner"><slot></slot></span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `;
  }

  protected setup(): void {
    this.addEventListener('click', (e) => {
      if (this.disabled || this.loading) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      const form = this.internals.form;
      if (!form) return;
      if (this.type === 'submit') form.requestSubmit();
      else if (this.type === 'reset') form.reset();
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('href')) this.#syncTag();
    const root = this.$<HTMLButtonElement | HTMLAnchorElement>('.root');
    const inactive = this.disabled || this.loading;
    if (root instanceof HTMLButtonElement) {
      root.disabled = inactive;
    } else {
      root.setAttribute('href', this.href ?? '');
      const target = this.getAttribute('target');
      if (target) root.setAttribute('target', target);
      else root.removeAttribute('target');
      root.toggleAttribute('aria-disabled', inactive);
      root.tabIndex = inactive ? -1 : 0;
      this.toggleAttribute('data-disabled', inactive);
    }
    root.toggleAttribute('aria-busy', this.loading);
    if (this.ariaLabel) root.setAttribute('aria-label', this.ariaLabel);
    else root.removeAttribute('aria-label');
    if (changed.has('size')) {
      // Mantine accepts numeric sizes (px) besides xs..xl / input-*.
      const size = this.getAttribute('size');
      if (size && /^\d+(\.\d+)?$/.test(size)) this.style.setProperty('--_size', rem(parseFloat(size)));
      else this.style.removeProperty('--_size');
    }
  }

  /** Swap the inner root between <button> and <a> depending on href. */
  #syncTag(): void {
    const current = this.$('.root');
    const want = this.href ? 'A' : 'BUTTON';
    if (current.tagName === want) return;
    const next = document.createElement(want.toLowerCase());
    next.className = current.className;
    next.setAttribute('part', 'root');
    if (want === 'BUTTON') next.setAttribute('type', 'button');
    next.append(...current.childNodes);
    current.replaceWith(next);
  }
}

const groupStyles = css`
  :host { display: inline-flex; flex-direction: row; }
  :host([orientation='vertical']) { flex-direction: column; }
`;

/**
 * <mt-action-icon-group orientation="horizontal|vertical">
 * Joins adjacent action icons: inner radii are flattened and borders collapsed.
 */
export class MtActionIconGroup extends MtElement {
  static styles = [groupStyles];
  static props: Props = { orientation: { default: 'horizontal' } };

  protected onConnect(): void {
    this.#sync();
    this.root.querySelector('slot')!.addEventListener('slotchange', () => this.#sync());
  }

  protected update(): void {
    this.#sync();
  }

  #sync(): void {
    const vertical = this.getAttribute('orientation') === 'vertical';
    const items = [...this.children].filter((c): c is HTMLElement => c instanceof HTMLElement);
    items.forEach((el, i) => {
      const first = i === 0;
      const last = i === items.length - 1;
      const r = 'var(--mt-radius-default)';
      const radius = vertical
        ? `${first ? r : 0} ${first ? r : 0} ${last ? r : 0} ${last ? r : 0}`
        : `${first ? r : 0} ${last ? r : 0} ${last ? r : 0} ${first ? r : 0}`;
      el.style.setProperty('--_radius', radius);
      el.style.setProperty(vertical ? 'margin-top' : 'margin-left', first ? '0' : '-1px');
    });
  }
}

define('mt-action-icon', MtActionIcon);
define('mt-action-icon-group', MtActionIconGroup);
