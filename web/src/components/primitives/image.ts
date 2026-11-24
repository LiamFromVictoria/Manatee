import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    width: 100%;
    --_fit: cover;
    --_radius: 0;
  }
  .root {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: var(--_fit);
    border-radius: var(--_radius);
  }
`;

/**
 * <mt-image src alt fit="cover|contain|fill|none|scale-down" radius
 *           fallback-src loading="lazy|eager">
 * Swaps to `fallback-src` once the primary `src` fails to load.
 * No slots.
 */
export class MtImage extends MtElement {
  static styles = [styles];
  static props: Props = {
    src: {},
    alt: {},
    fit: { css: '--_fit', default: 'cover' },
    radius: { css: '--_radius', scale: 'radius' },
    fallbackSrc: {},
    loading: {},
  };

  declare src: string | null;
  declare alt: string | null;
  declare fallbackSrc: string | null;
  declare loading: string | null;

  #failed = false;

  protected template(): string {
    return html`<img class="root" part="root" alt="" />`;
  }

  get #img(): HTMLImageElement {
    return this.$<HTMLImageElement>('.root');
  }

  protected setup(): void {
    this.#img.addEventListener('error', () => {
      if (this.fallbackSrc && this.#img.src !== new URL(this.fallbackSrc, location.href).href) {
        this.#failed = true;
        this.#img.src = this.fallbackSrc;
      }
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('src')) {
      this.#failed = false;
      this.#img.src = this.src ?? '';
    } else if (changed.has('fallbackSrc') && this.#failed && this.fallbackSrc) {
      this.#img.src = this.fallbackSrc;
    }
    this.#img.alt = this.alt ?? '';
    if (this.loading) this.#img.loading = this.loading as 'lazy' | 'eager';
    else this.#img.removeAttribute('loading');
  }
}

define('mt-image', MtImage);
