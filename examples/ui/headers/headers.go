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
	{Slug: "header-simple", Name: "HeaderSimple", Title: "Header with links", Category: "headers", Component: HeaderSimple(), Source: blocks.Source(src, "header_simple.templ")},
}
