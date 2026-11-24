import { css, MtElement, type Props } from '../../core';

/** Shared arrow props for floating panels (Popover/Menu), mirroring Mantine's Floating base. */
export const ARROW_PROPS: Props = {
  withArrow: { type: 'boolean' },
  arrowSize: { type: 'number', default: 7 },
  arrowOffset: { type: 'number', default: 5 },
  arrowPosition: { default: 'side' }, // side (default) | center
};

/** Shared enter/exit transition props for floating panels. */
export const TRANSITION_PROPS: Props = {
  transition: { default: 'fade' }, // fade (default) | pop | scale-y | slide-down
  transitionDuration: { type: 'number', default: 150 },
};

/**
 * Resolve the real interactive/positionable element for a `[slot="target"]`
 * (or `<mt-menu-target>`) wrapper: if the wrapper itself renders no box
 * (`display: contents`, used by the templ Go wrappers and <mt-menu-target>),
 * descend into its first element child; otherwise the wrapper IS the target.
 */
export function resolveTarget(wrapper: HTMLElement | null): HTMLElement | null {
  if (!wrapper) return null;
  if (getComputedStyle(wrapper).display === 'contents') {
    return (wrapper.firstElementChild as HTMLElement | null) ?? wrapper;
  }
  return wrapper;
}

/** Arrow element + positioning, keyed off the reference-relative `data-placement`
 * the floating panel's `.dropdown` box gets from autoPosition(). Consumers set
 * `--_arrow` / `--_arrow-offset` and the `arrow-position` host attribute from
 * the resolved props (see Menu/Popover `#show()`). */
export const floatingArrowStyles = css`
  .arrow {
    display: none;
    position: absolute;
    width: var(--_arrow, 0.4375rem);
    height: var(--_arrow, 0.4375rem);
    background: inherit;
    border: inherit;
    transform: rotate(45deg);
  }
  :host([with-arrow]) .arrow { display: block; }

  .dropdown[data-placement^='top'] .arrow { bottom: calc(var(--_arrow, 0.4375rem) / -2); border-top: 0; border-left: 0; }
  .dropdown[data-placement^='bottom'] .arrow { top: calc(var(--_arrow, 0.4375rem) / -2); border-bottom: 0; border-right: 0; }
  .dropdown[data-placement^='left'] .arrow { right: calc(var(--_arrow, 0.4375rem) / -2); border-bottom: 0; border-left: 0; }
  .dropdown[data-placement^='right'] .arrow { left: calc(var(--_arrow, 0.4375rem) / -2); border-top: 0; border-right: 0; }

  .dropdown[data-placement^='top'] .arrow, .dropdown[data-placement^='bottom'] .arrow { left: calc(50% - var(--_arrow, 0.4375rem) / 2); }
  .dropdown[data-placement^='left'] .arrow, .dropdown[data-placement^='right'] .arrow { top: calc(50% - var(--_arrow, 0.4375rem) / 2); }

  :host([arrow-position='side']) .dropdown[data-placement$='-start'] .arrow { left: var(--_arrow-offset, 0.3125rem); right: auto; }
  :host([arrow-position='side']) .dropdown[data-placement$='-end'] .arrow { left: auto; right: var(--_arrow-offset, 0.3125rem); }
  :host([arrow-position='side']) .dropdown[data-placement='left-start'] .arrow,
  :host([arrow-position='side']) .dropdown[data-placement='right-start'] .arrow { top: var(--_arrow-offset, 0.3125rem); bottom: auto; }
  :host([arrow-position='side']) .dropdown[data-placement='left-end'] .arrow,
  :host([arrow-position='side']) .dropdown[data-placement='right-end'] .arrow { top: auto; bottom: var(--_arrow-offset, 0.3125rem); }
`;

/** Enter/exit animation for a floating panel's `.dropdown` box, selected by
 * the `transition` host attribute and timed by `--_dur` (set from
 * `transitionDuration`). Default (no attribute / "fade") is opacity-only. */
export const floatingTransitionStyles = css`
  .dropdown {
    opacity: 0;
    transition: opacity var(--_dur, 150ms) ease;
  }
  .dropdown:popover-open { opacity: 1; }
  .dropdown.closing { opacity: 0; }
  @starting-style { .dropdown:popover-open { opacity: 0; } }

  .dropdown[data-placement^='top'] { transform-origin: bottom; }
  .dropdown[data-placement^='bottom'] { transform-origin: top; }
  .dropdown[data-placement^='left'] { transform-origin: right; }
  .dropdown[data-placement^='right'] { transform-origin: left; }

  :host([transition='pop']) .dropdown { transform: scale(0.9); transition-property: opacity, transform; }
  :host([transition='pop']) .dropdown:popover-open { transform: scale(1); }
  :host([transition='pop']) .dropdown.closing { transform: scale(0.9); }
  @starting-style { :host([transition='pop']) .dropdown:popover-open { transform: scale(0.9); } }

  :host([transition='scale-y']) .dropdown { transform: scaleY(0); transition-property: opacity, transform; }
  :host([transition='scale-y']) .dropdown:popover-open { transform: scaleY(1); }
  :host([transition='scale-y']) .dropdown.closing { transform: scaleY(0); }
  @starting-style { :host([transition='scale-y']) .dropdown:popover-open { transform: scaleY(0); } }

  :host([transition='slide-down']) .dropdown { transform: translateY(-0.625rem); transition-property: opacity, transform; }
  :host([transition='slide-down']) .dropdown:popover-open { transform: translateY(0); }
  :host([transition='slide-down']) .dropdown.closing { transform: translateY(-0.625rem); }
  @starting-style { :host([transition='slide-down']) .dropdown:popover-open { transform: translateY(-0.625rem); } }

  .dropdown, :host([transition='pop']) .dropdown, :host([transition='scale-y']) .dropdown, :host([transition='slide-down']) .dropdown {
    transition-duration: var(--_dur, 150ms);
  }
`;

/**
 * Shared base for popover-style floating panels (Popover.Dropdown,
 * Menu.Dropdown): a `.dropdown` box rendered via popover="manual", shown/
 * hidden with a CSS-driven exit animation (transitionend, with a fallback
 * timeout for reduced-motion / no-transition cases).
 */
export abstract class MtFloatingPanel extends MtElement {
  get box(): HTMLElement {
    return this.$<HTMLElement>('.dropdown');
  }

  show(): void {
    const box = this.box;
    if (box.matches(':popover-open')) return;
    box.classList.remove('closing');
    box.showPopover();
  }

  hide(): void {
    const box = this.box;
    if (!box.matches(':popover-open')) return;
    box.classList.add('closing');
    let done = false;
    const onEnd = (e: TransitionEvent) => {
      if (e.target === box) finish();
    };
    const finish = () => {
      if (done) return;
      done = true;
      box.removeEventListener('transitionend', onEnd);
      box.classList.remove('closing');
      box.hidePopover();
    };
    box.addEventListener('transitionend', onEnd);
    setTimeout(finish, 250);
  }
}
