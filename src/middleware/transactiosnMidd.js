const jwt = require("jsonwebtoken");
const knex = require("../config/dbConnection");

const checkInfoNewUser = async (req, res, next) => {
	//desestruturar infos do body
	const { name, email, password } = req.body;

	//verificar se todos os dados foram informados
	if (!name || !email || !password) {
		return res.status(400).json({
			message: "Oops! Você esqueceu de preencher todos os campos!",
		});
	}

	const checkEmail = await knex.select("*").from("users").where("email", email);

	if (checkEmail.rows.length > 0) {
		return res.status(400).json({
			message: "Oops! Parece que esse e-mail já está cadastrado!",
		});
	}
	next();
};

const checkUser = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res
			.status(401)
			.json({ message: "Oops! Você não tem autorização. Faça o login!" });
	}

	const token = authorization.split(" ")[1];

	try {
		const { id } = jwt.verify(token, process.env.JWT_PASSWORD);
		const { rows, rowCount } = await knex
			.select("*")
			.from("users")
			.where("id", id);

		if (rowCount < 1) {
			return res
				.status(401)
				.json({ message: "Oops! Você não tem autorização. Faça o login!" });
		}
		req.user = rows[0];

		next();
	} catch (error) {
		return res.status(401).json({ message: "Erro do servidor" });
	}
};

module.exports = { checkUser, checkInfoNewUser };
