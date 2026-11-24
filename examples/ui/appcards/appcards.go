// Package appcards contains the "Application cards" UI blocks.
package appcards

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "actions-grid", Name: "ActionsGrid", Title: "Card with actions grid", Category: "app-cards",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: ActionsGrid(), Source: blocks.Source(src, "actions_grid.templ")},
	{Slug: "badge-card", Name: "BadgeCard", Title: "Card with badges", Category: "app-cards",
		Center: true, MaxWidth: 370, Dimmed: true,
		Component: BadgeCard(), Source: blocks.Source(src, "badge_card.templ")},
	{Slug: "card-with-stats", Name: "CardWithStats", Title: "Card with stats", Category: "app-cards",
		Center: true, MaxWidth: 320, Dimmed: true,
		Component: CardWithStats(), Source: blocks.Source(src, "card_with_stats.templ")},
	{Slug: "features-card", Name: "FeaturesCard", Title: "Card with icon features", Category: "app-cards",
		Center: true, MaxWidth: 320, Dimmed: true,
		Component: FeaturesCard(), Source: blocks.Source(src, "features_card.templ")},
	{Slug: "stats-ring-card", Name: "StatsRingCard", Title: "Stats card with progress", Category: "app-cards",
		Center: true, MaxWidth: 420, Dimmed: true,
		Component: StatsRingCard(), Source: blocks.Source(src, "stats_ring_card.templ")},
	{Slug: "switches-card", Name: "SwitchesCard", Title: "Card with switches", Category: "app-cards",
		Center: true, MaxWidth: 540, Dimmed: true,
		Component: SwitchesCard(), Source: blocks.Source(src, "switches_card.templ")},
	{Slug: "task-card", Name: "TaskCard", Title: "Tasks card", Category: "app-cards",
		Center: true, MaxWidth: 360, Dimmed: true,
		Component: TaskCard(), Source: blocks.Source(src, "task_card.templ")},
}
