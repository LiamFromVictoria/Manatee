package main

func init() {
	register(Page{Group: "Layout", Slug: "container", Title: "Container", Description: "Centers content and limits its max-width.", Body: ContainerPage()})
	register(Page{Group: "Layout", Slug: "group", Title: "Group", Description: "Composes elements and components in a horizontal flex container.", Body: GroupPage()})
	register(Page{Group: "Layout", Slug: "stack", Title: "Stack", Description: "Composes elements and components in a vertical flex container.", Body: StackPage()})
	register(Page{Group: "Layout", Slug: "grid", Title: "Grid", Description: "12-column responsive grid system, flexbox based.", Body: GridPage()})
	register(Page{Group: "Layout", Slug: "simple-grid", Title: "SimpleGrid", Description: "Responsive grid with equal-width columns.", Body: SimpleGridPage()})
	register(Page{Group: "Layout", Slug: "center", Title: "Center", Description: "Centers content horizontally and vertically.", Body: CenterPage()})
	register(Page{Group: "Layout", Slug: "space", Title: "Space", Description: "Adds horizontal or vertical spacing between elements.", Body: SpacePage()})
	register(Page{Group: "Layout", Slug: "divider", Title: "Divider", Description: "Separates content with an optional label.", Body: DividerPage()})
}
