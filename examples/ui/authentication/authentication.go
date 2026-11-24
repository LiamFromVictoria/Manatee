// Package authentication contains the "Authentication" UI blocks.
package authentication

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "authentication-form", Name: "AuthenticationForm", Title: "Authentication form", Category: "authentication",
		Center: true, MaxWidth: 420, Dimmed: true,
		Component: AuthenticationForm(), Source: blocks.Source(src, "authentication_form.templ")},
	{Slug: "authentication-image", Name: "AuthenticationImage", Title: "Authentication page with image", Category: "authentication",
		Component: AuthenticationImage(), Source: blocks.Source(src, "authentication_image.templ")},
	{Slug: "authentication-title", Name: "AuthenticationTitle", Title: "Authentication form with title", Category: "authentication",
		Dimmed:    true,
		Component: AuthenticationTitle(), Source: blocks.Source(src, "authentication_title.templ")},
	{Slug: "forgot-password", Name: "ForgotPassword", Title: "Forgot password", Category: "authentication",
		Dimmed:    true,
		Component: ForgotPassword(), Source: blocks.Source(src, "forgot_password.templ")},
}
