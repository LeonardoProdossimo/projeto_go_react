package main

import (
	"log"
	"net/http"
	"server/routers"
)

func main() {
	router := routers.SetupRouter()
	log.Println("Servidor rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
