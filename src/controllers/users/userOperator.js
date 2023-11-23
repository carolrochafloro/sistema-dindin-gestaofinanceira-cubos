//instanciar conexao
const knex = require("../../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//cadastrar usuario
const newUser = async (req, res) => {
	//desestruturar infos do body
	const { nome, email, senha } = req.body;

	//verificar se todos os dados foram informados
	if (!nome || !email || !senha) {
		return res
			.status(400)
			.json({ mensagem: "Todos os dados precisam ser informados" });
	}
	//verificar se já existe o email cadastrado
	const verificarEmail = await knex.query(
		"SELECT * FROM usuarios WHERE email = $1",
		[email]
	);

	if (verificarEmail.rows.length > 0) {
		return res.status(400).json({
			mensagem: "Já existe usuário cadastrado com o e-mail informado.",
		});
	}

	try {
		//fazer hash senha
		const senhaCriptografada = await bcrypt.hash(senha, 10);
		//enviar query insert
		const query = await knex.query(
			"INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
			[nome, email, senhaCriptografada]
		);
		//retorno query
		const queryResposta = await knex.query(
			"SELECT * FROM usuarios WHERE email = $1",
			[email]
		);
		const usuarioResposta = {
			id: queryResposta.rows[0].id,
			nome: queryResposta.rows[0].nome,
			email: queryResposta.rows[0].email,
		};
		return res.status(201).json(usuarioResposta);
	} catch (error) {
		return res.status(404).json({ mensagem: "Erro do servidor" });
	}
};

//login
const loginUser = async (req, res) => {
	const { email, senha } = req.body;

	try {
		//validar email
		const usuario = await knex.query(
			"SELECT * FROM usuarios WHERE email = $1",
			[email]
		);
		if (usuario.rowCount < 1) {
			return res.status(404).json({ mensagem: "Usuário e/ou senha inválidos" });
		}
		//validar senha
		const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);
		if (!senhaValida) {
			return res.status(400).json({ mensagem: "Usuário e/ou senha inválidos" });
		}
		//token login
		const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
			expiresIn: "8h",
		});
		//desestruturação p/ exibir informações sem senha
		const { senha: _, ...UsuarioLogado } = usuario.rows[0];

		return res.status(200).json({ UsuarioLogado, token });
	} catch (error) {
		return res.status(404).json({ mensagem: "Erro do servidor" });
	}
};

//detalharusuario
const detailUser = async (req, res) => {
	//obter id
	const idUsuario = req.usuario.id;
	try {
		//selecionar informações a partir do id
		const query = await knex.query(
			"SELECT id, nome, email FROM usuarios WHERE id = $1",
			[idUsuario]
		);
		return res.status(200).json(query.rows[0]);
	} catch (error) {
		return res.status(404).json({ mensagem: "Erro do servidor" });
	}
};

//atualizar usuario
const updateUser = async (req, res) => {
	const idUsuario = req.usuario.id;
	//obter informações do body
	const { nome, email, senha } = req.body;
	//validar nome, email e senha
	try {
		if (!nome || !email || !senha) {
			return res
				.status(400)
				.json({ mensagem: "Todos os campos devem ser preenchidos" });
		}
		//validar se o e-mail já existe (função?)
		const verificarEmail = await knex.query(
			"SELECT * FROM usuarios WHERE email = $1",
			[email]
		);
		if (verificarEmail.rows.length > 0) {
			return res.status(400).json({
				mensagem: "Já existe usuário cadastrado com o e-mail informado.",
			});
		}
		//criptografar a senha
		const senhaCriptografada = await bcrypt.hash(senha, 10);
		//mandar p/ BD
		const query = await knex.query(
			"UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4;",
			[nome, email, senhaCriptografada, idUsuario]
		);
		return res.status(201).send();
	} catch (error) {
		return res.status(404).json({ mensagem: "Erro do servidor" });
	}
};

module.exports = {
	newUser,
	loginUser,
	detailUser,
	updateUser,
};
