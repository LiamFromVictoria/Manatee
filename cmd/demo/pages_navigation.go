package main

func init() {
	register(Page{Group: "Navigation", Slug: "tabs", Title: "Tabs", Description: "Tabs with underline, outline and pills variants, horizontal and vertical orientation.", Body: TabsPage()})
	register(Page{Group: "Data display", Slug: "accordion", Title: "Accordion", Description: "Collapsible sections with default, contained, filled and separated variants.", Body: AccordionPage()})
	register(Page{Group: "Navigation", Slug: "nav-link", Title: "NavLink", Description: "Navigation link with sections, active state and nested links.", Body: NavLinkPage()})
	register(Page{Group: "Navigation", Slug: "breadcrumbs", Title: "Breadcrumbs", Description: "Breadcrumbs with automatic separators.", Body: BreadcrumbsPage()})
	register(Page{Group: "Navigation", Slug: "pagination", Title: "Pagination", Description: "Pagination controls, with an href-template for server-side paging.", Body: PaginationPage()})
}
