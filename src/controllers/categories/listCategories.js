const knex = require("../../config/dbConnection");

const listCategories = async (req, res) => {
	const userId = req.user.id;

	try {
		const categories = await knex
			.select("*")
			.from("categories")
			.where(function () {
				this.whereNull("id_user").orWhere("id_user", userId);
			});

		return res.status(200).json(categories);
	} catch (error) {
		console.error("Erro em listCategories", error);
		return res.status(500).json({ mensagem: "Erro do servidor." });
	}
};

module.exports = listCategories;
