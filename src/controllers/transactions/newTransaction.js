const knex = require("../../config/dbConnection");

const newTransaction = async (req, res) => {
	const idUser = req.user.id;
	const { descrip, ammount, date_transaction, category_id, type_transaction } =
		req.body;

	if (
		!descrip ||
		!ammount ||
		!date_transaction ||
		!category_id ||
		!type_transaction
	) {
		return res
			.status(404)
			.json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
	}

	try {
		const transaction = await knex("transactions").returning("id").insert({
			descrip,
			ammount,
			date_transaction,
			category_id,
			user_id: idUser,
			type_transaction,
		});

		const idTransaction = transaction[0];

		if (transaction.length < 1) {
			return res.status(400).json({
				mensagem: "Houve um erro ao inserir a transação no banco de dados.",
			});
		}

		const returnObj = await knex
			.select("transactions.*", "categories.category")
			.from("transactions")
			.where("transactions.id", idTransaction.id)
			.join("categories", "transactions.category_id", "=", "categories.id");

		return res.status(201).json(returnObj);
	} catch (error) {
		console.error("Erro em newTransaction", error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = newTransaction;
