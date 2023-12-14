const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
	//desestruturar infos do body
	const { name, email, password } = req.body;

	try {
		//fazer hash senha
		const encryptedPassword = await bcrypt.hash(password, 10);
		//enviar query insert
		const newUserQuery = await knex("user")
			.returning(["id", "name", "email"])
			.insert({ name, email, encryptedPassword });

		return res.status(201).json(newUserQuery);
	} catch (error) {
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = newUser;
