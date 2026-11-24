package main

import (
	"net/http"
	"slices"
	"strconv"

	"github.com/LiamFromVictoria/Manatee/examples/ui/appcards"
	"github.com/LiamFromVictoria/Manatee/examples/ui/articlecards"
	"github.com/LiamFromVictoria/Manatee/examples/ui/authentication"
	"github.com/LiamFromVictoria/Manatee/examples/ui/banners"
	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
	"github.com/LiamFromVictoria/Manatee/examples/ui/buttons"
	"github.com/LiamFromVictoria/Manatee/examples/ui/carousels"
	"github.com/LiamFromVictoria/Manatee/examples/ui/comments"
	"github.com/LiamFromVictoria/Manatee/examples/ui/contact"
	"github.com/LiamFromVictoria/Manatee/examples/ui/dnd"
	"github.com/LiamFromVictoria/Manatee/examples/ui/dropzones"
	"github.com/LiamFromVictoria/Manatee/examples/ui/errorpages"
	"github.com/LiamFromVictoria/Manatee/examples/ui/faq"
	"github.com/LiamFromVictoria/Manatee/examples/ui/features"
	"github.com/LiamFromVictoria/Manatee/examples/ui/footers"
	"github.com/LiamFromVictoria/Manatee/examples/ui/grids"
	"github.com/LiamFromVictoria/Manatee/examples/ui/headers"
	"github.com/LiamFromVictoria/Manatee/examples/ui/hero"
	"github.com/LiamFromVictoria/Manatee/examples/ui/inputs"
	"github.com/LiamFromVictoria/Manatee/examples/ui/navbars"
	"github.com/LiamFromVictoria/Manatee/examples/ui/sliders"
	"github.com/LiamFromVictoria/Manatee/examples/ui/stats"
	"github.com/LiamFromVictoria/Manatee/examples/ui/tables"
	"github.com/LiamFromVictoria/Manatee/examples/ui/toc"
	"github.com/LiamFromVictoria/Manatee/examples/ui/users"
	"github.com/a-h/templ"
)

var uiBlocks = slices.Concat(
	navbars.Blocks, headers.Blocks, footers.Blocks, grids.Blocks, users.Blocks, inputs.Blocks,
	buttons.Blocks, sliders.Blocks, dropzones.Blocks, appcards.Blocks, stats.Blocks, tables.Blocks,
	dnd.Blocks, carousels.Blocks, hero.Blocks, features.Blocks, authentication.Blocks, faq.Blocks,
	contact.Blocks, errorpages.Blocks, banners.Blocks, articlecards.Blocks, toc.Blocks, comments.Blocks,
)

// mountGallery serves the UI block gallery: /ui (categories), /ui/{category}
// (previews + source) and /ui/render/{slug} (a block alone, loaded in iframes).
func mountGallery(mux *http.ServeMux, pages []Page) {
	seen := map[string]bool{}
	for _, b := range uiBlocks {
		if seen[b.Slug] {
			panic("duplicate UI block slug: " + b.Slug)
		}
		seen[b.Slug] = true
		mux.Handle("GET /ui/render/"+b.Slug, templ.Handler(BlockCanvas(b)))
	}
	mux.Handle("GET /ui", templ.Handler(Layout(pages, "/ui", "UI blocks",
		strconv.Itoa(len(uiBlocks))+" blocks ported from ui.mantine.dev, built with Manatee components.", GalleryIndex())))
	for _, c := range blocks.Categories {
		path := "/ui/" + c.Slug
		mux.Handle("GET "+path, templ.Handler(Layout(pages, path, c.Name, c.Group, GalleryCategory(blocksIn(c.Slug)))))
	}
}

func blocksIn(category string) []blocks.Block {
	var out []blocks.Block
	for _, b := range uiBlocks {
		if b.Category == category {
			out = append(out, b)
		}
	}
	return out
}
