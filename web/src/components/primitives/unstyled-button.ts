import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: block; }

  .root {
    display: inherit;
    flex-direction: inherit;
    flex-wrap: inherit;
    align-items: inherit;
    justify-content: inherit;
    align-content: inherit;
    gap: inherit;
    row-gap: inherit;
    column-gap: inherit;
    grid-template-columns: inherit;
    grid-template-rows: inherit;
    grid-auto-flow: inherit;
    place-items: inherit;
    width: 100%;
    height: 100%;
    font: inherit;
    color: inherit;
    text-align: inherit;
    text-decoration: none;
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  .root:disabled, :host([data-disabled]) .root {
    cursor: not-allowed;
    color: var(--mt-color-disabled-color);
  }
`;

/**
 * <mt-unstyled-button type="button|submit|reset" href target disabled>
 * Fully unstyled reset button (or anchor when `href` is set) that inherits
 * font/color from its context so blocks can style it from the outside via
 * `::part(root)` and host classes.
 * Slot: default.
 * Form-associated: type="submit" / "reset" act on the owning form.
 */
export class MtUnstyledButton extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [styles];
  static props: Props = {
    type: { default: 'button' },
    href: {},
    target: {},
    disabled: { type: 'boolean' },
  };

  declare type: string;
  declare href: string | null;
  declare disabled: boolean;

  readonly internals = this.attachInternals();

  protected template(): string {
    return html`<button class="root" part="root" type="button"><slot></slot></button>`;
  }

  protected setup(): void {
    this.addEventListener('click', (e) => {
      if (this.disabled) {
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
    if (root instanceof HTMLButtonElement) {
      root.disabled = this.disabled;
    } else {
      root.setAttribute('href', this.href ?? '');
      const target = this.getAttribute('target');
      if (target) root.setAttribute('target', target);
      else root.removeAttribute('target');
      root.toggleAttribute('aria-disabled', this.disabled);
      root.tabIndex = this.disabled ? -1 : 0;
    }
    this.toggleAttribute('data-disabled', this.disabled);
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

define('mt-unstyled-button', MtUnstyledButton);
