import { css, html } from '../../core';

/**
 * Label-beside-control markup shared by checkbox, radio and switch: the
 * control renders first, followed by a label/description/error column.
 * Ids/classes match `MtFormElement.syncWrapper` (label/description/error).
 */
export function controlWrapperTemplate(control: string): string {
  return html`
    <label class="root" part="root">
      ${control}
      <div class="body" part="body">
        <span class="label" part="label" id="label" hidden
          ><slot name="label"><span class="label-text"></span></slot
          ><span class="required" aria-hidden="true" hidden>*</span></span
        >
        <span class="description" part="description" id="description" hidden
          ><slot name="description"><span class="description-text"></span></slot
        ></span>
        <span class="error" part="error" id="error" hidden
          ><slot name="error"><span class="error-text"></span></slot
        ></span>
      </div>
    </label>
  `;
}

/**
 * Root layout shared by checkbox, radio and switch single controls. The
 * control is top-aligned and the label line-height equals the control
 * height (--_control-h), so label and control stay centered on the first line
 * while description/error flow below, as in Mantine.
 */
export const rootStyles = css`
  :host { display: block; }
  .root { display: inline-flex; align-items: flex-start; gap: var(--mt-spacing-sm); cursor: pointer; }
  :host([label-position='left']) .root { flex-direction: row-reverse; }
  :host([disabled]) .root { cursor: not-allowed; }
  .body { display: flex; flex-direction: column; min-height: var(--_control-h); justify-content: center; }
  .label {
    display: inline-block;
    font-size: var(--_label-fz);
    font-weight: 400;
    line-height: var(--_control-h);
    color: var(--mt-color-text);
    word-break: break-word;
    cursor: pointer;
  }
  :host([disabled]) .label { color: var(--mt-color-disabled-color); cursor: not-allowed; }
  .required { color: var(--mt-color-error); margin-inline-start: 0.125rem; }
  .description, .error {
    display: block;
    font-size: var(--_hint-fz);
    line-height: 1.2;
    word-break: break-word;
  }
  .description { color: var(--mt-color-dimmed); }
  .error { color: var(--mt-color-error); margin-top: calc(var(--mt-spacing-xs) / 4); }
  [hidden] { display: none !important; }
`;

/** Control size scale shared by checkbox and radio (xs16 sm20 md24 lg30 xl36). */
export const controlSizeStyles = css`
  :host { --_size: 1.25rem; --_control-h: var(--_size); --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='xs']) { --_size: 1rem; --_label-fz: var(--mt-font-size-xs); --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='sm']) { --_size: 1.25rem; --_label-fz: var(--mt-font-size-sm); --_hint-fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_size: 1.5rem; --_label-fz: var(--mt-font-size-md); --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_size: 1.875rem; --_label-fz: var(--mt-font-size-lg); --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_size: 2.25rem; --_label-fz: var(--mt-font-size-xl); --_hint-fz: var(--mt-font-size-lg); }
`;

/** Label/description/error chrome for a group wrapper (CheckboxGroup, RadioGroup). */
export const groupStyles = css`
  :host { display: block; }
  :host([size='xs']) { --_hint-fz: calc(var(--mt-font-size-xs) - 0.125rem); }
  :host([size='sm']), :host(:not([size])) { --_hint-fz: var(--mt-font-size-xs); }
  :host([size='md']) { --_hint-fz: var(--mt-font-size-sm); }
  :host([size='lg']) { --_hint-fz: var(--mt-font-size-md); }
  :host([size='xl']) { --_hint-fz: var(--mt-font-size-lg); }
  .label { display: inline-block; font-size: var(--mt-font-size-sm); font-weight: 500; color: var(--mt-color-text); word-break: break-word; cursor: default; }
  .required { color: var(--mt-color-error); margin-inline-start: 0.125rem; }
  .description, .error { display: block; font-size: var(--_hint-fz); line-height: 1.2; word-break: break-word; }
  .description { color: var(--mt-color-dimmed); margin-top: calc(var(--mt-spacing-xs) / 4); }
  .error { color: var(--mt-color-error); margin-top: calc(var(--mt-spacing-xs) / 2); }
  .items { display: flex; flex-direction: column; gap: var(--mt-spacing-xs); margin-top: var(--mt-spacing-xs); }
  .label + .items, .description:not([hidden]) + .items { margin-top: var(--mt-spacing-xs); }
  [hidden] { display: none !important; }
`;
