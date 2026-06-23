# API Campo Minado - Trabalho Back End

API REST desenvolvida em Node.js para uma plataforma de apostas baseada no jogo Campo Minado.

---

## Tecnologias que utilizamos

- **Node.js** (v24.15.0)
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Segurança
- **nodemon** - Desenvolvimento

---

## Membros do trabalho

- Natasha Pedroso Dias Alves
- Vinicius de Morais Furriel

---

## Para instalar

Clone o repositório:

```bash
git clone https://github.com/natashapedroso/api-campo-minado.git

Para acessar a pasta do projeto; cd api-campo-minado
Instalar as dependências; npm install

Criar um arquivo .env na raiz do projeto com as seguintes variaveis; 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campo_minado
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI
PORT=3000
NODE_ENV=development
JWT_SECRET=minha_chave_secreta_super_segura_123

Para executar na bash; npm run dev
(a api vai estar disponivel em http://localhost:3000)

> INSTALAR O JQ PARA O CODIGO EXECUTADO FICAR INDENTADO
> ```bash
> sudo apt-get install jq -y
> ``

curl -s http://localhost:3000/health | jq

ENDPOINTS Da API 
Autenticação
POST /auth/register - Cadastrar usuário
Body: 
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "dataNascimento": "1990-01-01",
  "senha": "Senha@123",
  "confirmacaoSenha": "Senha@123"
}

Comando;
curl -s -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","dataNascimento":"1990-01-01","senha":"Senha@123","confirmacaoSenha":"Senha@123"}' | jq

POST /auth/login - Login
Body
{
  "email": "joao@email.com",
  "senha": "Senha@123"
}

Comando;
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"Senha@123"}' | jq

Resposta; {
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "dataNascimento": "1990-01-01",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

PATCH /auth/reset-password - Trocar senha
Body
{
  "id": 1,
  "novaSenha": "NovaSenha@123"
}

Comando;
curl -s -X PATCH http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"id":1,"novaSenha":"NovaSenha@123"}' | jq

--Usuarios--
GET /users/{id} - Ver dados do usuário
Comando;
curl -s -X GET http://localhost:3000/users/1 | jq

Resposta; {
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "data_nascimento": "1990-01-01",
  "saldo": 450.50
}

GET /users/dashboard - Estatísticas pessoais
Comando;
curl -s -X GET http://localhost:3000/users/dashboard | jq

Resposta; {
  "totalJogos": 10,
  "vitorias": 7,
  "derrotas": 3,
  "valorGanho": 350.00,
  "valorPerdido": 150.00
}

# API Campo Minado - Trabalho Back End

API REST desenvolvida em Node.js para uma plataforma de apostas baseada no jogo Campo Minado.

---

## Tecnologias que utilizamos

- **Node.js** (v24.15.0)
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Segurança
- **nodemon** - Desenvolvimento

---

## Membros do trabalho

- Natasha Pedroso Dias Alves
- Vinicius de Morais Furriel

---

## Para instalar

Clone o repositório:

```bash
git clone https://github.com/natashapedroso/api-campo-minado.git

Para acessar a pasta do projeto; cd api-campo-minado
Instalar as dependências; npm install

Criar um arquivo .env na raiz do projeto com as seguintes variaveis; 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campo_minado
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI
PORT=3000
NODE_ENV=development
JWT_SECRET=minha_chave_secreta_super_segura_123

Para executar na bash; npm run dev
(a api vai estar disponivel em http://localhost:3000)

> INSTALAR O JQ PARA O CODIGO EXECUTADO FICAR INDENTADO
> ```bash
> sudo apt-get install jq -y
> ``

curl -s http://localhost:3000/health | jq

ENDPOINTS Da API 
Autenticação
POST /auth/register - Cadastrar usuário
Body: 
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "dataNascimento": "1990-01-01",
  "senha": "Senha@123",
  "confirmacaoSenha": "Senha@123"
}

Comando;
curl -s -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","dataNascimento":"1990-01-01","senha":"Senha@123","confirmacaoSenha":"Senha@123"}' | jq

POST /auth/login - Login
Body
{
  "email": "joao@email.com",
  "senha": "Senha@123"
}

Comando;
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"Senha@123"}' | jq

Resposta; {
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "dataNascimento": "1990-01-01",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

PATCH /auth/reset-password - Trocar senha
Body
{
  "id": 1,
  "novaSenha": "NovaSenha@123"
}

Comando;
curl -s -X PATCH http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"id":1,"novaSenha":"NovaSenha@123"}' | jq

--Usuarios--
GET /users/{id} - Ver dados do usuário
Comando;
curl -s -X GET http://localhost:3000/users/1 | jq

Resposta; {
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "data_nascimento": "1990-01-01",
  "saldo": 450.50
}

GET /users/dashboard - Estatísticas pessoais
Comando;
curl -s -X GET http://localhost:3000/users/dashboard | jq

Resposta; {
  "totalJogos": 10,
  "vitorias": 7,
  "derrotas": 3,
  "valorGanho": 350.00,
  "valorPerdido": 150.00
}

PUT /users/{id} - Adicionar sald
Body
{
  "saldo": 100.50
}

Comando;
curl -s -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"saldo":100.50}' | jq

DELETE /users/{id} - Deletar usuário
Comando;
curl -s -X DELETE http://localhost:3000/users/1 | jq

--JOGO--
POST /games/start - Iniciar nova apo
Body
{
  "idUser": 1,
  "valorAposta": 50
}

Comando;
curl -s -X POST http://localhost:3000/games/start \
  -H "Content-Type: application/json" \
  -d '{"idUser":1,"valorAposta":50}' | jq

  Resposta; {
  "gameId": 1
}

POST /games/{gameId}/reveal - Revelar posição
Body
{
  "linha": 2,
  "coluna": 3
}

Comando;
curl -s -X POST http://localhost:3000/games/1/reveal \
  -H "Content-Type: application/json" \
  -d '{"linha":2,"coluna":3}' | jq

Resposta(Diamante)
{
  "resultado": "DIAMANTE",
  "diamantesEncontrados": 1,
  "premioAtual": 66.50
}

(Bomba)
{
  "resultado": "BOMBA",
  "status": "PERDIDO"
}

POST /games/{gameId}/cashout - Sacar prêmio
Comando;
curl -s -X POST http://localhost:3000/games/1/cashout | jq

Resposta; {
  "message": "Prêmio sacado com sucesso!",
  "valor": 66.50
}

--Regras do Jogo--
Tabuleiro 5x5 com diamantes e bombas 

Cada diamante encontrado aumenta o prêmio em 33%

Encontrar uma bomba = perde tudo 

O usuário pode sacar o prêmio a qualquer momento 

--Formula da premiação--
premio = valorApostado × (1 + (quantidadeDiamantes × 0.33))
EX- Aposta de R$100,00

1 diamante = R$133,00

2 diamantes = R$166,00

3 diamantes = R$199,00

--ESTRUTURA DO PROJETO--
api-campo-minado/
├── src/
│   ├── controllers/     # Recebem as requisições HTTP
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── gameController.js
│   ├── services/        # Regras de negócio
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── gameService.js
│   ├── repositories/    # Comunicação com o banco
│   │   ├── userRepository.js
│   │   └── gameRepository.js
│   ├── routes/          # Definição das rotas
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── gameRoutes.js
│   ├── config/          # Configurações
│   │   └── database.js
│   └── app.js           # Arquivo principal
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências
└── README.md           # Documentaçãp

Requisitos da senha;
 Mínimo de 8 caracteres
 Pelo menos uma letra maiúscula
 Pelo menos um número
 Pelo menos um caractere especial (!@#$%^&*(),.?":{}|<>))

OBS: dados são salvos em um banco PostgreSQL

As senhas são criptografadas com bcrypt

A autenticação é feita com JWT (JSON Web Token)

O tabuleiro é gerado aleatoriamente a cada partida :)PUT /users/{id} - Adicionar sald
Body
{
  "saldo": 100.50
}

Comando;
curl -s -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"saldo":100.50}' | jq

DELETE /users/{id} - Deletar usuário
Comando;
curl -s -X DELETE http://localhost:3000/users/1 | jq

--JOGO--
POST /games/start - Iniciar nova apo
Body
{
  "idUser": 1,
  "valorAposta": 50
}

Comando;
curl -s -X POST http://localhost:3000/games/start \
  -H "Content-Type: application/json" \
  -d '{"idUser":1,"valorAposta":50}' | jq

  Resposta; {
  "gameId": 1
}

POST /games/{gameId}/reveal - Revelar posição
Body
{
  "linha": 2,
  "coluna": 3
}

Comando;
curl -s -X POST http://localhost:3000/games/1/reveal \
  -H "Content-Type: application/json" \
  -d '{"linha":2,"coluna":3}' | jq

Resposta(Diamante)
{
  "resultado": "DIAMANTE",
  "diamantesEncontrados": 1,
  "premioAtual": 66.50
}

(Bomba)
{
  "resultado": "BOMBA",
  "status": "PERDIDO"
}

POST /games/{gameId}/cashout - Sacar prêmio
Comando;
curl -s -X POST http://localhost:3000/games/1/cashout | jq

Resposta; {
  "message": "Prêmio sacado com sucesso!",
  "valor": 66.50
}

--Regras do Jogo--
Tabuleiro 5x5 com diamantes e bombas 

Cada diamante encontrado aumenta o prêmio em 33%

Encontrar uma bomba = perde tudo 

O usuário pode sacar o prêmio a qualquer momento 

--Formula da premiação--
premio = valorApostado × (1 + (quantidadeDiamantes × 0.33))
EX- Aposta de R$100,00

1 diamante = R$133,00

2 diamantes = R$166,00

3 diamantes = R$199,00

--ESTRUTURA DO PROJETO--
api-campo-minado/
├── src/
│   ├── controllers/     # Recebem as requisições HTTP
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── gameController.js
│   ├── services/        # Regras de negócio
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── gameService.js
│   ├── repositories/    # Comunicação com o banco
│   │   ├── userRepository.js
│   │   └── gameRepository.js
│   ├── routes/          # Definição das rotas
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── gameRoutes.js
│   ├── config/          # Configurações
│   │   └── database.js
│   └── app.js           # Arquivo principal
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências
└── README.md           # Documentaçãp

Requisitos da senha;
 Mínimo de 8 caracteres
 Pelo menos uma letra maiúscula
 Pelo menos um número
 Pelo menos um caractere especial (!@#$%^&*(),.?":{}|<>))

OBS: dados são salvos em um banco PostgreSQL

As senhas são criptografadas com bcrypt

A autenticação é feita com JWT (JSON Web Token)

O tabuleiro é gerado aleatoriamente a cada partida :)
