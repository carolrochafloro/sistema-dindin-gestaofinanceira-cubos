const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
	const { email, senha } = req.body;

	try {
		//validar email
		const user = await knex("usuario").where("email", email);
		if (user.rowCount < 1) {
			return res.status(404).json({ mensagem: "Usuário e/ou senha inválidos" });
		}
		//validar senha
		const senhaValida = await bcrypt.compare(senha, user.rows[0].senha);
		if (!senhaValida) {
			return res.status(400).json({ mensagem: "Usuário e/ou senha inválidos" });
		}
		//token login
		const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_PASSWORD, {
			expiresIn: process.env.JWT_EXPIRE,
		});
		//desestruturação p/ exibir informações sem senha
		const { senha: _, ...UsuarioLogado } = user.rows[0];

		return res.status(200).json({ UsuarioLogado, token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = loginUser;
