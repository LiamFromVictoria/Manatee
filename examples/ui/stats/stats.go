// Package stats contains the "Stats" UI blocks.
package stats

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "progress-card", Name: "ProgressCard", Title: "Progress card", Category: "stats",
		Center: true, MaxWidth: 380, Dimmed: true,
		Component: ProgressCard(), Source: blocks.Source(src, "progress_card.templ")},
	{Slug: "progress-card-colored", Name: "ProgressCardColored", Title: "Progress card with color", Category: "stats",
		Center: true, MaxWidth: 380, Dimmed: true,
		Component: ProgressCardColored(), Source: blocks.Source(src, "progress_card_colored.templ")},
	{Slug: "stats-card", Name: "StatsCard", Title: "Card with progress", Category: "stats",
		Center: true, MaxWidth: 320, Dimmed: true,
		Component: StatsCard(), Source: blocks.Source(src, "stats_card.templ")},
	{Slug: "stats-controls", Name: "StatsControls", Title: "Stats with controls", Category: "stats",
		Center: true, MaxWidth: 500, Dimmed: false,
		Component: StatsControls(), Source: blocks.Source(src, "stats_controls.templ")},
	{Slug: "stats-grid", Name: "StatsGrid", Title: "Stats grid", Category: "stats",
		Center: false, MaxWidth: 0, Dimmed: true,
		Component: StatsGrid(), Source: blocks.Source(src, "stats_grid.templ")},
	{Slug: "stats-grid-icons", Name: "StatsGridIcons", Title: "Stats grid with diff icons", Category: "stats",
		Center: false, MaxWidth: 0, Dimmed: true,
		Component: StatsGridIcons(), Source: blocks.Source(src, "stats_grid_icons.templ")},
	{Slug: "stats-group", Name: "StatsGroup", Title: "Grouped stats", Category: "stats",
		Center: true, MaxWidth: 920, Dimmed: false,
		Component: StatsGroup(), Source: blocks.Source(src, "stats_group.templ")},
	{Slug: "stats-ring", Name: "StatsRing", Title: "Stats with ring progress", Category: "stats",
		Center: true, MaxWidth: 840, Dimmed: true,
		Component: StatsRing(), Source: blocks.Source(src, "stats_ring.templ")},
	{Slug: "stats-segments", Name: "StatsSegments", Title: "Stats with segments", Category: "stats",
		Center: true, MaxWidth: 440, Dimmed: true,
		Component: StatsSegments(), Source: blocks.Source(src, "stats_segments.templ")},
}
