// Package tables contains the "Tables" UI blocks.
package tables

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "table-reviews", Name: "TableReviews", Title: "Table with progress", Category: "tables",
		Center: true, MaxWidth: 920,
		Component: TableReviews(), Source: blocks.Source(src, "table_reviews.templ")},
	{Slug: "table-scroll-area", Name: "TableScrollArea", Title: "Table with sticky header", Category: "tables",
		Center: true, MaxWidth: 920,
		Component: TableScrollArea(), Source: blocks.Source(src, "table_scroll_area.templ")},
	{Slug: "table-selection", Name: "TableSelection", Title: "Table with selection", Category: "tables",
		Center: true, MaxWidth: 800,
		Component: TableSelection(), Source: blocks.Source(src, "table_selection.templ")},
	{Slug: "table-sort", Name: "TableSort", Title: "Table with search and sort", Category: "tables",
		Center: true, MaxWidth: 920,
		Component: TableSort(), Source: blocks.Source(src, "table_sort.templ")},
}
