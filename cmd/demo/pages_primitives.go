package main

func init() {
	register(Page{Group: "Layout", Slug: "box", Title: "Box", Description: "Plain polymorphic container with the shared Mantine style props.", Body: BoxPage()})
	register(Page{Group: "Layout", Slug: "aspect-ratio", Title: "AspectRatio", Description: "Scales its content (image, iframe, video) to a fixed width/height ratio.", Body: AspectRatioPage()})
	register(Page{Group: "Typography", Slug: "anchor", Title: "Anchor", Description: "Styled link with underline behavior, color, size and truncation.", Body: AnchorPage()})
	register(Page{Group: "Typography", Slug: "code", Title: "Code", Description: "Inline or block monospace code snippet.", Body: CodePage()})
	register(Page{Group: "Typography", Slug: "list", Title: "List", Description: "Ordered/unordered list with spacing, size and custom icons.", Body: ListPage()})
	register(Page{Group: "Typography", Slug: "typography", Title: "Typography", Description: "Styles arbitrary rich HTML content: headings, links, lists, code, tables.", Body: TypographyPage()})
	register(Page{Group: "Buttons", Slug: "unstyled-button", Title: "UnstyledButton", Description: "Reset button or link that inherits font and color, for fully custom styling.", Body: UnstyledButtonPage()})
	register(Page{Group: "Buttons", Slug: "close-button", Title: "CloseButton", Description: "Small subtle button with an X icon, used to dismiss or close things.", Body: CloseButtonPage()})
	register(Page{Group: "Buttons", Slug: "copy-button", Title: "CopyButton", Description: "Wraps any button to copy a value to the clipboard and report copied state.", Body: CopyButtonPage()})
	register(Page{Group: "Data display", Slug: "image", Title: "Image", Description: "Image with object-fit, radius and a fallback for load errors.", Body: ImagePage()})
	register(Page{Group: "Data display", Slug: "theme-icon", Title: "ThemeIcon", Description: "Colored icon container with variants matching Button/Badge.", Body: ThemeIconPage()})
	register(Page{Group: "Overlays", Slug: "overlay", Title: "Overlay", Description: "Absolutely or fixed positioned semi-transparent layer.", Body: OverlayPage()})
	register(Page{Group: "Feedback", Slug: "skeleton", Title: "Skeleton", Description: "Animated placeholder shown while content is loading.", Body: SkeletonPage()})
	register(Page{Group: "Feedback", Slug: "visually-hidden", Title: "VisuallyHidden", Description: "Hides content visually while keeping it available to assistive tech.", Body: VisuallyHiddenPage()})
}
