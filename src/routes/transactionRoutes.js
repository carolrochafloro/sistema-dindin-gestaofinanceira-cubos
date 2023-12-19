const express = require("express");
const transactionRoutes = express();

const {
	newTransaction,
	listTransactions,
	updateTransaction,
	deleteTransaction,
	detailTransaction,
} = require("../controllers/transactions/index");

const { checkAuth } = require("../middleware/index");

transactionRoutes.use(checkAuth);
// extrato das transacoes
// transactionRoutes.get("/transacao/extrato", extractTransactions);
transactionRoutes.get("/transacao", listTransactions);
transactionRoutes.get("/transacao/:id", detailTransaction);
transactionRoutes.post("/transacao", newTransaction);
transactionRoutes.put("/transacao/:id", updateTransaction);
transactionRoutes.delete("/transacao/:id", deleteTransaction);

module.exports = transactionRoutes;
