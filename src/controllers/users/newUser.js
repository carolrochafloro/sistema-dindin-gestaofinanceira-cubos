const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const encryptedPassword = await bcrypt.hash(password, 10);
		const newUserQuery = await knex("users")
			.returning(["id", "name", "email"])
			.insert({ name, email, password: encryptedPassword });

		return res.status(201).json(newUserQuery);
	} catch (error) {
		console.error("Erro em newUser", error);
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = newUser;
