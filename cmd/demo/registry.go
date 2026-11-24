package main

import (
	"cmp"
	"slices"

	"github.com/a-h/templ"
)

// Page is one documentation page. Pages self-register from init() in their
// pages_<group>.go file so component slices never share a file.
type Page struct {
	Group       string // one of groupOrder
	Slug        string // URL: /components/<slug>
	Title       string
	Description string
	Body        templ.Component
}

var groupOrder = []string{"Layout", "Buttons", "Data display", "Inputs", "Overlays", "Navigation", "Feedback"}

var pages []Page

func register(p Page) { pages = append(pages, p) }

func sortedPages() []Page {
	out := slices.Clone(pages)
	slices.SortStableFunc(out, func(a, b Page) int {
		return cmp.Or(
			cmp.Compare(slices.Index(groupOrder, a.Group), slices.Index(groupOrder, b.Group)),
			cmp.Compare(a.Title, b.Title),
		)
	})
	return out
}
