// Package contact contains the "Contact us section" UI blocks.
package contact

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ bg.svg
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "contact-us", Name: "ContactUs", Title: "Contact us form", Category: "contact",
		Center: true, MaxWidth: 1000,
		Component: ContactUs(), Source: blocks.Source(src, "contact_us.templ")},
	{Slug: "get-in-touch", Name: "GetInTouch", Title: "Get in touch form", Category: "contact",
		Center: true, MaxWidth: 800,
		Component: GetInTouch(), Source: blocks.Source(src, "get_in_touch.templ")},
	{Slug: "get-in-touch-simple", Name: "GetInTouchSimple", Title: "Get in touch form", Category: "contact",
		Center: true, MaxWidth: 620,
		Component: GetInTouchSimple(), Source: blocks.Source(src, "get_in_touch_simple.templ")},
}
