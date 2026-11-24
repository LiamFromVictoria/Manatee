// Package footers contains the "Footers" UI blocks.
package footers

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "footer-centered", Name: "FooterCentered", Title: "Footer with centered links", Category: "footers", Component: FooterCentered(), Source: blocks.Source(src, "footer_centered.templ")},
	{Slug: "footer-links", Name: "FooterLinks", Title: "Footer with links", Category: "footers", Component: FooterLinks(), Source: blocks.Source(src, "footer_links.templ")},
	{Slug: "footer-simple", Name: "FooterSimple", Title: "Simple footer", Category: "footers", Component: FooterSimple(), Source: blocks.Source(src, "footer_simple.templ")},
	{Slug: "footer-social", Name: "FooterSocial", Title: "Footer with social icons", Category: "footers", Component: FooterSocial(), Source: blocks.Source(src, "footer_social.templ")},
}
