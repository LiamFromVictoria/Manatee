import { css, define, html, MtElement, type Props } from '../../core';

/** Resolve a `--mt-breakpoint-*` token (or a raw CSS length) to a px number. */
function breakpointPx(token: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--mt-breakpoint-${token}`).trim();
  if (!raw) {
    const n = parseFloat(token);
    return Number.isNaN(n) ? 0 : n;
  }
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return 0;
  return raw.endsWith('px') ? n : n * 16;
}

const shellStyles = css`
  :host {
    display: block;
    position: relative;
    --app-shell-navbar-offset: 0px;
    --app-shell-aside-offset: 0px;
    --app-shell-header-offset: 0px;
    --app-shell-footer-offset: 0px;
  }
  :host([data-has-header]) { --app-shell-header-offset: var(--app-shell-header-height, 60px); }
  :host([data-has-footer]) { --app-shell-footer-offset: var(--app-shell-footer-height, 0px); }
  :host([data-navbar-visible]) { --app-shell-navbar-offset: var(--app-shell-navbar-width, 300px); }
  :host([data-aside-visible]) { --app-shell-aside-offset: var(--app-shell-aside-width, 300px); }
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--mt-color-overlay);
    z-index: calc(var(--app-shell-z-index, 200) - 1);
  }
  :host([data-navbar-mobile-open]) .backdrop { display: block; }
`;

/**
 * <mt-app-shell header-height navbar-width navbar-breakpoint
 *               navbar-collapsed-mobile navbar-collapsed-desktop
 *               aside-width aside-breakpoint aside-collapsed-mobile aside-collapsed-desktop
 *               footer-height padding layout="default|alt" with-border z-index navbar-opened>
 * Children (direct tags): mt-app-shell-header, mt-app-shell-navbar, mt-app-shell-aside,
 * mt-app-shell-main, mt-app-shell-footer. Below navbar-breakpoint the navbar becomes a
 * full-width overlay drawer, shown while navbar-opened (toggled automatically by any
 * descendant mt-burger's `toggle` event/click, and mirrored back onto it).
 */
export class MtAppShell extends MtElement {
  static styles = [shellStyles];
  static props: Props = {
    headerHeight: { css: '--app-shell-header-height', scale: 'rem', default: 60 },
    navbarWidth: { css: '--app-shell-navbar-width', scale: 'rem', default: 300 },
    navbarBreakpoint: { default: 'sm' },
    navbarCollapsedMobile: { type: 'boolean', default: true },
    navbarCollapsedDesktop: { type: 'boolean' },
    asideWidth: { css: '--app-shell-aside-width', scale: 'rem', default: 300 },
    asideBreakpoint: { default: 'md' },
    asideCollapsedMobile: { type: 'boolean', default: true },
    asideCollapsedDesktop: { type: 'boolean' },
    footerHeight: { css: '--app-shell-footer-height', scale: 'rem' },
    padding: { css: '--app-shell-padding', scale: 'spacing', default: 'md' },
    layout: { default: 'default' },
    withBorder: { type: 'boolean', default: true },
    zIndex: { css: '--app-shell-z-index', type: 'number', default: 200 },
    navbarOpened: { type: 'boolean' },
  };

  declare headerHeight: string;
  declare navbarWidth: string;
  declare navbarBreakpoint: string;
  declare navbarCollapsedMobile: boolean;
  declare navbarCollapsedDesktop: boolean;
  declare asideWidth: string;
  declare asideBreakpoint: string;
  declare asideCollapsedMobile: boolean;
  declare asideCollapsedDesktop: boolean;
  declare footerHeight: string | null;
  declare padding: string;
  declare layout: string;
  declare withBorder: boolean;
  declare zIndex: number;
  declare navbarOpened: boolean;

  #navbarMedia: MediaQueryList | null = null;
  #asideMedia: MediaQueryList | null = null;
  #observer: MutationObserver | null = null;
  #onMediaChange = (): void => this.#sync();
  #onToggle = (e: Event): void => {
    const target = e.target as Element | null;
    if (!target || target.tagName !== 'MT-BURGER') return;
    this.navbarOpened = !!(e as CustomEvent<{ opened: boolean }>).detail?.opened;
  };

  protected template(): string {
    return html`<div class="backdrop" part="backdrop"></div><slot></slot>`;
  }

  protected setup(): void {
    this.$('.backdrop').addEventListener('click', () => {
      this.navbarOpened = false;
    });
    this.addEventListener('toggle', this.#onToggle);
    this.#observer = new MutationObserver(() => this.#sync());
    this.#observer.observe(this, { childList: true });
  }

  protected onConnect(): void {
    this.#navbarMedia?.removeEventListener('change', this.#onMediaChange);
    this.#asideMedia?.removeEventListener('change', this.#onMediaChange);
    this.#navbarMedia = matchMedia(`(max-width: ${breakpointPx(this.navbarBreakpoint)}px)`);
    this.#asideMedia = matchMedia(`(max-width: ${breakpointPx(this.asideBreakpoint)}px)`);
    this.#navbarMedia.addEventListener('change', this.#onMediaChange);
    this.#asideMedia.addEventListener('change', this.#onMediaChange);
    this.#sync();
  }

  protected onDisconnect(): void {
    this.#navbarMedia?.removeEventListener('change', this.#onMediaChange);
    this.#asideMedia?.removeEventListener('change', this.#onMediaChange);
    this.#observer?.disconnect();
  }

  protected update(changed: Set<string>): void {
    if (changed.has('navbarBreakpoint') || changed.has('asideBreakpoint')) {
      this.onConnect();
      return;
    }
    this.#sync();
  }

  #syncBurgers(): void {
    for (const burger of this.querySelectorAll('mt-burger')) {
      // Set the attribute, not the `.opened` property: mt-app-shell can upgrade
      // (and run this sync) before mt-burger is defined, and assigning a property
      // to an undefined custom element creates an own property that permanently
      // shadows the accessor once the element is later upgraded.
      burger.toggleAttribute('opened', this.navbarOpened);
    }
  }

  #sync(): void {
    const header = this.querySelector<HTMLElement>(':scope > mt-app-shell-header');
    const footer = this.querySelector<HTMLElement>(':scope > mt-app-shell-footer');
    const navbar = this.querySelector<HTMLElement>(':scope > mt-app-shell-navbar');
    const aside = this.querySelector<HTMLElement>(':scope > mt-app-shell-aside');

    const navMobile = this.#navbarMedia?.matches ?? false;
    const asideMobile = this.#asideMedia?.matches ?? false;

    const navbarDesktopVisible = !!navbar && !navMobile && !this.navbarCollapsedDesktop;
    const navbarMobileVisible = !!navbar && navMobile && (this.navbarOpened || !this.navbarCollapsedMobile);
    const asideDesktopVisible = !!aside && !asideMobile && !this.asideCollapsedDesktop;
    const asideMobileVisible = !!aside && asideMobile && !this.asideCollapsedMobile;

    this.toggleAttribute('data-has-header', !!header);
    this.toggleAttribute('data-has-footer', !!footer);
    this.toggleAttribute('data-navbar-visible', navbarDesktopVisible);
    this.toggleAttribute('data-aside-visible', asideDesktopVisible);
    this.toggleAttribute('data-navbar-mobile-open', navMobile && navbarMobileVisible);

    const altLayout = this.layout === 'alt';
    const noBorder = !this.withBorder;

    if (header) {
      header.toggleAttribute('data-no-border', noBorder);
      header.toggleAttribute('data-offset-left', altLayout && navbarDesktopVisible);
      header.toggleAttribute('data-offset-right', altLayout && asideDesktopVisible);
    }
    if (footer) {
      footer.toggleAttribute('data-no-border', noBorder);
      footer.toggleAttribute('data-offset-left', altLayout && navbarDesktopVisible);
      footer.toggleAttribute('data-offset-right', altLayout && asideDesktopVisible);
    }
    if (navbar) {
      navbar.setAttribute('data-mode', navMobile ? 'mobile' : 'desktop');
      navbar.setAttribute('data-layout', altLayout ? 'alt' : 'default');
      navbar.toggleAttribute('data-hidden', navMobile ? !navbarMobileVisible : !navbarDesktopVisible);
      navbar.toggleAttribute('data-no-border', noBorder);
    }
    if (aside) {
      aside.setAttribute('data-mode', asideMobile ? 'mobile' : 'desktop');
      aside.setAttribute('data-layout', altLayout ? 'alt' : 'default');
      aside.toggleAttribute('data-hidden', asideMobile ? !asideMobileVisible : !asideDesktopVisible);
      aside.toggleAttribute('data-no-border', noBorder);
    }
    this.#syncBurgers();
  }
}

const sideStyles = (border: 'left' | 'right') => css`
  :host {
    display: block;
    position: fixed;
    top: var(--app-shell-header-offset, 0);
    bottom: var(--app-shell-footer-offset, 0);
    ${border === 'left' ? 'left' : 'right'}: 0;
    width: var(--app-shell-${border === 'left' ? 'navbar' : 'aside'}-width, 300px);
    overflow-y: auto;
    background: var(--mt-color-body);
    border-${border}: 1px solid var(--mt-color-border);
    z-index: var(--app-shell-z-index, 200);
    padding: var(--mt-spacing-md);
    transition: transform var(--mt-transition);
  }
  :host([data-layout='alt']) { top: 0; bottom: 0; }
  :host([data-no-border]) { border-${border}-color: transparent; }
  :host([data-mode='mobile']) { width: min(100%, var(--app-shell-${border === 'left' ? 'navbar' : 'aside'}-width, 300px)); box-shadow: var(--mt-shadow-md); }
  :host([data-hidden]) { transform: translateX(${border === 'left' ? '-100%' : '100%'}); }
`;

/** <mt-app-shell-navbar> Fixed sidebar; slides in/out as an overlay drawer on mobile. */
export class MtAppShellNavbar extends MtElement {
  static styles = [sideStyles('left')];
}

/** <mt-app-shell-aside> Fixed sidebar on the trailing edge. */
export class MtAppShellAside extends MtElement {
  static styles = [sideStyles('right')];
}

const edgeStyles = (edge: 'top' | 'bottom') => css`
  :host {
    display: block;
    position: fixed;
    ${edge}: 0;
    left: 0;
    right: 0;
    height: var(--app-shell-${edge === 'top' ? 'header' : 'footer'}-offset, ${edge === 'top' ? '60px' : '0px'});
    z-index: var(--app-shell-z-index, 200);
    background: var(--mt-color-body);
    border-${edge === 'top' ? 'bottom' : 'top'}: 1px solid var(--mt-color-border);
  }
  :host([data-no-border]) { border-${edge === 'top' ? 'bottom' : 'top'}-color: transparent; }
  :host([data-offset-left]) { left: var(--app-shell-navbar-offset, 0); }
  :host([data-offset-right]) { right: var(--app-shell-aside-offset, 0); }
  .inner {
    display: flex;
    align-items: center;
    height: 100%;
    gap: var(--mt-spacing-sm);
    padding-inline: var(--mt-spacing-md);
  }
`;

/** <mt-app-shell-header> Fixed top bar spanning the shell (or inset in alt layout). */
export class MtAppShellHeader extends MtElement {
  static styles = [edgeStyles('top')];
  protected template(): string {
    return html`<div class="inner" part="inner"><slot></slot></div>`;
  }
}

/** <mt-app-shell-footer> Fixed bottom bar spanning the shell (or inset in alt layout). */
export class MtAppShellFooter extends MtElement {
  static styles = [edgeStyles('bottom')];
  protected template(): string {
    return html`<div class="inner" part="inner"><slot></slot></div>`;
  }
}

const mainStyles = css`
  :host {
    display: block;
    padding-top: var(--app-shell-header-offset, 0);
    padding-bottom: var(--app-shell-footer-offset, 0);
    padding-left: var(--app-shell-navbar-offset, 0);
    padding-right: var(--app-shell-aside-offset, 0);
  }
  .inner { padding: var(--app-shell-padding, 0); }
`;

/** <mt-app-shell-main> Content area, offset by the visible header/navbar/aside/footer. */
export class MtAppShellMain extends MtElement {
  static styles = [mainStyles];
  protected template(): string {
    return html`<div class="inner" part="inner"><slot></slot></div>`;
  }
}

define('mt-app-shell', MtAppShell);
define('mt-app-shell-header', MtAppShellHeader);
define('mt-app-shell-navbar', MtAppShellNavbar);
define('mt-app-shell-aside', MtAppShellAside);
define('mt-app-shell-main', MtAppShellMain);
define('mt-app-shell-footer', MtAppShellFooter);
