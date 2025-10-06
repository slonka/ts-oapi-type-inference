package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

// UserResponse struct
type UserResponse struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

// AdminResponse struct
type AdminResponse struct {
	Type        string   `json:"type"`
	AdminID     int      `json:"admin_id"`
	Permissions []string `json:"permissions"`
}

func kriHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Ensure URL starts with "/_kri/"
	path := r.URL.Path
	if !strings.HasPrefix(path, "/_kri/") {
		http.Error(w, "Invalid entity URL", http.StatusBadRequest)
		return
	}

	// Remove prefix "/_kri/"
	idPart := strings.TrimPrefix(path, "/_kri/")

	// Extract the key after "kri_" and before next underscore
	if !strings.HasPrefix(idPart, "kri_") {
		http.Error(w, "Invalid entity URL format", http.StatusBadRequest)
		return
	}

	key := strings.Split(strings.TrimPrefix(idPart, "kri_"), "_")[0]

	switch key {
	case "user":
		resp := UserResponse{
			Type:     "user",
			Username: "johndoe",
			Email:    "johndoe@example.com",
		}
		json.NewEncoder(w).Encode(resp)

	case "admin":
		resp := AdminResponse{
			Type:        "admin",
			AdminID:     42,
			Permissions: []string{"read", "write", "delete"},
		}
		json.NewEncoder(w).Encode(resp)

	default:
		http.Error(w, "Entity not found", http.StatusNotFound)
	}
}

func main() {
	http.HandleFunc("/_kri/", kriHandler)
	port := ":8080"
	log.Printf("Mock server listening on http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
