const pool = require("../conexaoBd");

const listarTransacoes = async (req, res) => {
  const UsuarioLogado = req.usuario;

  //ENDPOINT EXTRA
  // const queryFiltro = req.query['filtro']
  // let querySelect = 'select categorias.id from categorias where categorias.descricao = $1'

  // for (let index = 0; index < queryFiltro.length; index++) {
  //    querySelect += ` or categorias.descricao = $${index + 2}`
  // }

  // const idCategoria = await pool.query(querySelect, queryFiltro)

  // let querySearch = `select transacoes.id, transacoes.tipo, transacoes.descricao,
  // transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id,
  // categorias.descricao as categoria_nome from transacoes left join
  // categorias on (categoria_id = categorias.id) where usuario_id = $1 and (transacoes.categoria_id = $2 `

  // for (let index = 0; index < idCategoria.rows.length; index++) {
  //     querySearch += `or transacoes.categoria_id = $${index + 3} `
  //  }

  //  querySearch +=")"

  //  let idInformado = idCategoria.rows.map((obj) => obj.id)
  //  console.log(idInformado);
  //  const buscaCategoria = await pool.query(querySearch, [usuarioLogado, ...idInformado])

  try {
    const query = `select transacoes.id, transacoes.tipo, transacoes.descricao,
         transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id,
        categorias.descricao as categoria_nome from transacoes left join 
        categorias on (categoria_id = categorias.id) where usuario_id = $1`;
    const params = [UsuarioLogado.id];

    const transacoes = await pool.query(query, params);

    return res.json(transacoes.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: "erro do servidor" });
  }
};

const detalharTransacoes = async (req, res) => {
  const idUsuario = req.usuario.id;
  const { id } = req.params;

  if (!idUsuario) {
    return res.status(404).json({ mensagem: "Usuario não  encontrado." });
  }

  try {
    const query = `select transacoes.id, transacoes.tipo, transacoes.descricao,
         transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id,
        categorias.descricao as categoria_nome from transacoes left join 
        categorias on (categoria_id = categorias.id) where transacoes.id = $1 and usuario_id = $2`;

    const params = [id, idUsuario];

    const { rows, rowCount } = await pool.query(query, params);

    if (rowCount < 1) {
      return res.send.json({ mensagem: " Transação não encontrada" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: "erro do servidor" });
  }
};

const cadastrarTransacao = async (req, res) => {
  const idUsuario = req.usuario.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!idUsuario) {
    return res.status(404).json({ mensagem: "Usuario não encontrado." });
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
    const query = `insert into transacoes (descricao, valor, data, usuario_id, categoria_id, tipo)
            values ($1, $2, $3, $4, $5, $6)`;
    const params = [descricao, valor, data, idUsuario, categoria_id, tipo];

    const rows = await pool.query(query, params);

    const select = `select transacoes.id, transacoes.tipo, transacoes.descricao,
            transacoes.valor, transacoes.data, transacoes.usuario_id, transacoes.categoria_id,
            categorias.descricao AS categoria_nome
            FROM transacoes
            left join categorias ON transacoes.categoria_id = categorias.id
            where transacoes.usuario_id = $1
            order by transacoes.id desc`;
    const reqParams = [idUsuario];

    const resRows = await pool.query(select, reqParams);

    return res.status(201).json(resRows.rows[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: "erro do servidor" });
  }
};

const atualizarTransacao = async (req, res) => {
  const usuarioLogado = req.usuario;
  const idTransacao = req.params.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  //verificar se todos os dados foram inseridos
  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
  if (tipo != "entrada" && tipo != "saida") {
    return res
      .status(404)
      .json({ mensagem: "O tipo de transação está incorreto." });
  }

  //verificar se o id_categoria é válido
  const verificarIdCategoria = await pool.query(
    "SELECT id FROM categorias WHERE id = $1",
    [categoria_id]
  );

  if (verificarIdCategoria.rowCount < 1) {
    return res.status(404).json({
      mensagem: "Id da categoria inválido.",
    });
  }
  try {
    const query =
      "UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and usuario_id = $7";
    const params = [
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      idTransacao,
      usuarioLogado.id,
    ];
    const transacoes = await pool.query(query, params);
    //verificar se a transação existe e se pertence ao usuário
    if (transacoes.rowCount < 1) {
      return res.status(404).json({
        mensagem: "Transação não encontrada ou não pertencente ao usuário.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ mensagem: "Erro do servidor." });
  }
};

const deletarTransacao = async (req, res) => {
  const usuarioLogado = req.usuario;
  const idTransacao = req.params.id;

  try {
    const query = "delete from transacoes where id = $1 and usuario_id = $2";
    const params = [idTransacao, usuarioLogado.id];
    const transacoes = await pool.query(query, params);

    //verificar se a transação existe
    if (transacoes.rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não encontrada" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ mensagem: "Erro do servidor" });
  }
};

const extratoTransacoes = async (req, res) => {
  const usuarioLogado = req.usuario;

  try {
    const queryEntradas =
      "SELECT SUM(valor) as entrada FROM transacoes WHERE usuario_id = $1 and tipo = $2 group by $3";
    const params = [usuarioLogado.id, "entrada", usuarioLogado.id];
    const entradas = await pool.query(queryEntradas, params);

    const querySaidas =
      "SELECT SUM(valor) as saida FROM transacoes WHERE usuario_id = $1 and tipo = $2 group by $3";
    const params2 = [usuarioLogado.id, "saida", usuarioLogado.id];
    const saidas = await pool.query(querySaidas, params2);

    const entradasTotal = entradas.rowCount > 0 ? entradas.rows[0].entrada : 0;
    const saidasTotal = saidas.rowCount > 0 ? saidas.rows[0].saida : 0;
    const resultado = {
      entradas: entradasTotal,
      saidas: saidasTotal,
    };

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("O seguinte erro ocorreu:", error);
    return res.status(400).json({ mensagem: "Erro do servidor" });
  }
};

module.exports = {
  listarTransacoes,
  detalharTransacoes,
  cadastrarTransacao,
  atualizarTransacao,
  deletarTransacao,
  extratoTransacoes,
};
