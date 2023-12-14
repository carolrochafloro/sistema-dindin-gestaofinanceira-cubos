const checkInfoNewUser = async (req, res, next) => {
	//desestruturar infos do body
	const { name, email, password } = req.body;

	//verificar se todos os dados foram informados
	if (!name || !email || !password) {
		return res.status(400).json({
			message: "Oops! Você esqueceu de preencher todos os campos!",
		});
	}
	next();
};

module.exports = checkInfoNewUser;
