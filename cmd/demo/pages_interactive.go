package main

func init() {
	register(Page{Group: "Layout", Slug: "scroll-area", Title: "ScrollArea", Description: "Area with custom overlay scrollbars over a native scrolling viewport.", Body: ScrollAreaPage()})
	register(Page{Group: "Navigation", Slug: "collapse", Title: "Collapse", Description: "Animate presence with a slide down/up transition.", Body: CollapsePage()})
	register(Page{Group: "Overlays", Slug: "hover-card", Title: "HoverCard", Description: "Floating panel shown when the target is hovered or focused.", Body: HoverCardPage()})
	register(Page{Group: "Inputs", Slug: "segmented-control", Title: "SegmentedControl", Description: "A linear set of two or more segments, alternative to RadioGroup.", Body: SegmentedControlPage()})
	register(Page{Group: "Inputs", Slug: "native-select", Title: "NativeSelect", Description: "Native <select> element with Manatee input chrome.", Body: NativeSelectPage()})
	register(Page{Group: "Inputs", Slug: "autocomplete", Title: "Autocomplete", Description: "Text input with suggestions; users are not limited to the list.", Body: AutocompletePage()})
}
