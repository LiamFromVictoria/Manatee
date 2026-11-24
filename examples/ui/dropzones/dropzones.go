// Package dropzones contains the "Dropzones" UI blocks.
package dropzones

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "dropzone-button", Name: "DropzoneButton", Title: "Dropzone with button", Category: "dropzones", Center: true, MaxWidth: 420, Component: DropzoneButton(), Source: blocks.Source(src, "dropzone_button.templ")},
}
