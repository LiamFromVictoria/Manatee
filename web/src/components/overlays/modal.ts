import { css, define, html, type Props } from '../../core';
import { installOverlayTriggers, MtDialogElement, resolveDialogSize } from './dialog-base';

const styles = css`
  :host { display: contents; }
  dialog.modal {
    position: fixed;
    inset: 0;
    margin: var(--_y, 5dvh) auto auto;
    width: var(--_w, 27.5rem);
    max-width: calc(100vw - var(--mt-spacing-md) * 2);
    max-height: calc(100dvh - var(--_y, 5dvh) * 2);
    padding: 0;
    border: 0;
    display: flex;
    flex-direction: column;
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    border-radius: var(--_radius, var(--mt-radius-default));
    box-shadow: var(--_shadow, var(--mt-shadow-xl));
    overflow: hidden;
    opacity: 1;
    transform: scale(1);
    transition: opacity var(--mt-transition), transform var(--mt-transition);
  }
  dialog.modal:not([open]) { display: none; }
  dialog.modal.closing { opacity: 0; transform: scale(0.9); }
  @starting-style {
    dialog.modal[open] { opacity: 0; transform: scale(0.9); }
  }
  dialog.modal::backdrop { background: var(--mt-color-overlay); backdrop-filter: var(--_blur, none); }
  :host([centered]) dialog.modal { margin: auto; }
  :host([full-screen]) dialog.modal {
    width: 100vw;
    height: 100dvh;
    max-width: 100vw;
    max-height: 100dvh;
    margin: 0;
    border-radius: 0;
  }

  .header { display: flex; align-items: center; justify-content: space-between; gap: var(--mt-spacing-md); padding: var(--_padding, var(--mt-spacing-md)); padding-bottom: 0; flex: 0 0 auto; }
  .header[hidden] { display: none; }
  .title { font-weight: 600; font-size: var(--mt-font-size-lg); }
  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 1.875rem;
    height: 1.875rem;
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
  .body { padding: var(--_padding, var(--mt-spacing-md)); overflow-y: auto; }
  :host([full-screen]) .body { flex: 1 1 auto; }
`;

/**
 * <mt-modal id opened heading size="xs|sm|md|lg|xl|<n>|auto|%" centered
 *           full-screen with-close-button close-on-click-outside close-on-escape
 *           padding radius shadow y-offset overlay-blur>
 * Slots: default (body), title (overrides `heading`).
 * Methods: open(), close(). Events: open, close.
 * Declarative: data-mt-open="<id>" / data-mt-close[="<id>"] anywhere in the document.
 */
export class MtModal extends MtDialogElement {
  static styles = [styles];
  static props: Props = {
    ...MtDialogElement.props,
    heading: {},
    size: { default: 'md' },
    centered: { type: 'boolean' },
    fullScreen: { type: 'boolean' },
    padding: { css: '--_padding', scale: 'spacing', default: 'md' },
    radius: { css: '--_radius', scale: 'radius' },
    shadow: { css: '--_shadow', scale: 'shadow', default: 'xl' },
    yOffset: { css: '--_y', scale: 'raw', default: '5dvh' },
    overlayBlur: {},
  };

  declare heading: string | null;
  declare size: string;
  declare centered: boolean;
  declare fullScreen: boolean;
  declare padding: string;
  declare radius: string | null;
  declare shadow: string;
  declare yOffset: string;
  declare overlayBlur: string | null;

  protected template(): string {
    return html`
      <dialog class="modal" part="modal" aria-labelledby="title">
        <div class="header" part="header">
          <div class="title" part="title" id="title"><slot name="title"><span class="title-text"></span></slot></div>
          <button class="close" part="close-button" type="button" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="body" part="body"><slot></slot></div>
      </dialog>
    `;
  }

  protected setup(): void {
    super.setup();
    this.$<HTMLSlotElement>('slot[name="title"]').addEventListener('slotchange', () => this.#syncHeader());
  }

  protected update(changed: Set<string>): void {
    super.update(changed);
    if (changed.has('heading') || changed.has('withCloseButton')) this.#syncHeader();
    if (changed.has('size') || changed.has('fullScreen')) {
      this.dialog.style.width = this.fullScreen ? '' : resolveDialogSize(this.size);
    }
    if (changed.has('overlayBlur')) {
      this.dialog.style.setProperty('--_blur', this.overlayBlur ? `blur(${this.overlayBlur}px)` : 'none');
    }
  }

  #syncHeader(): void {
    const text = this.$<HTMLElement>('.title-text');
    if (text) text.textContent = this.heading ?? '';
    const hasTitle = !!this.heading || this.$<HTMLSlotElement>('slot[name="title"]').assignedNodes().length > 0;
    this.$<HTMLElement>('.header').toggleAttribute('hidden', !hasTitle && !this.withCloseButton);
  }
}

define('mt-modal', MtModal);
installOverlayTriggers();
