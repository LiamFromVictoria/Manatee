package main

func init() {
	register(Page{Group: "Buttons", Slug: "button", Title: "Button", Description: "Button with variants, sizes, colors, sections, loading state and form submission.", Body: ButtonPage()})
}
