// Package toc contains the "Table of contents" UI blocks.
package toc

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "table-of-contents", Name: "TableOfContents", Title: "Table of contents", Category: "toc", Center: true, MaxWidth: 280, Dimmed: false, Component: TableOfContents(), Source: blocks.Source(src, "table_of_contents.templ")},
	{Slug: "table-of-contents-floating", Name: "TableOfContentsFloating", Title: "Table of contents indicator", Category: "toc", Center: true, MaxWidth: 280, Dimmed: false, Component: TableOfContentsFloating(), Source: blocks.Source(src, "table_of_contents_floating.templ")},
}
