const express = require("express");
const transactionRoutes = express();

const { newTransaction } = require("../controllers/transactions/index");

const { checkAuth } = require("../middleware/index");

transactionRoutes.use(checkAuth);
// extrato das transacoes
// transactionRoutes.get("/transacao/extrato", extractTransactions);
// //listar categorias
// transactionRoutes.get("/categoria", listCategories);
// //listar transacoes
// transactionRoutes.get("/transacao", listTransactions);
// //detalhar transacao
// transactionRoutes.get("/transacao/:id", detailTransactions);
//cadastrar transacao
transactionRoutes.post("/transacao", newTransaction);
//atualizar transacao usuario logado
// transactionRoutes.put("/transacao/:id", updateTransaction);
// //excluir transacao usuario logado
// transactionRoutes.delete("/transacao/:id", deleteTransaction);

module.exports = transactionRoutes;
