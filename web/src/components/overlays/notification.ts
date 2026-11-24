import { colorVars, css, define, html, MtElement, type Props, uid } from '../../core';

const styles = css`
  :host {
    display: block;
    animation: mt-notification-in var(--mt-transition) ease;
  }
  :host([data-leaving]) { animation: mt-notification-out var(--mt-transition) ease forwards; }
  @keyframes mt-notification-in { from { opacity: 0; transform: translateY(0.625rem) scale(0.9); } }
  @keyframes mt-notification-out { to { opacity: 0; transform: translateY(0.625rem) scale(0.9); } }

  .notification {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    gap: var(--mt-spacing-md);
    padding: var(--mt-spacing-md);
    padding-inline-start: calc(var(--mt-spacing-md) + 0.25rem);
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    border-radius: var(--_radius, var(--mt-radius-default));
    box-shadow: var(--mt-shadow-lg);
  }
  :host([with-border]) .notification { border: 1px solid var(--mt-color-border); }
  .notification::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 0.25rem;
    background: var(--_bar, var(--mt-color-gray-4));
  }
  .icon {
    display: none;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--_icon-bg, var(--mt-color-gray-1));
    color: var(--_icon-fg, var(--mt-color-dimmed));
  }
  .icon.visible { display: flex; }
  .spinner {
    display: none;
    width: 1.125rem;
    height: 1.125rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: mt-notification-spin 0.75s linear infinite;
  }
  :host([loading]) .spinner { display: block; }
  :host([loading]) .icon { display: flex; }
  @keyframes mt-notification-spin { to { transform: rotate(360deg); } }
  .body { flex: 1 1 auto; min-width: 0; }
  .title { font-weight: 600; font-size: var(--mt-font-size-sm); margin-bottom: 0.125rem; }
  .title:empty { display: none; }
  .message { font-size: var(--mt-font-size-sm); color: var(--mt-color-dimmed); }
  .close {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    border-radius: var(--mt-radius-default);
    background: transparent;
    color: var(--mt-color-dimmed);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .close:hover { background: var(--mt-color-hover); }
  .close:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .close[hidden] { display: none; }
`;

/**
 * <mt-notification color heading loading with-close-button with-border radius>
 * Slots: default (message), title (overrides `heading`), icon.
 * Method close() plays the exit animation then removes the element and emits `close`.
 */
export class MtNotification extends MtElement {
  static styles = [styles];
  static props: Props = {
    color: {},
    heading: {},
    loading: { type: 'boolean' },
    withCloseButton: { type: 'boolean', default: true },
    withBorder: { type: 'boolean' },
    radius: { css: '--_radius', scale: 'radius' },
  };

  declare color: string | null;
  declare heading: string | null;
  declare loading: boolean;
  declare withCloseButton: boolean;
  declare withBorder: boolean;
  declare radius: string | null;

  protected template(): string {
    return html`
      <div class="notification" part="notification" role="alert">
        <div class="icon" part="icon">
          <span class="spinner" part="spinner"></span>
          <slot name="icon"></slot>
        </div>
        <div class="body" part="body">
          <div class="title" part="title"><slot name="title"><span class="title-text"></span></slot></div>
          <div class="message" part="message"><slot></slot></div>
        </div>
        <button class="close" part="close-button" type="button" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
        </button>
      </div>
    `;
  }

  protected setup(): void {
    this.$<HTMLButtonElement>('.close').addEventListener('click', () => this.close());
    this.$<HTMLSlotElement>('slot[name="icon"]').addEventListener('slotchange', () => this.#syncIcon());
  }

  protected update(changed: Set<string>): void {
    if (changed.has('heading')) {
      const text = this.$<HTMLElement>('.title-text');
      if (text) text.textContent = this.heading ?? '';
    }
    if (changed.has('withCloseButton')) this.$<HTMLElement>('.close').toggleAttribute('hidden', !this.withCloseButton);
    if (changed.has('loading')) this.#syncIcon();
    if (changed.has('color')) {
      const el = this.$<HTMLElement>('.notification');
      if (this.color) {
        const vars = colorVars(this.color);
        el.style.setProperty('--_bar', vars['--mt-c-filled']);
        el.style.setProperty('--_icon-bg', vars['--mt-c-light']);
        el.style.setProperty('--_icon-fg', vars['--mt-c-filled']);
      } else {
        el.style.removeProperty('--_bar');
        el.style.removeProperty('--_icon-bg');
        el.style.removeProperty('--_icon-fg');
      }
    }
  }

  #syncIcon(): void {
    const slot = this.$<HTMLSlotElement>('slot[name="icon"]');
    this.$<HTMLElement>('.icon').classList.toggle('visible', this.loading || slot.assignedNodes().length > 0);
  }

  /** Play the exit animation, then remove the element and emit `close`. */
  close(): void {
    if (this.hasAttribute('data-leaving')) return;
    this.setAttribute('data-leaving', '');
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      this.removeEventListener('animationend', finish);
      this.emit('close');
      this.remove();
    };
    this.addEventListener('animationend', finish);
    setTimeout(finish, 250);
  }
}

const containerStyles = css`
  :host {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: var(--mt-spacing-sm);
    padding: var(--mt-spacing-md);
    width: 25rem;
    max-width: calc(100vw - var(--mt-spacing-md) * 2);
    z-index: var(--mt-z-notification);
    pointer-events: none;
  }
  ::slotted(mt-notification) { pointer-events: all; }
  :host(:not([position])), :host([position='bottom-right']) { inset-block-end: 0; inset-inline-end: 0; }
  :host([position='bottom-left']) { inset-block-end: 0; inset-inline-start: 0; }
  :host([position='bottom-center']) { inset-block-end: 0; inset-inline: 0; margin-inline: auto; align-items: center; }
  :host([position='top-right']) { inset-block-start: 0; inset-inline-end: 0; flex-direction: column-reverse; }
  :host([position='top-left']) { inset-block-start: 0; inset-inline-start: 0; flex-direction: column-reverse; }
  :host([position='top-center']) { inset-block-start: 0; inset-inline: 0; margin-inline: auto; align-items: center; flex-direction: column-reverse; }
`;

/** Options accepted by the `notifications` API and the `mt-notify` document event. */
export interface NotifyOptions {
  id?: string;
  title?: string;
  message?: string;
  color?: string;
  icon?: string;
  loading?: boolean;
  autoClose?: number | false;
  withCloseButton?: boolean;
}

/**
 * <mt-notifications position="top-right|top-left|top-center|bottom-right|bottom-left|bottom-center" limit>
 * Stacking host for <mt-notification>s created by the `notifications` API.
 * Auto-closes after 4000ms by default (per item, pausable on hover).
 */
export class MtNotifications extends MtElement {
  static styles = [containerStyles];
  static props: Props = {
    position: { default: 'bottom-right' },
    limit: { type: 'number', default: 5 },
  };

  declare position: string;
  declare limit: number;

  #timers = new Map<string, number>();
  #remaining = new Map<string, number>();
  #startedAt = new Map<string, number>();

  protected template(): string {
    return html`<slot></slot>`;
  }

  show(opts: NotifyOptions): string {
    const id = opts.id ?? uid('mt-notif');
    const existing = this.querySelector<MtNotification>(`mt-notification[data-id="${id}"]`);
    if (existing) {
      this.#applyOptions(existing, opts);
      this.#scheduleAutoClose(id, existing, opts.autoClose);
      return id;
    }
    const el = document.createElement('mt-notification') as MtNotification;
    el.setAttribute('data-id', id);
    this.#applyOptions(el, opts);
    el.addEventListener('close', () => this.#forget(id), { once: true });
    el.addEventListener('mouseenter', () => this.#pause(id));
    el.addEventListener('mouseleave', () => this.#arm(id, el));
    this.appendChild(el);
    this.#enforceLimit();
    this.#scheduleAutoClose(id, el, opts.autoClose);
    return id;
  }

  updateItem(id: string, opts: Partial<NotifyOptions>): void {
    const el = this.querySelector<MtNotification>(`mt-notification[data-id="${id}"]`);
    if (!el) return;
    this.#applyOptions(el, opts);
    if ('autoClose' in opts) this.#scheduleAutoClose(id, el, opts.autoClose);
  }

  hide(id: string): void {
    this.querySelector<MtNotification>(`mt-notification[data-id="${id}"]`)?.close();
  }

  clean(): void {
    for (const el of Array.from(this.querySelectorAll<MtNotification>('mt-notification'))) el.close();
  }

  #applyOptions(el: MtNotification, opts: Partial<NotifyOptions>): void {
    if (opts.title !== undefined) el.setAttribute('heading', opts.title);
    if (opts.color !== undefined) {
      if (opts.color) el.setAttribute('color', opts.color);
      else el.removeAttribute('color');
    }
    if (opts.loading !== undefined) el.toggleAttribute('loading', !!opts.loading);
    if (opts.withCloseButton !== undefined) el.setAttribute('with-close-button', opts.withCloseButton ? '' : 'false');
    if (opts.message !== undefined) el.textContent = opts.message;
    if (opts.icon !== undefined) {
      let iconSlot = el.querySelector<HTMLElement>(':scope > [slot="icon"]');
      if (opts.icon) {
        if (!iconSlot) {
          iconSlot = document.createElement('span');
          iconSlot.setAttribute('slot', 'icon');
          el.appendChild(iconSlot);
        }
        iconSlot.innerHTML = opts.icon;
      } else {
        iconSlot?.remove();
      }
    }
  }

  #scheduleAutoClose(id: string, el: MtNotification, autoClose: number | false | undefined): void {
    clearTimeout(this.#timers.get(id));
    this.#timers.delete(id);
    const ms = autoClose === undefined ? 4000 : autoClose;
    if (ms === false) {
      this.#remaining.delete(id);
      return;
    }
    this.#remaining.set(id, ms);
    this.#arm(id, el);
  }

  #arm(id: string, el: MtNotification): void {
    const ms = this.#remaining.get(id);
    if (ms == null) return;
    this.#startedAt.set(id, Date.now());
    this.#timers.set(
      id,
      window.setTimeout(() => {
        this.#forget(id);
        el.close();
      }, ms),
    );
  }

  #pause(id: string): void {
    const t = this.#timers.get(id);
    if (t == null) return;
    clearTimeout(t);
    this.#timers.delete(id);
    const started = this.#startedAt.get(id) ?? Date.now();
    const remaining = this.#remaining.get(id) ?? 0;
    this.#remaining.set(id, Math.max(0, remaining - (Date.now() - started)));
  }

  #forget(id: string): void {
    clearTimeout(this.#timers.get(id));
    this.#timers.delete(id);
    this.#remaining.delete(id);
    this.#startedAt.delete(id);
  }

  #enforceLimit(): void {
    const items = Array.from(this.querySelectorAll<MtNotification>('mt-notification'));
    while (items.length > this.limit) items.shift()?.close();
  }
}

function ensureContainer(): MtNotifications {
  let el = document.querySelector<MtNotifications>('mt-notifications');
  if (!el) {
    el = document.createElement('mt-notifications') as MtNotifications;
    document.body.appendChild(el);
  }
  return el;
}

/** Imperative API for toast notifications; also exposed on window.manatee. */
export const notifications = {
  show(opts: NotifyOptions): string {
    return ensureContainer().show(opts);
  },
  update(id: string, opts: Partial<NotifyOptions>): void {
    ensureContainer().updateItem(id, opts);
  },
  hide(id: string): void {
    ensureContainer().hide(id);
  },
  clean(): void {
    ensureContainer().clean();
  },
};

/**
 * Servers trigger toasts declaratively via HTMX `HX-Trigger: {"mt-notify": [...]}`
 * (see mt.Notify). htmx wraps non-object payloads as `{value: payload}`.
 */
document.addEventListener('mt-notify', (e) => {
  let detail = (e as CustomEvent<unknown>).detail as NotifyOptions | NotifyOptions[] | { value: NotifyOptions[] } | null;
  if (detail && !Array.isArray(detail) && 'value' in detail && Array.isArray(detail.value)) detail = detail.value;
  for (const opts of Array.isArray(detail) ? detail : [detail ?? {}]) notifications.show(opts as NotifyOptions);
});

define('mt-notification', MtNotification);
define('mt-notifications', MtNotifications);
