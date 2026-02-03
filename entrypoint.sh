#!/bin/sh
set -e

# Aguarda o banco de dados ficar disponível
until nc -z db 5432; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

# Cria o banco de dados e executa as migrações
npx sequelize-cli db:create
npx sequelize-cli db:migrate

# Inicia a aplicação
npm start
