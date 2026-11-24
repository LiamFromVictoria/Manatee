import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: block; }
  .box {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--_duration, 200ms) var(--_easing, ease);
  }
  :host([opened]) .box { grid-template-rows: 1fr; }
  .content { overflow: hidden; min-height: 0; }
  :host([data-animate-opacity]) .content {
    opacity: 0;
    transition: opacity var(--_duration, 200ms) var(--_easing, ease);
  }
  :host([data-animate-opacity][opened]) .content { opacity: 1; }
`;

/**
 * <mt-collapse opened transition-duration transition-timing-function animate-opacity>
 * Animates height from 0 to the natural content height and back (a CSS grid
 * `0fr -> 1fr` track handles dynamic content without JS measurement). Content
 * is `inert` while closed. A separate element can drive `opened` via
 * `data-mt-toggle="<id>"` (see toggle.ts).
 */
export class MtCollapse extends MtElement {
  static styles = [styles];
  static props: Props = {
    opened: { type: 'boolean' },
    transitionDuration: { type: 'number', default: 200 },
    transitionTimingFunction: { default: 'ease' },
    animateOpacity: { type: 'boolean', default: true },
  };

  declare opened: boolean;
  declare transitionDuration: number;
  declare transitionTimingFunction: string;
  declare animateOpacity: boolean;

  protected template(): string {
    return html`<div class="box" part="box"><div class="content" part="content"><slot></slot></div></div>`;
  }

  get #content(): HTMLElement {
    return this.$('.content');
  }

  protected update(changed: Set<string>): void {
    if (changed.has('transitionDuration')) this.style.setProperty('--_duration', `${this.transitionDuration}ms`);
    if (changed.has('transitionTimingFunction')) this.style.setProperty('--_easing', this.transitionTimingFunction);
    if (changed.has('animateOpacity')) this.toggleAttribute('data-animate-opacity', this.animateOpacity);
    if (changed.has('opened')) this.#content.toggleAttribute('inert', !this.opened);
  }

  open(): void {
    this.opened = true;
  }
  close(): void {
    this.opened = false;
  }
  toggle(): void {
    this.opened = !this.opened;
  }
}

define('mt-collapse', MtCollapse);
