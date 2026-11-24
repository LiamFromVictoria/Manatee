import { css, define, isToken, MtElement, resolve, type Props } from '../../core';

const styles = css`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    max-width: var(--_maxw);
    padding-inline: var(--mt-spacing-md);
    margin-inline: auto;
    --_maxw: 60rem;
  }
  :host([size='xs']) { --_maxw: 33.75rem; }
  :host([size='sm']) { --_maxw: 45rem; }
  :host([size='md']) { --_maxw: 60rem; }
  :host([size='lg']) { --_maxw: 71.25rem; }
  :host([size='xl']) { --_maxw: 82.5rem; }
  :host([fluid]) { --_maxw: 100%; }
  :host([centered='false']) { margin-inline: 0; }
`;

/**
 * <mt-container size="xs|sm|md|lg|xl" fluid centered>
 * Non-token `size` values (e.g. "600") are treated as a raw px/rem max-width.
 * Slots: default.
 */
export class MtContainer extends MtElement {
  static styles = [styles];
  static props: Props = {
    size: { default: 'md' },
    fluid: { type: 'boolean' },
    centered: { type: 'boolean', default: true },
  };

  declare size: string;

  protected update(changed: Set<string>): void {
    if (changed.has('size')) {
      const v = this.size;
      if (v && !isToken(v)) this.style.setProperty('--_maxw', resolve('rem', v));
      else this.style.removeProperty('--_maxw');
    }
  }
}

define('mt-container', MtContainer);
