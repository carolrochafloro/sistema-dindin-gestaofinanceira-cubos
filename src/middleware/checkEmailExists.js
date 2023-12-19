const knex = require("../config/dbConnection");

const checkEmailExists = async (req, res, next) => {
	const { email } = req.body;

	try {
		const emailExists = await knex("users").where("email", email);

		if (emailExists.length > 0) {
			return res.status(400).json({
				message: "Oops! Parece que esse e-mail já está cadastrado!",
			});
		}

		next();
	} catch (error) {
		console.error("Erro em cgeckEmailExists", error);
		return res.status(500).json({ mensagem: "erro do servidor" });
	}
};

module.exports = checkEmailExists;
