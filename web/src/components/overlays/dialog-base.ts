import { MtElement, type Props } from '../../core';

/** Minimal shape needed by the declarative open/close triggers. */
interface OverlayLike {
  open(): void;
  close(): void;
}

let triggersInstalled = false;

/**
 * Install one delegated document click listener for declarative overlay
 * triggers (works for both Modal and Drawer, shadow-DOM aware):
 *   data-mt-open="<id>"  opens #id (element must expose .open())
 *   data-mt-close        closes the nearest ancestor <mt-modal>/<mt-drawer>
 *   data-mt-close="<id>" closes #id
 * Idempotent: safe to call from every overlay module.
 */
export function installOverlayTriggers(): void {
  if (triggersInstalled) return;
  triggersInstalled = true;
  document.addEventListener('click', (e) => {
    const path = e.composedPath();
    for (let i = 0; i < path.length; i++) {
      const el = path[i];
      if (!(el instanceof Element)) continue;
      const openId = el.getAttribute('data-mt-open');
      if (openId) {
        const target = document.getElementById(openId) as unknown as OverlayLike | null;
        target?.open?.();
        return;
      }
      if (el.hasAttribute('data-mt-close')) {
        const id = el.getAttribute('data-mt-close');
        if (id) {
          (document.getElementById(id) as unknown as OverlayLike | null)?.close?.();
        } else {
          for (let j = i; j < path.length; j++) {
            const anc = path[j];
            if (anc instanceof HTMLElement && (anc.localName === 'mt-modal' || anc.localName === 'mt-drawer')) {
              (anc as unknown as OverlayLike).close();
              break;
            }
          }
        }
        return;
      }
    }
  });
}

/** Mantine's named dialog sizes, in px. */
export const DIALOG_SIZES: Record<string, string> = {
  xs: '20rem', // 320px
  sm: '23.75rem', // 380px
  md: '27.5rem', // 440px
  lg: '38.75rem', // 620px
  xl: '48.75rem', // 780px
};

/** Resolve a Modal/Drawer `size` value: token, bare number (px), "auto", or raw CSS (%, rem...). */
export function resolveDialogSize(v: string | null): string {
  if (!v) return DIALOG_SIZES.md;
  if (DIALOG_SIZES[v]) return DIALOG_SIZES[v];
  if (v === 'auto') return 'auto';
  if (/^-?\d*\.?\d+$/.test(v)) return `${parseFloat(v) / 16}rem`;
  return v;
}

/**
 * Shared <dialog>-backed base for Modal and Drawer: open/close lifecycle,
 * animated close (CSS transition + fallback timeout), Escape/outside-click
 * handling, and focus return to the opener. Subclasses provide template()
 * and styles, and must render a `dialog` element and a `.close` button.
 */
export abstract class MtDialogElement extends MtElement {
  static props: Props = {
    opened: { type: 'boolean' },
    withCloseButton: { type: 'boolean', default: true },
    closeOnClickOutside: { type: 'boolean', default: true },
    closeOnEscape: { type: 'boolean', default: true },
  };

  declare opened: boolean;
  declare withCloseButton: boolean;
  declare closeOnClickOutside: boolean;
  declare closeOnEscape: boolean;

  #opener: HTMLElement | null = null;

  protected get dialog(): HTMLDialogElement {
    return this.$<HTMLDialogElement>('dialog');
  }

  protected setup(): void {
    const dialog = this.dialog;
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      if (this.closeOnEscape) this.close();
    });
    dialog.addEventListener('click', (e) => {
      if (!this.closeOnClickOutside) return;
      const r = dialog.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) this.close();
    });
    dialog.addEventListener('close', () => {
      if (this.opened) this.opened = false;
    });
    this.$<HTMLButtonElement>('.close')?.addEventListener('click', () => this.close());
  }

  protected update(changed: Set<string>): void {
    if (changed.has('withCloseButton')) {
      this.$<HTMLElement>('.close')?.toggleAttribute('hidden', !this.withCloseButton);
    }
    if (changed.has('opened')) {
      if (this.opened) this.#show();
      else this.#hide();
    }
  }

  /** Open the dialog, remembering the current focus to restore it on close. */
  open(): void {
    this.opened = true;
  }

  /** Close the dialog (animated); restores focus to the opener. */
  close(): void {
    this.opened = false;
  }

  #show(): void {
    const dialog = this.dialog;
    if (dialog.open) return;
    this.#opener = document.activeElement as HTMLElement | null;
    dialog.showModal();
    this.emit('open');
  }

  #hide(): void {
    const dialog = this.dialog;
    if (!dialog.open) return;
    dialog.classList.add('closing');
    let done = false;
    const onEnd = (e: TransitionEvent) => {
      if (e.target === dialog) finish();
    };
    const finish = () => {
      if (done) return;
      done = true;
      dialog.removeEventListener('transitionend', onEnd);
      dialog.classList.remove('closing');
      dialog.close();
      this.emit('close');
      this.#opener?.focus();
      this.#opener = null;
    };
    dialog.addEventListener('transitionend', onEnd);
    setTimeout(finish, 200);
  }
}
