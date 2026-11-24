package main

func init() {
	register(Page{Group: "Inputs", Slug: "text-input", Title: "TextInput", Description: "Text field with label, description, error, sections and native form participation.", Body: TextInputPage()})
	register(Page{Group: "Inputs", Slug: "textarea", Title: "Textarea", Description: "Multi-line text field with autosize and resize control.", Body: TextareaPage()})
	register(Page{Group: "Inputs", Slug: "password-input", Title: "PasswordInput", Description: "Text field with a visibility toggle.", Body: PasswordInputPage()})
	register(Page{Group: "Inputs", Slug: "number-input", Title: "NumberInput", Description: "Numeric field with stepper controls, clamping and formatting.", Body: NumberInputPage()})
	register(Page{Group: "Inputs", Slug: "select", Title: "Select", Description: "Combobox select built from light-DOM options, with search and clearing.", Body: SelectPage()})
	register(Page{Group: "Inputs", Slug: "inputs-form", Title: "Form example", Description: "TextInput, Textarea, PasswordInput, NumberInput and Select participating in a native form submission.", Body: InputsFormPage()})
}
