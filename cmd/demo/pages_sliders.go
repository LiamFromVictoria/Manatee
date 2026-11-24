package main

func init() {
	register(Page{Group: "Inputs", Slug: "slider", Title: "Slider", Description: "Single-value slider with marks, labels, colors and sizes.", Body: SliderPage()})
	register(Page{Group: "Inputs", Slug: "range-slider", Title: "RangeSlider", Description: "Two-thumb slider with min/max range constraints.", Body: RangeSliderPage()})
	register(Page{Group: "Feedback", Slug: "ring-progress", Title: "RingProgress", Description: "Circular progress ring with multiple colored sections and a centered label.", Body: RingProgressPage()})
}
