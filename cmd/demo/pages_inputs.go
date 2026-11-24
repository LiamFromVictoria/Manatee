package main

func init() {
	register(Page{Group: "Inputs", Slug: "text-input", Title: "TextInput", Description: "Text field with label, description, error, sections and native form participation.", Body: TextInputPage()})
}
