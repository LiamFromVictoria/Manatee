// Package manatee serves the Manatee web component bundle (Mantine-style
// <mt-*> custom elements). Typed templ components live in package mt.
//
// Mount the assets once:
//
//	mux.Handle(manatee.Prefix, manatee.Handler())
//
// and render mt.Head() inside <head>.
package manatee

//go:generate go run ./cmd/mtbuild
//go:generate go tool templ generate

import (
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"io/fs"
	"net/http"
	"strings"
)

// Prefix is the URL path the asset handler is expected to be mounted at.
const Prefix = "/_manatee/"

//go:embed dist/manatee.js dist/manatee.css
var dist embed.FS

// Version is a content hash of the embedded bundle, used for cache busting.
var Version = func() string {
	h := sha256.New()
	for _, name := range []string{"dist/manatee.js", "dist/manatee.css"} {
		b, err := dist.ReadFile(name)
		if err != nil {
			panic(err)
		}
		h.Write(b)
	}
	return hex.EncodeToString(h.Sum(nil))[:12]
}()

// ScriptURL is the versioned URL of the component bundle.
func ScriptURL() string { return Prefix + "manatee.js?v=" + Version }

// StylesheetURL is the versioned URL of the theme stylesheet.
func StylesheetURL() string { return Prefix + "manatee.css?v=" + Version }

// Handler serves the embedded bundle under Prefix. Versioned requests are
// cached immutably; unversioned ones revalidate.
func Handler() http.Handler {
	sub, err := fs.Sub(dist, "dist")
	if err != nil {
		panic(err)
	}
	files := http.StripPrefix(Prefix, http.FileServerFS(sub))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("v") == Version {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		if strings.HasSuffix(r.URL.Path, ".js") {
			w.Header().Set("Content-Type", "text/javascript; charset=utf-8")
		}
		files.ServeHTTP(w, r)
	})
}

// DevHandler serves the bundle from a directory on disk (e.g. "dist") with
// caching disabled; pair with `go run ./cmd/mtbuild -watch`.
func DevHandler(dir string) http.Handler {
	files := http.StripPrefix(Prefix, http.FileServer(http.Dir(dir)))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		files.ServeHTTP(w, r)
	})
}
