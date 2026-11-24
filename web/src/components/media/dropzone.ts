import { css, define, html, MtElement, type Props } from '../../core';

const styles = css`
  :host { display: block; --_radius: var(--mt-radius-md); }
  .root {
    position: relative;
    display: block;
    width: 100%;
    border: 1px dashed var(--mt-color-default-border);
    border-radius: var(--_radius);
    padding: var(--mt-spacing-md);
    cursor: pointer;
    outline: none;
    transition: border-color var(--mt-transition), background-color var(--mt-transition);
  }
  .root:focus-visible { outline: var(--mt-focus-ring); outline-offset: 2px; }
  :host([data-accept]) .root { border-color: var(--mt-color-primary-filled); background: color-mix(in srgb, var(--mt-color-primary-filled) 5%, transparent); }
  :host([data-reject]) .root { border-color: var(--mt-color-error); background: color-mix(in srgb, var(--mt-color-error) 5%, transparent); }
  :host([disabled]) .root, :host([loading]) .root {
    cursor: not-allowed;
    border-style: solid;
    border-color: var(--mt-color-border);
    background: var(--mt-color-disabled);
  }
  .input { position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0; pointer-events: none; }
  .overlay {
    display: none;
    position: absolute;
    inset: 0;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background: color-mix(in srgb, var(--mt-color-body) 75%, transparent);
  }
  :host([loading]) .overlay { display: flex; }
  .loader {
    width: 2.25rem;
    height: 2.25rem;
    border: 0.1875em solid var(--mt-color-primary-filled);
    border-right-color: transparent;
    border-radius: 50%;
    animation: mt-dropzone-spin 0.8s linear infinite;
  }
  @keyframes mt-dropzone-spin { to { transform: rotate(360deg); } }
`;

interface RejectedFile {
  file: File;
  errors: string[];
}

interface ValidationResult {
  accepted: File[];
  rejected: RejectedFile[];
}

let delegateInstalled = false;

function installOpenDelegate(): void {
  if (delegateInstalled) return;
  delegateInstalled = true;
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest?.('[data-mt-dropzone-open]');
    if (!trigger) return;
    const id = trigger.getAttribute('data-mt-dropzone-open');
    if (!id) return;
    const target = document.getElementById(id) as MtDropzone | null;
    target?.open();
  });
}

function parseAccept(accept: string | null): { mimes: string[]; exts: string[] } {
  const mimes: string[] = [];
  const exts: string[] = [];
  for (const raw of (accept ?? '').split(',').map((s) => s.trim()).filter(Boolean)) {
    if (raw.startsWith('.')) exts.push(raw.toLowerCase());
    else mimes.push(raw);
  }
  return { mimes, exts };
}

function mimeMatches(type: string, pattern: string): boolean {
  if (pattern.endsWith('/*')) return type.startsWith(pattern.slice(0, -1));
  return type === pattern;
}

/**
 * <mt-dropzone accept max-size max-files multiple disabled loading activate-on-click radius name>
 * Slot: default (idle/accept/reject content, instructions, etc).
 * Form-associated: accepted files submit under `name` as FormData File entries.
 * Events: drop { files }, reject { files, errors }.
 * Methods: open().
 */
export class MtDropzone extends MtElement {
  static formAssociated = true;
  static shadowOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };
  static styles = [styles];
  static props: Props = {
    accept: {},
    maxSize: { attr: 'max-size', type: 'number' },
    maxFiles: { attr: 'max-files', type: 'number' },
    multiple: { type: 'boolean', default: true },
    disabled: { type: 'boolean' },
    loading: { type: 'boolean' },
    activateOnClick: { attr: 'activate-on-click', type: 'boolean', default: true },
    radius: { css: '--_radius', scale: 'radius', default: 'md' },
    name: {},
  };

  declare accept: string | null;
  declare maxSize: number | null;
  declare maxFiles: number | null;
  declare multiple: boolean;
  declare disabled: boolean;
  declare loading: boolean;
  declare activateOnClick: boolean;
  declare name: string | null;

  readonly internals = this.attachInternals();
  #dragCounter = 0;
  #files: File[] = [];

  get isInactive(): boolean {
    return this.disabled || this.loading;
  }

  get input(): HTMLInputElement {
    return this.$<HTMLInputElement>('.input');
  }

  protected template(): string {
    return html`
      <div class="root" part="root" tabindex="0" role="button" aria-label="File upload">
        <input class="input" type="file" tabindex="-1" aria-hidden="true" />
        <slot></slot>
        <div class="overlay" part="overlay"><span class="loader" part="loader" role="status" aria-label="Loading"></span></div>
      </div>
    `;
  }

  protected setup(): void {
    const root = this.$<HTMLDivElement>('.root');
    installOpenDelegate();

    this.addEventListener('dragenter', (e) => {
      e.preventDefault();
      this.#dragCounter++;
      if (this.isInactive) return;
      this.#setState(this.#evaluateDataTransfer(e.dataTransfer) ? 'accept' : 'reject');
    });
    this.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = this.isInactive ? 'none' : 'copy';
    });
    this.addEventListener('dragleave', () => {
      this.#dragCounter = Math.max(0, this.#dragCounter - 1);
      if (this.#dragCounter === 0) this.#setState('idle');
    });
    this.addEventListener('drop', (e) => {
      e.preventDefault();
      this.#dragCounter = 0;
      this.#setState('idle');
      if (this.isInactive) return;
      this.#handleFiles(e.dataTransfer?.files ?? null);
    });
    root.addEventListener('click', (e) => {
      if (!this.activateOnClick || this.isInactive) return;
      if ((e.target as Element).closest('.input')) return;
      this.open();
    });
    root.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && this.activateOnClick && !this.isInactive) {
        e.preventDefault();
        this.open();
      }
    });
    this.input.addEventListener('change', () => {
      this.#handleFiles(this.input.files);
      this.input.value = '';
    });
    this.#setState('idle');
  }

  protected update(changed: Set<string>): void {
    const root = this.$<HTMLDivElement>('.root');
    root.toggleAttribute('aria-disabled', this.isInactive);
    root.tabIndex = this.isInactive ? -1 : 0;
    this.input.toggleAttribute('disabled', this.isInactive);
    if (changed.has('multiple')) this.input.toggleAttribute('multiple', this.multiple);
    if (changed.has('accept')) this.input.setAttribute('accept', this.accept ?? '');
  }

  formResetCallback(): void {
    this.#files = [];
    this.internals.setFormValue(null);
  }

  open(): void {
    if (this.isInactive) return;
    this.input.click();
  }

  #setState(state: 'accept' | 'reject' | 'idle'): void {
    this.removeAttribute('data-accept');
    this.removeAttribute('data-reject');
    this.removeAttribute('data-idle');
    this.setAttribute(`data-${state}`, '');
    for (const tag of ['mt-dropzone-accept', 'mt-dropzone-reject', 'mt-dropzone-idle']) {
      const active = tag === `mt-dropzone-${state}`;
      this.querySelectorAll(tag).forEach((el) => el.toggleAttribute('data-active', active));
    }
  }

  #evaluateDataTransfer(dt: DataTransfer | null): boolean {
    if (!dt) return true;
    const { mimes, exts } = parseAccept(this.accept);
    if (mimes.length === 0 && exts.length === 0) return true;
    const items = Array.from(dt.items).filter((it) => it.kind === 'file');
    if (items.length === 0) return true;
    // Extensions cannot be checked before drop (filename unknown); only type-matchable items count.
    if (mimes.length === 0) return true;
    return items.every((it) => mimes.some((m) => mimeMatches(it.type, m)));
  }

  #validate(list: FileList | null): ValidationResult {
    const accepted: File[] = [];
    const rejected: RejectedFile[] = [];
    let files = list ? Array.from(list) : [];
    if (!this.multiple) files = files.slice(0, 1);
    const { mimes, exts } = parseAccept(this.accept);
    const maxFiles = this.maxFiles;
    for (const file of files) {
      const errors: string[] = [];
      if (mimes.length || exts.length) {
        const name = file.name.toLowerCase();
        const typeOk = mimes.some((m) => mimeMatches(file.type, m));
        const extOk = exts.some((ext) => name.endsWith(ext));
        if (!typeOk && !extOk) errors.push('file-invalid-type');
      }
      if (this.maxSize != null && file.size > this.maxSize) errors.push('file-too-large');
      if (errors.length === 0 && maxFiles != null && accepted.length >= maxFiles) errors.push('too-many-files');
      if (errors.length) rejected.push({ file, errors });
      else accepted.push(file);
    }
    return { accepted, rejected };
  }

  #handleFiles(list: FileList | null): void {
    const { accepted, rejected } = this.#validate(list);
    if (accepted.length) {
      this.#files = accepted;
      this.#syncFormValue();
      this.emit('drop', { files: accepted });
    }
    if (rejected.length) {
      this.emit('reject', { files: rejected.map((r) => r.file), errors: rejected });
    }
  }

  #syncFormValue(): void {
    if (!this.name) return;
    const fd = new FormData();
    for (const f of this.#files) fd.append(this.name, f);
    this.internals.setFormValue(fd);
  }
}

function stateChildStyles(): CSSStyleSheet {
  return css`
    :host { display: none; }
    :host([data-active]) { display: contents; }
  `;
}

/** <mt-dropzone-accept>: visible only while a dropzone-accepted drag hovers the dropzone. */
export class MtDropzoneAccept extends MtElement {
  static styles = [stateChildStyles()];
  protected template(): string {
    return '<slot></slot>';
  }
}

/** <mt-dropzone-reject>: visible only while a dropzone-rejected drag hovers the dropzone. */
export class MtDropzoneReject extends MtElement {
  static styles = [stateChildStyles()];
  protected template(): string {
    return '<slot></slot>';
  }
}

/** <mt-dropzone-idle>: visible when nothing is being dragged over the dropzone (default). */
export class MtDropzoneIdle extends MtElement {
  static styles = [stateChildStyles()];
  protected template(): string {
    return '<slot></slot>';
  }
}

define('mt-dropzone', MtDropzone);
define('mt-dropzone-accept', MtDropzoneAccept);
define('mt-dropzone-reject', MtDropzoneReject);
define('mt-dropzone-idle', MtDropzoneIdle);
