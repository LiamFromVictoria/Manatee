// Package banners contains the "Banners" UI blocks.
package banners

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ image.svg
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "cookies-banner", Name: "CookiesBanner", Title: "Cookies banner", Category: "banners", Center: true, MaxWidth: 420, Dimmed: true, Component: CookiesBanner(), Source: blocks.Source(src, "cookies_banner.templ")},
	{Slug: "email-banner", Name: "EmailBanner", Title: "Email banner", Category: "banners", Center: true, MaxWidth: 980, Dimmed: true, Component: EmailBanner(), Source: blocks.Source(src, "email_banner.templ")},
	{Slug: "image-action-banner", Name: "ImageActionBanner", Title: "Banner with image and action", Category: "banners", Center: true, MaxWidth: 480, Dimmed: false, Component: ImageActionBanner(), Source: blocks.Source(src, "image_action_banner.templ")},
}
