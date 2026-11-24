// Package sliders contains the "Sliders" UI blocks.
package sliders

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "slider-hover", Name: "SliderHover", Title: "Slider with thumb visible on hover", Category: "sliders",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: SliderHover(), Source: blocks.Source(src, "slider_hover.templ")},
	{Slug: "slider-icon", Name: "SliderIcon", Title: "Slider with icon thumb", Category: "sliders",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: SliderIcon(), Source: blocks.Source(src, "slider_icon.templ")},
	{Slug: "slider-input", Name: "SliderInput", Title: "NumberInput with slider", Category: "sliders",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: SliderInput(), Source: blocks.Source(src, "slider_input.templ")},
	{Slug: "slider-label", Name: "SliderLabel", Title: "Range slider with labels", Category: "sliders",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: SliderLabel(), Source: blocks.Source(src, "slider_label.templ")},
	{Slug: "slider-marks", Name: "SliderMarks", Title: "Slider with marks", Category: "sliders",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: SliderMarks(), Source: blocks.Source(src, "slider_marks.templ")},
	{Slug: "slider-white", Name: "SliderWhite", Title: "Slider with white thumb", Category: "sliders",
		Center: true, MaxWidth: 420, Dimmed: false,
		Component: SliderWhite(), Source: blocks.Source(src, "slider_white.templ")},
}
