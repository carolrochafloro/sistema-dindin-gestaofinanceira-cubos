const knex = require("../../config/dbConnection");
const delItem = require("../../utils/deleteFunction");

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

		if (category[0].id_user != idUser) {
			return res
				.status(404)
				.json({ mensagem: "Esta categoria não pode ser deletada." });
		}

		await delItem("categories", "id", idCategory);

		return res
			.status(201)
			.json({ mensagem: "Categoria deletada com sucesso." });
	} catch (error) {
		console.error("Erro em deleteCategory", error);
		return res.status(500).json({ mensagem: "Erro do servidor." });
	}
};

module.exports = deleteCategory;
