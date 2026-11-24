// Package features contains the "Features section" UI blocks.
package features

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "features-asymmetrical", Name: "FeaturesAsymmetrical", Title: "Features with icons", Category: "features", Component: FeaturesAsymmetrical(), Source: blocks.Source(src, "features_asymmetrical.templ")},
	{Slug: "features-cards", Name: "FeaturesCards", Title: "Features with cards", Category: "features", Component: FeaturesCards(), Source: blocks.Source(src, "features_cards.templ")},
	{Slug: "features-grid", Name: "FeaturesGrid", Title: "Features with monotone icons", Category: "features", Component: FeaturesGrid(), Source: blocks.Source(src, "features_grid.templ")},
	{Slug: "features-images", Name: "FeaturesImages", Title: "Features with image icons", Category: "features", Component: FeaturesImages(), Source: blocks.Source(src, "features_images.templ")},
	{Slug: "features-title", Name: "FeaturesTitle", Title: "Features with title", Category: "features", Center: true, MaxWidth: 1060, Component: FeaturesTitle(), Source: blocks.Source(src, "features_title.templ")},
}
