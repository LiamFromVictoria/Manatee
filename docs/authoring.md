# Authoring Manatee components

Every component ships in three layers that must agree:

| Layer | Location | Purpose |
|---|---|---|
| Custom element | `web/src/components/<group>/<name>.ts` | Shadow-DOM web component, zero dependencies |
| templ wrapper | `mt/<name>.templ` | Typed Go API rendering the element |
| Docs page | `cmd/demo/pages_<group>.go` + `.templ` | Live demos in the demo server |

Reference implementations: `web/src/components/display/button.ts` + `mt/button.templ`
(plain element), `web/src/components/inputs/text-input.ts` + `mt/text_input.templ`
(form control). Copy their structure.

## Naming

- Tag: `mt-<kebab-name>` (`mt-action-icon`, `mt-simple-grid`, `mt-menu-item`).
  Compound Mantine parts become their own tags: `Tabs.Tab` → `mt-tab`,
  `Card.Section` → `mt-card-section`, `Grid.Col` → `mt-grid-col`.
- Attributes: kebab-case of the Mantine prop (`withBorder` → `with-border`,
  `highlightOnHover` → `highlight-on-hover`, `closeOnEscape` → `close-on-escape`).
- Mantine `title` becomes attribute `heading`, because `title` shows a native tooltip.
  The Go field is still `Title`.
- Attribute names MUST NOT start with `on`. templ treats them as event handlers and
  replaces string values with a sanitization comment. Mantine's `onLabel`/`offLabel`
  become `label-on`/`label-off`.
- Mantine `opened` stays `opened` (attribute and Go field `Opened`).
- Go: one `XxxProps` struct per element with `Base` embedded, plus `templ Xxx(p XxxProps)`.
  Compound parts are their own functions (`mt.Tabs`, `mt.TabsList`, `mt.Tab`, `mt.TabsPanel`).
- Classes: `MtXxx`, registered at the bottom of the file via `define('mt-xxx', MtXxx)`.

## Element rules (`MtElement`, `web/src/core/element.ts`)

- Declare props in `static props`. Attributes are the source of truth, and
  `define()` generates accessors. Type them with `declare foo: string | null;`.
  NEVER write a plain class field with the same name, because it shadows the accessor.
- `type: 'boolean'` is presence-based, and the literal `"false"` also means false.
  For a prop that defaults to true, use `default: true`. Go renders `attr="false"`
  for the opt-out, e.g. a field `WithCloseButton *bool`, or a negative Go field
  `HideCloseButton bool` mapping to `"with-close-button", "false"`.
- Styling from props, with no JS:
  - Enumerated props (variant, size, orientation) → `:host([variant='light'])` selectors.
  - Free-form values → `{ css: '--_gap', scale: 'spacing' }`. Scales: spacing, radius,
    font-size, line-height, shadow, breakpoint, rem (number → px → rem), color, raw.
  - Theme color → `{ color: true }`. This sets `--mt-c-filled`, `-filled-hover`, `-light`,
    `-light-hover`, `-light-color`, `-outline`, `-outline-hover`, `-text` on the host.
    Read only those vars in CSS. Never hardcode palette values.
- Use only theme vars: `--mt-spacing-*`, `--mt-radius-*` (default: `--mt-radius-default`),
  `--mt-font-size-*`, `--mt-shadow-*`, `--mt-color-<name>-<0..9>` and the semantic scheme
  vars `--mt-color-{body,text,bright,dimmed,anchor,border,default,default-hover,default-color,
  default-border,placeholder,error,input-bg,disabled,disabled-color,dropdown,hover,tooltip,
  tooltip-color,striped,overlay}`. Dark mode then works automatically. See `web/tokens.css`.
- Private CSS custom properties are named `--_x`.
- Lifecycle: `template()` returns static markup (it cannot read instance fields).
  `setup()` runs once on first connect (call `super.setup()` if the parent has one).
  `update(changed)` syncs the shadow DOM to props. `onConnect()`/`onDisconnect()`
  handle document or light-DOM wiring.
- Every prop gets the Mantine style props for free (`m`, `mt`, `p`, `w`, `maw`, ...), applied to `:host`.
- Events: `this.emit('change', detail)` creates a bubbling, composed, cancelable CustomEvent.
  Use Mantine-like names (`change`, `open`, `close`, `tab-change`).
- Children: prefer `<slot>`s. Compound parents discover children with
  `querySelectorAll(':scope > mt-x')` or `slot.assignedElements()`, plus `slotchange`.
  If the shadow DOM cannot style deep light-DOM content (e.g. a native `<table>`),
  adopt one shared sheet into `document.adoptedStyleSheets` once, scoped by the tag selector.
- Accessibility: use native elements inside the shadow DOM (`<button>`, `<input>`, `<dialog>`),
  with proper roles and aria (tabs: tablist/tab/tabpanel; menu: menu/menuitem; and so on)
  and keyboard support that matches Mantine/WAI-ARIA.
- Overlays: Modal/Drawer use a native `<dialog>` with `showModal()` (top layer, focus
  trap, inert background). Dropdowns and tooltips use `popover="manual"` with
  `floatingStyles`, `autoPosition()` and `onDismiss()` from `core/floating.ts`.
- Form controls extend `MtFormElement` (`core/form.ts`): label, description and error
  wrapper (`wrapperTemplate`, `wrapperStyles`), `setFormValue()`, validity mirroring,
  `formResetCallback`, and `delegatesFocus`. Text-like boxes reuse `inputStyles` + `fieldTemplate`.
- Unstyled-flash guard: overlay elements that must stay hidden before upgrade go in the
  `:not(:defined)` list in `web/global.css`.

## templ rules (`mt/base.go`)

- `attrs(p.Base, "attr", value, ...)` builds the host attributes. It omits empty
  strings, false, zero numbers and nil pointers. Use `*float64` / `*int` (users pass
  `new(0.0)`) only where zero is meaningful (min/max/value).
- Size/color/variant constants: `mt.XS..mt.XL`, `mt.Blue`..., `mt.Filled`, `mt.Light`, ...
- `templ.Component` fields for rich slots render through `@slot("name", p.Field)`.
- Doc comment on each Props struct: `// XxxProps mirrors Mantine's Xxx.`

## Docs pages

`pages_<group>.go` registers pages in `init()`:

```go
register(Page{Group: "Inputs", Slug: "select", Title: "Select", Description: "...", Body: SelectPage()})
```

Groups: Layout, Buttons, Data display, Inputs, Overlays, Navigation, Feedback.
Bodies use `@Demo(title, codeSnippet) { ... }` and `@Row() { ... }` from `cmd/demo/shell.templ`.
`POST /echo` echoes form fields, which is useful for form demos.

## Build

```sh
go run ./cmd/mtbuild                # tokens + bundle → dist/ (committed, embedded)
go run ./cmd/mtbuild -check f.ts    # syntax-check individual files
go tool templ generate              # mt/*.templ, cmd/demo/*.templ
npx -p typescript tsc -p .          # optional strict type-check
go run ./cmd/demo -dev              # docs at http://localhost:8080, assets from ./dist
```
