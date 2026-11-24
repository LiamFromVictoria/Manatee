// Command mtbuild generates theme tokens and bundles the Manatee web components
// into dist/ using esbuild's Go API (no Node toolchain required).
//
//	go run ./cmd/mtbuild            # production build (minified)
//	go run ./cmd/mtbuild -watch     # rebuild on change, unminified with sourcemaps
//	go run ./cmd/mtbuild -check f…  # syntax-check individual TS/CSS files only
package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	watch := flag.Bool("watch", false, "rebuild on change (unminified, inline sourcemaps)")
	check := flag.Bool("check", false, "syntax-check the given files without bundling")
	flag.Parse()

	if *check {
		os.Exit(checkFiles(flag.Args()))
	}

	if err := os.WriteFile("web/tokens.css", []byte(tokensCSS()), 0o644); err != nil {
		fatal(err)
	}

	opts := api.BuildOptions{
		EntryPointsAdvanced: []api.EntryPoint{
			{InputPath: "web/src/index.ts", OutputPath: "manatee"},
			{InputPath: "web/manatee.css", OutputPath: "manatee"},
		},
		Outdir:            "dist",
		Bundle:            true,
		Write:             true,
		Format:            api.FormatESModule,
		Target:            api.ES2022,
		MinifyWhitespace:  !*watch,
		MinifyIdentifiers: !*watch,
		MinifySyntax:      !*watch,
		LegalComments:     api.LegalCommentsNone,
		LogLevel:          api.LogLevelInfo,
		Charset:           api.CharsetUTF8,
		Loader:            map[string]api.Loader{".css": api.LoaderCSS},
	}
	if *watch {
		opts.Sourcemap = api.SourceMapInline
	}

	if !*watch {
		if res := api.Build(opts); len(res.Errors) > 0 {
			os.Exit(1)
		}
		return
	}

	ctx, cerr := api.Context(opts)
	if cerr != nil {
		fatal(cerr)
	}
	if err := ctx.Watch(api.WatchOptions{}); err != nil {
		fatal(err)
	}
	fmt.Println("mtbuild: watching web/ for changes")
	select {}
}

func checkFiles(files []string) int {
	failed := 0
	for _, f := range files {
		src, err := os.ReadFile(f)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			failed++
			continue
		}
		loader := api.LoaderTS
		switch strings.ToLower(filepath.Ext(f)) {
		case ".css":
			loader = api.LoaderCSS
		case ".js":
			loader = api.LoaderJS
		}
		res := api.Transform(string(src), api.TransformOptions{Loader: loader, Sourcefile: f, Target: api.ES2022, LogLevel: api.LogLevelError})
		if len(res.Errors) > 0 {
			failed++
		}
	}
	if failed == 0 {
		fmt.Printf("mtbuild: %d file(s) OK\n", len(files))
		return 0
	}
	return 1
}

func fatal(err error) {
	fmt.Fprintln(os.Stderr, "mtbuild:", err)
	os.Exit(1)
}
