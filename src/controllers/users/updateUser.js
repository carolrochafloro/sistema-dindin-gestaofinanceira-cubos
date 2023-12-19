const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
	const idUsuario = req.user.id;

	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ mensagem: "Todos os campos devem ser preenchidos" });
		}

		const [checkEmail] = await knex("users").where("email", email);

		if (checkEmail.rows > 0 && checkEmail.id != idUsuario) {
			return res.status(400).json({
				mensagem: "Já existe usuário cadastrado com o e-mail informado.",
			});
		}

		const senhaCriptografada = await bcrypt.hash(password, 10);

		const query = await knex("users")
			.returning(["id", "name", "email"])
			.where("id", idUsuario)
			.update({ name, email, password: senhaCriptografada });

		return res.status(201).json(query);
	} catch (error) {
		console.error("Erro em updateUser", error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = updateUser;
