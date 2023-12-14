const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
	const idUsuario = req.user.id;

	const { nome, email, senha } = req.body;
	try {
		if (!nome || !email || !senha) {
			return res
				.status(400)
				.json({ mensagem: "Todos os campos devem ser preenchidos" });
		}

		const checkEmail = await knex("usuarios").where("email", email);
		if (checkEmail.rows.length > 0) {
			return res.status(400).json({
				mensagem: "Já existe usuário cadastrado com o e-mail informado.",
			});
		}

		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const query = await knex("usuarios")
			.returning(["id", "name", "email"])
			.where("id", idUsuario)
			.update({ nome, email, senha: senhaCriptografada });

		return res.status(201).json({ query });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = updateUser;
