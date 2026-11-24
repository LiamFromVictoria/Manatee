// Package articlecards contains the "Article cards" UI blocks.
package articlecards

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "article-card", Name: "ArticleCard", Title: "Article card with image", Category: "article-cards", Center: true, MaxWidth: 320, Dimmed: true, Component: ArticleCard(), Source: blocks.Source(src, "article_card.templ")},
	{Slug: "article-card-footer", Name: "ArticleCardFooter", Title: "Article card with footer", Category: "article-cards", Center: true, MaxWidth: 320, Dimmed: true, Component: ArticleCardFooter(), Source: blocks.Source(src, "article_card_footer.templ")},
	{Slug: "article-card-image", Name: "ArticleCardImage", Title: "Card with background image", Category: "article-cards", Center: true, MaxWidth: 320, Dimmed: false, Component: ArticleCardImage(), Source: blocks.Source(src, "article_card_image.templ")},
	{Slug: "article-card-vertical", Name: "ArticleCardVertical", Title: "Vertical article card", Category: "article-cards", Center: true, MaxWidth: 520, Dimmed: true, Component: ArticleCardVertical(), Source: blocks.Source(src, "article_card_vertical.templ")},
	{Slug: "articles-cards-grid", Name: "ArticlesCardsGrid", Title: "Articles cards grid", Category: "article-cards", Center: false, MaxWidth: 0, Dimmed: false, Component: ArticlesCardsGrid(), Source: blocks.Source(src, "articles_cards_grid.templ")},
	{Slug: "card-gradient", Name: "CardGradient", Title: "Card with gradient border", Category: "article-cards", Center: true, MaxWidth: 360, Dimmed: true, Component: CardGradient(), Source: blocks.Source(src, "card_gradient.templ")},
	{Slug: "image-card", Name: "ImageCard", Title: "Card with image as background", Category: "article-cards", Center: true, MaxWidth: 320, Dimmed: false, Component: ImageCard(), Source: blocks.Source(src, "image_card.templ")},
}
