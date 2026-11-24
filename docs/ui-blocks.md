# Porting ui.mantine.dev blocks

`examples/ui` holds Manatee ports of the 123 blocks at
https://ui.mantine.dev (MIT, © Vitaly Rtischev; source: github.com/mantinedev/ui.mantine.dev).
The docs server renders them at `/ui` (gallery), `/ui/<category>` and `/ui/render/<slug>`.

Reference port: `examples/ui/headers/header_simple.templ`.

## Layout

- One Go package per category: `examples/ui/<category>`, where the category slug has
  its dashes removed (`app-cards` → `appcards`, `error-pages` → `errorpages`).
- One file per block: `<snake_name>.templ` (`HeaderSimple` → `header_simple.templ`).
  It exports `templ <ComponentName>()`, with no parameters, and contains everything the
  block needs (data, CSS, scripts). Private helpers are prefixed with the lower-camel
  block name (`headerSimpleItems`) so blocks in one package never collide.
- `<category>.go` registers the blocks in ui.mantine.dev order, with metadata copied from
  the block's `attributes.json` (`title`, `canvas.center`, `canvas.maxWidth`, `dimmed`):

  ```go
  //go:embed *.templ
  var src embed.FS

  var Blocks = []blocks.Block{
  	{Slug: "header-simple", Name: "HeaderSimple", Title: "Header with links", Category: "headers",
  		Center: false, MaxWidth: 0, Dimmed: false,
  		Component: HeaderSimple(), Source: blocks.Source(src, "header_simple.templ")},
  }
  ```

  The slug is the kebab-case component name. Category is the ui.mantine.dev slug (with dashes).
- Sibling-component imports in ui.mantine.dev (e.g. `../UserButton/UserButton`) map to
  calling that block's templ function. If it lives in another category package, import that package.

## CSS

Port each `*.module.css` almost verbatim into a once-per-page style block:

```templ
var headerSimpleCSS = templ.NewOnceHandle()

templ HeaderSimple() {
	@headerSimpleCSS.Once() {
		<style> .header-simple { … } .header-simple__link { … } </style>
	}
	…
}
```

- Class names follow `<block-kebab>__<moduleClass>` (`classes.link` → `header-simple__link`).
  The root class is the bare block name.
- Native CSS nesting is fine (`&:hover`, `&[data-active]`).
- `light-dark(a, b)` works natively, because Manatee sets `color-scheme` per theme. Keep it.

| Mantine CSS | Manatee CSS |
|---|---|
| `var(--mantine-color-<name>-<n>)` and `-filled`, `-light`, `-light-hover`, `-light-color`, `-outline`, `-filled-hover`, `-text` | `var(--mt-color-<name>-…)` (same suffixes) |
| `--mantine-primary-color-<n>` / `--mantine-primary-color-filled` etc. | `--mt-color-primary-<n>` / `--mt-color-primary-filled` |
| `--mantine-color-white` / `-black` | `--mt-white` / `--mt-black` |
| `--mantine-color-body`, `-text`, `-dimmed`, `-default`, `-default-hover`, `-default-border`, `-default-color`, `-placeholder`, `-error`, `-anchor` | `--mt-color-…` (same name) |
| `--mantine-spacing-*`, `--mantine-radius-*`, `--mantine-font-size-*`, `--mantine-line-height-*`, `--mantine-shadow-*` | `--mt-spacing-*` … `--mt-shadow-*` |
| `--mantine-radius-default` | `--mt-radius-default` |
| `--mantine-font-family`, `--mantine-font-family-monospace`, `--mantine-font-family-headings` | `--mt-font-family…` |
| `--mantine-h1-font-size` … | `--mt-h1-font-size` … |
| `rem(16px)` | `1rem` (px ÷ 16) |
| `$mantine-breakpoint-xs/sm/md/lg/xl` | `36em / 48em / 62em / 75em / 88em` |
| `@mixin hover { … }` | `&:hover { … }` |
| `@mixin light { … }` / `@mixin dark { … }` | `[data-mt-color-scheme='light'] & { … }` / `[data-mt-color-scheme='dark'] & { … }` |
| `@mixin smaller-than $bp { … }` / `@mixin larger-than $bp { … }` | `@media (max-width: <bp − 0.00625em>) { … }` / `@media (min-width: <bp>) { … }` |
| `alpha(var(--x), 0.1)` | `color-mix(in srgb, var(--x) 10%, transparent)` |
| `lighten(var(--x), 0.1)` / `darken(var(--x), 0.1)` | `color-mix(in srgb, var(--x) 90%, white)` / `… black)` |

## Styling Manatee components from block CSS

- Layout components are host-as-box, so a class on the host controls layout:
  Group, Stack, SimpleGrid, Container, Center, Box, Paper, Card, Text, Title, Anchor.
  `<Group className={classes.inner}>` becomes `@mt.Group(mt.GroupProps{Base: mt.Base{Class: "x__inner"}})`.
- For inner parts, Mantine's `classNames={{ input: classes.input }}` maps to `::part()`:
  `.x__field::part(input) { … }`. Look up the part names in the component's
  `web/src/components/**/<name>.ts` template (`part="…"`).
- Component CSS variables (`--_*`) are private; don't target them.
- Mantine props map to Go props: `hiddenFrom`/`visibleFrom` → `Base.HiddenFrom/VisibleFrom`,
  style props (`mt`, `p`, `w`, …) → `Base` fields, `c` → `C` (Text) / `Color`.

## React state → server render + declarative behavior

Render the initial state on the server. Then pick the first option that fits:

1. Built-in declarative triggers:
   - `data-mt-open="<id>"` / `data-mt-close` (Modal, Drawer)
   - `Burger{Controls: "<id>"}` (toggles any `opened`-driven element)
   - `data-mt-toggle="<id>"` (toggles `opened`, e.g. on Collapse)
   - `data-mt-dropzone-open="<id>"`
   - component events: `change`, `toggle`, …
2. `@blocks.Behaviors()`, then `data-active-group` / `data-active-item="<key>"` for the
   "click sets the active link" pattern.
3. A small block-local script inside the block's once-handle. Use one delegated listener,
   scoped to the block's root class, with no globals. Use it for things like table sort,
   select-all, password strength, or a copy-to-clipboard state.
   Use `@blockCSS.Once()`-style handles for scripts too.

`useForm` validation → native constraints (`Required`, `Type: "email"`, `Pattern`, `MinLength`)
plus an `Error` shown from server-rendered state, or a few lines of script.

## Assets

- `@tabler/icons-react` → package `github.com/you/manatee/icons`, same names:
  `@icons.IconChevronDown(icons.Props{Size: 16, Stroke: 1.5})`. Every icon ui.mantine.dev
  uses is already generated. `Icon2fa` → `IconAuth2fa`, `IconDiscount2` → `IconDiscount`.
- `@mantinex/mantine-logo` `MantineLogo` → `@blocks.Logo(size)`.
- `@mantinex/dev-icons` → `icons.IconBrandTwitter` / `IconBrandGithub` / `IconBrandDiscord`.
- Remote images (images.unsplash.com, raw.githubusercontent.com, …) stay as URLs.
  Local `image.svg` / `bg.svg` files are copied next to the templ file, embedded with
  `//go:embed`, and rendered with `@templ.Raw(svg)`, or used as a `data:` URL for CSS backgrounds.
  `mt.Image` accepts `data:image/…` URLs for embedded images. Other plain-string URL props
  reject `data:` URLs, so pass those as `Base.Attrs: templ.Attributes{"src": templ.SafeURL(u)}`.

## Gotchas

- A component's own fill/background lives on its inner part, so override it with
  `.x__btn::part(root) { background: … }`. A host class silently loses to the component's
  private variables.
- `attrs()` omits zero numbers, so an explicit `0` (e.g. Overlay `z-index: 0`) goes through
  `Base.Attrs: templ.Attributes{"z-index": "0"}`.
- templ parses a text line that starts with a Go keyword (`for …`, `if …`, `switch …`) as
  a statement. Wrap such text in an expression: `{ "for any stack" }`.
- templ treats `on*` attributes as JavaScript. Inline handlers need
  `templ.JSUnsafeFuncCall("…")`; a delegated listener in a block script is usually better.
- `:has(::part(…))` is not supported in Chromium, and an unsupported selector drops its
  whole rule list. Mirror the state onto a host attribute with a small script instead.

## Fidelity

Compare each port against the live block at https://ui.mantine.dev/category/<category>:
same structure, spacing, typography, colors, and hover/active states, in light and dark,
at desktop width and at a phone width (~400px). Check your port at `/ui/render/<slug>`.
