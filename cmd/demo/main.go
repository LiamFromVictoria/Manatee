// Command demo serves the Manatee component documentation.
//
//	go run ./cmd/demo            # embedded assets
//	go run ./cmd/demo -dev       # assets from ./dist (use with mtbuild -watch)
package main

import (
	"flag"
	"log"
	"net"
	"net/http"

	"github.com/LiamFromVictoria/Manatee"
	"github.com/a-h/templ"
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
	mux.Handle("GET /{$}", templ.Handler(Layout(pages, "/", "", "", Home(pages))))
	for _, p := range pages {
		path := "/components/" + p.Slug
		mux.Handle("GET "+path, templ.Handler(Layout(pages, path, p.Title, p.Description, p.Body)))
	}
	mountGallery(mux, pages)
	mux.HandleFunc("POST /echo", echoForm)

	ln, err := net.Listen("tcp", *addr)
	if err != nil {
		// If something answers on the address, it is already being served
		// (often an earlier demo a cancelled `go run` left behind).
		if c, dialErr := net.Dial("tcp", *addr); dialErr == nil {
			c.Close()
			log.Fatalf("%s is already in use, probably by an earlier demo that is still running "+
				"(a cancelled `go run` can leave its demo process behind). Stop it, or pass -addr localhost:8081.", *addr)
		}
		log.Fatal(err)
	}
	log.Printf("manatee demo on http://%s", ln.Addr())
	log.Fatal(http.Serve(ln, mux))
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
