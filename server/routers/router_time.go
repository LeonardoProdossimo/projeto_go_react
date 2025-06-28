package routers

import (
	"net/http"
	"server/controllers"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func SetupRouter() http.Handler {
	router := mux.NewRouter().StrictSlash(true)

	// Rotas da API
	router.HandleFunc("/time", controllers.GetTime).Methods("GET")
	router.HandleFunc("/time/{idtime}", controllers.GetTimeById).Methods("GET")
	router.HandleFunc("/time", controllers.CreateTime).Methods("POST")
	router.HandleFunc("/time/{idtime}", controllers.UpdateTime).Methods("PUT")
	router.HandleFunc("/time/{idtime}", controllers.DeleteTime).Methods("DELETE")

	// Arquivos estáticos (React build, se tiver)
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static/"))))

	// Middleware CORS
	headers := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	origins := handlers.AllowedOrigins([]string{"*"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	return handlers.CORS(origins, headers, methods)(router)
}
