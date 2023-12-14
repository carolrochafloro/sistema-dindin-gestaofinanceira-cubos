// const knex = require("../../config/db/dbConnection");

// const newTransaction = async (req, res) => {
// 	const idUser = req.user.id;
// 	const { descricao, valor, data, categoria_id, tipo } = req.body;

// 	if (!iduser) {
// 		return res.status(404).json({ mensagem: "user não encontrado." });
// 	}

// 	if (!descricao || !valor || !data || !categoria_id || !tipo) {
// 		return res
// 			.status(404)
// 			.json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
// 	}

// 	if (tipo != "entrada" && tipo != "saida") {
// 		return res
// 			.status(404)
// 			.json({ mensagem: "O tipo de transação está incorreto." });
// 	}

// 	try {
// 		const query = `insert into transacoes (descricao, valor, data, user_id, categoria_id, tipo)
//             values ($1, $2, $3, $4, $5, $6)`;
// 		const params = [descricao, valor, data, iduser, categoria_id, tipo];

// 		const rows = await knex.query(query, params);

// 		const select = `select transacoes.id, transacoes.tipo, transacoes.descricao,
//             transacoes.valor, transacoes.data, transacoes.user_id, transacoes.categoria_id,
//             categorias.descricao AS categoria_nome
//             FROM transacoes
//             left join categorias ON transacoes.categoria_id = categorias.id
//             where transacoes.user_id = $1
//             order by transacoes.id desc`;
// 		const reqParams = [iduser];

// 		const resRows = await knex.query(select, reqParams);

// 		return res.status(201).json(resRows.rows[0]);
// 	} catch (error) {
// 		return res.status(400).json({ mensagem: "Server error" });
// 	}
// };

// const updateTransaction = async (req, res) => {
// 	const userLogado = req.user;
// 	const idTransacao = req.params.id;
// 	const { descricao, valor, data, categoria_id, tipo } = req.body;
// 	//verificar se todos os dados foram inseridos
// 	if (!descricao || !valor || !data || !categoria_id || !tipo) {
// 		return res
// 			.status(400)
// 			.json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
// 	}
// 	if (tipo != "entrada" && tipo != "saida") {
// 		return res
// 			.status(404)
// 			.json({ mensagem: "O tipo de transação está incorreto." });
// 	}

// 	//verificar se o id_categoria é válido
// 	const verificarIdCategoria = await knex.query(
// 		"SELECT id FROM categorias WHERE id = $1",
// 		[categoria_id]
// 	);

// 	if (verificarIdCategoria.rowCount < 1) {
// 		return res.status(404).json({
// 			mensagem: "Id da categoria inválido.",
// 		});
// 	}
// 	try {
// 		const query =
// 			"UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and user_id = $7";
// 		const params = [
// 			descricao,
// 			valor,
// 			data,
// 			categoria_id,
// 			tipo,
// 			idTransacao,
// 			userLogado.id,
// 		];
// 		const transacoes = await knex.query(query, params);
// 		//verificar se a transação existe e se pertence ao usuário
// 		if (transacoes.rowCount < 1) {
// 			return res.status(404).json({
// 				mensagem: "Transação não encontrada ou não pertencente ao usuário.",
// 			});
// 		}

// 		return res.status(204).send();
// 	} catch (error) {
// 		return res.status(400).json({ mensagem: "Server error." });
// 	}
// };

// const deleteTransaction = async (req, res) => {
// 	const userLogado = req.user;
// 	const idTransacao = req.params.id;

// 	try {
// 		const query = "delete from transacoes where id = $1 and user_id = $2";
// 		const params = [idTransacao, userLogado.id];
// 		const transacoes = await knex.query(query, params);

// 		//verificar se a transação existe
// 		if (transacoes.rowCount < 1) {
// 			return res.status(404).json({ mensagem: "Transação não encontrada" });
// 		}

// 		return res.status(204).send();
// 	} catch (error) {
// 		return res.status(404).json({ mensagem: "Server error" });
// 	}
// };

// module.exports = {
// 	newTransaction,
// 	updateTransaction,
// 	deleteTransaction,
// };
