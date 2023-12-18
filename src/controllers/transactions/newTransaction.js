const knex = require("knex");

const newTransaction = async (req, res) => {
	const idUser = req.user.id;
	const { descricao, valor, data, categoria_id, tipo } = req.body;

	if (!iduser) {
		return res.status(404).json({ mensagem: "user não encontrado." });
	}

	if (!descricao || !valor || !data || !categoria_id || !tipo) {
		return res
			.status(404)
			.json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
	}

	if (tipo != "entrada" && tipo != "saida") {
		return res
			.status(404)
			.json({ mensagem: "O tipo de transação está incorreto." });
	}

	try {
		// const query = `insert into transacoes (descricao, valor, data, user_id, categoria_id, tipo)
		// //             values ($1, $2, $3, $4, $5, $6)`;
		// const params = [descricao, valor, data, iduser, categoria_id, tipo];

		const transaction = knex("transacoes")
			.returning()
			.insert(descricao, valor, data, categoria_id, tipo);

		// const select = `select transacoes.id, transacoes.tipo, transacoes.descricao,
		//              transacoes.valor, transacoes.data, transacoes.user_id, transacoes.categoria_id,
		//              categorias.descricao AS categoria_nome
		//              FROM transacoes
		//              left join categorias ON transacoes.categoria_id = categorias.id
		//              where transacoes.user_id = $1
		//            order by transacoes.id desc`;

		const reqParams = [iduser];

		const resRows = await knex.query(select, reqParams);

		return res.status(201).json(resRows.rows[0]);
	} catch (error) {
		return res.status(500).json({ mensagem: "Erro do servidor" });
	}
};
