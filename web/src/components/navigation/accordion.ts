import { css, define, html, MtElement, uid, type Props } from '../../core';

const CHEVRON_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

/**
 * <mt-accordion value multiple variant="default|contained|filled|separated"
 *               chevron-position="left|right" disable-chevron-rotation radius
 *               transition-duration>
 * Children: <mt-accordion-item> of <mt-accordion-control> + <mt-accordion-panel>.
 * `value` is a single string, or comma-separated when `multiple`.
 * Events: `change` { value }.
 */
const accordionStyles = css`
  :host { display: block; }
`;

export class MtAccordion extends MtElement {
  static styles = [accordionStyles];
  static props: Props = {
    value: {},
    multiple: { type: 'boolean' },
    variant: { default: 'default' },
    chevronPosition: { default: 'right' },
    disableChevronRotation: { type: 'boolean' },
    radius: { css: '--_radius', scale: 'radius' },
    transitionDuration: { type: 'number', default: 200 },
  };

  declare value: string | null;
  declare multiple: boolean;
  declare variant: string;
  declare chevronPosition: string;
  declare disableChevronRotation: boolean;
  declare transitionDuration: number;

  protected setup(): void {
    this.addEventListener('keydown', (e) => this.#onKeydown(e));
  }

  protected update(changed: Set<string>): void {
    if (changed.has('transitionDuration')) this.style.setProperty('--_duration', `${this.transitionDuration}ms`);
    this.#sync();
  }

  /** Toggle a single item's open state, respecting `multiple`. */
  toggle(value: string | null): void {
    if (value === null) return;
    const open = this.#openValues();
    if (this.multiple) {
      if (open.has(value)) open.delete(value);
      else open.add(value);
      this.value = [...open].join(',') || null;
    } else {
      this.value = open.has(value) ? null : value;
    }
    this.emit('change', { value: this.value });
  }

  #openValues(): Set<string> {
    const raw = this.getAttribute('value');
    if (!raw) return new Set();
    return this.multiple ? new Set(raw.split(',').filter(Boolean)) : new Set([raw]);
  }

  #sync(): void {
    const open = this.#openValues();
    for (const item of this.querySelectorAll<MtAccordionItem>(':scope > mt-accordion-item')) {
      const value = item.getAttribute('value');
      item.setAttribute('data-variant', this.variant);
      item.toggleAttribute('opened', value !== null && open.has(value));
      const control = item.querySelector<MtAccordionControl>(':scope > mt-accordion-control');
      control?.setAttribute('data-chevron-position', this.chevronPosition);
      control?.toggleAttribute('data-disable-rotation', this.disableChevronRotation);
    }
  }

  #onKeydown(e: KeyboardEvent): void {
    const target = (e.target as HTMLElement).closest('mt-accordion-control');
    if (!target) return;
    const controls = [...this.querySelectorAll('mt-accordion-control')].filter((c) => c.getAttribute('aria-disabled') !== 'true');
    const idx = controls.indexOf(target);
    if (idx < 0) return;
    let next: Element | null = null;
    if (e.key === 'ArrowDown') next = controls[(idx + 1) % controls.length];
    else if (e.key === 'ArrowUp') next = controls[(idx - 1 + controls.length) % controls.length];
    else if (e.key === 'Home') next = controls[0];
    else if (e.key === 'End') next = controls[controls.length - 1];
    if (!next) return;
    e.preventDefault();
    (next as HTMLElement).focus();
  }
}

const itemStyles = css`
  :host { display: block; }
  .item { border-bottom: 1px solid var(--mt-color-border); }
  :host(:last-child) .item { border-bottom: 0; }
  :host([data-variant='contained']) .item,
  :host([data-variant='separated']) .item {
    border: 1px solid var(--mt-color-border);
    border-radius: var(--_radius, var(--mt-radius-default));
    overflow: hidden;
  }
  :host([data-variant='separated']) { display: block; margin-bottom: var(--mt-spacing-md); }
  :host([data-variant='contained']) { display: block; margin-bottom: -1px; }
  :host([data-variant='contained']:last-child) { margin-bottom: 0; }
  :host([data-variant='filled'][opened]) .item { background: var(--mt-color-hover); border-radius: var(--_radius, var(--mt-radius-default)); }
`;

export class MtAccordionItem extends MtElement {
  static styles = [itemStyles];
  static props: Props = { value: {}, disabled: { type: 'boolean' }, opened: { type: 'boolean' } };

  declare value: string | null;
  declare disabled: boolean;
  declare opened: boolean;

  protected template(): string {
    return '<div class="item" part="item"><slot></slot></div>';
  }

  protected setup(): void {
    this.root.querySelector('slot')!.addEventListener('slotchange', () => this.#sync());
    this.#sync();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('opened') || changed.has('disabled')) this.#sync();
  }

  #sync(): void {
    const control = this.querySelector<MtAccordionControl>(':scope > mt-accordion-control');
    const panel = this.querySelector<MtAccordionPanel>(':scope > mt-accordion-panel');
    if (control) {
      if (!control.id) control.id = uid('accctrl');
      control.setAttribute('aria-expanded', String(this.opened));
      control.setAttribute('aria-disabled', String(this.disabled));
      control.toggleAttribute('disabled', this.disabled);
    }
    if (panel) {
      if (!panel.id) panel.id = uid('accpanel');
      if (control) {
        panel.setAttribute('aria-labelledby', control.id);
        control.setAttribute('aria-controls', panel.id);
      }
      panel.toggleAttribute('opened', this.opened);
    }
  }
}

const controlStyles = css`
  :host { display: block; }
  .control {
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: var(--mt-spacing-md);
    font: inherit;
    font-size: var(--mt-font-size-md);
    color: var(--mt-color-bright);
    background: transparent;
    border: 0;
    text-align: start;
    cursor: pointer;
  }
  .control:hover { background: var(--mt-color-hover); }
  .control:focus-visible { outline: var(--mt-focus-ring); outline-offset: -2px; }
  :host([aria-disabled='true']) .control { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  :host([data-chevron-position='left']) .control { flex-direction: row-reverse; }
  .icon { display: none; align-items: center; margin-inline-end: var(--mt-spacing-sm); }
  :host([data-has-icon]) .icon { display: flex; }
  :host([data-chevron-position='left']) .icon { margin-inline-end: 0; margin-inline-start: var(--mt-spacing-lg); }
  .label { flex: 1; min-width: 0; font-weight: 400; padding-block: var(--mt-spacing-sm); }
  .chevron { display: flex; align-items: center; color: var(--mt-color-dimmed); }
  .chevron svg { transition: transform var(--mt-transition); }
  :host([aria-expanded='true']) .chevron svg { transform: rotate(180deg); }
  :host([data-disable-rotation]) .chevron svg { transform: none !important; }
`;

export class MtAccordionControl extends MtElement {
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [controlStyles];
  static props: Props = { disabled: { type: 'boolean' } };

  declare disabled: boolean;

  protected template(): string {
    return html`
      <button type="button" class="control" part="control">
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <span class="label" part="label"><slot></slot></span>
        <span class="chevron" part="chevron" aria-hidden="true">${CHEVRON_SVG}</span>
      </button>
    `;
  }

  protected setup(): void {
    this.setAttribute('role', 'button');
    const iconSlot = this.root.querySelector<HTMLSlotElement>('slot[name="icon"]');
    const syncIcon = () => this.toggleAttribute('data-has-icon', (iconSlot?.assignedNodes().length ?? 0) > 0);
    iconSlot?.addEventListener('slotchange', syncIcon);
    syncIcon();
    this.addEventListener('click', () => {
      if (this.disabled) return;
      const item = this.closest('mt-accordion-item');
      const accordion = this.closest<MtAccordion>('mt-accordion');
      if (!item || !accordion) return;
      accordion.toggle(item.getAttribute('value'));
    });
  }

  protected update(): void {
    this.$<HTMLButtonElement>('.control').disabled = this.disabled;
    this.tabIndex = this.disabled ? -1 : 0;
  }
}

const panelStyles = css`
  :host { display: block; }
  .box { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--_duration, 200ms) ease; }
  :host([opened]) .box { grid-template-rows: 1fr; }
  .content { overflow: hidden; min-height: 0; }
  .inner { padding: 0 var(--mt-spacing-md) var(--mt-spacing-md); }
`;

export class MtAccordionPanel extends MtElement {
  static styles = [panelStyles];
  static props: Props = { opened: { type: 'boolean' } };

  declare opened: boolean;

  protected template(): string {
    return '<div class="box" part="box"><div class="content" part="content"><div class="inner"><slot></slot></div></div></div>';
  }

  protected setup(): void {
    this.setAttribute('role', 'region');
  }

  protected update(): void {
    this.$('.content').toggleAttribute('inert', !this.opened);
  }
}

define('mt-accordion', MtAccordion);
define('mt-accordion-item', MtAccordionItem);
define('mt-accordion-control', MtAccordionControl);
define('mt-accordion-panel', MtAccordionPanel);
