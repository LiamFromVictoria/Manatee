// Package dnd contains the "Drag'n'Drop" UI blocks.
package dnd

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "dnd-list", Name: "DndList", Title: "Drag'n'drop list", Category: "dnd", Center: true, MaxWidth: 420, Component: DndList(), Source: blocks.Source(src, "dnd_list.templ")},
	{Slug: "dnd-list-handle", Name: "DndListHandle", Title: "Drag'n'drop list with handle", Category: "dnd", Center: true, MaxWidth: 420, Component: DndListHandle(), Source: blocks.Source(src, "dnd_list_handle.templ")},
	{Slug: "dnd-table", Name: "DndTable", Title: "Drag'n'drop table", Category: "dnd", Center: true, MaxWidth: 420, Component: DndTable(), Source: blocks.Source(src, "dnd_table.templ")},
}
