const knex = require("../../config/dbConnection");

const newCategory = async (req, res) => {
	const idUser = req.user.id;
	const { category } = req.body;

	try {
		const categories = await knex("categories")
			.returning("id", "category")
			.insert({
				category,
				user_id: idUser,
			});

		return res.status(201).json(categories);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor." });
	}
};

module.exports = newCategory;
