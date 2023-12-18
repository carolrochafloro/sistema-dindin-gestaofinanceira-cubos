const knex = require("../../config/dbConnection");

const listTransactions = async (req, res) => {
	const idUser = req.user.id;

	try {
		const transactions = await knex
			.select("*")
			.from("transactions")
			.where("user_id", idUser);

		return res.status(200).json(transactions);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = listTransactions;
