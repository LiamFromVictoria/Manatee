// Command demo serves the Manatee component documentation.
//
//	go run ./cmd/demo            # embedded assets
//	go run ./cmd/demo -dev       # assets from ./dist (use with mtbuild -watch)
package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/a-h/templ"
	"github.com/you/manatee"
)

func main() {
	addr := flag.String("addr", "localhost:8080", "listen address")
	dev := flag.Bool("dev", false, "serve assets from ./dist without caching")
	flag.Parse()

	mux := http.NewServeMux()
	if *dev {
		mux.Handle(manatee.Prefix, manatee.DevHandler("dist"))
	} else {
		mux.Handle(manatee.Prefix, manatee.Handler())
	}

	pages := sortedPages()
	mux.Handle("GET /{$}", templ.Handler(Shell(pages, nil)))
	for _, p := range pages {
		mux.Handle("GET /components/"+p.Slug, templ.Handler(Shell(pages, &p)))
	}
	mux.HandleFunc("POST /echo", echoForm)

	log.Printf("manatee demo on http://%s", *addr)
	log.Fatal(http.ListenAndServe(*addr, mux))
}

// echoForm returns submitted form fields as a plain-text listing; used by form demos.
func echoForm(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	for k, vs := range r.PostForm {
		for _, v := range vs {
			w.Write([]byte(k + " = " + v + "\n"))
		}
	}
}
