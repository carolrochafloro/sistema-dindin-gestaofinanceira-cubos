const jwt = require("jsonwebtoken");
const knex = require("../config/db/dbConnection");

const checkAuth = async (req, res, next) => {
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
		return res.status(500).json({ message: "Erro do servidor" });
	}
};

module.exports = checkAuth;