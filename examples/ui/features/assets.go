package features

import "embed"

//go:embed accountants.svg auditors.svg lawyers.svg others.svg
var featuresImagesAssets embed.FS

// featuresImagesSVG reads an embedded SVG's raw markup for inline rendering
// (mt.Image's Src is sanitized as a URL and rejects data: URIs, so these are
// rendered with templ.Raw instead).
func featuresImagesSVG(name string) string {
	b, err := featuresImagesAssets.ReadFile(name)
	if err != nil {
		panic(err)
	}
	return string(b)
}
