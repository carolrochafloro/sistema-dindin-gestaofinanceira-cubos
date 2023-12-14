const knex = require("../config/db/dbConnection");

const checkEmailExists = async (req, res, next) => {
	const emailExists = await knex
		.select("*")
		.from("users")
		.where("email", email);

	if (emailExists.rows.length > 0) {
		return res.status(400).json({
			message: "Oops! Parece que esse e-mail já está cadastrado!",
		});
	}
	next();
};

module.exports = checkEmailExists;
