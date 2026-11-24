// Package navbars contains the "Navbars" UI blocks.
package navbars

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "double-navbar", Name: "DoubleNavbar", Title: "Navbar with 2 sections", Category: "navbars", Component: DoubleNavbar(), Source: blocks.Source(src, "double_navbar.templ")},
	{Slug: "navbar-links-group", Name: "NavbarLinksGroup", Title: "Collapsible links group", Category: "navbars", Center: true, MaxWidth: 320, Component: NavbarLinksGroup(), Source: blocks.Source(src, "navbar_links_group.templ")},
	{Slug: "navbar-minimal", Name: "NavbarMinimal", Title: "Navbar with tooltips", Category: "navbars", Component: NavbarMinimal(), Source: blocks.Source(src, "navbar_minimal.templ")},
	{Slug: "navbar-minimal-colored", Name: "NavbarMinimalColored", Title: "Navbar with tooltips", Category: "navbars", Component: NavbarMinimalColored(), Source: blocks.Source(src, "navbar_minimal_colored.templ")},
	{Slug: "navbar-nested", Name: "NavbarNested", Title: "Navbar with nested links", Category: "navbars", Component: NavbarNested(), Source: blocks.Source(src, "navbar_nested.templ")},
	{Slug: "navbar-search", Name: "NavbarSearch", Title: "Navbar with search", Category: "navbars", Component: NavbarSearch(), Source: blocks.Source(src, "navbar_search.templ")},
	{Slug: "navbar-segmented", Name: "NavbarSegmented", Title: "Navbar with SegmentedControl", Category: "navbars", Component: NavbarSegmented(), Source: blocks.Source(src, "navbar_segmented.templ")},
	{Slug: "navbar-simple", Name: "NavbarSimple", Title: "Simple navbar", Category: "navbars", Component: NavbarSimple(), Source: blocks.Source(src, "navbar_simple.templ")},
	{Slug: "navbar-simple-colored", Name: "NavbarSimpleColored", Title: "Simple navbar", Category: "navbars", Component: NavbarSimpleColored(), Source: blocks.Source(src, "navbar_simple_colored.templ")},
}
