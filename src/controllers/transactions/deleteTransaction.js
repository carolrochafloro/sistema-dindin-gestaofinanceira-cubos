const knex = require("../../config/dbConnection");

const deleteTransaction = async (req, res) => {
	const idUser = req.user.id;
	const idTransaction = req.params.id;

	try {
		const deletedTransaction = await knex
			.select("*")
			.where("id", idTransaction)
			.andWhere("user_id", idUser);

		if (deletedTransaction.length < 1) {
			return res.status(404).json({
				mensagem:
					"Transação não encontrada ou não pertencente ao usuário logado.",
			});
		}

		await knex("transactions")
			.where("id", idTransaction)
			.andWhere("user_id", idUser)
			.del();
		return res.status(200).json({ mensagem: "Transação excluída." });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Server error" });
	}
};

module.exports = deleteTransaction;
