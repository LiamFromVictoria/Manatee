package blocks

import (
	"embed"
	"io/fs"
	"net/http"
)

// fontFS holds the Outfit variable font (SIL OFL 1.1, see fonts/OFL.txt),
// which ui.mantine.dev blocks use for headings via `font-family: Outfit, ...`.
//
//go:embed fonts
var fontFS embed.FS

// FontsPrefix is the URL path FontHandler must be mounted at; FontFaces
// references the font files under it.
const FontsPrefix = "/ui/fonts/"

// FontHandler serves the embedded block fonts under FontsPrefix.
func FontHandler() http.Handler {
	sub, err := fs.Sub(fontFS, "fonts")
	if err != nil {
		panic(err)
	}
	files := http.FileServerFS(sub)
	return http.StripPrefix(FontsPrefix, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		files.ServeHTTP(w, r)
	}))
}
