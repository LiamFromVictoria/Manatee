import { css, define, html, MtElement, type Props } from '../../core';

function clampPercent(v: number): number {
  return Math.min(100, Math.max(0, v));
}

const stripes = css`
  .bar[data-striped] {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }
  .bar[data-animated] { animation: mt-progress-stripes 1s linear infinite; }
  @keyframes mt-progress-stripes {
    from { background-position: 1rem 0; }
    to { background-position: 0 0; }
  }
`;

const progressStyles = css`
  :host { display: block; width: 100%; --_size: 0.5rem; }
  :host([size='xs']) { --_size: 0.1875rem; }
  :host([size='sm']) { --_size: 0.3125rem; }
  :host([size='md']) { --_size: 0.5rem; }
  :host([size='lg']) { --_size: 0.75rem; }
  :host([size='xl']) { --_size: 1rem; }
  .track {
    position: relative;
    width: 100%;
    height: var(--_size);
    background: var(--mt-color-gray-1);
    border-radius: var(--_radius, var(--mt-radius-xl));
    overflow: hidden;
  }
  .bar {
    height: 100%;
    width: var(--_value, 0%);
    background: var(--mt-c-filled);
    transition: width var(--_duration, 100ms) ease;
  }
`;

/**
 * <mt-progress value="0..100" color size="xs|sm|md|lg|xl" radius striped animated transition-duration>
 * role="progressbar" with aria-valuenow/min/max.
 */
export class MtProgress extends MtElement {
  static styles = [progressStyles, stripes];
  static props: Props = {
    value: { type: 'number', default: 0 },
    color: { color: true },
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius', default: 'xl' },
    striped: { type: 'boolean' },
    animated: { type: 'boolean' },
    transitionDuration: { type: 'number', default: 100 },
  };

  declare value: number;
  declare color: string | null;
  declare size: string;
  declare radius: string;
  declare striped: boolean;
  declare animated: boolean;
  declare transitionDuration: number;

  protected template(): string {
    return html`<div class="track" part="track"><div class="bar" part="bar"></div></div>`;
  }

  protected setup(): void {
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
  }

  protected update(changed: Set<string>): void {
    const bar = this.$<HTMLElement>('.bar');
    if (changed.has('value')) {
      const v = clampPercent(this.value);
      bar.style.setProperty('--_value', `${v}%`);
      this.setAttribute('aria-valuenow', String(v));
    }
    if (changed.has('transitionDuration')) this.style.setProperty('--_duration', `${this.transitionDuration}ms`);
    if (changed.has('striped')) bar.toggleAttribute('data-striped', this.striped);
    if (changed.has('animated')) bar.toggleAttribute('data-animated', this.animated);
  }
}

const rootStyles = css`
  :host {
    display: flex;
    width: 100%;
    --_size: 0.5rem;
    height: var(--_size);
    border-radius: var(--_radius, var(--mt-radius-xl));
    background: var(--mt-color-gray-1);
    overflow: hidden;
  }
  :host([size='xs']) { --_size: 0.1875rem; }
  :host([size='sm']) { --_size: 0.3125rem; }
  :host([size='md']) { --_size: 0.5rem; }
  :host([size='lg']) { --_size: 0.75rem; }
  :host([size='xl']) { --_size: 1rem; }
`;

/** <mt-progress-root size radius> Flex container for mt-progress-section children. */
export class MtProgressRoot extends MtElement {
  static styles = [rootStyles];
  static props: Props = {
    size: { default: 'md' },
    radius: { css: '--_radius', scale: 'radius', default: 'xl' },
  };

  declare size: string;
  declare radius: string;
}

const sectionStyles = css`
  :host { display: block; height: 100%; flex: 0 0 auto; width: var(--_value, 0%); }
  .bar { height: 100%; display: flex; background: var(--mt-c-filled); }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: var(--mt-font-size-xs);
    font-weight: 700;
    color: var(--mt-white);
    white-space: nowrap;
    overflow: hidden;
    padding-inline: 0.3rem;
  }
`;

/**
 * <mt-progress-section value="0..100" color striped animated>
 * Slot content renders as a centered label inside the section's filled width.
 * role="progressbar" with its own aria-valuenow/min/max.
 */
export class MtProgressSection extends MtElement {
  static styles = [sectionStyles, stripes];
  static props: Props = {
    value: { type: 'number', default: 0 },
    color: { color: true },
    striped: { type: 'boolean' },
    animated: { type: 'boolean' },
  };

  declare value: number;
  declare color: string | null;
  declare striped: boolean;
  declare animated: boolean;

  protected template(): string {
    return html`<div class="bar" part="bar"><span class="label" part="label"><slot></slot></span></div>`;
  }

  protected setup(): void {
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
  }

  protected update(changed: Set<string>): void {
    if (changed.has('value')) {
      const v = clampPercent(this.value);
      this.style.setProperty('--_value', `${v}%`);
      this.setAttribute('aria-valuenow', String(v));
    }
    const bar = this.$<HTMLElement>('.bar');
    if (changed.has('striped')) bar.toggleAttribute('data-striped', this.striped);
    if (changed.has('animated')) bar.toggleAttribute('data-animated', this.animated);
  }
}

define('mt-progress', MtProgress);
define('mt-progress-root', MtProgressRoot);
define('mt-progress-section', MtProgressSection);
