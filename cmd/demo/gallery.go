package main

import (
	"net/http"
	"slices"
	"strconv"

	"github.com/a-h/templ"
	"github.com/you/manatee/examples/ui/appcards"
	"github.com/you/manatee/examples/ui/articlecards"
	"github.com/you/manatee/examples/ui/authentication"
	"github.com/you/manatee/examples/ui/banners"
	"github.com/you/manatee/examples/ui/blocks"
	"github.com/you/manatee/examples/ui/buttons"
	"github.com/you/manatee/examples/ui/carousels"
	"github.com/you/manatee/examples/ui/comments"
	"github.com/you/manatee/examples/ui/contact"
	"github.com/you/manatee/examples/ui/dnd"
	"github.com/you/manatee/examples/ui/dropzones"
	"github.com/you/manatee/examples/ui/errorpages"
	"github.com/you/manatee/examples/ui/faq"
	"github.com/you/manatee/examples/ui/features"
	"github.com/you/manatee/examples/ui/footers"
	"github.com/you/manatee/examples/ui/grids"
	"github.com/you/manatee/examples/ui/headers"
	"github.com/you/manatee/examples/ui/hero"
	"github.com/you/manatee/examples/ui/inputs"
	"github.com/you/manatee/examples/ui/navbars"
	"github.com/you/manatee/examples/ui/sliders"
	"github.com/you/manatee/examples/ui/stats"
	"github.com/you/manatee/examples/ui/tables"
	"github.com/you/manatee/examples/ui/toc"
	"github.com/you/manatee/examples/ui/users"
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
