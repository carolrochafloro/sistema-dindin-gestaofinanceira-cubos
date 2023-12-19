const newTransaction = require("./newTransaction");
const listTransactions = require("./listTransactions");
const updateTransaction = require("./updateTransaction");
const deleteTransaction = require("./deleteTransaction");
const detailTransaction = require("./detailTransaction");
const extractTransactions = require("./extract");

module.exports = {
	newTransaction,
	listTransactions,
	updateTransaction,
	deleteTransaction,
	detailTransaction,
	extractTransactions,
};
