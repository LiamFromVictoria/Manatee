<p align="center">
  <img src="docs/logo.png" alt="Manatee" width="240">
</p>

# Manatee

Mantine-style UI components for Go web apps, built as zero-dependency web components.

- **`<mt-*>` custom elements**: vanilla Shadow DOM, about 1 base class, no runtime deps.
  They work with plain HTML, HTMX swaps, and any server.
- **Typed templ API**: `@mt.Button(mt.ButtonProps{Variant: mt.Light, Color: mt.Teal}) { Save }`.
- **Mantine theme**: the same palette, spacing, radius, shadows, sizes and variants,
  exposed as CSS custom properties (`--mt-*`), with light/dark color schemes.
- **Native forms**: inputs are form-associated (`ElementInternals`), so they submit,
  validate and reset with a plain `<form>`.
- **No Node required**: esbuild runs through its Go API, and the bundle is embedded with `go:embed`.

## Quick start

```go
package main

import (
    "net/http"

    "github.com/a-h/templ"
    "github.com/you/manatee"
)

func main() {
    mux := http.NewServeMux()
    mux.Handle(manatee.Prefix, manatee.Handler()) // serves /_manatee/manatee.{js,css}
    mux.Handle("/", templ.Handler(Page()))
    http.ListenAndServe(":8080", mux)
}
```

```templ
package main

import "github.com/you/manatee/mt"

templ Page() {
    <html>
        <head>
            @mt.Head(mt.HeadProps{})
        </head>
        <body>
            <form method="post" action="/subscribe">
                @mt.Stack(mt.StackProps{Gap: mt.MD}) {
                    @mt.TextInput(mt.TextInputProps{Name: "email", Label: "Email", Required: true})
                    @mt.Button(mt.ButtonProps{Type: "submit"}) {
                        Subscribe
                    }
                }
            </form>
        </body>
    </html>
}
```

Without templ, write the elements directly:

```html
<mt-button variant="light" color="teal" size="md">Save</mt-button>
```

### Props conventions

| Mantine (React) | HTML attribute | Go field |
|---|---|---|
| `variant="light"` | `variant="light"` | `Variant: mt.Light` |
| `withBorder` | `with-border` | `WithBorder: true` |
| `title` | `heading` | `Title` |
| `mt="md"` (style props) | `mt="md"` | `Base: mt.Base{Mt: mt.MD}` |
| `leftSection={<Icon/>}` | `<span slot="left-section">` | `LeftSection: templ.Component` |
| `onChange` | `change` event (detail carries the value) | n/a |

Extra attributes such as `hx-*`, `data-*` and `aria-*` go through `Base{Attrs: templ.Attributes{...}}`.

### Color scheme

`mt.Head` applies the stored preference before paint. From JS, call
`manatee.setColorScheme('light' | 'dark' | 'auto')` or `manatee.toggleColorScheme()`.

### Theming

Override tokens in your own stylesheet, loaded after `mt.Head`:

```css
:root {
  --mt-radius-default: var(--mt-radius-md);
  --mt-font-family: "Inter", sans-serif;
  /* Primary color: re-point the primary aliases (filled, light, outline, ...) */
  --mt-color-primary-filled: var(--mt-color-violet-filled);
  --mt-color-primary-filled-hover: var(--mt-color-violet-filled-hover);
}
```

The full token list is in `web/tokens.css`, which is generated from `cmd/mtbuild/tokens.go`.
Edit the palette there to change the primary color everywhere.

## Components

| Group | Components |
|---|---|
| Layout | AppShell, Container, Group, Stack, Grid, SimpleGrid, Center, Space, Divider |
| Typography | Text, Title |
| Buttons | Button, ButtonGroup, ActionIcon, ActionIconGroup |
| Data display | Badge, Card, Paper, Avatar, Accordion, Table |
| Inputs | TextInput, Textarea, PasswordInput, NumberInput, Select, Checkbox, CheckboxGroup, Switch, Radio, RadioGroup |
| Overlays | Modal, Drawer, Tooltip, Popover, Menu |
| Navigation | Tabs, NavLink, Breadcrumbs, Pagination, Burger |
| Feedback | Alert, Loader, Progress, Notifications (JS API + `mt.Notify` for HTMX `HX-Trigger`) |

Modals and drawers open without any JS of your own: `data-mt-open="<id>"` / `data-mt-close`.

## Development

```sh
go run ./cmd/mtbuild -watch &        # rebuild bundle on change
go tool templ generate --watch &     # regenerate templ
go run ./cmd/demo -dev               # docs at http://localhost:8080
```

`go generate ./...` runs the bundle build and templ generation. The `dist/` and
`*_templ.go` outputs are committed, so `go get` users need no build step.
Optional strict type-check: `npx -p typescript tsc -p .`

Component authoring rules: [docs/authoring.md](docs/authoring.md).

## Layout

```
assets.go          go:embed bundle + http handler (package manatee)
mt/                templ components (package mt)
web/src/core/      MtElement base, form base, theme color/scale, floating
web/src/components element implementations by group
web/global.css     document-level styles; web/tokens.css is generated
cmd/mtbuild        token generator + esbuild bundler
cmd/demo           documentation server
```
