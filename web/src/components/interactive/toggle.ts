/**
 * Generic delegated open/close trigger, usable by any element that reflects
 * its open state as an `opened` attribute (Collapse, Accordion items,
 * NavLink, Drawer, Modal, ...): `data-mt-toggle="<id>"` on any clickable
 * element toggles the `opened` attribute on `#id` and mirrors the resulting
 * state as `aria-expanded` on the trigger. Shadow-DOM aware (composedPath).
 * Idempotent: safe to call from every module that wants it installed.
 */
let installed = false;

export function installToggleTrigger(): void {
  if (installed) return;
  installed = true;
  document.addEventListener('click', (e) => {
    const path = e.composedPath();
    for (const node of path) {
      if (!(node instanceof Element)) continue;
      const id = node.getAttribute('data-mt-toggle');
      if (!id) continue;
      const target = document.getElementById(id);
      if (!target) return;
      const next = !target.hasAttribute('opened');
      target.toggleAttribute('opened', next);
      node.setAttribute('aria-expanded', String(next));
      return;
    }
  });
}

installToggleTrigger();
