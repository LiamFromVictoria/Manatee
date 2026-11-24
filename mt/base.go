// Package mt provides typed templ components that render Manatee <mt-*>
// custom elements. Props mirror Mantine; zero values are omitted so the
// element's own defaults apply.
package mt

import (
	"reflect"
	"slices"

	"github.com/a-h/templ"
)

// Size tokens, accepted by size, radius, spacing and shadow props. Raw CSS
// values ("12px", "1.5rem") and bare numbers (px, converted to rem) also work.
const (
	XS = "xs"
	SM = "sm"
	MD = "md"
	LG = "lg"
	XL = "xl"
)

// Theme colors. Any palette shade ("red.4") or CSS color ("#ff00aa") also works.
const (
	Primary = "primary"
	Dark    = "dark"
	Gray    = "gray"
	Red     = "red"
	Pink    = "pink"
	Grape   = "grape"
	Violet  = "violet"
	Indigo  = "indigo"
	Blue    = "blue"
	Cyan    = "cyan"
	Teal    = "teal"
	Green   = "green"
	Lime    = "lime"
	Yellow  = "yellow"
	Orange  = "orange"
	Dimmed  = "dimmed"
	Bright  = "bright"
)

// Variants shared by color-aware components.
const (
	Filled      = "filled"
	Light       = "light"
	Outline     = "outline"
	Subtle      = "subtle"
	Default     = "default"
	Transparent = "transparent"
	White       = "white"
	Gradient    = "gradient"
	Dot         = "dot"
	Unstyled    = "unstyled"
)

// Base holds props common to every component: identity, extra attributes
// (hx-*, data-*, aria-*), and Mantine style props applied to the host.
type Base struct {
	ID    string
	Class string
	Style string
	// Attrs are rendered verbatim on the host element.
	Attrs templ.Attributes

	M, Mt, Mb, Ml, Mr, Mx, My string
	P, Pt, Pb, Pl, Pr, Px, Py string
	W, H, Miw, Maw, Mih, Mah  string
	// Fz / Lh set font-size / line-height only (Mantine `fz` / `lh`): xs..xl, px number or CSS value.
	Fz, Lh string

	// HiddenFrom / VisibleFrom hide the element from / below a breakpoint (xs..xl).
	HiddenFrom, VisibleFrom string
}

// attrs builds the host attribute list from Base plus key/value pairs.
// Empty strings, false, zero numbers and nil pointers are omitted; named
// string types are converted to string. A non-nil *bool renders as a bare
// attribute when true and attr="false" when false (opt-out of default-true props).
func attrs(b Base, kv ...any) templ.OrderedAttributes {
	out := make(templ.OrderedAttributes, 0, len(kv)/2+4)
	add := func(k string, v any) {
		if v = normalize(v); v != nil {
			out = append(out, templ.KV[string, any](k, v))
		}
	}
	add("id", b.ID)
	add("class", b.Class)
	add("style", b.Style)
	for i := 0; i+1 < len(kv); i += 2 {
		add(kv[i].(string), kv[i+1])
	}
	for _, sp := range [...]struct{ k, v string }{
		{"m", b.M}, {"mt", b.Mt}, {"mb", b.Mb}, {"ml", b.Ml}, {"mr", b.Mr}, {"mx", b.Mx}, {"my", b.My},
		{"p", b.P}, {"pt", b.Pt}, {"pb", b.Pb}, {"pl", b.Pl}, {"pr", b.Pr}, {"px", b.Px}, {"py", b.Py},
		{"w", b.W}, {"h", b.H}, {"miw", b.Miw}, {"maw", b.Maw}, {"mih", b.Mih}, {"mah", b.Mah},
		{"fz", b.Fz}, {"lh", b.Lh},
		{"hidden-from", b.HiddenFrom}, {"visible-from", b.VisibleFrom},
	} {
		add(sp.k, sp.v)
	}
	keys := make([]string, 0, len(b.Attrs))
	for k := range b.Attrs {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	for _, k := range keys {
		out = append(out, templ.KV[string, any](k, b.Attrs[k]))
	}
	return out
}

func normalize(v any) any {
	switch x := v.(type) {
	case nil:
		return nil
	case string:
		if x == "" {
			return nil
		}
		return x
	case templ.SafeURL, templ.SafeCSS:
		// Already vetted by the caller; keep the type so templ doesn't re-sanitize.
		if reflect.ValueOf(x).String() == "" {
			return nil
		}
		return x
	case bool:
		if !x {
			return nil
		}
		return true
	case int:
		if x == 0 {
			return nil
		}
		return x
	case float64:
		if x == 0 {
			return nil
		}
		return x
	case *bool:
		// Opt-out for props that default to true: nil = element default,
		// new(false) renders attr="false".
		switch {
		case x == nil:
			return nil
		case *x:
			return true
		default:
			return "false"
		}
	}
	rv := reflect.ValueOf(v)
	switch rv.Kind() {
	case reflect.Pointer:
		if rv.IsNil() {
			return nil
		}
		return rv.Elem().Interface()
	case reflect.String:
		return normalize(rv.String())
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return normalize(int(rv.Int()))
	case reflect.Float32:
		return normalize(rv.Float())
	}
	return v
}
