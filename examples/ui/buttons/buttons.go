// Package buttons contains the "Buttons" UI blocks.
package buttons

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "action-toggle", Name: "ActionToggle", Title: "Color scheme toggle", Category: "buttons", Center: true, Component: ActionToggle(), Source: blocks.Source(src, "action_toggle.templ")},
	{Slug: "button-copy", Name: "ButtonCopy", Title: "Copy to clipboard button", Category: "buttons", Center: true, MaxWidth: 240, Component: ButtonCopy(), Source: blocks.Source(src, "button_copy.templ")},
	{Slug: "button-menu", Name: "ButtonMenu", Title: "Button with menu", Category: "buttons", Center: true, MaxWidth: 120, Component: ButtonMenu(), Source: blocks.Source(src, "button_menu.templ")},
	{Slug: "button-progress", Name: "ButtonProgress", Title: "Button with loading progress", Category: "buttons", Center: true, MaxWidth: 220, Component: ButtonProgress(), Source: blocks.Source(src, "button_progress.templ")},
	{Slug: "social-buttons", Name: "SocialButtons", Title: "Social buttons", Category: "buttons", Center: true, Component: SocialButtons(), Source: blocks.Source(src, "social_buttons.templ")},
	{Slug: "split-button", Name: "SplitButton", Title: "Split button", Category: "buttons", Center: true, MaxWidth: 120, Component: SplitButton(), Source: blocks.Source(src, "split_button.templ")},
}
