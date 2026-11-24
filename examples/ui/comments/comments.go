// Package comments contains the "Comments" UI blocks.
package comments

import (
	"embed"

	"github.com/you/manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "comment-html", Name: "CommentHtml", Title: "Comment with html content", Category: "comments", Center: true, MaxWidth: 380, Dimmed: false, Component: CommentHtml(), Source: blocks.Source(src, "comment_html.templ")},
	{Slug: "comment-simple", Name: "CommentSimple", Title: "Comment", Category: "comments", Center: true, MaxWidth: 380, Dimmed: false, Component: CommentSimple(), Source: blocks.Source(src, "comment_simple.templ")},
}
