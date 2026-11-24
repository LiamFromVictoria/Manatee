// Package faq contains the "Frequently asked questions" UI blocks.
package faq

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "faq-simple", Name: "FaqSimple", Title: "FAQ simple", Category: "faq",
		Component: FaqSimple(), Source: blocks.Source(src, "faq_simple.templ")},
	{Slug: "faq-with-bg", Name: "FaqWithBg", Title: "Faq with background", Category: "faq",
		Component: FaqWithBg(), Source: blocks.Source(src, "faq_with_bg.templ")},
	{Slug: "faq-with-header", Name: "FaqWithHeader", Title: "Faq page header", Category: "faq",
		Component: FaqWithHeader(), Source: blocks.Source(src, "faq_with_header.templ")},
	{Slug: "faq-with-image", Name: "FaqWithImage", Title: "Faq with image", Category: "faq",
		Component: FaqWithImage(), Source: blocks.Source(src, "faq_with_image.templ")},
}
