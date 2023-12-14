// const knex = require("../../config/db/dbConnection");

// const listTransactions = async (req, res) => {
// 	const loggedUser = req.user;

// 	//incluir filtro

// 	try {
// 		const query = `select transacoes.id, transacoes.tipo, transacoes.descricao,
//          transacoes.valor, transacoes.data, transacoes.user_id, transacoes.categoria_id,
//         categorias.descricao as categoria_nome from transacoes left join
//         categorias on (categoria_id = categorias.id) where user_id = $1`;
// 		const params = [userLogado.id];

// 		const transacoes = await knex.query(query, params);

// 		return res.json(transacoes.rows);
// 	} catch (error) {
// 		return res.status(400).json({ mensagem: "Server error" });
// 	}
// };

// const detailTransactions = async (req, res) => {
// 	const iduser = req.user.id;
// 	const { id } = req.params;

// 	if (!iduser) {
// 		return res.status(404).json({ mensagem: "User not found." });
// 	}

// 	try {
// 		const query = `select transacoes.id, transacoes.tipo, transacoes.descricao,
//          transacoes.valor, transacoes.data, transacoes.user_id, transacoes.categoria_id,
//         categorias.descricao as categoria_nome from transacoes left join
//         categorias on (categoria_id = categorias.id) where transacoes.id = $1 and user_id = $2`;

// 		const params = [id, idUser];

// 		const { rows, rowCount } = await knex.query(query, params);

// 		if (rowCount < 1) {
// 			return res.send.json({ mensagem: " Transação não encontrada" });
// 		}

// 		return res.status(200).json(rows[0]);
// 	} catch (error) {
// 		return res.status(400).json({ mensagem: "Server error" });
// 	}
// };

// const extractTransactions = async (req, res) => {
// 	const userLogged = req.user;

// 	try {
// 		// const queryEntradas =
// 		// 	"SELECT SUM(valor) as entrada FROM transacoes WHERE user_id = $1 and tipo = $2 group by $3";
// 		// const params = [userLogged.id, "entrada", userLogged.id];
// 		// const entradas = await knex.query(queryEntradas, params);

// 		const queryIns = await knex("transactions")
// 			.sum("ammount")
// 			.where({ user_id: userLogged.id, type: "entrada" })
// 			.groupBy("user_id");

// 		const queryOuts = await knex("transactions")
// 			.sum("ammount")
// 			.where({ user_id: userLogged.id, type: "saida" })
// 			.groupBy("user_id");

// 		const totalIncome = queryIns.rowCount > 0 ? queryIns.rows[0].entrada : 0;
// 		const totalOutcome = queryOuts.rowCount > 0 ? queryOuts.rows[0].saida : 0;
// 		const result = {
// 			entradas: totalIncome,
// 			saidas: totalOutcome,
// 		};

// 		return res.status(200).json(result);
// 	} catch (error) {
// 		console.error("O seguinte erro ocorreu:", error);
// 		return res.status(400).json({ mensagem: "Server error" });
// 	}
// };

// //listar categorias
// const listCategories = async (req, res) => {
// 	try {
// 		const query = await knex.query("SELECT id, descricao FROM categorias");
// 		const categoria = query.rows;
// 		return res.status(200).json(categoria);
// 	} catch (error) {
// 		return res.status(404).json({ mensagem: "Erro do servidor" });
// 	}
// };

// module.exports = {
// 	listTransactions,
// 	detailTransactions,
// 	extractTransactions,
// 	listCategories,
// };
