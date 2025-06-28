package config

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	DB_HOST = "54.91.193.137"
	DB_PORT = "3306"
	DB_USER = "libertas"
	DB_PASS = "123456"
	DB_NAME = "libertas5per"
)

func Connect() (*sql.DB, error) {
	// Constrói a string de conexão
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME)

	// Abre a conexão com o banco de dados
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Verifica se a conexão é bem-sucedida
	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
