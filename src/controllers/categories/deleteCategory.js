const knex = require("../../config/dbConnection");

const deleteCategory = async (req, res) => {
	const idUser = req.user.id;
	const idCategory = req.params.id;

	try {
		const category = await knex
			.select("*")
			.from("categories")
			.where("id", idCategory);

		if (category.length < 1) {
			return res.status(404).json({ mensagem: "Categoria não encontrada." });
		}

		if (category[0].user_id != idUser) {
			return res
				.status(404)
				.json({ mensagem: "Esta categoria não pode ser deletada." });
		}

		await knex("categories").where("id", idCategory).del();

		return res
			.status(201)
			.json({ mensagem: "Categoria deletada com sucesso." });
	} catch (error) {
		console.error("Erro em deleteCategory", error);
		return res.status(500).json({ mensagem: "Erro do servidor." });
	}
};

module.exports = deleteCategory;
