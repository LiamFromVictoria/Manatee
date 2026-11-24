// Package carousels contains the "Carousels" UI blocks.
package carousels

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "cards-carousel", Name: "CardsCarousel", Title: "Carousel with cards", Category: "carousels", Center: true, MaxWidth: 820, Component: CardsCarousel(), Source: blocks.Source(src, "cards_carousel.templ")},
	{Slug: "carousel-card", Name: "CarouselCard", Title: "Card with carousel", Category: "carousels", Center: true, MaxWidth: 350, Component: CarouselCard(), Source: blocks.Source(src, "carousel_card.templ")},
}
