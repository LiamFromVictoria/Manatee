package mt

import (
	"encoding/json"
	"net/http"
	"strings"
)

// NotificationData is one toast triggered from the server via Notify. It
// mirrors the options of the client-side `manatee.notifications.show()`.
type NotificationData struct {
	ID              string
	Title           string
	Message         string
	Color           string
	AutoClose       int   // ms; 0 = client default (4000ms); -1 = never auto-close
	WithCloseButton *bool // nil = client default (true)
	Loading         bool
}

func (n NotificationData) options() map[string]any {
	opts := map[string]any{}
	for k, v := range map[string]string{"id": n.ID, "title": n.Title, "message": n.Message, "color": n.Color} {
		if v != "" {
			opts[k] = v
		}
	}
	if n.Loading {
		opts["loading"] = true
	}
	switch {
	case n.AutoClose < 0:
		opts["autoClose"] = false
	case n.AutoClose > 0:
		opts["autoClose"] = n.AutoClose
	}
	if n.WithCloseButton != nil {
		opts["withCloseButton"] = *n.WithCloseButton
	}
	return opts
}

// Notify adds toasts to the HTMX `HX-Trigger` response header as an
// `mt-notify` event, which the Manatee bundle turns into notifications.
// Existing HX-Trigger events (JSON or comma-separated names) and earlier
// Notify calls on the same response are preserved.
func Notify(w http.ResponseWriter, n ...NotificationData) {
	if len(n) == 0 {
		return
	}
	payload := map[string]any{}
	if existing := w.Header().Get("HX-Trigger"); existing != "" {
		if json.Unmarshal([]byte(existing), &payload) != nil {
			payload = map[string]any{}
			for _, name := range strings.Split(existing, ",") {
				if name = strings.TrimSpace(name); name != "" {
					payload[name] = nil
				}
			}
		}
	}
	var events []any
	switch prev := payload["mt-notify"].(type) {
	case []any:
		events = prev
	case map[string]any:
		events = []any{prev}
	}
	for _, one := range n {
		events = append(events, one.options())
	}
	payload["mt-notify"] = events
	out, err := json.Marshal(payload)
	if err != nil {
		panic(err) // payload holds only JSON-safe values
	}
	w.Header().Set("HX-Trigger", string(out))
}
