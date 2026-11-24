package main

func init() {
	register(Page{Group: "Inputs", Slug: "checkbox", Title: "Checkbox", Description: "Checkbox with indeterminate state, label position, sizes, colors and a Checkbox.Group for multi-select.", Body: CheckboxPage()})
	register(Page{Group: "Inputs", Slug: "switch", Title: "Switch", Description: "Toggle switch with on/off labels, sizes and colors.", Body: SwitchPage()})
	register(Page{Group: "Inputs", Slug: "radio", Title: "Radio", Description: "Radio button with a Radio.Group for single-select, sizes and colors.", Body: RadioPage()})
	register(Page{Group: "Inputs", Slug: "choice-form", Title: "Choice form", Description: "Checkbox, Switch and Radio wired into a real form submission.", Body: ChoiceFormPage()})
}
