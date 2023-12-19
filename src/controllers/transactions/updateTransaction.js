const knex = require("../../config/dbConnection");

const updateTransaction = async (req, res) => {
	const idUser = req.user;
	const idTransaction = req.params.id;
	const { descrip, ammount, date_transaction, category_id, type_transaction } =
		req.body;

	const updateFields = {};

	if (descrip != undefined) {
		updateFields.descrip = descrip;
	}
	if (ammount != undefined) {
		updateFields.ammount = ammount;
	}
	if (date_transaction != undefined) {
		updateFields.date_transaction = date_transaction;
	}
	if (category_id != undefined) {
		updateFields.category_id = category_id;
	}
	if (type_transaction != undefined) {
		updateFields.type_transaction = type_transaction;
	}

	try {
		const validTransaction = await knex
			.select("*")
			.from("transactions")
			.where("id", idTransaction);

		if (validTransaction.length < 1) {
			return res.status(404).json({
				mensagem: "Transação não existente.",
			});
		}

		const validCategory = await knex
			.select("*")
			.from("categories")
			.where("id", category_id);

		if (validCategory.length < 1) {
			return res.status(404).json({
				mensagem: "Categoria não existente.",
			});
		}

		const updated = await knex("transactions")
			.returning("*")
			.where("id", idTransaction)
			.andWhere("user_id", idUser.id)
			.update(updateFields);

		return res.status(200).json(updated);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor." });
	}
};

module.exports = updateTransaction;
