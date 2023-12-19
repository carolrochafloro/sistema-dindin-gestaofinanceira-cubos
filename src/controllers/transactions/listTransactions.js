const knex = require("../../config/dbConnection");

const listTransactions = async (req, res) => {
	const idUser = req.user.id;
	let categoryFilter = req.query.filtro || [];
	let categoryUpperCase = categoryFilter.map(
		(item) => item.charAt(0).toUpperCase() + item.slice(1)
	);

	try {
		if (categoryFilter.length > 0) {
			const result = [];
			const filterId = [];

			for (item of categoryUpperCase) {
				const invalidFilter = [];
				const filter = await knex
					.select("id")
					.from("categories")
					.where("category", item);

				if (filter.length < 1) {
					invalidFilter.push(item);
				}

				filterId.push(filter[0].id);
			}

			for (item of filterId) {
				const transactions = await knex
					.select("transactions.*", "categories.category")
					.from("transactions")
					.where("user_id", idUser)
					.andWhere("category_id", item)
					.join("categories", "transactions.category_id", "=", "categories.id");

				result.push(transactions);
			}
			if (invalidFilter.length > 0) {
				return res
					.status(404)
					.json(`O(s) filtro(s) informados são inválidos: ${invalidFilter}`);
			}
			return res.status(200).json(transactions);
		}

		const transactions = await knex
			.select("*")
			.from("transactions")
			.where("user_id", idUser);

		return res.status(200).json(transactions);
	} catch (error) {
		console.error("Erro no listTransactions", error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = listTransactions;
