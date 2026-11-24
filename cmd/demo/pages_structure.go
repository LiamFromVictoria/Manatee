package main

func init() {
	register(Page{Group: "Layout", Slug: "app-shell", Title: "AppShell", Description: "Responsive application shell: fixed header/navbar/aside/footer with an offset main content area and a mobile navbar drawer.", Body: AppShellPage()})
	register(Page{Group: "Navigation", Slug: "burger", Title: "Burger", Description: "Animated hamburger toggle, typically wired to AppShell's mobile navbar drawer.", Body: BurgerPage()})
	register(Page{Group: "Data display", Slug: "table", Title: "Table", Description: "Styled native table with striping, borders, hover highlight, sticky header and scroll container.", Body: TablePage()})
	register(Page{Group: "Feedback", Slug: "progress", Title: "Progress", Description: "Progress bar with sizes, colors, stripes, animation and multi-section layouts.", Body: ProgressPage()})
}
