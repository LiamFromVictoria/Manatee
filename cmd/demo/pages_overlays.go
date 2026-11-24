package main

func init() {
	register(Page{Group: "Overlays", Slug: "modal", Title: "Modal", Description: "Dialog on top of the page, with sizes, centering, full-screen and overlay blur.", Body: ModalPage()})
	register(Page{Group: "Overlays", Slug: "drawer", Title: "Drawer", Description: "Modal-like dialog sliding in from an edge of the viewport.", Body: DrawerPage()})
	register(Page{Group: "Overlays", Slug: "tooltip", Title: "Tooltip", Description: "Renders a tooltip near a target element on hover or focus.", Body: TooltipPage()})
	register(Page{Group: "Overlays", Slug: "popover", Title: "Popover", Description: "Floating panel toggled by a target element.", Body: PopoverPage()})
	register(Page{Group: "Overlays", Slug: "menu", Title: "Menu", Description: "Dropdown menu with items, sections, keyboard navigation and submenus-free grouping.", Body: MenuPage()})
	register(Page{Group: "Feedback", Slug: "notifications", Title: "Notifications", Description: "Toast notifications shown in a corner of the viewport, with auto-close and a JS/server API.", Body: NotificationsPage()})
}
