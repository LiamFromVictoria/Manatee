package main

func init() {
	register(Page{Group: "Buttons", Slug: "button", Title: "Button", Description: "Button with variants, sizes, colors, sections, loading state and form submission.", Body: ButtonPage()})
	register(Page{Group: "Buttons", Slug: "action-icon", Title: "ActionIcon", Description: "Square icon button with the same variants and colors as Button.", Body: ActionIconPage()})
	register(Page{Group: "Data display", Slug: "badge", Title: "Badge", Description: "Small status and label pill with variants, sizes and colors.", Body: BadgePage()})
	register(Page{Group: "Data display", Slug: "card", Title: "Card", Description: "Container with padding, shadow and edge-to-edge sections.", Body: CardPage()})
	register(Page{Group: "Data display", Slug: "paper", Title: "Paper", Description: "Basic surface with shadow, radius and border.", Body: PaperPage()})
	register(Page{Group: "Data display", Slug: "avatar", Title: "Avatar", Description: "Image, initials or icon avatar with grouping and overlap.", Body: AvatarPage()})
	register(Page{Group: "Typography", Slug: "text", Title: "Text", Description: "Styled text with color, weight, truncation and line clamping.", Body: TextPage()})
	register(Page{Group: "Typography", Slug: "title", Title: "Title", Description: "Semantic headings h1..h6 with independent visual sizing.", Body: TitlePage()})
	register(Page{Group: "Feedback", Slug: "loader", Title: "Loader", Description: "Loading indicator with oval, bars and dots animations.", Body: LoaderPage()})
	register(Page{Group: "Feedback", Slug: "alert", Title: "Alert", Description: "Contextual message box with variants, icon and close button.", Body: AlertPage()})
}
