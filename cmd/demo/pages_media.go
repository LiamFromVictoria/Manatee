package main

func init() {
	register(Page{Group: "Data display", Slug: "carousel", Title: "Carousel", Description: "Embla-like slider of slides with scroll-snap, pointer drag, keyboard navigation, controls and indicators.", Body: CarouselPage()})
	register(Page{Group: "Inputs", Slug: "dropzone", Title: "Dropzone", Description: "Drag-and-drop (and click-to-browse) file capture area with accept/reject/idle states and validation.", Body: DropzonePage()})
	register(Page{Group: "Data display", Slug: "sortable", Title: "Sortable", Description: "Reorder a list or table rows by pointer drag or keyboard.", Body: SortablePage()})
}
