# Aula 11 - Revisão sobre API
_______________________________
## Projeto API Nodejs "Jansen's Films"

__Características:__
empresa de audio visual chamada Jansen's Films para desenvolver um novo produto que deverá ser lançado em breve. Nesse estágio inicial do produto, o mesmo consistirá em um aplicativo e uma página web onde o usuário poderá controlar uma lista com filmes que já assistiu e que gostaria de assistir.

__Atribuições:__
Como desenvolvedora backend responsável pelo desenvolvimento da API que deverá ser feito em Nodejs. Em paralelo, o time de Frontend irá desenvolver o aplicativo e a página web que irão se comunicar com a API que você irá desenvolver.

__Critérios:__

A listagem de filmes será no seguinte formato: ```{ nome, genero, sinopse, assistido/ não assistido }```

O novo produto deverá:

- [x] poder listar todos os filmes da lista do usuário
- [x] poder adicionar um novo filme
- [x] poder remover filme da lista
- [x] poder alterar informações do filme
- [x] poder marcar/desmarcar filme como assistido

Sendo assim precisaremos criar 5 rotas:

| Verbo  | Descrição da Rota                     |
| ------ | --------------------------------------|
| POST   | Adicionar novo filme                  |
| GET    | Recuperar filme                       |
| DELETE | Remover filme                         |
| PUT    | Alterar informações do filme          |
| PATCH  | Marcar/Desmarcar filme como assistido |
