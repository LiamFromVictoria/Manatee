import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
    --_height: 2.25rem;
    --_px: 1.125rem;
    --_fz: var(--mt-font-size-sm);
    --_radius: var(--mt-radius-default);
    --_bg: var(--mt-c-filled);
    --_hover: var(--mt-c-filled-hover);
    --_color: var(--mt-white);
    --_bd: transparent;
  }
  :host([size='xs']) { --_height: 1.875rem; --_px: 0.875rem; --_fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_height: 2.625rem; --_px: 1.375rem; --_fz: var(--mt-font-size-md); }
  :host([size='lg']) { --_height: 3.125rem; --_px: 1.625rem; --_fz: var(--mt-font-size-lg); }
  :host([size='xl']) { --_height: 3.75rem; --_px: 2rem; --_fz: var(--mt-font-size-xl); }
  :host([size='compact-xs']) { --_height: 1.375rem; --_px: 0.4375rem; --_fz: var(--mt-font-size-xs); }
  :host([size='compact-sm']) { --_height: 1.625rem; --_px: 0.5rem; --_fz: var(--mt-font-size-sm); }
  :host([size='compact-md']) { --_height: 1.875rem; --_px: 0.625rem; --_fz: var(--mt-font-size-md); }
  :host([size='compact-lg']) { --_height: 2.125rem; --_px: 0.75rem; --_fz: var(--mt-font-size-lg); }
  :host([size='compact-xl']) { --_height: 2.5rem; --_px: 0.875rem; --_fz: var(--mt-font-size-xl); }
  :host([full-width]) { display: block; width: 100%; }

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
    width: 100%;
    height: var(--_height);
    padding-inline: var(--_px);
    font: inherit;
    font-size: var(--_fz);
    font-weight: 600;
    line-height: 1;
    color: var(--_color);
    text-decoration: none;
    white-space: nowrap;
    background: var(--_bg);
    border: 1px solid var(--_bd);
    border-radius: var(--_radius);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
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

  .inner { display: flex; align-items: center; justify-content: var(--_justify, center); width: 100%; height: 100%; overflow: visible; }
  .label { display: flex; align-items: center; height: 100%; overflow: hidden; }
  .section { display: flex; align-items: center; }
  .section:not(.filled) { display: none; }
  .section.left { margin-inline-end: var(--mt-spacing-xs); }
  .section.right { margin-inline-start: var(--mt-spacing-xs); }

  .loader {
    display: none;
    position: absolute;
    inset: 0;
    margin: auto;
    width: calc(var(--_height) / 2);
    height: calc(var(--_height) / 2);
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  :host([loading]) .loader { display: block; }
  :host([loading]) .inner { opacity: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

/**
 * <mt-button variant="filled|light|outline|subtle|default|transparent|white|gradient"
 *            color size radius full-width disabled loading justify
 *            type="button|submit|reset" href target
 *            gradient-from gradient-to gradient-deg>
 * Slots: default (label), left-section, right-section.
 * Form-associated: type="submit" / "reset" act on the owning form.
 */
export class MtButton extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [styles];
  static props: Props = {
    variant: { default: 'filled' },
    color: { color: true },
    size: { default: 'sm' },
    radius: { css: '--_radius', scale: 'radius' },
    fullWidth: { type: 'boolean' },
    disabled: { type: 'boolean' },
    loading: { type: 'boolean' },
    justify: { css: '--_justify' },
    type: { default: 'button' },
    href: {},
    target: {},
    gradientFrom: { css: '--_gfrom', scale: 'color', default: 'blue' },
    gradientTo: { css: '--_gto', scale: 'color', default: 'cyan' },
    gradientDeg: { css: '--_gdeg', type: 'number', default: 45 },
  };

  declare variant: string;
  declare color: string | null;
  declare size: string;
  declare fullWidth: boolean;
  declare disabled: boolean;
  declare loading: boolean;
  declare type: string;
  declare href: string | null;

  readonly internals = this.attachInternals();

  protected template(): string {
    return html`
      <button class="root" part="root" type="button">
        <span class="inner">
          <span class="section left" part="left-section"><slot name="left-section"></slot></span>
          <span class="label" part="label"><slot></slot></span>
          <span class="section right" part="right-section"><slot name="right-section"></slot></span>
        </span>
        <span class="loader" part="loader" aria-hidden="true"></span>
      </button>
    `;
  }

  protected setup(): void {
    for (const slot of this.root.querySelectorAll<HTMLSlotElement>('.section slot')) {
      const sync = () => slot.parentElement!.classList.toggle('filled', slot.assignedNodes().length > 0);
      slot.addEventListener('slotchange', sync);
      sync();
    }
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
 * <mt-button-group orientation="horizontal|vertical">
 * Joins adjacent buttons: inner radii are flattened and borders collapsed.
 */
export class MtButtonGroup extends MtElement {
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

define('mt-button', MtButton);
define('mt-button-group', MtButtonGroup);
