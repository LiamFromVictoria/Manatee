import { css, define, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    --_size: 1px;
    --_color: var(--mt-color-border);
  }
  :host([size='xs']) { --_size: 1px; }
  :host([size='sm']) { --_size: 2px; }
  :host([size='md']) { --_size: 3px; }
  :host([size='lg']) { --_size: 4px; }
  :host([size='xl']) { --_size: 5px; }

  .root { display: flex; align-items: center; }
  .line { flex: 1; border-top: var(--_size) solid var(--_color); }
  :host([variant='dashed']) .line { border-top-style: dashed; }
  :host([variant='dotted']) .line { border-top-style: dotted; }
  .label {
    display: none;
    padding-inline: var(--mt-spacing-xs);
    font-size: var(--mt-font-size-xs);
    color: var(--mt-color-dimmed);
    white-space: nowrap;
  }
  :host([data-has-label]) .label { display: inline-block; }
  :host([label-position='left']) .line.before { flex: 0 0 var(--mt-spacing-xl); }
  :host([label-position='right']) .line.after { flex: 0 0 var(--mt-spacing-xl); }

  :host([orientation='vertical']) { display: inline-block; align-self: stretch; height: auto; }
  :host([orientation='vertical']) .root { flex-direction: column; height: 100%; }
  :host([orientation='vertical']) .line { border-top: none; border-left: var(--_size) solid var(--_color); }
  :host([orientation='vertical']) .label { padding-inline: 0; padding-block: var(--mt-spacing-xs); }
`;

/**
 * <mt-divider orientation="horizontal|vertical" size="xs..xl" color variant="solid|dashed|dotted"
 *             label label-position="left|center|right">
 * Slots: label (overrides the `label` attribute text).
 * Renders role="separator" with aria-orientation.
 */
export class MtDivider extends MtElement {
  static styles = [styles];
  static props: Props = {
    orientation: { default: 'horizontal' },
    size: { default: 'xs' },
    color: { css: '--_color', scale: 'color' },
    variant: { default: 'solid' },
    label: {},
    labelPosition: { attr: 'label-position', default: 'center' },
  };

  declare orientation: string;
  declare label: string | null;

  protected template(): string {
    return (
      '<div class="root" part="root" role="separator">' +
      '<div class="line before"></div>' +
      '<span class="label" part="label"><slot name="label"></slot></span>' +
      '<div class="line after"></div>' +
      '</div>'
    );
  }

  protected setup(): void {
    this.$<HTMLSlotElement>('slot[name="label"]').addEventListener('slotchange', () => this.#syncLabel());
  }

  protected update(changed: Set<string>): void {
    if (changed.has('orientation')) this.setAttribute('aria-orientation', this.orientation);
    if (changed.has('label')) {
      const slot = this.$<HTMLSlotElement>('slot[name="label"]');
      if (slot.assignedNodes().length === 0) slot.textContent = this.label ?? '';
    }
    this.#syncLabel();
  }

  #syncLabel(): void {
    const slot = this.$<HTMLSlotElement>('slot[name="label"]');
    const hasLabel = slot.assignedNodes().length > 0 || !!this.label;
    if (hasLabel) this.setAttribute('data-has-label', '');
    else this.removeAttribute('data-has-label');
  }
}

define('mt-divider', MtDivider);
