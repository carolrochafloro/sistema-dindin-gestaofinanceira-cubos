const express = require("express");
const transactionRoutes = express();

const {
	newTransaction,
	listTransactions,
	updateTransaction,
} = require("../controllers/transactions/index");

const { checkAuth } = require("../middleware/index");

transactionRoutes.use(checkAuth);
// extrato das transacoes
// transactionRoutes.get("/transacao/extrato", extractTransactions);
transactionRoutes.get("/transacao", listTransactions);
// //detalhar transacao
// transactionRoutes.get("/transacao/:id", detailTransactions);
transactionRoutes.post("/transacao", newTransaction);
transactionRoutes.put("/transacao/:id", updateTransaction);
// //excluir transacao usuario logado
// transactionRoutes.delete("/transacao/:id", deleteTransaction);

module.exports = transactionRoutes;
