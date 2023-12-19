const knex = require("../../config/dbConnection");

const extractTransactions = async (req, res) => {
	const idUser = req.user.id;

	try {
		const income = await knex("transactions")
			.where("user_id", idUser)
			.andWhere("type_transaction", 1)
			.sum("ammount as total_income");

		const expense = await knex("transactions")
			.where("user_id", idUser)
			.andWhere("type_transaction", 2)
			.sum("ammount as total_expense");
		return res.status(200).json({ income, expense });
	} catch (error) {
		console.error("Erro em extractTransactions", error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = extractTransactions;
