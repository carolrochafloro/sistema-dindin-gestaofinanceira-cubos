const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await knex("users").where("email", email);

		if (user.length < 1) {
			return res.status(404).json({ mensagem: "Usuário e/ou senha inválidos" });
		}

		const senhaValida = await bcrypt.compare(password, user[0].password);
		if (!senhaValida) {
			return res.status(400).json({ mensagem: "Usuário e/ou senha inválidos" });
		}
		//token login
		const token = jwt.sign({ id: user[0].id }, process.env.JWT_PASSWORD, {
			expiresIn: process.env.JWT_EXPIRE,
		});
		//desestruturação p/ exibir informações sem senha
		const { password: _, ...UsuarioLogado } = user[0];

		return res.status(200).json({ UsuarioLogado, token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = loginUser;
