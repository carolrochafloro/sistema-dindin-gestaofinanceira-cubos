const { id } = require("../../../jest.config");
const knex = require("../../config/dbConnection");
const delItem = require("../../utils/deleteFunction");

const deleteUser = async (req, res) => {
	const idUsuario = req.user.id;

	try {
		await knex
			.select("*")
			.from("transactions")
			.where("user_id", idUsuario)
			.del();
		await knex.select("*").from("categories").where("id_user", idUsuario).del();
		const result = await delItem("users", "id", idUsuario);
		if (result < 1) {
			return res.status(404).json({ mensagem: "Conta não encontrada." });
		}
		return res.status(200).json({ mensagem: "Conta deletada" });
	} catch (error) {
		console.error("Erro em deleteUser", error);

		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = deleteUser;
