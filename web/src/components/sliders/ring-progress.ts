import { css, define, html, MtElement, resolveColor, type Props } from '../../core';

interface Section {
  value: number;
  color: string | null;
  tooltip: string | null;
}

const styles = css`
  :host { display: inline-block; --_size: 7.5rem; --_label-offset: 1.5rem; }
  .root { position: relative; width: var(--_size); height: var(--_size); }
  .svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); }
  .label {
    position: absolute;
    inset: var(--_label-offset);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }
`;

/**
 * <mt-ring-progress-section value color tooltip>
 * Data-only light-DOM child of <mt-ring-progress>; a native SVG <title> on
 * its arc gives it a hover tooltip. Never renders visible content itself.
 */
export class MtRingProgressSection extends MtElement {
  static props: Props = {
    value: { type: 'number', default: 0 },
    color: {},
    tooltip: {},
  };

  declare value: number;
  declare color: string | null;
  declare tooltip: string | null;

  protected onConnect(): void {
    this.style.display = 'none';
  }

  protected update(): void {
    this.emit('section-change');
  }
}

/**
 * <mt-ring-progress size="120" thickness="12" round-caps root-color>
 * Slots: label (centered text/icon). Light-DOM children: <mt-ring-progress-section value color tooltip>.
 * Sections (and the label) re-render on attribute or child changes.
 */
export class MtRingProgress extends MtElement {
  static styles = [styles];
  static props: Props = {
    size: { type: 'number', default: 120, css: '--_size', scale: 'rem' },
    thickness: { type: 'number', default: 12 },
    roundCaps: { type: 'boolean' },
    rootColor: {},
  };

  declare size: number;
  declare thickness: number;
  declare roundCaps: boolean;
  declare rootColor: string | null;

  protected template(): string {
    return html`
      <div class="root" part="root">
        <svg class="svg" part="svg"></svg>
        <div class="label" part="label"><slot name="label"></slot></div>
      </div>
    `;
  }

  protected setup(): void {
    this.addEventListener('section-change', () => this.#renderCurves());
    this.root.querySelector<HTMLSlotElement>('slot[name="label"]')?.addEventListener('slotchange', () => this.#renderCurves());
  }

  protected update(changed: Set<string>): void {
    if (changed.has('thickness')) this.style.setProperty('--_label-offset', `${Math.min(this.thickness, this.size / 4) * 2}px`);
    this.#renderCurves();
  }

  #sections(): Section[] {
    return Array.from(this.querySelectorAll(':scope > mt-ring-progress-section')).map((el) => ({
      value: Number(el.getAttribute('value') ?? '0'),
      color: el.getAttribute('color'),
      tooltip: el.getAttribute('tooltip'),
    }));
  }

  #renderCurves(): void {
    const size = this.size || 120;
    const thickness = Math.min(this.thickness || 12, size / 4);
    const center = size / 2;
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const svg = this.$<SVGSVGElement>('.svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

    const rootColor = this.rootColor ? resolveColor(this.rootColor) : 'var(--mt-color-gray-2)';
    const parts: string[] = [
      `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${rootColor}" stroke-width="${thickness}"></circle>`,
    ];

    let offset = 0;
    for (const section of this.#sections()) {
      const len = (circumference * Math.max(section.value, 0)) / 100;
      const color = resolveColor(section.color, 'var(--mt-color-primary-filled)');
      const linecap = this.roundCaps ? 'round' : 'butt';
      const title = section.tooltip ? `<title>${section.tooltip.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)}</title>` : '';
      parts.push(
        `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${color}" stroke-width="${thickness}" stroke-linecap="${linecap}" stroke-dasharray="${len} ${circumference - len}" stroke-dashoffset="${-offset}">${title}</circle>`,
      );
      offset += len;
    }
    svg.innerHTML = parts.join('');
  }
}

define('mt-ring-progress', MtRingProgress);
define('mt-ring-progress-section', MtRingProgressSection);
