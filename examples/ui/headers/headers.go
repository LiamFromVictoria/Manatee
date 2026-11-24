// Package headers contains the "Headers" UI blocks.
package headers

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "double-header", Name: "DoubleHeader", Title: "Header with multiple layers", Category: "headers", Component: DoubleHeader(), Source: blocks.Source(src, "double_header.templ")},
	{Slug: "header-mega-menu", Name: "HeaderMegaMenu", Title: "Header with mega menu", Category: "headers", Component: HeaderMegaMenu(), Source: blocks.Source(src, "header_mega_menu.templ")},
	{Slug: "header-menu", Name: "HeaderMenu", Title: "Header with menus", Category: "headers", Component: HeaderMenu(), Source: blocks.Source(src, "header_menu.templ")},
	{Slug: "header-search", Name: "HeaderSearch", Title: "Header with search", Category: "headers", Component: HeaderSearch(), Source: blocks.Source(src, "header_search.templ")},
	{Slug: "header-simple", Name: "HeaderSimple", Title: "Header with links", Category: "headers", Component: HeaderSimple(), Source: blocks.Source(src, "header_simple.templ")},
	{Slug: "header-tabs", Name: "HeaderTabs", Title: "Header with tabs", Category: "headers", Component: HeaderTabs(), Source: blocks.Source(src, "header_tabs.templ")},
}
