// Package errorpages contains the "Error pages" UI blocks.
package errorpages

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ image.svg
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "not-found-image", Name: "NotFoundImage", Title: "404 page with image", Category: "error-pages",
		Component: NotFoundImage(), Source: blocks.Source(src, "not_found_image.templ")},
	{Slug: "not-found-title", Name: "NotFoundTitle", Title: "404 page", Category: "error-pages",
		Component: NotFoundTitle(), Source: blocks.Source(src, "not_found_title.templ")},
	{Slug: "nothing-found-background", Name: "NothingFoundBackground", Title: "404 as background image", Category: "error-pages",
		Component: NothingFoundBackground(), Source: blocks.Source(src, "nothing_found_background.templ")},
	{Slug: "server-error", Name: "ServerError", Title: "500 page", Category: "error-pages",
		Component: ServerError(), Source: blocks.Source(src, "server_error.templ")},
	{Slug: "server-overload", Name: "ServerOverload", Title: "503 page", Category: "error-pages",
		Component: ServerOverload(), Source: blocks.Source(src, "server_overload.templ")},
}
