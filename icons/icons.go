// Package icons provides Tabler icons (https://tabler.io/icons, MIT) as templ
// components, e.g. @icons.IconHeart(icons.Props{Size: 18}). Only the names in
// icons.txt are generated; add a name there and run `go generate ./icons`.
package icons

//go:generate go run ../cmd/mticons

import (
	"cmp"
	"context"
	"fmt"
	"html"
	"io"
	"strconv"

	"github.com/a-h/templ"
)

// Props configures an icon. Zero values use Tabler defaults: 24px, stroke 2,
// currentColor.
type Props struct {
	Size   int     // width and height in px
	Stroke float64 // stroke width (outline icons)
	Color  string  // CSS color; default currentColor
	Class  string
	Style  string
	// Title makes the icon accessible (role="img" + <title>); without it the
	// icon is aria-hidden.
	Title string
}

func render(ps []Props, filled bool, body string) templ.Component {
	var p Props
	if len(ps) > 0 {
		p = ps[0]
	}
	size := cmp.Or(p.Size, 24)
	color := p.Color
	if color == "" {
		color = "currentColor"
	}
	return templ.ComponentFunc(func(_ context.Context, w io.Writer) error {
		paint := fmt.Sprintf(`fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round"`,
			html.EscapeString(color), strconv.FormatFloat(cmp.Or(p.Stroke, 2), 'g', -1, 64))
		if filled {
			paint = fmt.Sprintf(`fill="%s"`, html.EscapeString(color))
		}
		a11y := `aria-hidden="true"`
		title := ""
		if p.Title != "" {
			a11y = `role="img"`
			title = "<title>" + html.EscapeString(p.Title) + "</title>"
		}
		extra := ""
		if p.Class != "" {
			extra += ` class="` + html.EscapeString(p.Class) + `"`
		}
		if p.Style != "" {
			extra += ` style="` + html.EscapeString(p.Style) + `"`
		}
		_, err := fmt.Fprintf(w, `<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 24 24" %s %s%s>%s%s</svg>`,
			size, size, paint, a11y, extra, title, body)
		return err
	})
}
