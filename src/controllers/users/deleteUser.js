const knex = require("../../config/dbConnection");

const deleteUser = async (req, res) => {
	const idUsuario = req.user.id;

	try {
		await knex("users").where("id", idUsuario).del();

		return res.status(200).json({ mensagem: "Conta deletada" });
	} catch (error) {
		console.error("Erro em deleteUser", error);

		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = deleteUser;
