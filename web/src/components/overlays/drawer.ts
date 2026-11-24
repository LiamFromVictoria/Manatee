import { css, define, html, type Props } from '../../core';
import { installOverlayTriggers, MtDialogElement, resolveDialogSize } from './dialog-base';

const styles = css`
  :host { display: contents; }
  dialog.drawer {
    position: fixed;
    inset: 0 auto 0 0;
    margin: 0;
    padding: 0;
    border: 0;
    width: var(--_w, 23.75rem);
    max-width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--mt-color-body);
    color: var(--mt-color-text);
    box-shadow: var(--_shadow, var(--mt-shadow-xl));
    overflow: hidden;
    transform: translateX(0);
    transition: transform var(--mt-transition);
  }
  dialog.drawer:not([open]) { display: none; }
  dialog.drawer::backdrop { background: var(--mt-color-overlay); }

  dialog.drawer.closing { transform: translateX(-100%); }
  @starting-style { dialog.drawer[open] { transform: translateX(-100%); } }

  :host([position='right']) dialog.drawer { inset: 0 0 0 auto; }
  :host([position='right']) dialog.drawer.closing { transform: translateX(100%); }
  @starting-style { :host([position='right']) dialog.drawer[open] { transform: translateX(100%); } }

  :host([position='top']) dialog.drawer { inset: 0 0 auto 0; width: 100vw; max-width: 100vw; height: var(--_w, 23.75rem); max-height: 100dvh; }
  :host([position='top']) dialog.drawer.closing { transform: translateY(-100%); }
  @starting-style { :host([position='top']) dialog.drawer[open] { transform: translateY(-100%); } }

  :host([position='bottom']) dialog.drawer { inset: auto 0 0 0; width: 100vw; max-width: 100vw; height: var(--_w, 23.75rem); max-height: 100dvh; }
  :host([position='bottom']) dialog.drawer.closing { transform: translateY(100%); }
  @starting-style { :host([position='bottom']) dialog.drawer[open] { transform: translateY(100%); } }

  .header { display: flex; align-items: center; justify-content: space-between; gap: var(--mt-spacing-md); padding: var(--mt-spacing-md); flex: 0 0 auto; }
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
  .body { padding: var(--mt-spacing-md); padding-top: 0; overflow-y: auto; flex: 1 1 auto; }
`;

/**
 * <mt-drawer id opened heading position="left|right|top|bottom" size
 *            with-close-button close-on-click-outside close-on-escape>
 * Same declarative/open()/close()/events contract as <mt-modal>; slides in
 * from the given edge instead of fading+scaling.
 */
export class MtDrawer extends MtDialogElement {
  static styles = [styles];
  static props: Props = {
    ...MtDialogElement.props,
    heading: {},
    position: { default: 'left' },
    size: { default: 'md' },
  };

  declare heading: string | null;
  declare position: string;
  declare size: string;

  protected template(): string {
    return html`
      <dialog class="drawer" part="drawer" aria-labelledby="title">
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
    if (changed.has('size')) this.dialog.style.setProperty('--_w', resolveDialogSize(this.size));
  }

  #syncHeader(): void {
    const text = this.$<HTMLElement>('.title-text');
    if (text) text.textContent = this.heading ?? '';
    const hasTitle = !!this.heading || this.$<HTMLSlotElement>('slot[name="title"]').assignedNodes().length > 0;
    this.$<HTMLElement>('.header').toggleAttribute('hidden', !hasTitle && !this.withCloseButton);
  }
}

define('mt-drawer', MtDrawer);
installOverlayTriggers();
