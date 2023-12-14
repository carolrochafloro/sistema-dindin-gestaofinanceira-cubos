const jwt = require("jsonwebtoken");
const knex = require("../config/dbConnection");

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

		const user = await knex("users").where("id", id);

		if (user.length < 1) {
			return res
				.status(401)
				.json({ message: "Oops! Você não tem autorização. Faça o login!" });
		}

		req.user = user[0];

		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: "Token inválido" });
		}
		console.error(error);
		return res.status(500).json({ message: "Erro do servidor midd" });
	}
};

module.exports = checkAuth;
