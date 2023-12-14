const knex = require("../../config/dbConnection");

const detailUser = async (req, res) => {
	const idUsuario = req.user.id;
	try {
		const query = await knex
			.select("id", "nome", "email")
			.from("usuarios")
			.where("id", idUsuario);
		return res.status(200).json(query.rows[0]);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = detailUser;
