// Package users contains the "User info and controls" UI blocks.
package users

import (
	"embed"

	"github.com/LiamFromVictoria/Manatee/examples/ui/blocks"
)

//go:embed *.templ
var src embed.FS

// Blocks in ui.mantine.dev order.
var Blocks = []blocks.Block{
	{Slug: "user-button", Name: "UserButton", Title: "User button", Category: "users", Center: true, MaxWidth: 320, Component: UserButton(), Source: blocks.Source(src, "user_button.templ")},
	{Slug: "user-card-image", Name: "UserCardImage", Title: "User card with image", Category: "users", Center: true, MaxWidth: 300, Dimmed: true, Component: UserCardImage(), Source: blocks.Source(src, "user_card_image.templ")},
	{Slug: "user-info-action", Name: "UserInfoAction", Title: "User card with action", Category: "users", Center: true, MaxWidth: 320, Dimmed: true, Component: UserInfoAction(), Source: blocks.Source(src, "user_info_action.templ")},
	{Slug: "user-info-icons", Name: "UserInfoIcons", Title: "User info with icons", Category: "users", Center: true, MaxWidth: 320, Component: UserInfoIcons(), Source: blocks.Source(src, "user_info_icons.templ")},
	{Slug: "user-menu", Name: "UserMenu", Title: "User menu", Category: "users", Component: UserMenu(), Source: blocks.Source(src, "user_menu.templ")},
	{Slug: "users-roles-table", Name: "UsersRolesTable", Title: "Table with roles select", Category: "users", Center: true, MaxWidth: 800, Component: UsersRolesTable(), Source: blocks.Source(src, "users_roles_table.templ")},
	{Slug: "users-stack", Name: "UsersStack", Title: "Users stack", Category: "users", Center: true, MaxWidth: 800, Component: UsersStack(), Source: blocks.Source(src, "users_stack.templ")},
	{Slug: "users-table", Name: "UsersTable", Title: "Table with users", Category: "users", Center: true, MaxWidth: 800, Component: UsersTable(), Source: blocks.Source(src, "users_table.templ")},
}
