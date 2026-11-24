// Package grids contains the "Grids" UI blocks.
package grids

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "grid-asymmetrical", Name: "GridAsymmetrical", Title: "Grid with asymmetrical columns", Category: "grids", Component: GridAsymmetrical(), Source: blocks.Source(src, "grid_asymmetrical.templ")},
	{Slug: "lead-grid", Name: "LeadGrid", Title: "Grid with leading item", Category: "grids", Component: LeadGrid(), Source: blocks.Source(src, "lead_grid.templ")},
	{Slug: "subgrid", Name: "Subgrid", Title: "Grid with vertical items", Category: "grids", Component: Subgrid(), Source: blocks.Source(src, "subgrid.templ")},
}
