const knex = require("../../config/dbConnection");

const detailTransaction = async (req, res) => {
	const idUser = req.user.id;
	const idTransaction = req.params;

	try {
		const transaction = await knex
			.select("*")
			.from("transactions")
			.where("user_id", idUser)
			.andWhere("id", idTransaction.id);

		if (transaction.length < 1) {
			return res.status(404).json({
				mensagem:
					"Transação não encontrada ou não pertencente ao usuário logado.",
			});
		}

		return res.status(200).json(transaction);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = detailTransaction;
