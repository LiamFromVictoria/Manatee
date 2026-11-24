// Package blocks holds the shared types for the Manatee UI block collection:
// ports of https://ui.mantine.dev (MIT) built from Manatee components. Each
// category lives in its own package (examples/ui/<category>) exporting
// `var Blocks []blocks.Block`; the demo server renders them as a gallery.
package blocks

import (
	"io/fs"

	"github.com/a-h/templ"
)

// Block is one copy-paste UI block.
type Block struct {
	Slug     string // kebab-case, unique, e.g. "header-simple"
	Name     string // component name, e.g. "HeaderSimple"
	Title    string // human title from ui.mantine.dev
	Category string // Category.Slug
	// Canvas mirrors ui.mantine.dev preview settings.
	Center   bool // center the block in the preview canvas
	MaxWidth int  // max preview width in px (0 = full width)
	Dimmed   bool // gray preview background
	// Component renders the block.
	Component templ.Component
	// Source is the block's templ source, shown in the gallery.
	Source string
}

// Category groups blocks, mirroring ui.mantine.dev.
type Category struct {
	Slug  string
	Name  string
	Group string
}

// Categories in ui.mantine.dev order.
var Categories = []Category{
	{"navbars", "Navbars", "Application UI"},
	{"headers", "Headers", "Application UI"},
	{"footers", "Footers", "Application UI"},
	{"grids", "Grids", "Application UI"},
	{"users", "User info and controls", "Application UI"},
	{"inputs", "Inputs", "Application UI"},
	{"buttons", "Buttons", "Application UI"},
	{"sliders", "Sliders", "Application UI"},
	{"dropzones", "Dropzones", "Application UI"},
	{"app-cards", "Application cards", "Application UI"},
	{"stats", "Stats", "Application UI"},
	{"tables", "Tables", "Application UI"},
	{"dnd", "Drag'n'Drop", "Application UI"},
	{"carousels", "Carousels", "Application UI"},
	{"hero", "Hero headers", "Page sections"},
	{"features", "Features section", "Page sections"},
	{"authentication", "Authentication", "Page sections"},
	{"faq", "Frequently asked questions", "Page sections"},
	{"contact", "Contact us section", "Page sections"},
	{"error-pages", "Error pages", "Page sections"},
	{"banners", "Banners", "Page sections"},
	{"article-cards", "Article cards", "Blog UI"},
	{"toc", "Table of contents", "Blog UI"},
	{"comments", "Comments", "Blog UI"},
}

// Source reads a block's templ source from an embedded FS; it panics if the
// file is missing so a wrong name fails at startup, not in the gallery.
func Source(fsys fs.FS, name string) string {
	b, err := fs.ReadFile(fsys, name)
	if err != nil {
		panic(err)
	}
	return string(b)
}
