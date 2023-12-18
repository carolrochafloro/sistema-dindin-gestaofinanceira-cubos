const knex = require("../../config/dbConnection");

const listCategories = async (req, res) => {
	try {
		const categories = await knex.select("*").from("categories");

		return res.status(200).json(categories);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor." });
	}
};

module.exports = listCategories;
