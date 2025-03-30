
# Movie Explorer 🎬 

Este é um projeto de exploração de filmes que consome a API do TMDB (The Movie Database) para exibir filmes em cartaz, seus detalhes e permitir a pesquisa de títulos.

# Tecnologias Utilizadas 🚀

Next.js (App Router) - Estrutura moderna para React

TypeScript - Tipagem segura

Tailwind CSS - Estilização rápida e eficiente

Zustand - Gerenciamento de estado

Axios - Requisições HTTP

Material UI (Skeleton) - Animação de carregamento

Radix Theme - Sistema de cores para temas claro e escuro

# Configuração 🛠
Para utilizar este projeto, você precisa da sua própria API Key e Token de Autenticação do TMDB.

🔑 Obtendo suas credenciais
Acesse o TMDB

Crie uma conta e vá para Configurações > API

Gere uma API Key (v3)

Gere um Token de Autenticação (Bearer Token v4)

# Como Rodar o Projeto 📌

1️⃣ Clone o repositório

git clone https://github.com/seu-usuario/movie-explorer.git

cd movie-explorer

2️⃣ Instale as dependências

npm install
# ou
yarn install
3️⃣ Configure as credenciais da API

Crie um arquivo .env.local na raiz do projeto e adicione suas credenciais:

NEXT_PUBLIC_TMDB_API_KEY=SUA_API_KEY_AQUI
NEXT_PUBLIC_TMDB_BEARER_TOKEN=SUA_BEARER_TOKEN_AQUI

⚠ Importante: Sem essas credenciais, as requisições à API do TMDB não funcionarão.

4️⃣ Rode o projeto

npm run dev
# ou
yarn dev
O projeto estará disponível em http://localhost:3000.

# Funcionalidades 📷
✔️ Exibição de filmes em cartaz

✔️ Paginação para navegação entre filmes

✔️ Pesquisa de filmes

✔️ Exibição de detalhes do filme

✔️ Tema escuro e claro