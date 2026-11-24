import { css, define, html, MtElement, type Props } from '../../core';

const personIcon = `<svg viewBox="0 0 24 24" fill="currentColor" width="60%" height="60%"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-9 2.2-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.8-4.6-5-9-5Z"/></svg>`;

const styles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --_size: 2.375rem;
    --_radius: 1000px;
    --_bg: var(--mt-c-light);
    --_color: var(--mt-c-light-color);
  }
  :host([size='xs']) { --_size: 1rem; }
  :host([size='sm']) { --_size: 1.625rem; }
  :host([size='md']) { --_size: 2.375rem; }
  :host([size='lg']) { --_size: 3.5rem; }
  :host([size='xl']) { --_size: 5.25rem; }

  :host([variant='filled']) { --_bg: var(--mt-c-filled); --_color: var(--mt-white); }
  :host([variant='outline']) { --_bg: transparent; --_color: var(--mt-c-outline); }
  :host([variant='transparent']) { --_bg: transparent; --_color: var(--mt-c-light-color); }
  :host([variant='white']) { --_bg: var(--mt-white); --_color: var(--mt-c-filled); }
  :host([variant='gradient']) { --_bg: linear-gradient(calc(var(--_gdeg) * 1deg), var(--_gfrom), var(--_gto)); --_color: var(--mt-white); }

  .root {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    flex: 0 0 auto;
    overflow: hidden;
    background: var(--_bg);
    color: var(--_color);
    border: 1px solid transparent;
    border-radius: var(--_radius);
    font-size: calc(var(--_size) * 0.4);
    font-weight: 600;
    line-height: 1;
    user-select: none;
  }
  :host([variant='outline']) .root { border-color: var(--mt-c-outline); }

  .image { display: block; width: 100%; height: 100%; object-fit: cover; }
  .initials, .icon { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
  [hidden] { display: none !important; }
`;

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/**
 * <mt-avatar src alt name color variant="light|filled|outline|transparent|white|gradient"
 *            size radius gradient-from gradient-to gradient-deg>
 * Falls back from image to initials (derived from `name`) to a placeholder icon.
 * Slot: placeholder (custom fallback content).
 */
export class MtAvatar extends MtElement {
  static styles = [styles];
  static props: Props = {
    src: {},
    alt: {},
    name: {},
    color: { color: true },
    variant: { default: 'light' },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius', default: '1000px' },
    gradientFrom: { css: '--_gfrom', scale: 'color', default: 'blue' },
    gradientTo: { css: '--_gto', scale: 'color', default: 'cyan' },
    gradientDeg: { css: '--_gdeg', type: 'number', default: 45 },
  };

  declare src: string | null;
  declare alt: string | null;
  declare name: string | null;

  #broken = false;

  protected template(): string {
    return html`
      <span class="root" part="root">
        <img class="image" part="image" hidden alt="" />
        <span class="initials" part="initials" hidden></span>
        <span class="icon" part="icon" aria-hidden="true" hidden><slot name="placeholder">${personIcon}</slot></span>
      </span>
    `;
  }

  get #img(): HTMLImageElement {
    return this.$<HTMLImageElement>('.image');
  }

  protected setup(): void {
    this.#img.addEventListener('error', () => {
      this.#broken = true;
      this.#sync();
    });
    this.#img.addEventListener('load', () => {
      this.#broken = false;
      this.#sync();
    });
  }

  protected update(changed: Set<string>): void {
    if (changed.has('src')) {
      this.#broken = false;
      this.#img.src = this.src ?? '';
    }
    if (changed.has('alt') || changed.has('name')) {
      this.#img.alt = this.alt ?? this.name ?? '';
    }
    this.#sync();
  }

  #sync(): void {
    const showImage = !!this.src && !this.#broken;
    const initials = this.name ? initialsOf(this.name) : '';
    const initialsEl = this.$<HTMLElement>('.initials');
    this.#img.hidden = !showImage;
    initialsEl.hidden = showImage || !initials;
    initialsEl.textContent = initials;
    this.$<HTMLElement>('.icon').hidden = showImage || !!initials;
  }
}

const groupStyles = css`
  :host { display: inline-flex; --_overlap: var(--mt-spacing-sm); }
  ::slotted(mt-avatar) {
    margin-inline-start: calc(var(--_overlap) * -1);
    box-shadow: 0 0 0 2px var(--mt-color-body);
  }
  ::slotted(mt-avatar:first-child) { margin-inline-start: 0; }
`;

/** <mt-avatar-group spacing> Overlaps slotted avatars with a ring matching the body background. */
export class MtAvatarGroup extends MtElement {
  static styles = [groupStyles];
  static props: Props = { spacing: { css: '--_overlap', scale: 'spacing', default: 'sm' } };
}

define('mt-avatar', MtAvatar);
define('mt-avatar-group', MtAvatarGroup);
