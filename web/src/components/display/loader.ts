import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --_size: 2.25rem;
    --_color: var(--mt-color-primary-text);
    width: var(--_size);
    height: var(--_size);
    color: var(--_color);
  }
  :host([size='xs']) { --_size: 1.125rem; }
  :host([size='sm']) { --_size: 1.375rem; }
  :host([size='md']) { --_size: 2.25rem; }
  :host([size='lg']) { --_size: 2.75rem; }
  :host([size='xl']) { --_size: 3.625rem; }

  .oval, .bars, .dots { display: none; }
  :host(:not([type])) .oval, :host([type='oval']) .oval { display: block; }
  :host([type='bars']) .bars { display: flex; }
  :host([type='dots']) .dots { display: flex; }

  .oval {
    width: var(--_size);
    height: var(--_size);
    border: 0.1875em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: mt-loader-spin 0.8s linear infinite;
  }

  .bars { align-items: center; gap: calc(var(--_size) * 0.12); width: var(--_size); height: var(--_size); }
  .bars span {
    width: calc(var(--_size) * 0.18);
    height: 100%;
    background: currentColor;
    animation: mt-loader-bounce 1s ease-in-out infinite;
  }
  .bars span:nth-child(2) { animation-delay: 0.1s; }
  .bars span:nth-child(3) { animation-delay: 0.2s; }

  .dots { align-items: center; gap: calc(var(--_size) * 0.15); width: var(--_size); height: var(--_size); }
  .dots span {
    width: calc(var(--_size) * 0.25);
    height: calc(var(--_size) * 0.25);
    border-radius: 50%;
    background: currentColor;
    animation: mt-loader-fade 1s ease-in-out infinite;
  }
  .dots span:nth-child(2) { animation-delay: 0.15s; }
  .dots span:nth-child(3) { animation-delay: 0.3s; }

  @keyframes mt-loader-spin { to { transform: rotate(360deg); } }
  @keyframes mt-loader-bounce { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
  @keyframes mt-loader-fade { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
`;

/**
 * <mt-loader type="oval|bars|dots" color size>
 * No slots.
 */
export class MtLoader extends MtElement {
  static styles = [styles];
  static props: Props = {
    type: { default: 'oval' },
    color: { css: '--_color', scale: 'color' },
    size: { default: 'md' },
  };

  protected template(): string {
    return html`
      <span class="oval" part="oval" role="status" aria-label="Loading"></span>
      <span class="bars" part="bars" role="status" aria-label="Loading"><span></span><span></span><span></span></span>
      <span class="dots" part="dots" role="status" aria-label="Loading"><span></span><span></span><span></span></span>
    `;
  }
}

define('mt-loader', MtLoader);
