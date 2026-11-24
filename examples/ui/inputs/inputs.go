// Package inputs contains the "Inputs" UI blocks.
package inputs

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "autocomplete-loading", Name: "AutocompleteLoading", Title: "Autocomplete async data", Category: "inputs", Center: true, MaxWidth: 420, Component: AutocompleteLoading(), Source: blocks.Source(src, "autocomplete_loading.templ")},
	{Slug: "checkbox-card", Name: "CheckboxCard", Title: "Card with checkbox", Category: "inputs", Center: true, MaxWidth: 400, Component: CheckboxCard(), Source: blocks.Source(src, "checkbox_card.templ")},
	{Slug: "contained-inputs", Name: "ContainedInputs", Title: "Inputs with label inside input", Category: "inputs", Center: true, MaxWidth: 420, Component: ContainedInputs(), Source: blocks.Source(src, "contained_inputs.templ")},
	{Slug: "currency-input", Name: "CurrencyInput", Title: "Number input with currency select", Category: "inputs", Center: true, MaxWidth: 420, Component: CurrencyInput(), Source: blocks.Source(src, "currency_input.templ")},
	{Slug: "custom-switch", Name: "CustomSwitch", Title: "Custom switch", Category: "inputs", Center: true, Component: CustomSwitch(), Source: blocks.Source(src, "custom_switch.templ")},
	{Slug: "floating-label-input", Name: "FloatingLabelInput", Title: "Input with floating label", Category: "inputs", Center: true, MaxWidth: 420, Component: FloatingLabelInput(), Source: blocks.Source(src, "floating_label_input.templ")},
	{Slug: "forgot-password-input", Name: "ForgotPasswordInput", Title: "Forgot password on input label", Category: "inputs", Center: true, MaxWidth: 420, Component: ForgotPasswordInput(), Source: blocks.Source(src, "forgot_password_input.templ")},
	{Slug: "gradient-segmented-control", Name: "GradientSegmentedControl", Title: "Gradient segmented control", Category: "inputs", Center: true, MaxWidth: 420, Component: GradientSegmentedControl(), Source: blocks.Source(src, "gradient_segmented_control.templ")},
	{Slug: "image-checkboxes", Name: "ImageCheckboxes", Title: "Checkbox with image", Category: "inputs", Center: true, MaxWidth: 1080, Component: ImageCheckboxes(), Source: blocks.Source(src, "image_checkboxes.templ")},
	{Slug: "input-tooltip", Name: "InputTooltip", Title: "Inputs with tooltip", Category: "inputs", Center: true, MaxWidth: 420, Component: InputTooltip(), Source: blocks.Source(src, "input_tooltip.templ")},
	{Slug: "input-validation", Name: "InputValidation", Title: "Input with custom validation styles", Category: "inputs", Center: true, MaxWidth: 420, Component: InputValidation(), Source: blocks.Source(src, "input_validation.templ")},
	{Slug: "input-with-button", Name: "InputWithButton", Title: "Input with contained button", Category: "inputs", Center: true, MaxWidth: 520, Component: InputWithButton(), Source: blocks.Source(src, "input_with_button.templ")},
	{Slug: "language-picker", Name: "LanguagePicker", Title: "Language picker", Category: "inputs", Center: true, MaxWidth: 220, Component: LanguagePicker(), Source: blocks.Source(src, "language_picker.templ")},
	{Slug: "password-strength", Name: "PasswordStrength", Title: "Password with strength meter", Category: "inputs", Center: true, MaxWidth: 320, Component: PasswordStrength(), Source: blocks.Source(src, "password_strength.templ")},
}
