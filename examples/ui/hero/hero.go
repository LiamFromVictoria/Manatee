// Package hero contains the "Hero headers" UI blocks.
package hero

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "hero-bullets", Name: "HeroBullets", Title: "Hero with bullets", Category: "hero", Component: HeroBullets(), Source: blocks.Source(src, "hero_bullets.templ")},
	{Slug: "hero-content-left", Name: "HeroContentLeft", Title: "Hero with content on left", Category: "hero", Component: HeroContentLeft(), Source: blocks.Source(src, "hero_content_left.templ")},
	{Slug: "hero-image-background", Name: "HeroImageBackground", Title: "Hero with background image", Category: "hero", Component: HeroImageBackground(), Source: blocks.Source(src, "hero_image_background.templ")},
	{Slug: "hero-image-right", Name: "HeroImageRight", Title: "Hero with image on the right", Category: "hero", Component: HeroImageRight(), Source: blocks.Source(src, "hero_image_right.templ")},
	{Slug: "hero-text", Name: "HeroText", Title: "Hero section with text", Category: "hero", Component: HeroText(), Source: blocks.Source(src, "hero_text.templ")},
	{Slug: "hero-title", Name: "HeroTitle", Title: "Hero section with gradient text", Category: "hero", Component: HeroTitle(), Source: blocks.Source(src, "hero_title.templ")},
}
