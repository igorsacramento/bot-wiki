# Bot Wiki

API para consulta e filtragem de dados de empresas extraídos da Wikipedia, com persistência em banco de dados PostgreSQL.

## 🚀 Instalação e Execução com Docker Compose

1. **Pré-requisitos:**
   - Docker e Docker Compose instalados.

2. **Clone o repositório:**

   ```sh
   git clone https://github.com/igorsacramento/bot-wiki.git
   cd bot-wiki
   ```

3. **Configure o arquivo `.env`** (exemplo já incluso):

   ```env
   APP_NAME=bot-wiki
   APP_VERSION=1.0.0
   APP_PORT=3000
   NODE_ENV=development
   DEBUG="*:dev"
   DB_CONNECT_HOST=db
   DB_CONNECT_PORT=5432
   DB_CONNECT_USERNAME=postgres
   DB_CONNECT_PASSWORD=1234
   DB_CONNECT_DATABASE=wiki
   DB_CONNECT_DIALECT=postgres
   SAVE_FILES=true
   ```

4. **Suba os containers:**
   ```sh
   docker-compose up --build
   ```

O serviço ficará disponível em `http://localhost:3000`.

---

## 📚 Endpoints Disponíveis

### `GET /`

- Retorna informações básicas do sistema.
- Exemplo de resposta:
  ```json
  {
    "status": "success",
    "Name": "bot-wiki",
    "Environment": "development"
  }
  ```

### `POST /`

- Realiza consulta e filtragem de empresas.
- **Body (JSON):**
  - `rule` (string, obrigatório): `"greater"`, `"smaller"` ou `"between"`
  - `billions` (number, obrigatório): valor de corte para o filtro
  - `range` (array de 2 números, obrigatório se rule for `"between"`): intervalo para filtro

- **Exemplo de requisição:**

  ```json
  {
    "rule": "greater",
    "billions": 10
  }
  ```

  ou

  ```json
  {
    "rule": "between",
    "range": [5, 20]
  }
  ```

- **Resposta:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "company_name": "Empresa X",
        "profit": 15,
        "rank": 1
      }
      // ...
    ]
  }
  ```

---

## 🔎 Parâmetros de Requisição

- `rule`:
  - `"greater"`: retorna empresas com `profit` maior que `billions`
  - `"smaller"`: retorna empresas com `profit` menor que `billions`
  - `"between"`: retorna empresas com `profit` entre os valores de `range`
- `billions`: valor de corte para as regras `"greater"` e `"smaller"`
- `range`: array `[min, max]` para a regra `"between"`

---

## ⚙️ Variáveis de Ambiente (.env)

- `APP_NAME`: Nome da aplicação
- `APP_VERSION`: Versão
- `APP_PORT`: Porta da API (ex: 3000)
- `NODE_ENV`: Ambiente (development, production)
- `DEBUG`: Debug do Node.js
- `DB_CONNECT_HOST`: Host do banco (use `db` no Docker)
- `DB_CONNECT_PORT`: Porta do banco (ex: 5432)
- `DB_CONNECT_USERNAME`: Usuário do banco
- `DB_CONNECT_PASSWORD`: Senha do banco
- `DB_CONNECT_DATABASE`: Nome do banco
- `DB_CONNECT_DIALECT`: Dialeto do banco (ex: postgres)
- `SAVE_FILES`: true/false para salvar arquivos

---

## 📝 Observações

- O banco de dados é criado e migrado automaticamente ao subir o container.
- O projeto utiliza Node.js 20 Alpine, PostgreSQL e Sequelize.
- O endpoint POST salva a requisição no banco e atualiza o campo respondedAt ao finalizar.

---

Se precisar de mais detalhes ou exemplos de uso, é só avisar!
