const express = require("express");
const rotas = express();

const {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  atualizarUsuario,
  listarCategorias,
} = require("./controladores/operacoes");

const {
  listarTransacoes,
  detalharTransacoes,
  cadastrarTransacao,
  atualizarTransacao,
  deletarTransacao,
  extratoTransacoes,
} = require("./controladores/operadorTransacoes");

const verUsuarioLogado = require("./middleware/middleware");

//cadastrar
rotas.post("/usuario", cadastrarUsuario);
//fazer login
rotas.post("/login", loginUsuario);

// valida usuario logado
rotas.use(verUsuarioLogado);
// extrato das transacoes
rotas.get("/transacao/extrato", extratoTransacoes);
//detalhar usuario
rotas.get("/usuario", detalharUsuario);
//atualizar usuario
rotas.put("/usuario", atualizarUsuario);
//listar categorias
rotas.get("/categoria", listarCategorias);
//listar transacoes
rotas.get("/transacao", listarTransacoes);
//detalhar transacao
rotas.get("/transacao/:id", detalharTransacoes);
//cadastrar transacao
rotas.post("/transacao", cadastrarTransacao);
//atualizar transacao usuario logado
rotas.put("/transacao/:id", atualizarTransacao);
//excluir transacao usuario logado
rotas.delete("/transacao/:id", deletarTransacao);

module.exports = rotas;
